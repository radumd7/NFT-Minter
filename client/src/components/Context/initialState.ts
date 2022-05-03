import React from "react";

export const initialState = {
    account: null,
    setAccount: () => null,
    contractState: null,
    // setContractState: () => null,
};
export interface initialStateType {
    account: null | string
    setAccount: React.Dispatch<React.SetStateAction< null |string >>
    contractState: null | 'airdrop' | 'presale' | 'mint'
    // setContractState: React.Dispatch<React.SetStateAction< string >>
};