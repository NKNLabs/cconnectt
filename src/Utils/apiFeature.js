import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { Splitabi,SplitAddress,SplitNFTabi,NFTabi,NFTAddress,SplitNFTAddress, Testabi,TestAddress} from "../Context/constants";


export const ChechIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    // if (!window.ethereum) return console.log("Install MateMask");

    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });

    if (!window.ethereum) return console.log("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContractOnlyColab = (signerOrProvider) =>
  new ethers.Contract(SplitAddress, Splitabi, signerOrProvider);

const fetchContractNFTColab = (signerOrProvider) =>
  new ethers.Contract(SplitNFTAddress, SplitNFTabi, signerOrProvider);
  
const fetchContractNFT = (signerOrProvider) =>
  new ethers.Contract(NFTAddress, NFTabi, signerOrProvider);
  
const fetchContractTEST = (signerOrProvider) =>
  new ethers.Contract(TestAddress, Testabi, signerOrProvider);

export const connectingWithContractTEST = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContractTEST(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export const connectingWithContractNFT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContractNFT(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export const connectingWithContractNFTColab = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContractNFTColab(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export const connectingWithContractOnlyColab = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContractOnlyColab(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "  Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};