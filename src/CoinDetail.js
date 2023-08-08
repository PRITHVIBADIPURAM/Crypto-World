import React, { useState, useEffect } from 'react';
import './CoinDetail.css';
import Axios from 'axios';

function CoinDetail({ coin }) {
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    Axios.get(`https://api.coinstats.app/public/v1/coins/${coin.id}/history`, {
      params: {
        period: '7d', // Fetch price history for the last 7 days
        currency: 'INR',
      },
    })
      .then((response) => {
        setPriceHistory(response.data.history);
      })
      .catch((error) => {
        console.error('Error fetching price history:', error);
      });
  }, [coin.id]);

  return (
    <div className="coin-detail">
      <img src={coin.icon} alt={coin.name} className="coin-detail-icon" />
      <h2>{coin.name}</h2>
      <p>Symbol: {coin.symbol}</p>
      <p>Price: {coin.price}</p>
      
      <h3>Price History</h3>
      <ul>
        {priceHistory.map((dataPoint, index) => (
          <li key={index}>
            Date: {new Date(dataPoint.timestamp).toLocaleDateString()} | Price: {dataPoint.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoinDetail;
