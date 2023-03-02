import React from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

function AccessControl() {
  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const applyAccessConditions = async (e) => {
    // CID on which you are applying encryption
    // CID is generated by uploading a file with encryption
    // Only the owner of the file can apply access conditions
    const cid = "QmUQ7MMS61W2NWFz2XG8QiDL3v9f1P5L6yP8W7LtT32WJb";

    // Conditions to add
    const conditions = [
    {
      id: 1,
      chain: "Shardeum_Lib1",
      method: "balanceOf",
      standardContractType: "ERC721",
      contractAddress: "0x6f492F20a469CE66cBa0f341c21A2c173237A082",
      returnValueTest: { comparator: ">=", value: "1" },
      parameters: [":userAddress"],
  }
    ];

    // Aggregator is what kind of operation to apply to access conditions
    // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
    const aggregator = "([1])";
    const { publicKey, signedMessage } = await encryptionSignature();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response.data.cid);
    /*
      {
        data: {
          cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
          status: "Success"
        }
      }
    */
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          applyAccessConditions();
        }}
      >
        Apply Access Consitions
      </button>
    </div>
  );
}

export default AccessControl;
