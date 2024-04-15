// NftCard.js
import React from 'react';

function NftCard({ nft }) {
  return (
    <div className="nft-card">
      <img src={nft.url} alt={nft.name} />
      <div className="nft-details">
        <h3>{nft.name}</h3>
        <p>Price: {nft.price} ETH</p>
        <button>Sell</button>
      </div>
    </div>
  );
}

export default NftCard;
