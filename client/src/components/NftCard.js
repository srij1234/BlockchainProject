// NftCard.js
import { useState } from 'react';
import { ethers } from 'ethers';

function NftCard({ nft, contract, index }) {
  const [sellingPrice, setSellingPrice] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSell = () => {
    setShowModal(true);
    console.log(index);
  };

  const handleSubmit = async () => {
    // Call the onSell method passed from the parent component
    try {
      // Fetch user's NFTs
      console.log(contract);
      const userNfts = await contract.listNft(
        index,
        ethers.utils.parseEther(sellingPrice.toString())
      );

      // Close the modal after submission
      setShowModal(false);
      // Reset selling price
      setSellingPrice('');
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
        <a href={nft.url} style={{ color: '#000', textDecoration: 'none', marginRight: '10px' }}>View</a>
        <button
          onClick={handleSell}
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
          Sell
        </button>
      </div>
      {showModal && (
        <div className="modal" style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            maxWidth: '80%'
          }}>
            <span
              className="close"
              onClick={() => setShowModal(false)}
              style={{
                color: '#000',
                fontSize: '20px',
                cursor: 'pointer',
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
            >
              &times;
            </span>
            <h2 style={{ marginBottom: '10px' }}>Enter Selling Price</h2>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#8a2be2',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#ddd',
                  color: '#000',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default NftCard;
