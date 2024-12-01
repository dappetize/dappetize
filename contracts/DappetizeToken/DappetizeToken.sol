// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "hardhat/console.sol";

contract DappetizeToken is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    ERC20PausableUpgradeable,
    OwnableUpgradeable,
    ERC20PermitUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    address private lzAddress;
    event LogEvent(address message);


  

    function initialize(
        address initialOwner,
        uint256 initialSupply,
        address _lzAddress
    ) public initializer {
        __ERC20_init("Dappetize", "DAPP");
        __ERC20Burnable_init();
        __ERC20Pausable_init();
        __Ownable_init(initialOwner);
        __ERC20Permit_init("Dappetize");
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        lzAddress = _lzAddress;
    
        // Mint the initial total supply to the initialOwner
        // _mint(initialOwner, initialSupply);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner whenNotPaused nonReentrant{
        _mint(to, amount);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override whenNotPaused onlyOwner {}

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256 value
    ) internal whenNotPaused override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        super._update(from, to, value);
    }

    /*
    1. Wallets like MetaMask will automatically account for the decimals value to display
     the correct token amount to the user. So if the user holds 1000000 (raw units) of your token, 
     MetaMask will display 1.000000 DT to the user.
    2. When sending or interacting with the contract programmatically, you need to account for the decimal
     places. If you want to send 1 DT using a script or DApp, you'll need to send 1000000 units.
    */
    // Overriding decimals function to return 6
    function decimals() public view virtual override  whenNotPaused returns (uint8) {
        return 6;
    }

    function lzMint(address to, uint256 amount) public nonReentrant {
        require(lzAddress == msg.sender, "you have not permission!");
        _mint(to, amount);
    }

 

    function lzBurn(
        address burnAddress,
        uint256 amount
    ) public nonReentrant {
        emit LogEvent(msg.sender) ;
        emit LogEvent(lzAddress) ;
        emit LogEvent(burnAddress) ;
        require(lzAddress == msg.sender, "you have not permission!");
        _burn(burnAddress, amount);
     
    }
}

// pragma solidity ^0.8.17;

// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// contract DappetizeToken is
//     Initializable,
//     ERC20Upgradeable,
//     ERC20BurnableUpgradeable,
//     PausableUpgradeable,
//     OwnableUpgradeable,
//     UUPSUpgradeable
// {
//     address private lzAddress;

//     /// @custom:oz-upgrades-unsafe-allow constructor
//     constructor(address _lzAddress) {
//         address lzAddress = _lzAddress;

//         // _disableInitializers();
//     }

//     function initialize(uint totalSupply) public initializer {
//         __ERC20_init("Dappetize", "DT");
//         __ERC20Burnable_init();
//         __Pausable_init();
//         __Ownable_init();
//         __UUPSUpgradeable_init();
//     }

//     function pause() public onlyOwner {
//         _pause();
//     }

//     function unpause() public onlyOwner {
//         _unpause();
//     }

//     function mint(address to, uint256 amount) public onlyOwner {
//         _mint(to, amount);
//     }

//     function lzMint(address to, uint256 amount) external {
//         require(lzAddress == msg.sender, "you have not permission!");
//         _mint(to, amount);
//     }

//     function lzBurn(address burnAddress, uint256 amount) external {
//         require(lzAddress == msg.sender, "you have not permission!");
//         _burn(burnAddress, amount);
//     }

//     function _beforeTokenTransfer(
//         address from,
//         address to,
//         uint256 amount
//     ) internal override whenNotPaused {
//         super._beforeTokenTransfer(from, to, amount);
//     }

//     function _authorizeUpgrade(
//         address newImplementation
//     ) internal override onlyOwner {}

//     /*
//     1. Wallets like MetaMask will automatically account for the decimals value to display
//      the correct token amount to the user. So if the user holds 1000000 (raw units) of your token,
//      MetaMask will display 1.000000 DT to the user.
//     2. When sending or interacting with the contract programmatically, you need to account for the decimal
//      places. If you want to send 1 DT using a script or DApp, you'll need to send 1000000 units.
//     */
//     // Overriding decimals function to return 6
//     function decimals() public view virtual override returns (uint8) {
//         return 6;
//     }
// }
