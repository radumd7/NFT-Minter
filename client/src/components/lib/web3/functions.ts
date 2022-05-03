import { ethers } from "ethers";
import NFTContract from '../../contracts/WordsNFT.json';
export const getCurrentWalletConnected = async () => {
    if(window.ethereum){
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts'
            })
            if(addressArray.length > 0){
                return addressArray[0];
            }else{
                return;
            }
        }catch(error) {
            return error;
        };
    };
};

export const connectWallet = async () => {
    if(window.ethereum){
        const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        if(addressArray.length > 0){
            return addressArray[0];
        }
    }else{
        return "You must install metamask";
    }
};

export const MintNFT = async (address: string) => {
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            process.env.REACT_APP_CONTRACT_ADDRESS as string,
            NFTContract.abi,
            signer
        );
        try {
            const tx = await contract.makeAnEpicNFT();
            await tx.wait();
            return {ok: 1};
        } catch (error) {
            return (error as any).message;
        }
    }else{
        return {error: "You must install metamask."};
    };
};