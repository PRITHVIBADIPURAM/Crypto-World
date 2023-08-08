import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Coin from './Coin';
import CoinDetail from './CoinDetail'; // Import the updated CoinDetail component
import './App.css';

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    Axios.get('https://api.coinstats.app/public/v1/coins?skip=0', {
      params: {
        currency: 'INR', // Fetch data in INR
      },
    })
      .then((response) => {
        setListOfCoins(response.data.coins);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <div className="App">
      <div className="cryptoHeader">
        <div className="headerContent">
          <h1 className="headerTitle">Crypto World </h1>
          <input
            className="form-control searchInput"
            type="search"
            placeholder="Search coin"
            aria-label="Search"
            value={searchWord}
            onChange={(event) => {
              setSearchWord(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => (
          <div key={coin.id} onClick={() => handleCoinClick(coin)}>
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          </div>
        ))}
      </div>

      {selectedCoin && (
        <div>
          <CoinDetail coin={selectedCoin} />
        </div>
      )}
    </div>
  );
}

export default App;
