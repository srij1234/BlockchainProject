// create.js
import React, { useState } from 'react';
import axios from 'axios'

import { ethers } from 'ethers'
import UploadArtifact from '../artifacts/contracts/Upload.sol/Upload.json'; // Import the contract artifact
import './create.css'; // Import the CSS file

function Create({ contract, account }) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    // setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Call the createNft function on the smart contract
  //     await contract.createNft(url, name);

  //     // Reset form fields after successful creation
  //     setUrl('');
  //     setName('');

  //     alert('NFT created successfully!');
  //   } catch (error) {
  //     console.error('Error creating NFT:', error);
  //     alert('Failed to create NFT. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `eccf929090bbc9dd3247`,
            pinata_secret_api_key: `377e3ecdcf2cb0273e7402b752b1116fa954dac2cc79bf853ecec4f29eb0557c`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        alert(ImgHash);
        await contract.createNft(ImgHash, name, {
          value: ethers.utils.parseEther(price.toString())
        });
        alert("Successfully Image Uploaded");
        // setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert(e)
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    // setFileName("No image selected");
    setFile(null);
  };

  return (
    <div className="create-container">
      <h2 className="create-title">Create NFT</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <label className="label">Name:</label>
          <input type="text" value={name} onChange={handleNameChange} className="input-field" required />
          
        <label className="label">Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field" required />
        </div>
        <button type="submit" className="submit-btn">Create</button>
      </form>
    </div>
  );
}

export default Create;
