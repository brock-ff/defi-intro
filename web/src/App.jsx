import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { SimpleStorage } from "./contracts";

function App() {
  // get smart contract compile output
  // build a deploy transaction
  // sign it with key 0 from web3.eth.accounts

  // state vars
  const [masterAddress, setMasterAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [didDeploy, setDidDeploy] = useState(false);
  const [simpleStorageDeployment, setSimpleStorageDeployment] = useState();

  // connect web3 to local ganache node
  const web3 = new Web3("http://localhost:8545");

  // runs once on page load
  useEffect(() => {
    // fetch accounts
    const load = async () => {
      let accounts = await web3.eth.getAccounts();
      setMasterAddress(accounts[0]);
      console.log(
        "master account balance",
        await web3.eth.getBalance(accounts[0])
      );
    };
    load();
  }, [web3.eth]);

  // deploys contract(s)
  const deploy = () => {
    console.log("deploying contract(s)...");
    setDidDeploy(true);
    let simpleStorageContract = new web3.eth.Contract(SimpleStorage.abi);
    let result = simpleStorageContract
      .deploy({ data: SimpleStorage.bin })
      .send({
        from: masterAddress,
        gas: 3000000,
        gasPrice: 40000000000,
      })
      .on("error", (error) => console.error(error))
      .on("transactionHash", (txhash) => console.log("tx hash", txhash))
      .on("receipt", (receipt) => console.log("contract receipt", receipt))
      .on("confirmation", (confirmation) =>
        console.log("confirmation", confirmation == 1 ? "CONFIRMED" : "FAILURE")
      )
      .then((newContractInstance) => {
        console.log(
          "new contract address",
          newContractInstance.options.address
        );
        setSimpleStorageDeployment(newContractInstance);
      });
  };

  // gives user some test ether
  const drip = () => {
    console.log("dripping funds from faucet...");
    let value = 100000000000000000; // 0.1 ETH in wei
    let wei = 1000000000000000000; // 1 ETH in wei
    web3.eth.sendTransaction(
      {
        from: masterAddress,
        to: userAddress,
        value,
      },
      (err) => {
        if (err) {
          console.error("sendTransactionError", err);
        } else {
          alert(`Deposited ${value / wei} ETH into account ${userAddress}`);
        }
      }
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          master account: <code>{masterAddress}</code>
        </p>
        <label htmlFor="userAddress">Get some Ether</label>
        <input
          autoComplete="off"
          id="userAddress"
          type="text"
          placeholder="your ETH address here..."
          onChange={(e) => setUserAddress(e.target.value)}
        ></input>
        <button onClick={drip} disabled={userAddress === ""}>
          Get Test Ether
        </button>
        <br />
        <button onClick={deploy} disabled={didDeploy}>
          Deploy Contracts
        </button>
        {simpleStorageDeployment
          ? `new contract address: ${simpleStorageDeployment.options.address}`
          : "deploy contracts pls"}
      </header>
    </div>
  );
}

export default App;
