const hre = require("hardhat");
const { ethers, upgrades, network } = require("hardhat");
const path = require("path");
const fs = require("fs");
const util = require("util");
const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

// const SLICES = 8;
let networkName = "";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Current Network:", network.name);
  if (network.name == "goerli") networkName = "Goerli";
  else if (network.name == "mumbai") networkName = "Mumbai";
  else if (network.name == "sepolia") networkName = "Sepolia";
  else if (network.name == "amoy") networkName = "Amoy";
  else if (network.name == "holesky") networkName = "Holesky";

  /////////////////////////////// App Contract Factory //////////////////////////////////////////
  className = "AppContractFactory";
  let AppContractFactory = await ethers.getContractFactory(className);
  console.log("Deploying AppContractFactory...");

  const appContractFactory = await AppContractFactory.deploy(deployer.address);
  console.log("AppContractFactory deployed to:", appContractFactory.address);
  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeAppContract/AppContractFactory.sol/contractAddress.txt"
  );
  fs.writeFile(dir, appContractFactory.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/AppContractFactory.txt"
  );
  fs.writeFile(dir, appContractFactory.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/" + networkName + "/web3.js");
//   content = `import Web3 from 'web3';
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
    "./../../web3/" + networkName + "/app-contract-factory.js"
  );
  contentABI = `
        // The address of the smart contract to call.
        // dappetize token abi
        const appContractFactoryAddress${networkName} = '${
    appContractFactory.address
  }';
        const appContractFactoryAbi${networkName} =${getTheAbi(
    "./../artifacts/contracts/DappetizeAppContract/AppContractFactory.sol/" +
      className +
      ".json"
  )};
    

        export { appContractFactoryAddress${networkName}, appContractFactoryAbi${networkName}  }
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  /////////////////////////////// End App Contract Factory //////////////////////////////////////////
  /////////////////////////////// Contract Option //////////////////////////////////////////
  className = "ContractOptions";
  ContractOptions = await ethers.getContractFactory(className);
  console.log("Deploying ContractOptions...");
  const contractOptions = await upgrades.deployProxy(
    ContractOptions,
    [20, deployer.address], // site fee percent
    {
      initializer: "initialize",
      timeout: 600000,
      useDeployedImplementation: false,
      redeployImplementation: "always",
      kind: "uups",
      unsafeAllowRenames: true,
    }
  );
  // console.log(dappetizeToken)
  await contractOptions.deployed();
  console.log("ContractOptions deployed to:", contractOptions.address);
  // console.log("Implementation of ContractOptions deployed to:", await upgrades.erc1967.getImplementationAddress(contractOptions.address));

  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeAppContract/ContractOptions.sol/contractAddress.txt"
  );
  fs.writeFile(dir, contractOptions.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/ContractOptions.txt"
  );
  fs.writeFile(dir, contractOptions.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/web3.js");
//   content = `import Web3 from 'web3';
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
    "./../../web3/" + networkName + "/contract-options.js"
  );
  contentABI = `
   
        // The address of the smart contract to call.
        // dappetize token abi
        const contractOptionsAddress${networkName} = '${
    contractOptions.address
  }';
        const contractOptionsAbi${networkName} =${getTheAbi(
    "./../artifacts/contracts/DappetizeAppContract/ContractOptions.sol/" +
      className +
      ".json"
  )};
       
        export { contractOptionsAddress${networkName}, contractOptionsAbi${networkName}  }
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  ///////////////////////////////  End Contract Option  ///////////////////////////////////////
  ///////////////////////////////  DTLZTransfer  ///////////////////////////////////////
  const endpointAddr = LZ_ENDPOINTS[hre.network.name];
  console.log(
    `Network is: [${hre.network.name}] Endpoint address: ${endpointAddr}`
  );

  className = "DTLZTransfer";
  let DTLZTransfer = await ethers.getContractFactory(className);
  console.log("Deploying DTLZTransfer...");
  const dtlzTransfer = await DTLZTransfer.deploy(
    endpointAddr,
    deployer.address
  );
  console.log("DTLZTransfer deployed to:", dtlzTransfer.address);
  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/layerzero/DTLZTransfer.sol/contractAddress.txt"
  );
  fs.writeFile(dir, dtlzTransfer.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/DTLZTransfer.txt"
  );
  fs.writeFile(dir, dtlzTransfer.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/" + networkName + "/web3.js");
//   content = `import Web3 from 'web3';
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
    "./../../web3/" + networkName + "/dtlz-transfer.js"
  );
  contentABI = `
        // The address of the smart contract to call.
        // dappetize token abi
        const dtlzTransferAddress${networkName} = '${dtlzTransfer.address}';
        const dtlzTransferAbi${networkName} =${getTheAbi(
    "./../artifacts/contracts/layerzero/DTLZTransfer.sol/" + className + ".json"
  )};
       
       
        export { dtlzTransferAddress${networkName}, dtlzTransferAbi${networkName}  }
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  ///////////////////////////////  END DTLZTransfer  ///////////////////////////////////////
  /////////////////////////////// Dappetize Token ///////////////////////////////////////

  className = "DappetizeToken";
  let DappetizeToken = await ethers.getContractFactory(className);
  console.log("Deploying DappetizeToken...");
  const dappetizeToken = await upgrades.deployProxy(
    DappetizeToken,
    [deployer.address, 1e12, dtlzTransfer.address], //initial supply
    {
      initializer: "initialize",
      timeout: 600000,
      useDeployedImplementation: false,
      redeployImplementation: "always",
      kind: "uups",
      unsafeAllowRenames: true,
      // constructorArgs: []
    }
  );
  await dappetizeToken.deployed();
  console.log("dappetizeToken deployed to:", dappetizeToken.address);
  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeToken/DappetizeToken.sol/contractAddress.txt"
  );
  fs.writeFile(dir, dappetizeToken.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/DappetizeToken.txt"
  );
  fs.writeFile(dir, dappetizeToken.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/web3.js");
//   content = `import Web3 from 'web3';
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
    "./../../web3/" + networkName + "/dappetize-token.js"
  );
  contentABI = `
        // The address of the smart contract to call.
        // dappetize token abi
        const dappetizeTokenAddress${networkName} = '${dappetizeToken.address}';
        const dappetizeTokenAbi${networkName} =${getTheAbi(
    "./../artifacts/contracts/DappetizeToken/DappetizeToken.sol/" +
      className +
      ".json"
  )};

        export { dappetizeTokenAddress${networkName}, dappetizeTokenAbi${networkName} }
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  /////////////////////////////// End Dappetize Token  //////////////////////////////////////////
  /////////////////////////////// NFTContract   ///////////////////////////////////////

  className = "DappetizeNFT";
  const DappetizeNFT = await ethers.getContractFactory(className);
  console.log("Deploying DappetizeNFT...");
  const dappetizeNFT = await upgrades.deployProxy(
    DappetizeNFT,
    [deployer.address, appContractFactory.address], //total supply
    {
      initializer: "initialize",
      timeout: 600000,
      useDeployedImplementation: false,
      redeployImplementation: "always",
      kind: "uups",
      unsafeAllowRenames: true,
    }
  );
  await dappetizeNFT.deployed();
  console.log("dappetizeNFT deployed to:", dappetizeNFT.address);
  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeERC721NFT/DappetizeNFT.sol/contractAddress.txt"
  );
  fs.writeFile(dir, dappetizeNFT.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/DappetizeNFT.txt"
  );
  fs.writeFile(dir, dappetizeNFT.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/web3.js");
//   content = `import Web3 from 'web3';
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
    "./../../web3/" + networkName + "/dappetize-nft.js"
  );
  contentABI = `
        // The address of the smart contract to call.
        // dappetize token abi
        const dappetizeNFTAddress${networkName} = '${dappetizeNFT.address}';
        const dappetizeNFTAbi${networkName} =${getTheAbi(
    "./../artifacts/contracts/DappetizeERC721NFT/DappetizeNFT.sol/" +
      className +
      ".json"
  )};

        export { dappetizeNFTAddress${networkName}, dappetizeNFTAbi${networkName}}
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  /////////////////////////////// End NFTContract //////////////////////////////////////////
  /////////////////////////////// DownloadNFT ///////////////////////////////////////

  className = "DownloadNFT";
  const DownloadNFT = await ethers.getContractFactory(className);
  console.log("Deploying DownloadNFT...");
  const downloadNFT = await upgrades.deployProxy(
    DownloadNFT,
    [deployer.address],
    {
      initializer: "initialize",
      timeout: 600000,
      useDeployedImplementation: false,
      redeployImplementation: "always",
      kind: "uups",
      unsafeAllowRenames: true,
    }
  );
  await downloadNFT.deployed();
  console.log("DownloadNFT deployed to:", downloadNFT.address);
  //get contract address
  dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeERC721NFT/DownloadNFT.sol/contractAddress.txt"
  );
  fs.writeFile(dir, downloadNFT.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  dir = path.resolve(
    __dirname,
    "./../contracts_info/" + networkName + "/DownloadNFT.txt"
  );
  fs.writeFile(dir, downloadNFT.address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

//   // create web3.js file
//   web3Dir = path.resolve(__dirname, "./../../web3/web3.js");
//   content = `import Web3 from 'web3';
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
    "./../../web3/" + networkName + "/download-nft.js"
  );
  contentABI = `
        // The address of the smart contract to call.
        // dappetize token abi
        const downloadNFTAddress${networkName} = '${downloadNFT.address}';
        const downloadNFTAbi${networkName} =${getTheAbi(
    "./../artifacts/contracts/DappetizeERC721NFT/DownloadNFT.sol/" +
      className +
      ".json"
  )};
        

        export { downloadNFTAddress${networkName}, downloadNFTAbi${networkName}  }
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  /////////////////////////////// End DownloadNFT   //////////////////////////////////////////

  ///////////////////////////////  Verify Contract //////////////////////////////////////////

  // hre.run("verify", {
  //     address: contractOptions.address
  // })
  // hre.run("verify", {
  //     address: dappetizeToken.address
  // })
  // hre.run("verify", {
  //     address: dappetizeNFT.address
  // })
  // hre.run("verify", {
  //     address: downloadNFT.address
  // })
  // hre.run("verify", {
  //     address: appContractFactory.address
  // })

  /////////////////////////////// End Verify Contract //////////////////////////////////////////
}
main();
const getTheAbi = (contractAddress) => {
  try {
    const dir = path.resolve(__dirname, contractAddress);
    const file = fs.readFileSync(dir, "utf8");
    const json = JSON.parse(file);
    const abi = json.abi;
    // console.log(`abi`, abi)
    return util.inspect(abi, { depth: null });
  } catch (e) {
    console.log(`e`, e);
  }
};
