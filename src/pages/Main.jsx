import React from "react";
import Dash from "../components/dashboard";
import Cards from "../components/cards";

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
