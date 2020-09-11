#!/bin/bash

FILES=./smart-contracts/*.sol

echo "compiling smart contracts..."
ls $FILES

for f in $FILES
do
    docker run -it -v $PWD/smart-contracts:/smart-contracts ethereum/solc:0.6.12 -o /smart-contracts/bin --bin --abi --overwrite /$f
done

# note: code needs to be manually copied into web/src/contracts.js -- not worth automating for a demo