// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
contract DownloadNFT is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    ERC721PausableUpgradeable,
    OwnableUpgradeable,
    ERC721BurnableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    uint256 private _nextTokenId;
    event NFTminting(address from, address to, uint256 tokenid);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
       //  _disableInitializers();
    }

    function initialize(address initialOwner) public initializer {
        __ERC721_init("DownloadNFT", "DAPPDN");
        __ERC721URIStorage_init();
        __ERC721Pausable_init();
        __Ownable_init(initialOwner);
        __ERC721Burnable_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public whenNotPaused nonReentrant{
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTminting(msg.sender, to, tokenId);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner whenNotPaused{}

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721Upgradeable, ERC721PausableUpgradeable)
        whenNotPaused
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        whenNotPaused
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        whenNotPaused
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

// pragma solidity ^0.8.17;

// import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

// contract DownloadNFT is
//     Initializable,
//     ERC721Upgradeable,
//     ERC721EnumerableUpgradeable,
//     ERC721URIStorageUpgradeable,
//     ERC721PausableUpgradeable,
//     OwnableUpgradeable,
//     ERC721BurnableUpgradeable,
//     UUPSUpgradeable
// {
//     using CountersUpgradeable for CountersUpgradeable.Counter;

//     CountersUpgradeable.Counter private _tokenIdCounter;

//     event NFTminting(address from, address to, uint256 tokenid);

//     // /// @custom:oz-upgrades-unsafe-allow constructor
//     // constructor() {
//     //     _disableInitializers();
//     // }

//     function initialize() public initializer {
//         __ERC721_init("DownloadNFT", "DPDN");
//         __ERC721Enumerable_init();
//         __ERC721URIStorage_init();
//         __Pausable_init();
//         __Ownable_init();
//         __ERC721Burnable_init();
//         __UUPSUpgradeable_init();
//     }

//     function pause() public onlyOwner {
//         _pause();
//     }

//     function unpause() public onlyOwner {
//         _unpause();
//     }

//     function safeMint(address to, string memory uri) public payable {
//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();
//         _safeMint(to, tokenId);
//         _setTokenURI(tokenId, uri);
//         emit NFTminting(msg.sender, to, tokenId);
//     }

//     function _beforeTokenTransfer(
//         address from,
//         address to,
//         uint256 tokenId,
//         uint256 batchSize
//     )
//         internal
//         override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
//         whenNotPaused
//     {
//         super._beforeTokenTransfer(from, to, tokenId, batchSize);
//     }

//     function _authorizeUpgrade(
//         address newImplementation
//     ) internal override onlyOwner {}

//     // The following functions are overrides required by Solidity.

//     function _burn(
//         uint256 tokenId
//     ) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
//         super._burn(tokenId);
//     }

//     function tokenURI(
//         uint256 tokenId
//     )
//         public
//         view
//         override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
//         returns (string memory)
//     {
//         return super.tokenURI(tokenId);
//     }

//     function supportsInterface(
//         bytes4 interfaceId
//     )
//         public
//         view
//         override(
//             ERC721Upgradeable,
//             ERC721EnumerableUpgradeable,
//             ERC721URIStorageUpgradeable
//         )
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }
// }
