// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";


contract Split is PaymentSplitter {
    address payable[] public  payees;
    uint256[] public shares_;
    address public owner;
    string public colabwith;
    // uint256 public startTime;
    // uint256 public endTime;
    uint256 public constant BASE_AMOUNT = 0.05 ether;
    string private metadataURI;
    constructor (
        address payable[] memory _payees,
        uint256[] memory _shares,
        string memory _colabwith,
        // uint256 _startTime,
        // uint256 _endTime,
        string memory _metadataURI
    ) payable
        PaymentSplitter(convertToAddress(_payees), _shares)
    {
        payees = _payees;
        shares_ = _shares;
        owner = msg.sender;
        colabwith = _colabwith;
        // startTime = _startTime;
        // endTime = _endTime;
        metadataURI= _metadataURI;
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

    receive() external payable override {
        // require(block.timestamp >= startTime && block.timestamp <= endTime, "Funds can only be accepted between the specified time period");
        if (msg.value >= BASE_AMOUNT) {
            MyToken tokenContract = MyToken(0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B); // Replace with the address of the MyToken contract
            tokenContract.safeMint(msg.sender, metadataURI);
        }
    }
    
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


contract MyToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public totalMints;
    bool public unique;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalMints,
        bool _unique

    ) ERC721(_name, _symbol) {
        totalMints = _totalMints;
        unique= _unique;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        if(unique){
            require(balanceOf(to) == 0 , "already has a token");
        }
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < totalMints, "MyToken: Maximum number of tokens minted");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}