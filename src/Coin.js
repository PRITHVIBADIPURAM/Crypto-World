import React from 'react';

const Coin = ({ name, icon, price, symbol }) => {
  return (
    <div className="coin">
      <img src={icon} alt={name} />
      <div className="coin-details">
        <h2>{name}</h2>
        
        <p>Symbol: {symbol}</p>
        <p>Price: ₹ {price} </p> {/* Display price in INR */}
      </div>
    </div>
  );
}

export default Coin;
