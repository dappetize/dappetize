// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./../Interfaces/IDappetizeTokenERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract AppContract is Pausable , Ownable ,ReentrancyGuard{
    IERC20 public dappetizeToken;
    IDappetizeTokenERC721 public dappetizeDownloadNFT;
    mapping(address => bool) public purchasers;

    uint256 private appPrice;
    uint256 private tokenBalance = 0;
    uint256 private scoreSum;
    uint256 private scoreCount;
    mapping(address => uint256) private appDownloadCount;
    uint256 private siteFee;
    address payable private applicationOwner;
    address private ContractOptionsAddress;
    address payable private dappetizeWalletAddress;
    address private DownloadNFTAddress;
    address private DappetizeTokenAddress;
    string private appInfo;
    event successfulWithdraw(bool TransferToDappetize, bool TransferToOwner);
    event buyEvent(bool tokenTransfered, uint256 downloadNumber);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(
        uint256 _appPrice,
        string memory appName,
        address payable appOwner,
        address _ContractOptionsAddress,
        address payable _dappetizeWalletAddress, // Account of Dappetize Manager
        address _DappetizeTokenAddress, // DT Contract Address
        address _DownloadNFTAddress
    ) Ownable(_dappetizeWalletAddress){
        appPrice = _appPrice;
        appInfo = appName;
        applicationOwner = appOwner;
        ContractOptionsAddress = _ContractOptionsAddress;
        dappetizeWalletAddress = _dappetizeWalletAddress;
        DappetizeTokenAddress = _DappetizeTokenAddress;
        DownloadNFTAddress = _DownloadNFTAddress;
        dappetizeToken = IERC20(DappetizeTokenAddress);
        dappetizeDownloadNFT = IDappetizeTokenERC721(DownloadNFTAddress);
        // dappetizeToken.approve(address(this), 10000);
    }

    modifier OwnerRestricted() {
        require(msg.sender == applicationOwner);
        _;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    function getAppInfo() public view returns (string memory) {
        return appInfo;
    }

    function setAppInfo(
        string memory info
    ) public OwnerRestricted returns (string memory) {
        appInfo = info;
        return appInfo;
    }

    function setAppPrice(
        uint256 newPrice
    ) public OwnerRestricted returns (uint256) {
        appPrice = newPrice;
        return appPrice;
    }

    function getAppPrice() public view returns (uint256) {
        return appPrice;
    }

    function setScore(uint256 score) public returns (uint256, uint256) {
        require(
            verifyPurchase(msg.sender) == true && 1 <= score && score <= 5,
            "invalid user or incorrect score"
        );
        scoreSum = score + scoreSum;
        scoreCount = scoreCount + 1;
        return (scoreSum, scoreCount);
    }

    function getScore() public view returns (uint256, uint256) {
        return (scoreSum, scoreCount);
    }

    function withdraw() public payable whenNotPaused nonReentrant{
        (bool success, bytes memory data) = ContractOptionsAddress.call(
            abi.encodeWithSignature("getSiteFee()")
        );

        if (success) {
            siteFee = abi.decode(data, (uint256));
            dappetizeWalletAddress.transfer(
                (address(this).balance * siteFee) / 100
            );
            applicationOwner.transfer(address(this).balance);
            (bool success1, bytes memory data1) = DappetizeTokenAddress.call(
                abi.encodeWithSignature(
                    "transferToken(address,address,uint256)",
                    address(this),
                    dappetizeWalletAddress,
                    (tokenBalance * siteFee) / 100
                )
            );

            (bool success2, bytes memory data2) = DappetizeTokenAddress.call(
                abi.encodeWithSignature(
                    "transferToken(address,address,uint256)",
                    address(this),
                    applicationOwner,
                    (tokenBalance * (100 - siteFee)) / 100
                )
            );
            emit successfulWithdraw(success1, success2);
        }
    }

    // uri: Address of app contract that user want to buy
    function buy(string memory uri) public whenNotPaused nonReentrant{
        console.log("enter to buy");

        if (!verifyPurchase(msg.sender)) {
            // Check that the buyer has enough tokens

//  (bool success2, bytes memory data2) = DappetizeTokenAddress.call(abi.encodeWithSignature("balanceOf(address)",msg.sender));
                
//                 uint256 balance;
//                balance= abi.decode( data2, (uint256));
//            require(balance >= appPrice,"Not enough tokens");     

             require(dappetizeToken.balanceOf(msg.sender) >= appPrice,"Not enough tokens");
                
            
            // console.log(appPrice);

            // Transfer the tokens from the buyer to the owner
            dappetizeToken.transferFrom(msg.sender, address(this), appPrice);

            // Mint download nft for user allow to download
            dappetizeDownloadNFT.safeMint(msg.sender, uri);

            // Record the purchase
            purchasers[msg.sender] = true;

            // User Count Number for App
            appDownloadCount[msg.sender] = 0;
        }

        appDownloadCount[msg.sender]++;

        require(
            (appDownloadCount[msg.sender] <= 20),
           
        );
        emit buyEvent(purchasers[msg.sender], appDownloadCount[msg.sender]);
    }

    function verifyPurchase(address _user) public view whenNotPaused  returns (bool) {
        return purchasers[_user];
    }
}
