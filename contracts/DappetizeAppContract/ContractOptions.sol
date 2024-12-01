// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ContractOptions is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 private siteFee;
    event valueOfSiteFee(uint256 siteFee);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
     //   _disableInitializers();
    }

    function initialize(
        uint256 _siteFeePercent,
        address initialOwner
    ) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();

        require(
            0 <= _siteFeePercent && _siteFeePercent <= 25,
            "invalid number"
        );
        siteFee = _siteFeePercent;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function setSiteFeePercent(uint256 fee) public onlyOwner {
        require(0 <= fee && fee <= 25, "invalid number");
        siteFee = fee;
        emit valueOfSiteFee(siteFee);

    }

    function getSiteFeePercent() public view returns (uint256) {
        return siteFee;
    }
}
