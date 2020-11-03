import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Logo from './CC_Logo.png';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);

//Axios fetch data from API
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=50&page=1&sparkline=false'
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
  const ath_TotalValue = y[x].dataset.ath * amount;
  const ath_Date = y[x].dataset.athdate;

  var d = new Date(ath_Date);
  var n = d.toLocaleDateString('en-US');

  const user_value = amount * crypto;  

  document.getElementById("currentValue").innerHTML = "The current value of " + amount + " " + y[x].text + " is  <span class='totalAmount'>$" + user_value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
  document.getElementById("athValue").innerHTML = "On " + n + ", the all-time-high (ATH) value for 1 " + y[x].text + " was <span class='totalAmount'>$" + ath_Value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
  document.getElementById("athValue2").innerHTML = "The value of " + amount + " " + y[x].text + " during its ATH would've been worth <span class='totalAmount'>$" + ath_TotalValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "</span>";
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
            <option value={post.current_price} data-ath={post.ath} data-athdate={post.ath_date} >{post.name}</option>
          ))}                        
        </select>
      </div>
    </div>

  <input type="button" onClick={CurrentValue} value="Submit" class="submitButton"/>
  
  <p id="currentValue" class="valueText"></p>
  <p id="athValue" class="valueText"></p>
  <p id="athValue2" class="valueText"></p>
  
</div>
  );
};

export default App;