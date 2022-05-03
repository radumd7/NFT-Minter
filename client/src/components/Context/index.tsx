import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentWalletConnected } from "../lib/web3/functions";
import { initialState, initialStateType } from "./initialState";

const Web3Context = createContext< initialStateType >(initialState);

export const useWeb3 = () => useContext(Web3Context);

export default function Web3Provider({children}: React.PropsWithChildren<{}>) {
    const [ account, setAccount ] = useState< null | string >(null);
    const [ contractState, setContractState ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function fetchAccount() {
            getCurrentWalletConnected().then(r=>{
                if(r){
                    setAccount(r);
                }
            })
        };
        fetchAccount();
        addWalletListener();
        setLoading(false);
    },[]);

    const value = {
        account,
        setAccount,
        contractState
    };

    function addWalletListener() {
        if(window.ethereum){
            window.ethereum.on('accountsChanged', (accounts: string[])=>{
                if(accounts.length > 0){
                    setAccount(accounts[0]);
                }else{
                    setAccount(null);
                }
            })
        }
    };
    return(
        <Web3Context.Provider value={value}>{!loading && children}</Web3Context.Provider>
    );
};