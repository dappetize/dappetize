// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDappetizeToken is IERC20 {
    function lzMint(address to, uint256 amount) external;

    function lzBurn(address burnAddress, uint256 amount) external;
}
