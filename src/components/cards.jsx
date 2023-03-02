import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./cardhover.css"

import {
  useContract,
  useNFTs,
  useContractMetadata,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
// import { create } from "ipfs-http-client";

// INTERNAL IMPORT
import { HealthContext } from "../Context/HealthCareContext";
//INTERNAL IMPORT
import { connectingWithContractNFT } from "../Utils/apiFeature";

const Cards = () => {
  const { nftcolabName, nftaddresses, totalMints, tokenIdCounter,dataa,dataaimage } =
    useContext(HealthContext);
    const [dataaa, setdataaa] = useState("");

    
  // const baseURL = "https://ipfs.io/ipfs/QmZ1ngC8FUGfcAL7YB7BUDXweHxyLmvsSZaoprfg3KEAQD";

  return (
   

   <div className="cccc">
  <div className="card-hover">
    <div className="card-hover__content">
      <h3 className="card-hover__title">
      Colab With <span>{nftcolabName}</span>
      </h3>
      <p className="card-hover__text"><h5>
                 <span> Collection Name :</span> {dataa.name}
                </h5>
           <h6>
              <span> Description:</span> {dataa.description}
                 </h6>
           <h6>
              <span>External URL: </span> {dataa.external_url}
                 </h6>
                 <span> Address:</span>
                 <p className="para">
                   {nftaddresses[0]}, {nftaddresses[1]}
                 </p>
                 </p>
      <a href="#" className="card-hover__link">
        <span>View minted NFTs</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>        
      </a>
    </div>
    <div className="card-hover__extra">
    <p className="list-group-item hovercard">
                   {" "}
                   Minted NFTs: {tokenIdCounter} Out of Total Mints Available:{" "}
                   {totalMints}
                 </p>
    </div>
    <img src={dataa.image} alt=""/>
  </div>
  
  </div>
  
  );
};

export default Cards;
