import React, { useEffect, useState } from "react";
import WalletRow from "../wallet-row";
import Computer from "../computer";
import './styles.css'

import { web3, contract } from '../../web3';

async function getMyAccounts (web3) {
    try {
        return await web3.eth.getAccounts();
    } catch(e) {
        return [];
    }
}



  const MyComponent = () => {

  const [accounts, setAccounts] = useState([]);
  const [metamaskAccounts, setMetamaskAccounts] = useState([]);
  const [computers, setComputers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  web3.eth.subscribe('newBlockHeaders', async (error, result) => {
    if (!error) {
      getPCs();
    }
  })

    const getAccounts = async () => {
      const accounts = await getMyAccounts(web3);
      setAccounts(accounts);
    }

    const getMetamaskAccounts = async () => {
      setIsLoading(true);
      try {
        const accounts = await ethereum.selectedAddress;//.request({ method: 'eth_requestAccounts' });
        setMetamaskAccounts([accounts]);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
      
    const getPCs = async () => {
      const pcs = await contract.methods.getPCs().call({}, (error, result) => {
        console.log(error);
        // console.log(result);
      });
      setComputers(pcs);
    }

    useEffect(() => {
        getAccounts();
        getPCs();
    }, []);
    const ethereum = window.ethereum;
    return (
        <div>
            <h1 className="title">UX LAB PCs</h1>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <div className="wallets">
                <h2>Wallets</h2>
                {
                  accounts && accounts.length !== 0 && accounts.map((address, index) => {
                    return <WalletRow address={address} key={index} takenIndex={computers.indexOf(address)} />
                  })
                }

                <h2> Metamask Wallets</h2>
                {
                  metamaskAccounts && metamaskAccounts.length !== 0 && metamaskAccounts.map((address, index) => {
                    return <WalletRow address={address} key={index} takenIndex={computers.indexOf(address)} isMetamask />
                  })
                }
              </div>
              <div className="pcs">
                <h2>Computers</h2>
                <div className="computer-group-container">
                  {
                    computers && computers.length !== 0 && computers.map((address, index) => {
                      return <Computer value={address} id={index+1} />
                    })
                  }
                </div>
              </div>
            </div>
            <div onClick={getMetamaskAccounts} style={{width: '100px', height: '80px', backgroundColor: isLoading ? 'red' : 'blue', margin: '0 50px' }}>
              <p>Usar metamask</p>
            </div>
        </div>
    )
}

export default MyComponent;
