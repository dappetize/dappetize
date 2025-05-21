
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ganache");

require("dotenv").config();

// const { ProxyAgent, setGlobalDispatcher } = require("undici")
// const proxyAgent = new ProxyAgent("http://localhost:1337")
// setGlobalDispatcher(proxyAgent)


// console.log(process.env.PRIVATE_KEY);
// console.log(process.env.INFURA_API_KEY);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // **Note: Network name must be like layerzero config name
    ganache: {
      url: 'http://127.0.0.1:8545',
      gasLimit: 600000000000000000,
      defaultBalanceEther: 10,
    },
    ganache_local: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      // url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      url: "https://sepolia.infura.io/v3/9bbefad7ec644568aeebbb55041cc57e",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasLimit: 600000000000000000,
      timeoutBlocks: 2000,
      pollingInterval: 10000,
      chainId: 5,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/9bbefad7ec644568aeebbb55041cc57e",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasLimit: 600000000000000000,
      timeoutBlocks: 2000,
      pollingInterval: 10000,
      chainId: 11155111,
    },
    amoy: {
      url: "https://polygon-amoy.infura.io/v3/9bbefad7ec644568aeebbb55041cc57e",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasLimit: 600000000000000000,
      timeoutBlocks: 2000,
      pollingInterval: 10000,
      chainId: 80002,
    },
    holesky: {
      url: "https://holesky.infura.io/v3/9bbefad7ec644568aeebbb55041cc57e",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasLimit: 600000000000000000,
      timeoutBlocks: 2000,
      pollingInterval: 10000,
      chainId: 17000,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};