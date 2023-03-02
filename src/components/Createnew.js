import React from "react";
import { Button } from "react-bootstrap";
import "./button.css"
const Createnew = () => {
  return (
    <div>
      <style>
       
      </style>
      <div>Create a New Collab</div>
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
