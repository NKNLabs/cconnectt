require("dotenv").config();
const key = process.env.REACT_APP_LIGHTHOUSE_KEY;
const lighthouse = require('@lighthouse-web3/sdk');

const deploy = async() =>{
  const path = "img-1.jpg"; //Give path to the file 
  const apiKey = key; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  // Both file and folder supported by upload function
  const response = await lighthouse.upload(path, apiKey);
  
  // Display response
  console.log(response);
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash);
}

deploy()