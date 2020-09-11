# DeFi Intro

Contracts are pre-compiled and committed to git. All you need to do is build & run the stack.

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
2. Click the "Deploy Contracts" button.

## 4. do stuff with the contract

Now that the contract is deployed, we can do stuff with it.

1. do
2. stuff

## shutdown stack

```sh
# CTRL+C to stop containers

# the following removes the containers' persistent data from docker daemon
docker-compose down
```
