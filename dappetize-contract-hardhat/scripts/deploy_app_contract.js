/**
 This is Script for sample app contract for default usage
 
 * 
 */

const { ethers, upgrades, network } = require("hardhat");
const path = require("path");
const fs = require("fs");
const util = require("util");
const className = "AppContract";
let networkName = "";
// const SLICES = 8;
async function main() {
  console.log("Current Network:", network.name);
  if (network.name == "goerli") networkName = "Goerli";
  else if (network.name == "mumbai") networkName = "Mumbai";
  else if (network.name == "sepolia") networkName = "Sepolia";
  else if (network.name == "amoy") networkName = "Amoy";
  else if (network.name == "holesky") networkName = "Holesky";
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "get contract option",
    getContractAddress(networkName, "ContractOptions")
  );

  AppContract = await ethers.getContractFactory(className);
  console.log("Deploying AppContract...");
  appContract = await AppContract.deploy(
    0, // _appPrice
    "first", // appname
    deployer.address, //payable appOwner
    getContractAddress(networkName, "ContractOptions"), //_ContractOptionsAddress
    deployer.address, // payable _manager
    getContractAddress(networkName, "DappetizeToken"), //_DappetizeTokenAddress
    getContractAddress(networkName, "DownloadNFT") //_DownloadNFTAddress
  );

  console.log("Proxy AppContract deployed to:", appContract.address);
  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeAppContract/AppContract.sol/contractAddress.txt"
  );
  address = appContract.address;
  fs.writeFile(dir, address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/AppContract.txt"
  );
  fs.writeFile(dir, appContract.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/web3.js");
//   let content = `import Web3 from 'web3';
// let web3 = null;
// if (process.client)
//     web3 = new Web3(window.web3.currentProvider);
// export default web3;`;
//   fs.writeFile(web3Dir, content, (err) => {
//     if (err) {
//       console.error(err);
//     }
//     // file written successfully
//   });

  // create abi file
  abiDir = path.resolve(
    __dirname,
    "./../../web3/" + networkName + "/app-contract.js"
  );
  contentABI = `
    
        // The address of the smart contract to call.
        // dappetize token abi
        const appContractAddress${networkName} = '${address}';
        const appContractAbi${networkName} =${getTheAbi()};

        export { appContractAddress${networkName}, appContractAbi${networkName}  }
       
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}

const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "./../artifacts/contracts/DappetizeAppContract/AppContract.sol/" +
        className +
        ".json"
    );
    const file = fs.readFileSync(dir, "utf8");
    const json = JSON.parse(file);
    const abi = json.abi;
    // console.log(`abi`, abi)
    return util.inspect(abi, { depth: null });
  } catch (e) {
    console.log(`e`, e);
  }
};
const getContractAddress = (contractNetwork, contractClassName) => {
  try {
    const dir = path.resolve(
      __dirname,
      "./../contracts_info/" +
        contractNetwork +
        "/" +
        contractClassName +
        ".txt"
    );
    const file = fs.readFileSync(dir, "utf8");
    return file;
    // const json = JSON.parse(file)
    // const abi = json.abi
    // console.log(`abi`, abi)
    // return util.inspect(abi, { depth: null })
  } catch (e) {
    console.log(`e`, e);
  }
};

main();
