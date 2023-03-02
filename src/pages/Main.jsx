import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Previous,Createnew,Collection } from "../components";
import Dash from "../components/dashboard";
import Cards from "../components/cards";
import Encrypt from "../Encrypt/Encrypt";
import AccessControl from "../Encrypt/AccessControl";

const Main = () => {
  // const address = useAddress();

  return (
    <>
      <div>
        <Dash/>
        <hr className="hr hr-blurry" />
      
        <Cards/>
       
        {/* <Collection /> */}
        <hr className="hr hr-blurry" />
        {/* <Encrypt />
        <AccessControl /> */}
      </div>
    </>
  );
};

export default Main;
