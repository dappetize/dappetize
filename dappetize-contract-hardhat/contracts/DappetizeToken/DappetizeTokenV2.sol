// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.17;
// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// //  ERC20VotesUpgradeable,
// contract DappetizeTokenV2 is
//     Initializable,
//     ERC20Upgradeable,
//     ERC20BurnableUpgradeable,
//     ERC20PausableUpgradeable,
//     AccessControlUpgradeable,
//     ERC20PermitUpgradeable,
//     UUPSUpgradeable
// {
//     bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
//     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
//     bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

//     // function initialize() public initializer {
//     //     __ERC20_init("DappetizeTokenV2", "DPT");
//     //     __ERC20Burnable_init();
//     //     __Pausable_init();
//     //     __AccessControl_init();
//     //     __ERC20Permit_init("DappetizeTokenV2");
//     //     // __ERC20Votes_init();
//     //     __UUPSUpgradeable_init();
//     //     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
//     //     _grantRole(PAUSER_ROLE, msg.sender);
//     //     _mint(msg.sender, 100000000000000000 * 10**decimals());
//     //     _grantRole(MINTER_ROLE, msg.sender);
//     //     _grantRole(UPGRADER_ROLE, msg.sender);
//     // }

//     function pause() public onlyRole(PAUSER_ROLE) {
//         _pause();
//     }

//     function unpause() public onlyRole(PAUSER_ROLE) {
//         _unpause();
//     }

//     function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
//         _mint(to, amount);
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
//     ) internal override onlyRole(UPGRADER_ROLE) {}

//     function hi222222() public {}
//     // function _afterTokenTransfer(
//     //     address from,
//     //     address to,
//     //     uint256 amount
//     // ) internal override(ERC20Upgradeable, ERC20VotesUpgradeable) {
//     //     super._afterTokenTransfer(from, to, amount);
//     // }

//     // function _mint(address to, uint256 amount)
//     //     internal
//     //     override(ERC20Upgradeable, ERC20VotesUpgradeable)
//     // {
//     //     super._mint(to, amount);
//     // }

//     // function _burn(address account, uint256 amount)
//     //     internal
//     //     override(ERC20Upgradeable, ERC20VotesUpgradeable)
//     // {
//     //     super._burn(account, amount);
//     // }
// }
