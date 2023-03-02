import React, {  useState } from "react";
// import { useAddress } from "@thirdweb-dev/react";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import { HealthContext } from "../Context/HealthCareContext";
// // import { HealthContext } from "../Context/HealthCareContext";
import { ethers } from "ethers";
import "./form.css"


import { connectingWithContractTEST } from "../Utils/apiFeature";

const OnlyCollab = () => {
  // const {utils} = ethers;


  const [loading, setLoading] = useState(false);

  const [formParamsdetail, updateFormParamsdetail] = useState({
    colabname: "",
    address: [],
    url: [],
    fee: "",
  });

  async function registerCandidate() {
    // e.preventDefault();
    // console.log("handle request ");

    // get the name from formdata
    
    const colabname = formParamsdetail.colabname; 
    const addresses = formParamsdetail.address; 
    const fees = formParamsdetail.fee; 
    // const addressArray = addresses.map((address)=>{utils.getAddress(address)});
    // const encodeArray = ethers.utils.defaultAbiCoder.encode(["uint256[]"],[fees])
    // console.log(colabname)
    // console.log(addresses)
    // console.log(fees)
    // console.log(fees.parseInt());
    // const colabname = formParamsdetail.colabname; 

    const contract = await connectingWithContractTEST();
    
    const getCreatedUser = await contract.createTask({
      // // addresses,fees,colabname
      // _payees:addresses,
      // // _shares:fees.toFormat,
      // _shares:FixedNumber.fromString(fees, number),
      // _colabwith:colabname
      // _payees:["0x1aE421797858aD2E4a0EcaaA7c464f03d59C91f1","0x6271A735BCEcA1236113039Bd4a429Bab72193dC"],
      // _shares:[35,65],
      // _colabwith:"ljdfsadlj"
      // _payees:addresses,
      // _shares:fees,
      _colabwith:colabname
    });

      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
}

  return (
    <div class="form">
    <div class="box">
    <div  id="nftForm">
        <form >
          <div>
            {/* <div>CollabNFT</div> */}
            <div>
              <form>
                <div className="form-group row">
                  <label for="inputEmail3" className="fg col-sm-2 col-form-label">
                    Colab with Address:
                  </label>
                  <div className="col-sm-10 cen">
                    <input
                      id="addresses"
                      type="text"
                      className="textt"
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
                  <div className="col-sm-10 cen">
                    <input
                      id="colabname"
                      type="text"
                      className="textt"
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
                <div className="form-group row ">
                  <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label"
                  >
                    Enter External URL:
                  </label>
                  <div className="col-sm-10 cen">
                    <input
                      id="url"
                      type="text"
                      className="textt"
                      placeholder="Enter URL"
                      onChange={(e) =>
                        updateFormParamsdetail({
                          ...formParamsdetail,
                          url: e.target.value,
                        })
                      }
                      value={formParamsdetail.url}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label"
                  >
                    Fee:
                  </label>
                  <div className="col-sm-10 cen">
                    <input
                      id="fee"
                      type="text"
                      className="texttt"
                      placeholder="FEE"
                      onChange={(e) =>
                        updateFormParamsdetail({
                          ...formParamsdetail,
                          fee: e.target.value,
                        })
                      }
                      value={formParamsdetail.fee}
                    />
                    <label
                    for="inputPassword3"
                    className="fg col-sm-2 col-form-label"
                  >Percent</label>
                  </div>
                  
                
                </div>
                <br></br>
                <button type="button"
                  onClick={() =>
                    registerCandidate()}
                  className="btyn"
                >
                  Submit
                </button>
                {/* <button
                  onClick={Test({
                    add: formParamsdetail.address,
                    fees: formParamsdetail.fee,
                    name: formParamsdetail.colabname,
                  })}
                  className=""
                >
                  Submit
                </button> */}
              </form>
            </div>
          </div>
        </form>
    </div>
    </div>
    </div>
  );
};

export default OnlyCollab;
