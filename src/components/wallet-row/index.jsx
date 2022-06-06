import React, { useEffect, useState } from "react";
import { web3 , contract, CONTRACT_ADDRESS } from '../../web3'
import './styles.css'


const WalletRow = ({address, takenIndex, isMetamask}) => {
    const [balance, setBalance] = useState(0);

    const getBalance = async () => {
        const myBalance = await web3.eth.getBalance(address);
        setBalance((+myBalance)/(10**18).toFixed(4));
    }
    useEffect(() => {
        getBalance();
    }, []);

    const handleClick = () => {
        if (takenIndex === -1) {
            reservePC();
        } else {
            freePC();
        }
    }

    const reservePC = () => {
        if (!isMetamask) {
            contract.methods.reservePC(address).send({from: address},(err, res) => {
                console.log('err', err)
                console.log('res', res)
            });
        } else {
            console.log(address)
            contract.methods.reservePC('0x43Da6B2632Bf8724393D115b0077A2f19C304Dd5').send({from: `${'0x43Da6B2632Bf8724393D115b0077A2f19C304Dd5'}`},(err, res) => {
                console.log('err', err)
                console.log('res', res)
            });
            // console.log('IS METAMASK', address);
            // const transactionParameters = {
            //     nonce: '0x00', // ignored by MetaMask
            //     gasPrice: '0x0', // customizable by user during MetaMask confirmation.
            //     // gas: '0x2710', // customizable by user during MetaMask confirmation.
            //     to: CONTRACT_ADDRESS, // Required except during contract publications.
            //     from: address, // must match user's active address.
            //     // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
            //     // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            //     data: address, // Data to be sent to the contract.
            //   };
            // window.ethereum.request({
            //     method: 'eth_sendTransaction',
            //     params: [transactionParameters],
            // });
        }
    }

    const freePC = () => {
        contract.methods.releasePC(takenIndex).send({from: address},(err, res) => {
            console.log('err', err)
            console.log('res', res)
        });
    }

    web3.eth.subscribe('newBlockHeaders', async (error, result) => {
        if (!error) {
            getBalance();
        }
    })

    return (
        <div className="container">
            <p className="address">{address}</p>
            <p>{`${balance}`.slice(0, 7)} ETH</p>
            <div className="reserve-button" onClick={handleClick} style={{
                backgroundColor: takenIndex >= 0 ? '#EB7267' : '#67EBA7'
            }}>
                <p>{takenIndex < 0 ? 'Reservar PC' : 'Liberar PC'}</p>
            </div>
        </div>
    )
}

export default WalletRow;