const { ethers, upgrades } = require("hardhat");
const path = require("path");
const fs = require("fs");
const util = require("util");

// const SLICES = 8;
// async function main() {
//     const DappStoreToken = await ethers.getContractFactory("DappStoreToken");
//     console.log("Deploying DappStoreToken...");
//     const dappStoreToken = await upgrades.deployProxy(DappStoreToken,
//         // [10000000000000000000],//input
//         {
//             initializer: "initialize",
//             kind: 'uups',
//         });
//     await dappStoreToken.deployed();
//     console.log("Proxy DappStoreToken deployed to:", dappStoreToken.address);
//     //get contract address
//     const dir = path.resolve(
//         __dirname,
//         "./../artifacts/contracts/DappStoreToken.sol/contractAddress_v2.txt"
//     )
//     const address = dappStoreToken.address;
//     fs.writeFile(dir, address, err => {
//         if (err) {
//             console.error(err);
//         }
//         // file written successfully
//     });

//     // // create web3.js file
//     // const web3Dir = path.resolve(
//     //     __dirname,
//     //     "./../../web3/web3.js"
//     // )
//     // let content = `import Web3 from 'web3';
//     //         console.log(window.web3.currentProvider)
//     //         const web3 = new Web3(window.web3.currentProvider);
//     //     export default web3;`;
//     // fs.writeFile(web3Dir, content, err => {
//     //     if (err) {
//     //         console.error(err);
//     //     }
//     //     // file written successfully
//     // });

//     // // create abi file
//     // const abiDir = path.resolve(
//     //     __dirname,
//     //     "./../../web3/abi.js"
//     // )
//     // let contentABI = `
//     // import web3 from "./web3"
//     //     // The address of the smart contract to call.
//     //     const address = '${address}';
//     //     const abi =${getTheAbi()};
//       // let contract;
//       // if (web3)
//       //     new web3.eth.Contract(abi, address)
//        // else
//        //     null

//       // export { address, abi, web3 }
//       // export default contract
//     // `;
//     // fs.writeFile(abiDir, contentABI, err => {
//     //     if (err) {
//     //         console.error(err);
//     //     }
//     //     // file written successfully
//     // });
// }
const PROXY = "0xf6730F7976A35A80C6d8A6b27116B66c6EF42d2f";

async function main() {
  const PizzaV2 = await ethers.getContractFactory("DappetizeTokenV2");
  console.log("Upgrading DappetizeTokenV2...");
  await upgrades.upgradeProxy(PROXY, PizzaV2);
  console.log("DappetizeTokenV2 upgraded successfully");
}

main();
