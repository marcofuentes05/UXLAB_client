import React, { useEffect, useState } from "react";
import { web3 , contract } from '../../web3'
import './styles.css'


const WalletRow = ({address, takenIndex}) => {
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
        contract.methods.reservePC(address).send({from: address},(err, res) => {
            console.log('err', err)
            console.log('res', res)
        });
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