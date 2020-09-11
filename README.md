# DeFi Intro

Just a simple contract running on a local blockchain, and a website to access it via web3. Pretty basic but it touches on all points of the tech stack.

Contracts are pre-compiled and committed to git. All you need to do is build & run the stack.

## 0. Install Metamask

Install it in your browser and make an account. Don't worry, you don't need to buy real ether. Just click the button up top that (probably) says "Main Ethereum Network" and choose the "localhost:8545" option. It won't connect until you fire up the local node but that's OK.

## 1. build containers

We need to build any custom containers we have before we try to run the stack.

```sh
docker-compose build
```

## 2. run stack

```sh
docker-compose up
```

## 3. deploy the contract

Our contracts are compiled, but we still need to deploy them to our local blockchain node.

1. Access the website at [localhost](http://localhost).
2. Click the "Deploy Contracts" button. This will deploy a contract using the master account in Ganache.

## 4. do stuff with the contract

Now that the contract is deployed, we can do stuff with it.

1. Get some test ether to conduct transactions with.
2. Check ("fetch") the contract storage value; it should be null on a fresh contract.
3. Set a new contract value and submit it. You should be prompted by metamask to sign the transaction.
4. Fetch the value again and you should see your new number show up. This is data from the blockchain :D

## shutdown stack

```sh
# CTRL+C to stop containers

# the following removes the containers' persistent data from docker daemon
docker-compose down
```
