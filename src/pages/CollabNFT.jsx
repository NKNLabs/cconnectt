import React, { useEffect, useState, useContext } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { HealthContext } from "../Context/HealthCareContext";
import '../components/Navbar.css';
// import { useLocation } from "react-router";

//INTERNAL IMPORT
import { connectingWithContractTEST } from "../Utils/apiFeature";

const CollabNFT = () => {
  //   const { getPatientInfo } = useContext(HealthContext);
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    external_url: "",
  });
  
  // const [message, updateMessage] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState(false);

  // const ethers = require("ethers");
  // const location = useLocation();

 

  //Image upload
  const deploy = async (e) => {
    const progressCallback = (progressData) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      console.log(percentageDone);
    };
    try {
      const output = await lighthouse.upload(
        e,
        "c8d9514a-63a8-4f3b-bbcd-7626577c9ccb",
        progressCallback
      );
      // console.log("https://ipfs.io/ipfs/" + output.data.Hash);
      setFileURL("https://ipfs.io/ipfs/" + output.data.Hash);
      // console.log(fileURL);
    } catch (e) {
      // console.log("Error during file upload", e);
    }
  };

  //////Json Metadata
  const uploadText = async (e) => {
    const apiKey = "c8d9514a-63a8-4f3b-bbcd-7626577c9ccb";
    const response = await lighthouse.uploadText(e, apiKey);
    // console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash);
    return response;
    // console.log(response);
  };

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description,external_url } = formParams;
    if (!name || !description || !fileURL || !external_url ) return;

    // console.log(name)
    // console.log(description)
    // console.log(external_url)
    const nftJSON = {
      name,
      description,
      external_url,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadText(JSON.stringify(nftJSON));
      // console.log("Uploaded JSON to Lighthouse: ", response)
      return response;
    } catch (e) {
      // console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();
    let rr=document.getElementById("te")
    rr.innerHTML="Go to the console and get your metadata"
    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      // updateMessage("https://ipfs.io/ipfs/" + metadataURL.data.Hash)
      console.log("Visit at: https://ipfs.io/ipfs/" + metadataURL.data.Hash);
    } catch (e) {
      // alert("Upload error" + e);
    }
  }

  useEffect(() => {
    uploadMetadataToIPFS();
  }, []);

  const [formParamsdetail, updateFormParamsdetail] = useState({
    colabname: "",
    address: [],
    fee: [],
    State: ""
  });

  async function registerCandidate() {
  

    const colabname = formParamsdetail.colabname; 
    const addresses = formParamsdetail.address; 
    const fees = formParamsdetail.fee; 
    
   
    // console.log(colabname)
    // console.log(addresses)
    // console.log(fees)

    const contract = await connectingWithContractTEST();
    
    const getCreatedUser = await contract.createTask({
      
      // _payees: addresses,
      // _shares:fees,
      _content:colabname
    });

      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
}


  return (
    <div class="form">
      <div class="box2">
    <div>
      <div className="App"></div>
      <div className="flex flex-col place-items-center mt-10" id="nftForm">
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className=" fgg text-center font-bold  mb-8">
            Upload your NFT to the IPFS & GET your CID Link
          </h3>
          <div className="mb-4">
            <label
              className="fg block text-purple-500 text-sm font-bold mb-2"
              htmlFor="name"
            >
              NFT Name
            </label>
            <input
              className="textt shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name of Your Collection"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            ></input>
          </div>

          <div className="mb-6">
            <label
              className="fg col-sm-2 col-form-label"
              htmlFor="description"
            >
              NFT Description
            </label>
            <textarea
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Any Description"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            ></textarea>
          </div>
                <div className="form-group row ">
                  <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label"
                  >
                    Enter MetaData URL:
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="external_url"
                      type="text"
                      className="textt form-control"
                      placeholder="EXTERNAL URL"
                      onChange={(e) =>
                        updateFormParams({
                          ...formParams,
                          external_url: e.target.value,
                        })
                      }
                      value={formParams.external_url}
                    />
                  </div>
                </div>
          <div>
            <label
              className="fg block text-purple-500 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input class="kl"onChange={(e) => deploy(e)} type={"file"} />
          </div>
          <br></br>
          <button type="button"
            onClick={listNFT}
            className="btyn font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
          >
            Submit
          </button>
          <div id="te"></div>
        </form>
      </div>
</div>
</div>
<div class="box2">
      {/* //////////////////////////////////////// */}
      <div className="flex flex-col place-items-center mt-10" id="nftForm">
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <div>
            {/* <div>CollabNFT</div> */}
            <div>
              <form>
                <div className="form-group row">
                  <label for="inputEmail3" className="fg col-sm-2 col-form-label">
                    Colab with Address:
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="addresses"
                      type="text"
                      className="textt form-control"
                      placeholder="Address"
                      onChange={(e) =>
                        updateFormParamsdetail({
                          ...formParamsdetail,
                          address: e.target.value,
                        })
                      }
                      value={formParamsdetail.address}
                    />
                  </div>
                </div>
                <div className="form-group row ">
                  <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label"
                  >
                    Colab with Company Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="colabname"
                      type="text"
                      className="textt form-control"
                      placeholder="Name"
                      onChange={(e) =>
                        updateFormParamsdetail({
                          ...formParamsdetail,
                          colabname: e.target.value,
                        })
                      }
                      value={formParamsdetail.colabname}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label marg"
                  >
                    Fee:
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="fee"
                      type="text"
                      className="textt form-control"
                      
                      
                      placeholder="FEE"

                      onChange={(e) =>
                        updateFormParamsdetail({
                          ...formParamsdetail,
                          fee: e.target.value,
                        })
                      }
                      value={formParamsdetail.fee}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label"
                  >
                    State:
                  </label>
                  <div className="col-sm-10">
                    <input
                      id=""
                      type="text"
                      className="textt form-control"
                      
                      
                      placeholder="TRUE or FALSE"

                      onChange={(e) =>
                        updateFormParamsdetail({
                          ...formParamsdetail,
                          State: e.target.value,
                        })
                      }
                      value={formParamsdetail.State}
                    />
                  </div>
                </div>
                <br></br>
                <button type="button"
                  onClick={() =>
                    registerCandidate()}
                  className="btyn font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CollabNFT;



  // //Image upload
  // const deploy = async (e) => {
  //       const progressCallback = (progressData) => {
  //         let percentageDone =
  //           100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  //         console.log(percentageDone);
  //       };
  //       try {
  //       const output = await lighthouse.upload(e,"90c1ad4b-9f3b-4805-a9d7-48b7be76e28c",progressCallback);
  //           // console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  //           setFileURL("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  //       } catch (e) {
  //       console.log("Error during file upload", e);
  //       }
  //   };

  //   //////Json Metadata
  //   const uploadText = async (e) => {
  //       const apiKey = "90c1ad4b-9f3b-4805-a9d7-48b7be76e28c";
  //       const response = await lighthouse.uploadText(e, apiKey);
  //       return  response;
  //       // console.log(response);
  //       // console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash);
  //   };

  //   //This function uploads the metadata to IPFS
  //   async function uploadMetadataToIPFS() {
  //       const {name, description} = formParams;
  //       if( !name || !description || !fileURL)
  //           return;

  //       const nftJSON = {
  //           name, description, image: fileURL
  //       }

  //       try {
  //           //upload the metadata JSON to IPFS
  //           const response = await uploadText(JSON.stringify(nftJSON));
  //               // console.log("Uploaded JSON to Lighthouse: ", response)
  //               return (response);
  //       }
  //       catch(e) {
  //           console.log("error uploading JSON metadata:", e)
  //       }
  //   }

  //   async function listNFT(e) {
  //       e.preventDefault();

  //       //Upload data to IPFS
  //       try {
  //           const metadataURL = await uploadMetadataToIPFS();
  //           console.log("https://gateway.lighthouse.storage/ipfs/" + metadataURL.data.Hash);
  //           // const provider = new ethers.providers.Web3Provider(window.ethereum);
  //           // const signer = provider.getSigner();
  //           // updateMessage("Please wait.. uploading (upto 5 mins)")

  //           // let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

  //           // let transaction = await contract.tokenURI(metadataURL)
  //           // await transaction.wait()

  //           // alert("Successfully listed your NFT!");
  //           // updateMessage("");
  //           // updateFormParams({ name: '', description: '', price: ''});
  //           // window.location.replace("/")
  //       }
  //       catch(e) {
  //           alert( "Upload error"+e )
  //       }
  //   }

  //   // useEffect(() => {
  //   //     uploadMetadataToIPFS();
  //   //       // getDostorInfo();
  //   //     //   listNFT();
  //   //     }, []);
