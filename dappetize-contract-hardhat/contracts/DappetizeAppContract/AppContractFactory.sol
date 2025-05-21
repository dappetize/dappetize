// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./AppContract.sol";
import "./../DappetizeERC721NFT/DappetizeNFT.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AppContractFactory is Pausable, Ownable ,ReentrancyGuard{
    address payable private manager;
    event createContractAddressEvent(  address);
    mapping(address => AppContract[]) private deployedAppContract;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(address initialOwner) Ownable(initialOwner) {
        manager = payable(msg.sender);
    }
 
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    function createAppContract(
        uint256 appPrice,
        string memory appName,
        address ContractOptionsAddress,
        address DappetizeTokenAddress,
        address NFTContractAddress,
        address DownloadNFTAddress,
        string memory appDetails
    ) public payable whenNotPaused nonReentrant  {
        DappetizeNFT NFT = DappetizeNFT(NFTContractAddress);
        NFT.delegatedMint(msg.sender, appDetails);
        AppContract appContract = new AppContract(
            appPrice,
            appName,
            payable(msg.sender),
            ContractOptionsAddress,
            manager,
            DappetizeTokenAddress,
            DownloadNFTAddress
        );
        deployedAppContract[msg.sender].push(appContract);
        emit createContractAddressEvent( address(appContract));
    }

    function getdeployedAppContractAddress(
        address _address
    )   public view whenNotPaused returns (AppContract[] memory) {
        return (deployedAppContract[_address]);
    }
}
