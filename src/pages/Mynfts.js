// MyNfts.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
import NftCard from '../components/NftCard'; // Component to display NFT card
import UploadArtifact from '../artifacts/contracts/Upload.sol/Upload.json'; // Import the contract artifact

function MyNfts() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchNfts() {
      try {
        // Connect to the Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Load the user's Ethereum account
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Load the contract
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
        const contractABI = UploadArtifact.abi; // Access the ABI from the contract artifact
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Fetch user's NFTs
        const userNfts = await contract.getNfts();

        // Update state with user's NFTs
        setNfts(userNfts);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    }

    fetchNfts();
  }, []);

  return (
    <div>
      <h2>My NFTs</h2>
      <div className="image-list">
        {nfts.map((nft, index) => (
          <NftCard key={index} nft={nft} />
        ))}
      </div>
    </div>
  );
}

export default MyNfts;
