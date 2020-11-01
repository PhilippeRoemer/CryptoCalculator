import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Logo from './CC_Logo.png';
import './App.css';
//import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  //const [search, setSearch] = useState('');

  //Axios fetch data from API
  useEffect(() => {
    axios
      .get(
        //IOTA API Call -->'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=iota&order=market_cap_desc&per_page=1&page=1&sparkline=false'
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

function  CurrentValue(){
  //console.log('Button Clicked')
  const amount = document.getElementById("amount").value;
  const crypto = document.getElementById("crypto").value;

  const x = document.getElementById("crypto").selectedIndex;
  const y = document.getElementById("crypto").options;
  console.log(y[x]);
  const value = amount * crypto;  

  document.getElementById("currentValue").innerHTML = "The current value of " + amount + " " + y[x].text + " is : <span class='totalAmount'>$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
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
            <option value={post.current_price}>{post.name}</option>
          ))}                        
        </select>
      </div>
    </div>

    <input type="button" onClick={CurrentValue} value="Submit" class="submitButton"/>
  
  <p id="currentValue" class="valueText"></p>
  
</div>
  );
};

export default App;