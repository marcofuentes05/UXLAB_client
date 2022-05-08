import Web3 from 'web3';

export const web3 = new Web3('ws://127.0.0.1:9545');

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

  const CONTRACT_ADDRESS = '0x2a313C3E96204Bbeb16348E57967C2Ca63dE87B1';

  export const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS)