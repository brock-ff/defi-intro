const SimpleStorage = {
    "abi": [{
        "inputs": [],
        "name": "get",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
        }],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }],
    "bin": "608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea2646970667358221220ea373eebfa12fc254840d6ae0d1f723781a81fa641d59c221a4892cdd9491bf264736f6c634300060c0033"
};

export {
    SimpleStorage
};