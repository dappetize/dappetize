<template>
  <v-app>
    <v-main>
      <!-- <button @click="callMyFunction">Call My Plugin Function</button> -->
      <v-container fluid class="ma-0 px-0">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import Web3 from "web3";
import { onUnmounted, onMounted, inject } from "vue";

import {
  watchAccount,
  disconnect,
  connect,
  getAccount,
  fetchBlockNumber,
} from "@wagmi/core";

const nuxtApp = useNuxtApp();
let account = null;
let web3 = null;
let Contract = null;
const currentAddress = ref(null);
onMounted(async () => {
  // Event listener for getting message from parent
  window.addEventListener("message", handleMessage);

  let modal = await nuxtApp.$walletConnect(); // Call the function provided by your plugin
  modal.open();

  account = getAccount();

  // Initialize a Web3 instance with the provider
  web3 = new Web3(account.connector);
  let hi = web3.utils.utf8ToHex("input.message");

  // await web3.eth.requestAccounts();
  // async function requestAccounts() {
  //   return await web3.eth.requestAccounts();
  // }
  // async function excuteContract(input) {
  //   Contract = await new web3.eth.Contract(dappetizeAbi, dappetizeAddress);
  // }

  //   async getMessage(context, input) {
  //       var message = await input.web3.utils.utf8ToHex(input.message);
  //       return message;
  //   },
  //   async hashMessage(context, input) {
  //       var hash = input.web3.utils.sha3(input.message);
  //       return hash;
  //   },
  //   async signMessage(context, input) {
  //       var signature = await input.web3.eth.personal.sign(input.hash, input.address);
  //       return signature;
  //   },
  //   async clearCachedProvider(context, input) {
  //       await input.clearCachedProvider();
  //   },
  //   async getBalanceWei(context, input) {
  //       try {
  //           const balanceWei = await input.web3.eth.getBalance(input.account);
  //           return balanceWei;
  //       } catch (error) {

  //       }

  //   },
  //   async getEthBalance(context, input) {
  //       try {
  //           const balanceEth = await input.web3.utils.fromWei(input.balanceWei, input.ether)
  //           return balanceEth;
  //       } catch (error) {
  //       }
  //   },
  //   async changeChain(context, input) {
  //       input.on('chainChanged')
  //   },
  //   async provider(context, input) {
  //       var web3 = await new input.web3(input.ethereum);
  //       return web3;
  //   },
  //   // async getWeb3(context) {
  //   //     if (process.client) {
  //   //         if (typeof window !== undefined && typeof window.ethereum !== undefined) {
  //   //             // Trust Wallet (modern) or other Ethereum wallet with 'window.ethereum' is available
  //   //             let web3 = new Web3(window.ethereum.currentProvider);
  //   //             return web3;
  //   //         }
  //   //     }
  //   // },

  //   async getWeb3(context, walletName) {
  //       let web3;
  //       switch (walletName) {
  //           case 'MetaMask':
  //               if (window.ethereum && window.ethereum.isMetaMask) {
  //                   return web3 = new Web3(window.ethereum);
  //               }
  //               break;
  //           case 'TrustWallet':
  //               // TrustWallet integration (might require WalletConnect)
  //               break;
  //           case 'SafePal':
  //               // SafePal integration logic
  //               break;
  //           default:
  //       }
  //       web3.eth.requestAccounts()
  //       // Request accounts after switching
  //       const accounts = await web3.eth.getAccounts();
  //   }
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
// run funtions from parent
const getAddress = () => {
  // Logic to update content
  window.parent.postMessage({ address: account.address }, "*");
};
// Get message from parent
const handleMessage = (event) => {
  if (event.origin !== "http://localhost:30000") {
    // Replace with the Vue 2 origin
    return; // Always validate the origin!
  }

  if (
    event.data.action == "callFunction" &&
    event.data.functionName == "getAddress"
  ) {
    getAddress(...event.data.arguments);
  }
};
</script>
<style scoped></style>
