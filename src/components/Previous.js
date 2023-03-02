import React,{useContext} from "react";
import "./carousel.css"
// INTERNAL IMPORT
import { HealthContext } from "../Context/HealthCareContext";


const Previous = () => {
  const {
        onlycolabName,
        onlyaddresses,
        onlypercentage,
        onlytotalRevenue,
        onlyyourAmount,
        nftcolabName,
        nftaddresses,
        nftpercentage,
        nfttotalRevenue,
        nftyourAmount,
        totalMints,
        tokenIdCounter,
        Splitting,
        Splittings,
  } = useContext(HealthContext);
  

  return (
   

    <div>
    <div>Previous</div>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div>
        <div className="card border-success mb-3">
          <div className="card-header bg-transparent border-success">
            Colab with {onlycolabName}
          </div>
          <div className="card-body text-success">
            <h5 className="card-title">Address: {onlyaddresses[0]}, {onlyaddresses[1]}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Your Percentage: {onlypercentage[0]}{onlypercentage[1]}%</li>
              <li className="list-group-item">Total Revenue: {onlytotalRevenue} ETH</li>
              <li className="list-group-item">Starts From ....... & Ends on ......</li>
            </ul>
          </div>
          <div className="card-footer bg-transparent border-success"> Your Amount: {onlyyourAmount} ETH</div>
          <button onClick={() => Splittings()}>Split Funds</button>
        </div>
      </div>
      <div>
        <div className="card border-success mb-3">
          <div className="card-header bg-transparent border-success">
            Colab with {nftcolabName}
          </div>
        <div className="card-body text-success">
            <h5 className="card-title">Address: {nftaddresses[0]}, {nftaddresses[1]}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Your Percentage: {nftpercentage[0]}{nftpercentage[1]}%</li>
              <li className="list-group-item">Total Revenue: {nfttotalRevenue} ETH</li>
              <li className="list-group-item"> Minted NFTs: {tokenIdCounter} Out of Total Mint Available: {totalMints}</li>
              <li className="list-group-item">Starts From ....... & Ends on ......</li>
            </ul>
          </div>
          <div className="card-footer bg-transparent border-success"> Your Amount {nftyourAmount} ETH</div>
          <button onClick={() => Splitting()}>Split Funds</button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Previous;


{/* <div class="gallery js-flickity"
  data-flickity-options='{ "wrapAround": true }'>
  <div class="gallery-cell"></div>
  <div class="gallery-cell"></div>
  <div class="gallery-cell"></div>
  <div class="gallery-cell"></div>
  <div class="gallery-cell"></div>
</div> */}