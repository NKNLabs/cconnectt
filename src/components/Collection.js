import React, { useContext, useEffect, useState } from "react";


// INTERNAL IMPORT
import { HealthContext } from "../Context/HealthCareContext";

const Collection = () => {
  const { nftcolabName, nftaddresses, totalMints, tokenIdCounter,dataa } =
    useContext(HealthContext);

  return (
    <div>
      <div>Collection</div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div>
          <div className="row g-0">``
            <div className="col-md-4">
              <img src={dataa.image} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Colab With {nftcolabName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Collection Name : {dataa.name}
                </h6>
                <p className="card-text">
                  Description: {dataa.description}
                </p>
                <p className="card-text">
                  Address: {nftaddresses[0]}, {nftaddresses[1]}
                </p>
                <p className="list-group-item">
                  {" "}
                  Minted NFTs: {tokenIdCounter} Out of Total Mints Available:{" "}
                  {totalMints}
                </p>
              </div>
            </div>
          </div>
        </div>      </div>
    </div>
  );
};

export default Collection;
