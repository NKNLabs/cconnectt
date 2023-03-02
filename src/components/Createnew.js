import React from "react";
import { Button } from "react-bootstrap";
import "./button.css"
const Createnew = () => {
  return (
    <div>
      <style>
       
      </style>
      <div>Create a New Collab</div>
      {/* <button
        type="button"
        className="btn btn-outline-light btn-square-md"
        data-mdb-ripple-color="dark"
      >
        Only Collab
      </button>
      <button
        type="button"
        className="btn btn-outline-info btn-square-md"
        data-mdb-ripple-color="dark"
      >
        Collab with NFT Collection
      </button> */}
      <div className="row gh row-cols-1 row-cols-md-4 g-4">
        <div className="container">
          <input type="Button" className="bt" value="Create new"/>
        </div>
        
        <div className="container">
        <input type="Button" class="bt" value="Collab with NFT collection"/>
       
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Createnew;
