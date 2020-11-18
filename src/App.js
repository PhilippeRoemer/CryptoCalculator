import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Logo from './CC_Logo.png';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2C%20ethereum%2C%20iota%2C%20xrp%2C%20litecoin%2C%20monero%2C%20stellar%2C%20nano%2C%20chainlink&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

//This is currently a mess, but it will be cleaned up soon

function  CurrentValue(){
  const amount = document.getElementById("amount").value;
  const crypto = document.getElementById("crypto").value;

  const x = document.getElementById("crypto").selectedIndex;
  const y = document.getElementById("crypto").options;
  console.log(y[x].dataset.ath);
  console.log(y[x]);

  const ath_Value = y[x].dataset.ath * 1;
  const market_cap = y[x].dataset.marketcap * 1;
  const price_change = y[x].dataset.pricechange * 1;
  const price_change_percent = y[x].dataset.pricechangepercent *1;
  const ath_TotalValue = y[x].dataset.ath * amount;
  const ath_Date = y[x].dataset.athdate;
  const coin_image = y[x].dataset.coinimage;

  var d = new Date(ath_Date);
  var n = d.toLocaleDateString('en-US');

  const user_value = amount * crypto;  

  document.getElementById("currentValue").innerHTML = "The current value of " + amount + " " + y[x].text + " is  <span class='highlight'>$" + user_value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
  document.getElementById("athValue").innerHTML = "On " + n + ", the all-time-high (ATH) value for 1 " + y[x].text + " was <span class='highlight'>$" + ath_Value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
  document.getElementById("athValue2").innerHTML = "The value of " + amount + " " + y[x].text + " during its ATH would've been worth <span class='highlight'>$" + ath_TotalValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
}

  return (
<div class="container">
  <img src={Logo} class="logo"/>
 
    <div class="row"> 
      <div class="column">
        <p>Enter a cryptocurrency amount</p>
        <input type="number" id="amount" placeholder="Amount of crypto" class="cryptoAmount"></input>
      </div> 

      <div class="column">
        <p>Select a cryptocurrency</p>
        <select id="crypto" class="cryptoCurrency">
          {coins.map(post => (
            <option 
            value={post.current_price} 
            data-ath={post.ath} 
            data-athdate={post.ath_date} 
            data-coinimage={post.image} 
            data-marketcap={post.market_cap} 
            data-pricechange={post.price_change_24h} 
            data-pricechangepercent={post.price_change_percentage_24h}>
            {post.name}</option>
          ))}                        
        </select>
      </div>
    </div>

  <input type="button" onClick={CurrentValue} value="Submit" class="submitButton"/>
  
  <p id="currentValue" class="valueText"></p>
  <p id="athValue" class="valueText"></p>
  <p id="athValue2" class="valueText"></p>
  
  <hr/>
  <h1 class="market-title">Current Crypto Market</h1>

 <table>
  <tr>
    <th></th>
    <th>Coin</th>
    <th>Current Price</th>
    <th>24H Change</th>
    <th>ATH</th>    
    <th>Market Cap</th>
  </tr>
  {coins.map(coin => {
        return (
          <Coin
            name={coin.name}
            price={coin.current_price}
            marketcap={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            ath={coin.ath}
          />
        );
      })}
</table>

</div>
  );
};

export default App;