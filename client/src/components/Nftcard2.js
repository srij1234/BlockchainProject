// NftCard.js
import { useState } from 'react';
import { ethers } from 'ethers'

function NftCard({ nft, contract, index }) {
  const [sellingPrice, setSellingPrice] = useState('');
  const [showModal, setShowModal] = useState(false);

//   const handleBuy = () => {
//     setShowModal(true);
//     console.log(index);
//   };
  const handleBuy = async () => {
    // Call the onSell method passed from the parent component
    try {
      // Fetch user's NFTs
      console.log(contract)
      const userNfts = await contract.buyNft(index, {
        value: (2 * nft.price - nft.value).toString()
      });
        
      // Close the modal after submission
    //   setShowModal(false);
    //   // Reset selling price
    //   setSellingPrice('');
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  return (
    <div className="nft-card">
      <img src={nft.url} alt={nft.name} />
      <div className="nft-details">
        <h3>{nft.name}</h3>
        <p>Current Price: {(nft.value / 10**18).toString()} ETH</p>
        <p>Selling Price: {(nft.price / 10**18).toString()} ETH</p>
        <a href={nft.url} style={{ color: 'black', marginRight: '10px'}}>view</a>
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
}

export default NftCard;
