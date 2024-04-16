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
    <div className="nft-card" style={{
      width: '300px',
      height: '400px',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
    }}>
      <img src={nft.url} alt={nft.name} style={{ width: '70%', height: '200px' }} />
      <div className="nft-details" style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{nft.name}</h3>
        <p style={{ marginBottom: '5px' }}>Current Price: {(nft.value / 10 ** 18).toString()} ETH</p>
        <p style={{ marginBottom: '5px' }}>Selling Price: {(nft.price / 10 ** 18).toString()} ETH</p>
        {/* //<p style={{ marginBottom: '5px' }}>Need to pay : {((2*nft.price -nft.value )/ 10 ** 18).toString()} ETH</p> */}
        <a href={nft.url} style={{ color: 'black', textDecoration: 'none', marginRight: '10px' }}>View</a>
        <button
          onClick={handleBuy}
          style={{
            backgroundColor: '#8a2be2',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Buy
        </button>
      </div>
    </div>
    
    
  );
}

export default NftCard;
