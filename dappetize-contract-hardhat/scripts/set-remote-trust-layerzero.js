/**
 This is Script for sample app contract for default usage
 
 * 
 */

const { ethers, upgrades, network } = require("hardhat");
const path = require('path');
const fs = require('fs');
const util = require('util');
const CHAIN_ID = require("../constants/chainIds.json")

let networkArray = [
    {
        name: "Sepolia",
        key: "sepolia",
    },
    {
        name: "Amoy",
        key: "amoy",
    },
    {
        name: "Holesky",
        key: "holesky",
    }
]

let networkName = "";
let localContract = "DTLZTransfer";
// const SLICES = 8;
async function main() {
    console.log("Current Network:", network.name);
    if (network.name == "goerli")
        networkName = "Goerli"
        else if (network.name == "mumbai")
        networkName = "Mumbai"
        else if (network.name == "sepolia")
        networkName = "Sepolia"
        else if (network.name == "amoy")
        networkName = "Amoy"
        else if (network.name == "holesky")
        networkName = "Holesky"
    const dir = path.resolve(
        __dirname,
        "./../contracts_info/" + networkName + "/DTLZTransfer.txt"
    )
    const localAddress = fs.readFileSync(dir, "utf8")
    console.log("Local Address is:", localAddress);
 
    networkArray = networkArray.filter(x => {
        return x.name != networkName
    });
    console.log('networkArray', networkArray);

    // get local contract
    // const localContractInstance = await ethers.getContractFactory(localContract)

    const contractFactory = await ethers.getContractFactory(localContract);
     const localContractInstance = await contractFactory.attach(localAddress); 

    // console.log("local Contract Instance", localContractInstance);

    networkArray.forEach(async element => {
        let dir = path.resolve(
            __dirname,
            "./../contracts_info/" + element.name + "/DTLZTransfer.txt"
        )
        let remoteAddress = fs.readFileSync(dir, "utf8")


        console.log("Remote Address is:", remoteAddress);
        //   get remote chain id
        const remoteChainId = CHAIN_ID[element.key]
        console.log("CHAIN_ID:", CHAIN_ID);
        console.log("remote Chain Id:", remoteChainId);

        // concat remote and local address
        let remoteAndLocal = hre.ethers.utils.solidityPack(["address", "address"], [remoteAddress, localAddress])

        // console.log("remoteAndLocal:", remoteAndLocal);
        console.log("remoteAndLocal:", await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal));

        // check if pathway is already set
        const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal)

        if (!isTrustedRemoteSet) {
            try {
                let tx = await (await localContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
                console.log(`✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
                console.log(` tx: ${tx.transactionHash}`)
            } catch (e) {
                if (e.error.message.includes("The chainId + address is already trusted")) {
                    console.log("*source already set*")
                } else {
                    console.log(`❌ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
                }
            }
        } else {
            console.log("*source already set*")
        }


    });








}
main();

const getContractAddress = (contractNetwork, contractClassName) => {
    try {
        const dir = path.resolve(
            __dirname,
            "./../contracts_info/" + contractNetwork + "/" + contractClassName + ".txt"
        )
        const file = fs.readFileSync(dir, "utf8")
        return file
        // const json = JSON.parse(file)
        // const abi = json.abi
        // console.log(`abi`, abi)
        // return util.inspect(abi, { depth: null })
    } catch (e) {
        console.log(`e`, e)
    }
}

