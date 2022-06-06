import Web3 from 'web3';

export const web3 = new Web3(window.ethereum);

const contractABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "pc",
          "type": "address"
        }
      ],
      "name": "reservePC",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "pcIndex",
          "type": "uint256"
        }
      ],
      "name": "releasePC",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getPCs",
      "outputs": [
        {
          "internalType": "address[10]",
          "name": "",
          "type": "address[10]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

export const CONTRACT_ADDRESS = '0xEf8EE50d6277616d0965360587a5236AAd82FC92';

export const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS)