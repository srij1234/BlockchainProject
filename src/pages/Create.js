// create.js
import React, { useState } from 'react';
import { ethers } from 'ethers'
import UploadArtifact from '../artifacts/contracts/Upload.sol/Upload.json'; // Import the contract artifact

function Create() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const signer = provider.getSigner();
      const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const contractABI = UploadArtifact.abi;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call the createNft function on the smart contract
      await contract.createNft(url, name);

      // Reset form fields after successful creation
      setUrl('');
      setName('');

      alert('NFT created successfully!');
    } catch (error) {
      console.error('Error creating NFT:', error);
      alert('Failed to create NFT. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create NFT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL:</label>
          <input type="text" value={url} onChange={handleUrlChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;
