import React, { useEffect,useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Navbar.css';
const MyVerticallyCenteredModal = (props) => {

    
  const [qrimage, setqrimage] = useState("");

  const fetchQRData = async () => {
    const QRCode = require("qrcode");

    // Replace this with your smart contract address
    // const contractAddress = "0x277EbD1a3878C2800794477047f73e31513aee0c";

    // Generate the URL for the smart contract address
    const url = `ethereum:${props.qradd}`;

    // Generate the QR code
    QRCode.toDataURL(url, function (err, url) {
      if (err) {
        console.error("error is there");
      } else {
        // console.log(url);
        setqrimage(url);
      }
    });
};
useEffect(() => {
  fetchQRData();
}, [])


    
  return (
    <div>
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <h3 className='add'>Address: {props.qradd}</h3>
        </Modal.Title>
      </Modal.Header>
      <div className="qrimg">
      <img className="qr"  src={qrimage} alt="qr" />
      </div>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
    </div>
  )
}

export default MyVerticallyCenteredModal
