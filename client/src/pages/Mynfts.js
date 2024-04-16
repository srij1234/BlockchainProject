// MyNfts.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
import NftCard from '../components/NftCard'; // Component to display NFT card
import UploadArtifact from '../artifacts/contracts/Upload.sol/Upload.json'; // Import the contract artifact
import './mynft.css'; // Import the CSS file

function MyNfts({ contract, account }) {
  const [nfts, setNfts] = useState([]);
  // console.log(account)
  useEffect(() => {
    async function fetchNfts() {
      try {
        // Fetch user's NFTs
        // console.log(contract)
        const userNfts = await contract.getNfts()
        // const userNfts = await contract.nfts(0)
        console.log(userNfts);
        // Update state with user's NFTs
        setNfts(userNfts);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    }
    if (contract)
      fetchNfts();
  }, [contract]);

  return (
    <div className="my-nfts-container">
      <h2 className="my-nfts-title">My NFTs</h2>
      <div className="image-list">
        {nfts.map((nft, index) => {
            if (account === nft.owner)
            return (
              <NftCard key={index} nft={nft} index={index} contract={contract} />
            )
        })}
      </div>
    </div>
  );
}

export default MyNfts;
