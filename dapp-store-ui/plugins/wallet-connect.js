import { getAccount, getEnsName, reconnect } from "@wagmi/core";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { polygonAmoy, sepolia, holesky } from "viem/chains";
import { useMainStore } from "~/store";
import axios from "axios"; // Ensure axios is imported
import * as allChains from "viem/chains";

export default defineNuxtPlugin(async (nuxtApp) => {

  // 1. Define constants
  const projectId = "052606f9bddc45959a31a57873ffff4d";

  // 2. Create wagmiConfig
  const metadata = {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  const chains = [polygonAmoy, sepolia, holesky];

  const wagmiConfig = defaultWagmiConfig({
    chains, // required
    projectId, // required
    metadata, // required
    enableWalletConnect: true, // Optional - true by default
    enableInjected: true, // Optional - true by default
    enableEIP6963: true, // Optional - true by default
    enableCoinbase: true, // Optional - true by default
    autoConnect: true,
  });
  reconnect(wagmiConfig);
  //     // 3. Create modal
  const modal = createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    themeVariables: {
      "--w3m-color-mix": "rgb(27, 24, 37)",
      "--w3m-color-mix-strength": 40,
      "--wcm-background-color": "red",
    },
  });

  // const { open, selectedNetworkId } = useWeb3ModalState();

  // const { address } = getAccount(wagmiConfig)

  nuxtApp.provide("walletConnect", () => {
    return {
      wagmiConfig,
      modal,
    };
  });

  // how can use
  // const nuxtApp = useNuxtApp();
  // let modal = await nuxtApp.$walletConnect();
});
