import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { SimpleStorage } from "./contracts";

// definition of 1ETH in wei. probably stored somewhere in web3 but w/e...
const wei = 1000000000000000000;

function App() {
  // get smart contract compile output
  // build a deploy transaction
  // sign it with key 0 from web3.eth.accounts

  // state vars
  const [masterAddress, setMasterAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [didDeploy, setDidDeploy] = useState(false);
  const [simpleStorageDeployment, setSimpleStorageDeployment] = useState(); // instance of deployed contract; must be instantiated by button
  const [
    windowSimpleStorageDeployment,
    setWindowSimpleStorageDeployment,
  ] = useState(); // same contract instance but via metamask's web3 instance
  const [storageValueInput, setStorageValueInput] = useState(); // user input for contract storage value
  const [storageValue, setStorageValue] = useState(); // contract value; must be fetched by button. a number.
  const [metamaskAccount, setMetamaskAccount] = useState("");
  const [windowWeb3, setWindowWeb3] = useState();

  // connect web3 to local ganache node
  const web3 = new Web3("http://localhost:8545");

  // runs once on page load
  useEffect(() => {
    // fetch accounts
    const load = async () => {
      // gets accounts from ganache (master account for dispensing test ether and deploying contracts easily)
      let accounts = await web3.eth.getAccounts();
      setMasterAddress(accounts[0]);
      console.log(
        "master account balance",
        `${parseInt(await web3.eth.getBalance(accounts[0])) / wei} ETH`
      );

      // gets account from browser provider, like metamask or TrustWallet
      // let browserAccounts = await web3.eth.requestAccounts(); // should work but there's some incompatibility
      let browserAccounts = await window.ethereum.enable();
      setMetamaskAccount(browserAccounts[0]);
      setWindowWeb3(new Web3(window.ethereum));
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
        gasPrice: 10000000000,
      })
      .on("error", (error) => console.error(error))
      .on("transactionHash", (txhash) => console.log("tx hash", txhash))
      .on("receipt", (receipt) => console.log("contract receipt", receipt))
      .on("confirmation", (confirmation) =>
        console.log(
          "confirmation",
          confirmation,
          confirmation >= 1 ? "CONFIRMED" : "FAILURE"
        )
      )
      .then((newContractInstance) => {
        console.log(
          "new contract address",
          newContractInstance.options.address
        );
        setSimpleStorageDeployment(newContractInstance);

        // after deploying it with master account, store an instance that uses metamask's instance of web3
        // we'll need it to enable users to sign txs with metamask
        let windowStorageContract = new windowWeb3.eth.Contract(
          SimpleStorage.abi,
          newContractInstance.options.address
        );
        setWindowSimpleStorageDeployment(windowStorageContract);
      });
  };

  // gives user some test ether
  const drip = () => {
    console.log("dripping funds from faucet...");
    const value = 100000000000000000; // 0.1 ETH in wei
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

  const submitNewValue = async () => {
    console.log("submitting new value:", `"${storageValueInput}"`);

    // a loose approximation of tx cost for demo's sake
    const cost = wei / 250; // 1/250 of an ETH

    console.log("user account", metamaskAccount);
    let userBalance = await web3.eth.getBalance(metamaskAccount);
    console.log("user balance", userBalance);
    if (userBalance < cost) {
      alert("you need more ETH to conduct this transaction");
    } else {
      let enabled = await window.ethereum.enable();
      console.log("enabled", enabled);
      let res = await windowSimpleStorageDeployment.methods
        .set(storageValueInput)
        .send({ from: metamaskAccount });
      // .send({ from: masterAddress });
      console.log("send res", res);
    }
  };

  const fetchStorageValue = async () => {
    console.log("fetching contract storage value...");
    let res = await simpleStorageDeployment.methods.get().call();
    setStorageValue(res);
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
        />
        <button onClick={drip} disabled={userAddress === ""}>
          Get Test Ether
        </button>
        <br />
        <button onClick={deploy} disabled={didDeploy}>
          Deploy Contracts
        </button>
        {simpleStorageDeployment ? (
          <>
            {`new contract address: ${simpleStorageDeployment.options.address}`}
            <div>
              <label htmlFor="newValue">Set New Contract Value</label>
              <input
                id="newValue"
                type="number"
                placeholder="new number..."
                onChange={(e) => setStorageValueInput(e.target.value)}
              />
              <button onClick={submitNewValue}>Submit New Value</button>
            </div>
            <button onClick={fetchStorageValue}>
              Fetch Contract Storage Value
            </button>
            {storageValue ? <p>Storage Value: {storageValue}</p> : ""}
          </>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
