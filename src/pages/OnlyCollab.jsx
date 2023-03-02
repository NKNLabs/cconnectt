import React, {  useState } from "react";
import { ethers } from "ethers";
import "./form.css"


import { connectingWithContractTEST } from "../Utils/apiFeature";

const OnlyCollab = () => {


  const [loading, setLoading] = useState(false);

  const [formParamsdetail, updateFormParamsdetail] = useState({
    colabname: "",
    address: [],
    url: [],
    fee: "",
  });

  async function registerCandidate() {
    
    const colabname = formParamsdetail.colabname; 
    const addresses = formParamsdetail.address; 
    const fees = formParamsdetail.fee; 

    const contract = await connectingWithContractTEST();
    
    const getCreatedUser = await contract.OnlyOwnerInherit({
      _payees:addresses,
      _shares:fees,
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
