import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
import NftCard from '../components/NftCard'; // Component to display NFT card
import UploadArtifact from '../artifacts/contracts/Upload.sol/Upload.json'; // Import the contract artifact
import './mynft.css'; // Import the CSS file

function Mynfts({ contract, account }) {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchNfts() {
      try {
        // Fetch user's NFTs from the contract
        const userNfts = await contract.getNfts();
        console.log(userNfts);
        // Update state with user's NFTs
        setNfts(userNfts);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    }
    const intervalId = setInterval(fetchNfts, 10000);

    // Fetch NFTs initially when the contract is available
    if (contract) {
      fetchNfts();
    }

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [contract,nfts]);

  return (
    <div className="my-nfts-container" style={{ padding: '20px', minHeight: '100vh' }}>
      <h2 className="my-nfts-title" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '32px', fontWeight: 'bold', color: '#8a2be2', textTransform: 'uppercase' }}>My NFTs</h2>
      <div className="image-list" style={{ display: 'grid', gridAutoFlow: 'row', gap: '102px' }}>
        {nfts.map((nft, index) => {
          if (account === nft.owner)
            return (
              <NftCard key={index} nft={nft} index={index} contract={contract} style={{ width: '100%' }} />
            )
        })}
      </div>
    </div>
  );
}

export default Mynfts;
