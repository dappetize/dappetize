<!-- layouts/default.vue -->
<template>
  <client-only>
    <v-app style="background-color: #1b1825; overflow-x: hidden;">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        dark
        transition="dialog-bottom-transition"
      >
        <v-card
          style="
            background-color: #1b1825;
            display: flex;
            flex-direction: column;
            align-items: start !important;
          "
        >
          <v-toolbar style="background-color: #1b1825">
            <v-btn icon dark @click="CloseSearch()">
              <v-icon style="color: white">mdi-close</v-icon>
            </v-btn>
            <input
              type="text"
              placeholder="search"
              v-model="searchModel"
              style="
                width: 100%;
                border: 1px solid rgb(49, 35, 81);
                border-radius: 20px;
                background: rgb(49, 35, 81);
                padding: 8px;
                color: white;
                outline: none;
              "
              @input="searchResultForMobileVersion()"
            />
          </v-toolbar>
          <v-list
            style="background-color: transparent; position: relative"
            v-for="(item, i) in state.searchResultList"
            :key="i"
          >
            <v-list-item>
              <v-list-item-title
                @click="goToAppOrGameDetailsPage(item.id, item.isGame)"
                style="cursor: pointer"
                dark
              >
                <div class="d-flex">
                  <div>
                    <v-img
                      style="width: 50px; height: 50px"
                      :src="item.img"
                    ></v-img>
                  </div>
                  <div class="ml-3" style="color: white">{{ item.name }}</div>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
      <v-dialog v-model="loginDialog" width="auto">
        <v-card>
          <v-card-title> Register User </v-card-title>
          <v-card-text>
            Welcome to Dappetize
            <br />
            You Are New User
            <br />
            By connecting your wallet and using OpenSea, you agree to our Terms
            of Service and Privacy Policy.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="close()">Close</v-btn>
            <v-btn color="green darken-1" text @click="register()"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card elevation="0" v-if="showFooterAndToolbar()">
        <v-app-bar
          style="background: #1b1825; align-items: baseline; height: 70px"
          shrink-on-scroll
          elevation="0"
          dense
          scroll-target="#scrolling-techniques-7"
        >
          <v-row class="justify-space-between">
            <v-col cols="5" md="5">
              <div style="display: flex">
                <div
                  class="text-left pt-5 pa-md-5 container-logo"
                  v-if="display.mdAndUp"
                >
                  <img
                    src="/dappetizeLogo.svg"
                    v-if="display.mdAndUp"
                    class="mt-3"
                    style="width: 100px; cursor: pointer"
                    @click="goToHomePage()"
                  />
                </div>
                <div
                  class="text-left pt-5 pa-md-5 container-logo"
                  v-if="!display.mdAndUp"
                  style="max-width: 30vw; align-items: center; display: flex"
                >
                  <img
                    src="/dappetizeLogo.svg"
                    style="max-width: 100%; width: 100px"
                    @click="goToHomePage()"
                  />
                </div>
                <div class="text-left pa-5" v-if="display.mdAndUp">
                  <v-tabs
                    v-model="tab"
                    color="#056449"
                    height="50px"
                    background-color="#1B1825"
                    dark
                    style="color: #4a2491"
                  >
                    <v-tab
                      class="text-capitalize nav-item"
                      style="background: #1b1825; color: #4a2491 !important"
                      v-for="(item, i) in tabItems"
                      :key="i"
                      :value="item"
                      @click="goToSelectPage(item.route)"
                    >
                      <span style="color: white">
                        {{ item.name }}
                      </span>
                    </v-tab>
                  </v-tabs>
                </div>
              </div>
            </v-col>
            <v-col cols="7" md="7" v-if="display.mdAndUp">
              <div
                style="text-align: right; display: flex; justify-content: end"
                class="right-top-bar"
              >
                <div
                  style="display: flex; align-items: center"
                  class="pr-2 pr-md-4"
                >
                  <v-btn icon dark v-if="!display.mdAndUp">
                    <v-icon color="white" @click="OpenSearch()"
                      >mdi-magnify</v-icon
                    >
                  </v-btn>
                  <v-menu>
                    <template
                      v-slot:activator="{ props }"
                      v-if="display.mdAndUp"
                    >
                      <input
                        type="text"
                        v-bind="props"
                        v-model="searchModel"
                        @input="searchResultForMobileVersion()"
                        placeholder="search here"
                        style="
                          border-radius: 25px;
                          background-color: #4a2491;
                          outline: none;
                          height: 40px;
                          padding: 10px;
                          color: white;
                        "
                      />
                    </template>
                    <v-list v-if="state.searchResultList.length > 0">
                      <v-list-item
                        v-for="item in state.searchResultList"
                        :key="item"
                        @click="goToAppOrGameDetailsPage(item.id, item.isGame)"
                      >
                        <v-list-item-title style="cursor: pointer">
                          <div class="d-flex">
                            <img
                              style="width: 30px; height: 30px"
                              :src="item.img"
                              alt=""
                            />
                            <div class="ml-3">{{ item.name }}</div>
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>

                <div class="d-flex align-center">
                  <v-menu offset-y v-if="walletAddress">
                    <template v-slot:activator="{ props }">
                      <div
                        v-bind="props"
                        v-on="on"
                        style="display: flex; align-items: center"
                        class="pr-2 pr-md-4"
                      >
                        <div
                          style="
                            border-radius: 25px;
                            background-color: rgb(31 29 41);
                            outline: none;
                            height: 40px;
                            padding: 10px;
                            color: white;
                          "
                        >
                          {{ token.balance }} DT
                        </div>
                      </div>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="exchange in state.exhangeLists"
                        :key="exchange"
                        @click="goToExhange(exchange)"
                      >
                        <v-list-item-title
                          >Buy from {{ exchange }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <w3m-button />
                  <div class="d-flex align-center">
                    <v-avatar
                      @click="isRegister()"
                      v-show="isWalletConnected && !isLoggedIn"
                      class="cursor"
                    >
                      <v-icon color="white">mdi-wallet</v-icon>
                    </v-avatar>

                    <!-- <WalletConnect @setNetWork="getCurrentNetwork($event)" @reg="isRegister($event)" :data="dataChallenge" /> -->
                    <v-menu offset-y v-if="isLoggedIn">
                      <template v-slot:activator="{ props }">
                        <v-avatar class="cursor" v-bind="props">
                          <v-icon color="white">mdi-account-circle</v-icon>
                        </v-avatar>
                      </template>

                      <!-- This is the content to display when the button is clicked -->
                      <v-list>
                        <v-list-item
                          v-for="profileItem in profileList"
                          :key="profileItem"
                          @click="profileItem.function"
                        >
                          <v-list-item-title>
                            {{ profileItem.name }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <!-- <v-btn icon dark>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn> -->
                    <!-- <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon dark>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> -->
                  </div>
                </div>
              </div>
            </v-col>
            <v-col
              cols="7"
              md="7"
              class="d-flex justify-end right-top-bar mt-sm-4"
              v-if="!display.mdAndUp"
            >
              <div class="pr-2 pr-md-4">
                <v-btn icon dark v-if="!display.mdAndUp">
                  <v-icon color="white" @click="OpenSearch()"
                    >mdi-magnify</v-icon
                  >
                </v-btn>
                <v-menu>
                  <template v-slot:activator="{ props }" v-if="display.mdAndUp">
                    <input
                      type="text"
                      v-bind="props"
                      v-model="searchModel"
                      @input="searchResultForMobileVersion()"
                      placeholder="search here"
                      style="
                        border-radius: 25px;
                        background-color: #4a2491;
                        outline: none;
                        height: 40px;
                        padding: 10px;
                        color: white;
                      "
                    />
                  </template>
                  <v-list v-if="state.searchResultList.length > 0">
                    <v-list-item
                      v-for="item in state.searchResultList"
                      :key="item"
                      @click="goToAppOrGameDetailsPage(item.id, item.isGame)"
                    >
                      <v-list-item-title style="cursor: pointer">
                        <div class="d-flex">
                          <img
                            style="width: 30px; height: 30px"
                            :src="item.img"
                            alt=""
                          />
                          <div class="ml-3">{{ item.name }}</div>
                        </div>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      style="
                        height: 30px;
                        width: 30px;
                        background-color: rgb(105 48 195);
                      "
                      v-bind="props"
                      icon
                    >
                      <v-icon style="color: #ffffff">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-card
                    style="
                      height: auto;
                      width: auto;
                      display: none;
                      background-color: #1b1825;
                    "
                    class="card-of-wallet pa-4 rounded-lg"
                  >
                    <v-divider></v-divider>
                    <div class="">
                      <div
                        class="mb-6"
                        style="display: flex; justify-content: space-between"
                      >
                        <!-- First item -->
                        <div style="display: flex; align-items: center">
                          <!-- Replace with your actual content -->
                          <span
                            class="text-center text-align-middle"
                            style="
                              line-height: 40px;
                              overflow: hidden;
                              text-align: center;
                              border-radius: 25px;
                              background-color: rgb(31, 29, 41);
                              outline: none;
                              height: 40px;
                              width: 90px;
                              color: white;
                            "
                          >
                            {{ token.balance }} DT
                          </span>
                        </div>

                        <!-- Second item -->
                        <div class="d-flex align-center">
                          <v-avatar
                            @click="isRegister()"
                            v-if="!isLoggedIn"
                            class="cursor"
                          >
                            <v-icon color="white">mdi-wallet</v-icon>
                          </v-avatar>
                          <v-menu offset-y v-show="isLoggedIn">
                            <template v-slot:activator="{ props }">
                              <v-avatar class="cursor" v-bind="props">
                                <v-icon color="white"
                                  >mdi-account-circle</v-icon
                                >
                              </v-avatar>
                            </template>
                            <v-list>
                              <v-list-item
                                v-for="profileItem in profileList"
                                :key="profileItem"
                                @click="profileItem.function"
                              >
                                <v-list-item-title>
                                  {{ profileItem.name }}
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                      </div>

                      <v-menu offset-y v-if="walletAddress">
                        <template v-slot:activator="{ props }">
                          <!-- This is the triggering element -->
                        </template>
                        <!-- This is the content to display when the button is clicked -->
                        <v-list>
                          <v-list-item
                            v-for="exchange in state.exhangeLists"
                            :key="exchange"
                            @click="goToExhange(exchange)"
                          >
                            <v-list-item-title
                              >Buy from {{ exchange }}</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <w3m-button />
                    </div>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
          </v-row>
        </v-app-bar>
      </v-card>

      <slot />
      <div style="width: 100%; justify-content: center">
        <br />
        <br />
        <br />
        <br />
        <hr
          style="
            width: 95%;
            border: 1px solid #ceb6ff;
            margin: auto;
            background: #ceb6ff;
          "
        />
        <br />
        <v-container>
          <v-row style="margin-bottom: 5rem !important">
            <v-col
              cols="6"
              md="2"
              lg="2"
              sm="2"
              class="subtitle-style-first mt-2"
              >Terms of Service</v-col
            >
            <v-col
              cols="6"
              md="2"
              lg="2"
              sm="2"
              class="subtitle-style-first mt-2"
              >Privacy</v-col
            >
            <v-col
              cols="6"
              md="2"
              lg="2"
              sm="2"
              class="subtitle-style-first mt-2"
              >About Dappetize Store</v-col
            >
            <v-col
              cols="6"
              md="2"
              lg="2"
              sm="2"
              class="subtitle-style-first mt-2"
              >Developers</v-col
            >
          </v-row>
        </v-container>
        <br />
      </div>
      <v-bottom-navigation
        v-if="!display.mdAndUp"
        horizontal
        fixed
        style="display: grid; background-color: #1b1825"
      >
        <v-tabs
          v-model="tab"
          style="color: #4a2491"
          background-color="#1B1825"
          color="#056449"
          dark
        >
          <v-tab
            class="text-capitalize"
            style="background: #1b1825"
            v-for="(item, i) in tabItems"
            :key="i"
            :value="item"
            dark
            @click="goToSelectPage(item.route)"
          >
            <span style="color: white">
              {{ item.name }}
            </span>
          </v-tab>
        </v-tabs>
      </v-bottom-navigation>
    </v-app>
  </client-only>
</template>

<script>
import { useDisplay } from 'vuetify';
import {
  getAccount,
  reconnect,
  watchAccount,
  watchClient,
  watchChainId,
} from '@wagmi/core';
import { useMainStore } from '../store';
import { onMounted, ref } from 'vue';
import Web3 from 'web3';
import axios from 'axios';
// import { W3mButton } from "@web3modal";
import { network_id } from '../web3/constants/network_id';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
/// import * as allChains from 'viem/chains'
export default {
  setup() {
    //  variables
    const {
      baseURL,
      fileURL,
      setNetWork,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
      contractState,
    } = useMainStore();

    const { $auth, $walletConnect } = useNuxtApp();
    let { modal, wagmiConfig } = $walletConnect();

    const isLoggedIn = ref(false);
    const isWalletConnected = ref(false);

    var web3 = null;
    const tabItems = [
      { id: 1, name: 'Games', route: `/games` },
      { id: 2, name: 'Apps', route: `/apps` },
      // { id: 3, name: 'Movies & TV', route: `/apps` },
      { id: 4, name: 'Books', route: `/books` },
      // { id: 5, name: 'Kids', route: `/apps` },
    ];
    const state = reactive({
      searchResultList: [],
      dtCredit: 20,
      netWorkName: 'Goerli',
      exhangeLists: ['Uniswap V2', 'Uniswap V3'],
      suportedNetwork: [],
      addNetwork: false,
      isWalletConnected,
    });
    var tab = ref('/games');
    const tooltip = ref(false);
    var dialog = ref(false);
    var walletAddress = ref('');
    var loginDialog = ref(false);
    const display = ref(useDisplay());
    const menu = ref(false);
    const dappetizeLogo = '/public/dappetizeLogo.svg';
    const searchModel = ref('');
    const toolTipShow = ref(false);
    const desiredNetworkId = ref('goerli');
    const userToken = ref(null);
    const token = reactive({
      balance: 0,
    });
    // end  variables
    // Start Event
    onMounted(async () => {
      isLoggedIn.value = await $auth.isLoggedIn();
      //  checkNetworkStatus();
      // setInterval(() => {
      //   checkTokensAndVerify();
      // }, 21000);

      // modal.subscribeState(function (e) {
      //   console.log(e);
      //   if (e.selectedNetworkId) {
      //     if (e.open && !isLoggedIn.value) {
      //       // isRegister()
      //     }
      //     // console.log("connected!", isWalletConnected.value);
      //   }
      // });

      async function handleAccountChange(newAccount, prevAccount) {
        console.log('Account changed!');
        console.log('New account:', newAccount);
        console.log('Previous account:', prevAccount);
        // Handle the account change logic here
        if (newAccount) {
          console.log('User connected with account:', newAccount.address);
        } else {
          console.log('User disconnected');
        }
        if (newAccount.isConnected) {
          isWalletConnected.value = true;
          // set network in default layout
          setNetWork(network_id[0][newAccount.chainId]);
          if (!isLoggedIn.value) isRegister();
          await checkTokensAndVerify();
        }
      }
      const unsubscribe = watchAccount(wagmiConfig, {
        onChange: handleAccountChange,
      });

      // let stateOfModal = modal.getState()
      // if (
      //   stateOfModal.selectedNetworkId) {
      //   isWalletConnected.value = true
      //}
    });
    // End Event

    // Start Functions

    // login
    const isRegister = async () => {
      console.log('modal', modal);
      await modal.open();
      const account = getAccount(wagmiConfig);
      // console.log("account", account);
      // console.log("getProvider",await account.connector.getProvider());
      let web3 = new Web3(await account.connector.getProvider());
      walletAddress.value = account.address;

      console.log('wallet===============>');

      try {
        const register = await axios.post(
          baseURL + '/userExist',
          {
            wallet_address: walletAddress.value,
          },
          {
            header: {
              'Content-Type': 'application/json',
              // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
            },
          }
        );
        if (register.data) {
          login(false);
        } else {
          loginDialog.value = true;
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    const login = async (needRegister) => {
      const account = getAccount(wagmiConfig);
      let web3 = new Web3(await account.connector.getProvider());
      walletAddress.value = account.address;

      try {
        const response = await axios.get(baseURL + '/generateChallenge', {
          header: {
            'Content-Type': 'application/json',
            //     // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
        });
        const message = web3.utils.utf8ToHex(response.data.challenge);
        let hash = web3.utils.sha3(message);
        let signature = await web3.eth.personal.sign(
          hash,
          walletAddress.value,
          ''
        );
        try {
          const res = await $auth.loginWithLocal(
            {
              sessionId: response.data.sessionId,
              signature: signature,
              networkId: 'goerli',
              needRegister: needRegister,
            },
            '/loginWithBlockchain'
          );

          isLoggedIn.value = await $auth.isLoggedIn();
        } catch (error) {
          console.log('error for login', error);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    const register = async () => {
      loginDialog.value = false;
      login(true);
    };

    const goToHomePage = async () => {
      return navigateTo('/games');
    };

    // end login
    const showFooterAndToolbar = () => {
      const hideRoutes = ['dashboard'];

      // Check if the current route is in the hideRoutes array
      return !hideRoutes.includes();
    };
    const shortenAddress = (address) => {
      if (!address) return '';
      return address.slice(0, 4) + '...' + address.slice(-2);
    };
    const copyToClipboard = async (content) => {
      try {
        await navigator.clipboard.writeText(content);
        toolTipShow.value = true; // Open the tooltip
        setTimeout(() => (toolTipShow.value = false), 2000); // Close the tooltip after 2 seconds
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };
    const OpenSearch = () => {
      dialog.value = !dialog.value;
    };
    const close = () => {
      loginDialog.value = false;
      console.log(loginDialog.value);
    };
    const CloseSearch = () => {
      dialog.value = !dialog.value;
    };
    const goToDashboard = () => {
      return navigateTo('/dashboard/app-list');
    };
    const logout = async () => {
      if (import.meta.client) {
        window.localStorage.removeItem("auth.nuxt3.dappetize");
        window.location.reload();
        isLoggedIn.value = await $auth.isLoggedIn();
      }
    };
    const searchResultForMobileVersion = async () => {
      state.searchResultList = [];
      console.log('searchmodel', searchModel.value);
      if (searchModel.value == '') {
        state.searchResultList = [];
      }
      try {
        const res = await axios.get(
          baseURL + '/api/v1/getAllAppsFilterByName/1/5/' + searchModel.value,
          {
            header: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('search', res.data);
        res.data.forEach((item) => {
          const appsVersionsModelRelation = item.appsVersionsModelRelation;
          const versionsFilesRelation =
            appsVersionsModelRelation[0].versionsFilesModelRelation;
          const image = versionsFilesRelation.find((item) => item.type == 1);
          console.log('image', image);
          state.searchResultList.push({
            id: item.id,
            name: item.name,
            isGame: item.is_game,
            img:
              fileURL +
              '/api/v1/downloadFileByName/' +
              image.name +
              '/' +
              image.path +
              '/' +
              image.extension,
          });
        });
        console.log('state', state.searchResultList);
      } catch (error) {
        console.log('errro', error);
      }
    };
    const goToAppOrGameDetailsPage = async (id, isGame) => {
      if (isGame == true) {
        navigateTo({
          path: '/game-details',
          query: {
            gameId: id,
          },
        });
        searchModel.value = '';
        state.searchResultList = [];
      } else {
        navigateTo({
          path: '/app-details',
          query: {
            appId: id,
          },
        });
        searchModel.value = '';
        state.searchResultList = [];
      }
    };
    const goToExhange = async (exchange) => {
      const account = getAccount(wagmiConfig);
      let network = network_id[0][account.chainId];
      console.log(network);

      if (exchange == 'Uniswap V2') {
        const url = `https://app.uniswap.org/#/swap?inputCurrency=ETH&use=v2&outputCurrency=${contractState.dappetizeTokenAddress}&useNetwork=${network}`;
        window.location.href = url;
      } else if (exchange == 'Uniswap V3') {
        const url = `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${contractState.dappetizeTokenAddress}&useNetwork=${network}`;
        window.location.href = url;
      }
    };
    const goToSelectPage = async (item) => {
      console.log(item);
      useRouter().push(item);
    };
    // End Functions

    const profileList = [
      {
        name: 'Dashboard',
        function: goToDashboard,
      },

      {
        name: 'Logout',
        function: logout,
      },
    ];
    //// blockchain function start
    // Check how much token have on this network
    const checkTokensAndVerify = async () => {
      try {
        const account = getAccount(wagmiConfig);
        walletAddress.value = account.address;

        let web3 = new Web3(await account.connector.getProvider());

        let DappetizeTokenContract = new web3.eth.Contract(
          contractState.dappetizeTokenAbi,
          contractState.dappetizeTokenAddress
        );
        //   console.log("DappetizeTokenContract",DappetizeTokenContract);
        let decimals = await DappetizeTokenContract.methods.decimals().call();
        let balance = await DappetizeTokenContract.methods
          .balanceOf(walletAddress.value)
          .call({
            from: walletAddress.value,
          });
        token.balance = balance / BigInt(Math.pow(10, Number(decimals)));
        // console.log("token.balancetoken.balance",token.balance);
      } catch (error) {
        token.balance = 0;
      }
    };
    const checkNetworkStatus = async () => {
      if (state.addNetwork == false) {
        try {
          userToken.value = await $auth.token();

          const res = await axios.get(
            baseURL + '/api/v1/getAllBlockchainNetworks/',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken.value,
              },
            }
          );

          res.data.forEach((item) => {
            state.suportedNetwork.push({
              name: item.name,
              id: item.network_id,
            });
          });

          state.addNetwork = true;
          //  await addSupportedNetwork();
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    const addSupportedNetwork = async () => {
      try {
        const projectId = '052606f9bddc45959a31a57873ffff4d';
        const chains = [];
        for (let index = 0; index < Object.values(allChains).length; index++) {
          for (let i = 0; i < state.suportedNetwork.length; i++) {
            if (
              Object.values(allChains)[index].id == state.suportedNetwork[i].id
            ) {
              chains.push(Object.values(allChains)[index]);
            }
            // console.log('address', Object.values(allChains)[index].id);
          }
        }

        // 2. Create wagmiConfig
        const metadata = {
          name: 'Web3Modal',
          description: 'Web3Modal Example',
          url: 'https://web3modal.com',
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
        };
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

        //    const tokens= {
        //         11155111: {
        //       address: '0x69aC21cB86F840925fB2436A9Ba00307582Da207',
        //     }}

        reconnect(wagmiConfig);
        //     // 3. Create modal
        modal = createWeb3Modal({
          wagmiConfig,
          projectId,
          chains,
          // tokens
        });

        console.log('modal updated');
      } catch (error) {
        console.log('error', error);
      }
    };
    //// blockchain function ends

    return {
      // variables
      loginDialog,
      tooltip,
      isRegister,
      login,
      register,
      searchModel,
      state,
      toolTipShow,
      token,
      modal,
      wagmiConfig,
      isWalletConnected,
      //end variables
      // functions
      goToHomePage,
      tabItems,
      showFooterAndToolbar,
      display,
      close,
      shortenAddress,
      tab,
      menu,
      dappetizeLogo,
      dialog,
      OpenSearch,
      CloseSearch,
      walletAddress,
      searchResultForMobileVersion,
      isLoggedIn,
      goToDashboard,
      computed,
      profileList,
      copyToClipboard,
      goToAppOrGameDetailsPage,
      goToExhange,
      goToSelectPage,
      checkTokensAndVerify,
      addSupportedNetwork,
      //end functions
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;1,500;1,600&family=Raleway:wght@300&family=Roboto:ital,wght@0,500;1,400&display=swap');

.subtitle-style-first {
  /* margin-left: 30px; */
  /* display: inline; */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  text-align: center;
  color: #ffffff;
}

* {
  margin: 0;
  padding: 0;
}

.container-logo {
  margin-left: 2vw !important;
}
</style>
<style>
.v-autocomplete .v-field .v-text-field__prefix,
.v-autocomplete .v-field .v-text-field__suffix,
.v-autocomplete .v-field .v-field__input,
.v-autocomplete .v-field.v-field {
  background: #312351;
}

.card-of-wallet {
  display: flex !important;
}

.v-field__outline {
  display: none !important;
}

.v-app-bar.v-toolbar:not(.v-toolbar--flat) {
  position: static !important;
}

*[data-v-433a9abd] {
  align-items: center !important;
}

.right-top-bar {
  height: 90px !important;
}

@media screen and (max-width: 600px) {
  .subtitle-style-first {
    font-size: 12px !important;
  }

  .right-top-bar {
    margin-top: 16px !important;
  }
}
</style>
