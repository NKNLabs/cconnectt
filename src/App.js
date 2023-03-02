import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Route, Routes } from "react-router-dom";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { Navbar } from "./components";
import { Main, OnlyCollab, CollabNFT} from "./pages";

const App = () => {
  const address = useAddress();

  return (
    <div>
      {address ? (
        <div className="">
          <div className="">
            <Navbar />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/onlycollab" element={<OnlyCollab />} />
              <Route path="/collabNFT" element={<CollabNFT />} />
            </Routes>
          </div>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};

export default App;
