import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";

function App() {
  // get smart contract compile output
  // build a deploy transaction
  // sign it with key 0 from web3.eth.accounts

  // state vars
  const [masterAddress, setMasterAddress] = useState("");
  const [didDeploy, setDidDeploy] = useState(false);

  // connect web3 to local ganache node
  const web3 = new Web3("http://localhost:8545");

  // runs once on page load
  useEffect(() => {
    // fetch accounts
    const load = async () => {
      let accounts = await web3.eth.getAccounts();
      setMasterAddress(accounts[0]);
    };
    load();
  }, [web3.eth]);

  // deploys contract(s)
  const deploy = () => {
    console.log("deploying contract(s)...");
    setDidDeploy(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          master account: <code>{masterAddress}</code>
        </p>
        <button onClick={deploy} disabled={didDeploy}>
          Deploy Contracts
        </button>
      </header>
    </div>
  );
}

export default App;
