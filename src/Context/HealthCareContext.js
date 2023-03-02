import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { useAddress } from "@thirdweb-dev/react";
// import { useRouter } from "next/router";

//INTERNAL IMPORT
import {
  connectWallet,
  connectingWithContractNFTColab,
  connectingWithContractNFT,
  connectingWithContractOnlyColab,
} from "../Utils/apiFeature";

export const HealthContext = React.createContext();

export const HealthCareProvider = ({ children }) => {
  //   const router = useRouter();
  const address = useAddress();
  //USESTATE

  const [connectAccount, setAccount] = useState("");
  const [onlycolabName, setonlyColabName] = useState("");
  const [onlyaddresses, setonlyAddresses] = useState([]);
  const [onlypercentage, setonlyPercentage] = useState([]);
  const [onlytotalRevenue, setonlyTotalRevenue] = useState("");
  const [onlyyourAmount, setonlyYourAmount] = useState("");
  const [splitshare, setsplitshare] = useState("");

  const [nftcolabName, setnftColabName] = useState("");
  const [nftaddresses, setnftAddresses] = useState([]);
  const [nftpercentage, setnftPercentage] = useState([]);
  const [nfttotalRevenue, setnftTotalRevenue] = useState("");
  const [nftyourAmount, setnftYourAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaUrl, setmetaUrl] = useState("");

  const [totalMints, settotalMints] = useState("");
  const [tokenIdCounter, settokenIdCounter] = useState("");
  const [tokenURI, settokenURI] = useState("");

  const [dataa, setdataa] = useState("");
  const [qradd, setqradd] = useState("");
  const [qraddds, setqraddd] = useState("");

  //CREATE ACCOUNT

  

  const Splitting = async () => {
    try {
      const contract = await connectingWithContractNFTColab();
      console.log(contract)
      
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      console.log(connectAccount)

      const splitshare = await contract.splitFunds();
      setLoading(true);
      await splitshare.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const Splittings = async () => {
    try {
      const contract = await connectingWithContractOnlyColab();
      // console.log(contract)
      
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // console.log(connectAccount)

      const splitshares = await contract.splitFunds();
      setLoading(true);
      await splitshares.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  

  const fetchDataOnlyColab = async () => {
    try {
      
      const contract = await connectingWithContractOnlyColab();
      // console.log(contract)

      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // console.log(connectAccount)
      
      const onlycolabName = await contract.colabwith();
      setonlyColabName(onlycolabName);
      // console.log(onlycolabName);
      
      const onlyaddresses = await contract.getpayees();
      setonlyAddresses(onlyaddresses);
      // console.log(onlyaddresses)
      
      const onlypercentages = await contract.getshares_();
      const onlypercentage = onlypercentages.toString()
      setonlyPercentage(onlypercentage);
      // console.log(onlypercentage)

      const balance = await contract.balance();
      const onlytotalRevenue= ethers.utils.formatEther(balance);
      setonlyTotalRevenue(onlytotalRevenue.toString());
      // console.log(onlytotalRevenue);

      const newbalance = await contract.releaseplz(connectAccount);
      const onlyyourAmount= ethers.utils.formatEther(newbalance);
      setonlyYourAmount(onlyyourAmount.toString());

      const qradd = await contract.getaddress();
      setqradd(qradd);
      } catch (error) {
        
        console.log(error);
      }
  };

  const fetchNFTcount = async () => {
    try {
      
      const contract = await connectingWithContractNFT();
      // console.log(contract)
      
      const totalMints = await contract.totalMints();
      settotalMints(totalMints.toString());
      // console.log(totalMints.toString());

      const tokenIdCounter = await contract._tokenIdCounter();
      settokenIdCounter(tokenIdCounter.toString());
      // console.log(tokenIdCounter.toString());
      
      } catch (error) {
        
        console.log(error);
      }
  };


  const fetchDataNFTColab = async () => {
    try {
      
      const contract = await connectingWithContractNFTColab();
      // console.log(contract)
      
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // console.log(connectAccount)
      
      const nftcolabName = await contract.colabwith();
      setnftColabName(nftcolabName);
      // console.log(nftcolabName);
      
      const nftaddresses = await contract.getpayees();
      setnftAddresses(nftaddresses);
      // console.log(nftaddresses)
      
      const nftpercentages = await contract.getshares_();
      const nftpercentage = nftpercentages.toString()
      setnftPercentage(nftpercentage);
      // console.log(nftpercentage)

      const balance = await contract.balance();
      const nfttotalRevenue= ethers.utils.formatEther(balance);
      setnftTotalRevenue(nfttotalRevenue.toString());
      // console.log(nfttotalRevenue);

      const qraddds = await contract.getadddress();
      setqraddd(qraddds);
      
      const newbalance = await contract.releaseplz(connectAccount);
      const nftyourAmount= ethers.utils.formatEther(newbalance);
      setnftYourAmount(nftyourAmount.toString());
      // console.log(nftyourAmount);

      const metaUrl = await contract.metadataURI();
      // setmetaUrl(metaUrl);
      const response = await fetch(metaUrl);
      // console.log(metaUrl);
      // const response = await fetch(metaUrl);
      const json = await response.json();
      // console.log(json);
      setdataa(json);
    } catch (error) {
      
      console.log(error);
    }
    
  };


  
  useEffect(() => {
    // Splittings();
    // Splitting();
    fetchDataOnlyColab();
    fetchDataNFTColab();
    fetchNFTcount();
  }, []);


  return (
    <HealthContext.Provider
      value={{
        connectAccount,
        onlycolabName,
        onlyaddresses,
        onlypercentage,
        onlytotalRevenue,
        onlyyourAmount,
        nftcolabName,
        nftaddresses,
        nftpercentage,
        nfttotalRevenue,
        nftyourAmount,
        totalMints,
        tokenIdCounter,
        dataa,
        Splitting,
        Splittings,
        qradd,
        qraddds

       }}
    >
      {children}
    </HealthContext.Provider>
  );
};