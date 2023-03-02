// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Split is PaymentSplitter {
    address payable[] public  payees;
    uint256[] public shares_;
    address public owner;
    string public colabwith;
    uint256 public startTime;
    uint256 public endTime;

    constructor (
        address payable[] memory _payees,
        uint256[] memory _shares,
        string memory _colabwith
        // uint256 _startTime,
        // uint256 _endTime
    ) payable
        PaymentSplitter(convertToAddress(_payees), _shares)
    {
        payees = _payees;
        shares_ = _shares;
        owner = msg.sender;
        colabwith = _colabwith;
        // startTime = _startTime;
        // endTime = _endTime;
    }

    function convertToAddress(address payable[] memory _payees) private pure returns (address[] memory) {
        address[] memory addresses = new address[](_payees.length);
        for (uint i = 0; i < _payees.length; i++) {
            addresses[i] = address(_payees[i]);
        }
        return addresses;
    }

    function releasePayment(address payable payee) internal {
        PaymentSplitter.release(payee);
    }

    function release(address payable payee) public onlyInternal override {
        super.release(payee);
    }

    function release(IERC20 token, address payee) public onlyInternal  override {
        super.release(token,payee);
    }

    modifier onlyInternal() {
        require(msg.sender == address(this), "Function can only be called from within the contract");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function splitFunds() public payable onlyOwner {
        for (uint256 i = 0; i < payees.length; i++) {
            releasePayment(payees[i]);
        }
    }

    receive() external payable override {}
        // require(block.timestamp >= startTime && block.timestamp <= endTime, "Funds can only be accepted between the specified time period");
        // Accept the payment
    function balance() public view returns (uint256){
    return payable(address(this)).balance;
    }

    function getshares_() public view returns (uint256[] memory) {
        return shares_;
    }

    function getpayees() public view returns (address payable[] memory) {
        return payees;
    }

    function releaseplz(address account) public view returns(uint256){
        return PaymentSplitter.releasable(account);
    } 
    
}