const { ethers, upgrades } = require("hardhat");
const path = require("path");
const fs = require("fs");
const util = require("util");

const className = "DappetizeToken";
// const SLICES = 8;
async function main() {
  const DappetizeToken = await ethers.getContractFactory(className);
  console.log("Deploying DappetizeToken...1");
  const owner = await ethers.getSigners();

  // try {
  const dappetizeToken = await upgrades.deployProxy(
    DappetizeToken,
    [1e12], //total supply
    {
      initializer: "initialize",
      timeout: 600000,
      useDeployedImplementation: false,
      redeployImplementation: "always",
      kind: "uups",
      unsafeAllowRenames: true,
    }
  );
  // } catch (error) {
  //     console.log(error);
  // }

  console.log("Deploying DappetizeToken...2");

  // console.log(dappetizeToken)
  await dappetizeToken.deployed();
  console.log("Proxy DappetizeToken deployed to:", dappetizeToken.address);

  //get contract address
  const dir = path.resolve(
    __dirname,
    "./../artifacts/contracts/DappetizeToken/DappetizeToken.sol/contractAddress.txt"
  );
  const address = dappetizeToken.address;
  fs.writeFile(dir, address, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  // create web3.js file
  const web3Dir = path.resolve(__dirname, "./../../web3/web3.js");
  let content = `import Web3 from 'web3';
            console.log(window.web3.currentProvider)
            const web3 = new Web3(window.web3.currentProvider);
        export default web3;`;
  fs.writeFile(web3Dir, content, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  // create abi file
  const abiDir = path.resolve(__dirname, "./../../web3/abi-dappetize-token.js");
  let contentABI = `
    import web3 from "./web3"
        // The address of the smart contract to call.
        // dappetize token abi
        // implementation address = ${dappetizeToken.functions.implementation}'
        // proxy contract address
        const address = '${address}';
        const abi =${getTheAbi()};
        let contract;
        if (web3)
        new web3.eth.Contract(abi, address)
        else
        null

        export { address, abi, web3 }
        export default contract
    `;
  fs.writeFile(abiDir, contentABI, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}
main();
const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "./../artifacts/contracts/DappetizeToken/DappetizeToken.sol/" +
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
