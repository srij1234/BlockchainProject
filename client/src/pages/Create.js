import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import UploadArtifact from '../artifacts/contracts/Upload.sol/Upload.json';
import './create.css';

function Create({ contract, account }) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const clearFile = () => {
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !price) {
      alert('Please fill all fields.');
      return;
    }
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
      // Reset form fields after successful creation
      setFile(null);
      setName('');
      setPrice(0);
    } catch (e) {
      alert(e)
      alert("Unable to upload image to Pinata");
    }
  };

  return (
    <div className="create-container" style={{ width: '120%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <h2 className="create-title" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', color: '#8a2be2' }}>Create NFT</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label htmlFor="file-upload" className="choose" style={{ marginBottom: '15px', color: '#8a2be2', cursor: 'pointer', fontSize: '18px' }}>
              Choose Image
            </label>
            <input
              disabled={!account}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
              style={{ display: 'none' }}
            />
            {file && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '200px', height: 'auto', marginBottom: '15px', borderRadius: '5px' }} />
                <span style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>{file.name}</span>
                <button onClick={clearFile} style={{ backgroundColor: '#ff6347', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Cancel</button>
              </div>
            )}
            {!file && (
              <span style={{ marginBottom: '15px', color: '#ff6347', fontSize: '16px' }}>Please select an image.</span>
            )}
            <label className="label" style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>Name:</label>
            <input type="text" value={name} onChange={handleNameChange} className="input-field" style={{ padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px', fontSize: '16px' }} required />
            <label className="label" style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field" style={{ padding: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }} required />
          </div>
          <button type="submit" className="submit-btn" style={{ backgroundColor: '#8a2be2', color: '#fff', padding: '15px', borderRadius: '5px', border: 'none', cursor: 'pointer', textAlign: 'center', fontSize: '18px' }}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
