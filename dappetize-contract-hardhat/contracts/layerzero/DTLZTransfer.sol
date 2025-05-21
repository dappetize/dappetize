// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "../lzApp/NonblockingLzApp.sol";
import "./../Interfaces/IDappetizeToken.sol";
import "./../DappetizeToken/DappetizeToken.sol";
import "./../DappetizeAppContract/AppContract.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title A LayerZero example sending a cross chain message from a source chain to a destination chain to increment a counter
contract DTLZTransfer is NonblockingLzApp ,ReentrancyGuard {
    // bytes public constant PAYLOAD = "\x01\x02\x03\x04";
    // uint public counter;

    event RecieveLogEvent(
        string message,
        uint256 tokenValue,
        address desTokenContractAddress,
        address srcAddress
    );
    event BuyAppEvent(
        string message,
        uint256 tokenValue,
        address desTokenContractAddress,
        address srcAddress,
        address desContractAddress
    );
    event LogEvent(string message);

    constructor(
        address _lzEndpoint,
        address initialOwner
    ) Ownable(initialOwner) NonblockingLzApp(_lzEndpoint) {}

    function _nonblockingLzReceive (
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 /*_nonce*/,
        bytes memory _payload
    ) internal override nonReentrant {
        // counter += 1;

        (
            uint256 tokenValue,
            address desTokenContractAddress,
            address desContractAddress
        ) = abi.decode(_payload, (uint256, address, address));
        emit RecieveLogEvent(
            "Recieved",
            tokenValue,
            desTokenContractAddress,
            bytesToAddress(_srcAddress)
        );
        IDappetizeToken dappetizeToken = IDappetizeToken(
            desTokenContractAddress
        );
        dappetizeToken.lzMint(bytesToAddress(_srcAddress), tokenValue);
        AppContract appContract = AppContract(desContractAddress);
        appContract.buy(addressToString(desContractAddress));
        emit BuyAppEvent(
            "Buy App Successfully",
            tokenValue,
            desTokenContractAddress,
            bytesToAddress(_srcAddress),
            desContractAddress
        );
    }

    function addressToString(
        address _addr
    ) public pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes20 value = bytes20(_addr);
        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i] & 0x0f)];
        }
        return string(str);
    }

    function bytesToAddress(
        bytes memory _srcAddress
    ) private pure returns (address) {
        require(_srcAddress.length == 20, "Invalid address length");
        address addr;
        assembly {
            addr := mload(add(_srcAddress, 0x14))
        }
        return addr;
    }

    function estimateFee(
        uint16 _dstChainId,
        bool _useZro,
        bytes calldata _adapterParams,
        uint256 tokenValue,
        address desTokenContractAddress,
        address desContractAddress
    ) public view returns (uint nativeFee, uint zroFee) {
        bytes memory payload = abi.encode(
            tokenValue,
            desTokenContractAddress,
            desContractAddress
        );
        return
            lzEndpoint.estimateFees(
                _dstChainId,
                address(this),
                payload,
                _useZro,
                _adapterParams
            );
    }

    //Token value == token * decimal
    // function sendToken(
    //     uint16 _dstChainId,
    //     uint256 tokenValue,
    //     address srcTokenContractAddress,
    //     address desTokenContractAddress,
    //     address desContractAddress
    // ) public payable {
    //     // encode the payload
    //     bytes memory payload = abi.encode(
    //         tokenValue,
    //         desTokenContractAddress,
    //         desContractAddress
    //     );
    //     IDappetizeToken dappetizeToken = IDappetizeToken(
    //         srcTokenContractAddress
    //     );
    //     require(
    //         dappetizeToken.balanceOf(msg.sender) >= tokenValue,
    //         "Not Enough Tokens!"
    //     );
    //     dappetizeToken.lzBurn(msg.sender, tokenValue);

    //     _lzSend(
    //         _dstChainId,
    //         payload,
    //         payable(msg.sender),
    //         address(0x0),
    //         bytes(""),
    //         msg.value
    //     );
    // }

    //Token value == token * decimal
    function sendToken(
        uint16 _dstChainId,
        uint256 tokenValue,
        address srcTokenContractAddress,
        address desTokenContractAddress,
        address desContractAddress
    ) public payable nonReentrant{
        // encode the payload
        emit LogEvent("first line 1");
        bytes memory payload = abi.encode(
            tokenValue,
            desTokenContractAddress,
            desContractAddress
        );

        emit LogEvent("first line 2");

        IDappetizeToken dappetizeToken = IDappetizeToken(
            srcTokenContractAddress
        );

        emit LogEvent("first line 3");

        require(
            dappetizeToken.balanceOf(msg.sender) >= tokenValue,
            "Not Enough Tokens!"
        );
        emit LogEvent("first line 4");

        dappetizeToken.lzBurn(msg.sender, tokenValue);
        emit LogEvent("first line 5");

        _lzSend(
            _dstChainId,
            payload,
            payable(msg.sender),
            address(0x0),
            bytes(""),
            msg.value
        );
        emit LogEvent("first line 6");
    }
}
