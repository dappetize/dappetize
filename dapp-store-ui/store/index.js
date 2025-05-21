import { defineStore } from "pinia";
import { ref, computed } from "vue";

// //start import sepolia Contracts
import {
  appContractFactoryAbiSepolia,
  appContractFactoryAddressSepolia,
} from "../web3/sepolia/app-contract-factory";
import {
  appContractAddressSepolia,
  appContractAbiSepolia,
} from "../web3/sepolia/app-contract";
import {
  dappetizeNFTAbiSepolia,
  dappetizeNFTAddressSepolia,
} from "../web3/sepolia/dappetize-nft";
import {
  dappetizeTokenAddressSepolia,
  dappetizeTokenAbiSepolia,
} from "../web3/sepolia/dappetize-token";
import {
  downloadNFTAbiSepolia,
  downloadNFTAddressSepolia,
} from "../web3/sepolia/download-nft";
import {
  contractOptionsAbiSepolia,
  contractOptionsAddressSepolia,
} from "../web3/sepolia/contract-options";
import {
  dtlzTransferAbiSepolia,
  dtlzTransferAddressSepolia,
} from "../web3/sepolia/dtlz-transfer";
// //end import sepolia Contracts

// //start import amoy Contracts
import {
  appContractFactoryAbiAmoy,
  appContractFactoryAddressAmoy,
} from "../web3/amoy/app-contract-factory";
import {
  appContractAddressAmoy,
  appContractAbiAmoy,
} from "../web3/amoy/app-contract";
import {
  dappetizeNFTAbiAmoy,
  dappetizeNFTAddressAmoy,
} from "../web3/amoy/dappetize-nft";
import {
  dappetizeTokenAddressAmoy,
  dappetizeTokenAbiAmoy,
} from "../web3/amoy/dappetize-token";
import {
  downloadNFTAbiAmoy,
  downloadNFTAddressAmoy,
} from "../web3/amoy/download-nft";
import {
  contractOptionsAbiAmoy,
  contractOptionsAddressAmoy,
} from "../web3/amoy/contract-options";
import {
  dtlzTransferAbiAmoy,
  dtlzTransferAddressAmoy,
} from "../web3/amoy/dtlz-transfer";
// //end import amoy Contracts

// //start import holesky Contracts
import {
  appContractFactoryAbiHolesky,
  appContractFactoryAddressHolesky,
} from "../web3/holesky/app-contract-factory";
import {
  appContractAddressHolesky,
  appContractAbiHolesky,
} from "../web3/holesky/app-contract";
import {
  dappetizeNFTAbiHolesky,
  dappetizeNFTAddressHolesky,
} from "../web3/holesky/dappetize-nft";
import {
  dappetizeTokenAddressHolesky,
  dappetizeTokenAbiHolesky,
} from "../web3/holesky/dappetize-token";
import {
  downloadNFTAbiHolesky,
  downloadNFTAddressHolesky,
} from "../web3/holesky/download-nft";
import {
  contractOptionsAbiHolesky,
  contractOptionsAddressHolesky,
} from "../web3/holesky/contract-options";
import {
  dtlzTransferAbiHolesky,
  dtlzTransferAddressHolesky,
} from "../web3/holesky/dtlz-transfer";
// //end import holesky Contracts

export const useMainStore = defineStore("main", () => {
  const config = useRuntimeConfig();
  let env = config.public;

  let baseURL = ref("");
  let fileURL = ref("");
  let baseURLWithoutPort = ref("");
  let IsHttps = ref("");
  let frontendURL = ref("");
  let gatewayWS = ref("");
  let wsPort = ref(0);

  if (!env.IsHttps) {
    //when in local
    // Config
    baseURL.value = "http://" + env.frontendHostName + ":" + env.backendPort;
    fileURL.value = "http://" + env.frontendHostName + ":" + env.filePort;
    baseURLWithoutPort.value = env.hostName;
    IsHttps.value = env.IsHttps;
    frontendURL.value = env.frontendURL;
    gatewayWS.value = env.gatewayWS;
    wsPort.value = env.wsPort;
  } else {
    baseURL.value = env.baseURL;
    fileURL.value = env.fileURL;
    baseURLWithoutPort.value = env.hostName;
    IsHttps.value = env.IsHttps;
    frontendURL.value = env.frontendURL;
    gatewayWS.value = env.gatewayWS;
    wsPort.value = env.wsPort;
  }

  let websocketClient = ref(0);
  const setWebsocketClient = (client) => {
    return (websocketClient.value = client);
  };
  const getWebsocketClient = () => {
    return websocketClient.value;
  };

  let user = ref({});
  const setUser = (user) => {
    return (user.value = user);
  };
  const getUser = () => {
    return user.value;
  };

  //blockChian Varaibles start
  const contractState = reactive({
    // blockchainNetwork: 'mumbai',

    // // get Addresses of Contracts
    // appContractAddress: appContractAddressMumbai,
    // appContractFactoryAddress: appContractFactoryAddressMumbai,
    // contractOptionsAddress: contractOptionsAddressMumbai,
    // dappetizeTokenAddress: dappetizeTokenAddressMumbai,
    // nftContractAddress: dappetizeNFTAddressMumbai,
    // downloadNFTAddress: downloadNFTAddressMumbai,
    // dtlzTransferAddress: dtlzTransferAddressMumbai,

    // // Get ABIs
    // appContractAbi: appContractAbiMumbai,
    // appContractFactoryAbi: appContractFactoryAbiMumbai,
    // contractOptionsAbi: contractOptionsAbiMumbai,
    // dappetizeTokenAbi: dappetizeTokenAbiMumbai,
    // dappetizeNFTContractAbi: dappetizeNFTAbiMumbai,
    // downloadNFTAbi: downloadNFTAbiMumbai,
    // dtlzTransferAbi: dtlzTransferAbiMumbai,

    // blockchainNetwork: 'goerli',

    // // get Addresses of Contracts
    // appContractAddress: appContractAddressGoerli,
    // appContractFactoryAddress: appContractFactoryAddressGoerli,
    // contractOptionsAddress: contractOptionsAddressGoerli,
    // dappetizeTokenAddress: dappetizeTokenAddressGoerli,
    // nftContractAddress: dappetizeNFTAddressGoerli,
    // downloadNFTAddress: downloadNFTAddressGoerli,
    // dtlzTransferAddress: dtlzTransferAddressGoerli,

    // // Get ABIs
    // appContractAbi: appContractAbiGoerli,
    // appContractFactoryAbi: appContractFactoryAbiGoerli,
    // contractOptionsAbi: contractOptionsAbiGoerli,
    // dappetizeTokenAbi: dappetizeTokenAbiGoerli,
    // dappetizeNFTContractAbi: dappetizeNFTAbiGoerli,
    // downloadNFTAbi: downloadNFTAbiGoerli,
    // dtlzTransferAbi: dtlzTransferAbiGoerli,

    blockchainNetwork: "sepolia",

    // get Addresses of Contracts
    appContractAddress: appContractAddressSepolia,
    appContractFactoryAddress: appContractFactoryAddressSepolia,
    contractOptionsAddress: contractOptionsAddressSepolia,
    nftContractAddress: dappetizeNFTAddressSepolia,
    dappetizeTokenAddress: dappetizeTokenAddressSepolia,
    downloadNFTAddress: downloadNFTAddressSepolia,
    dtlzTransferAddress: dtlzTransferAddressSepolia,

    // Get ABIs
    appContractAbi: appContractAbiSepolia,
    appContractFactoryAbi: appContractFactoryAbiSepolia,
    contractOptionsAbi: contractOptionsAbiSepolia,
    nftContractAbi: dappetizeNFTAbiSepolia,
    dappetizeTokenAbi: dappetizeTokenAbiSepolia, //
    downloadNFTAbi: downloadNFTAbiSepolia, //
    dtlzTransferAbi: dtlzTransferAbiSepolia, //

    contractAddress: "",
    allContractAddress: "",
  });
  //blockChian Varaibles end

  //blockChain Functions start
  const setNetWork = (input) => {
    if (input == "sepolia") {
      // get Addresses of Contracts
      contractState.appContractAddress = appContractAddressSepolia;
      contractState.appContractFactoryAddress =
        appContractFactoryAddressSepolia;
      contractState.contractOptionsAddress = contractOptionsAddressSepolia;
      contractState.nftContractAddress = dappetizeNFTAddressSepolia;
      contractState.dappetizeTokenAddress = dappetizeTokenAddressSepolia;
      contractState.downloadNFTAddress = downloadNFTAddressSepolia;
      contractState.dtlzTransferAddress = dtlzTransferAddressSepolia;
      // Get ABIs
      contractState.appContractAbi = appContractAbiSepolia;
      contractState.appContractFactoryAbi = appContractFactoryAbiSepolia;
      contractState.contractOptionsAbi = contractOptionsAbiSepolia;
      contractState.nftContractAbi = dappetizeNFTAbiSepolia;
      contractState.downloadNFTAbi = downloadNFTAbiSepolia;
      contractState.dappetizeTokenAbi = dappetizeTokenAbiSepolia;
      contractState.dtlzTransferAbi = dtlzTransferAbiSepolia;

      contractState.blockchainNetwork = "sepolia";
    } else if (input == "amoy") {
      // get Addresses of Contracts
      contractState.appContractAddress = appContractAddressAmoy;
      contractState.appContractFactoryAddress = appContractFactoryAddressAmoy;
      contractState.contractOptionsAddress = contractOptionsAddressAmoy;
      contractState.nftContractAddress = dappetizeNFTAddressAmoy;
      contractState.dappetizeTokenAddress = dappetizeTokenAddressAmoy;
      contractState.downloadNFTAddress = downloadNFTAddressAmoy;
      contractState.dtlzTransferAddress = dtlzTransferAddressAmoy;
      // Get ABIs
      contractState.appContractAbi = appContractAbiAmoy;
      contractState.appContractFactoryAbi = appContractFactoryAbiAmoy;
      contractState.contractOptionsAbi = contractOptionsAbiAmoy;
      contractState.nftContractAbi = dappetizeNFTAbiAmoy;
      contractState.downloadNFTAbi = downloadNFTAbiAmoy;
      contractState.dappetizeTokenAbi = dappetizeTokenAbiAmoy;
      contractState.dtlzTransferAbi = dtlzTransferAbiAmoy;

      contractState.blockchainNetwork = "amoy";
    } else if (input == "holesky") {
      // get Addresses of Contracts
      contractState.appContractAddress = appContractAddressHolesky;
      contractState.appContractFactoryAddress =
        appContractFactoryAddressHolesky;
      contractState.contractOptionsAddress = contractOptionsAddressHolesky;
      contractState.nftContractAddress = dappetizeNFTAddressHolesky;
      contractState.dappetizeTokenAddress = dappetizeTokenAddressHolesky;
      contractState.downloadNFTAddress = downloadNFTAddressHolesky;
      contractState.dtlzTransferAddress = dtlzTransferAddressHolesky;
      // Get ABIs
      contractState.appContractAbi = appContractAbiHolesky;
      contractState.appContractFactoryAbi = appContractFactoryAbiHolesky;
      contractState.contractOptionsAbi = contractOptionsAbiHolesky;
      contractState.nftContractAbi = dappetizeNFTAbiHolesky;
      contractState.downloadNFTAbi = downloadNFTAbiHolesky;
      contractState.dappetizeTokenAbi = dappetizeTokenAbiHolesky;
      contractState.dtlzTransferAbi = dtlzTransferAbiHolesky;

      contractState.blockchainNetwork = "holesky";
    } else if (input == "polygon") {
      contractState.blockchainNetwork = "polygon";
    } else if (input == "bsc") {
      contractState.blockchainNetwork = "bsc";
    } else if (input == "bsc-testnet") {
      contractState.blockchainNetwork = "bsc-testnet";
    } else if (input == "avalanche") {
      contractState.blockchainNetwork = "avalanche";
    } else if (input == "arbitrum") {
      contractState.blockchainNetwork = "arbitrum";
    } else if (input == "optimism") {
      contractState.blockchainNetwork = "optimism";
    } else if (input == "optimism-goerli") {
      contractState.blockchainNetwork = "optimism-goerli";
    } else if (input == "fantom") {
      contractState.blockchainNetwork = "fantom";
    } else if (input == "fuji") {
      contractState.blockchainNetwork = "fuji";
    } else if (input == "fantom-testnet") {
      contractState.blockchainNetwork = "fantom-testnet";
    } else if (input == "meter-testnet") {
      contractState.blockchainNetwork = "meter-testnet";
    } else if (input == "zksync-testnet") {
      contractState.blockchainNetwork = "zksync-testnet";
    } else if (input == "bnb") {
      contractState.blockchainNetwork = "bnb";
    } else if (input == "bnb-testnet") {
      contractState.blockchainNetwork = "bnb-testnet";
    } else if (input == "zkevm-era-mainnet") {
      contractState.blockchainNetwork = "zkevm-era-mainnet";
    } else if (input == "zkevm-era-testnet") {
      contractState.blockchainNetwork = "zkevm-era-testnet";
    } else if (input == "arbitrum-one") {
      contractState.blockchainNetwork = "arbitrum-one";
    } else if (input == "arbitrum-goerli") {
      contractState.blockchainNetwork = "arbitrum-goerli";
    } else if (input == "none") {
      contractState.blockchainNetwork = "none";
    }
  };
  const getNetwork = () => {
    return contractState.blockchainNetwork;
  };
  const setAllContractAddress = (allContractAddress) => {
    contractState.allContractAddress = allContractAddress;
  };
  const getAllContractAddress = () => {
    return contractState.allContractAddress;
  };
  const setContractAddress = () => {
    if (contractState.allContractAddress) {
      let networkContract = contractState.allContractAddress.filter((x) => {
        return x.blockchainRM.key == contractState.blockchainNetwork;
      });
      if (networkContract.length > 0) {
        contractState.contractAddress = networkContract[0].contract_address;
      } else {
        contractState.contractAddress = null;
      }
    } else {
      contractState.allContractAddress = null;
    }
  };
  const getContractAddress = () => {
    return contractState.contractAddress;
  };

  //blockChain Functions end

  // const getCounter = () => {
  //   return counter.value
  // }
  // const increment = () => {
  //   counter.value++;
  // }
  // const setName = (newName) => {
  //   name.value = newName;
  // }

  const test = () => {
    return "Test";
  };
  return {
    baseURL,
    fileURL,
    baseURLWithoutPort,
    IsHttps,
    frontendURL,
    gatewayWS,
    wsPort,
    contractState,

    setWebsocketClient,
    getWebsocketClient,

    setUser,
    getUser,
    // getCounter,
    // increment,
    // setName,
    test,
    setNetWork,
    getNetwork,
    setAllContractAddress,
    getAllContractAddress,

    setContractAddress,
    getContractAddress,
  };
});
export default useMainStore;
