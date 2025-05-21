<!-- layouts/admin.vue -->
<template>
  <v-app class="container-dashboard">
    <v-container fluid>
      <v-row style="height: 300px;" class="d-flex justify-space-between">
        <v-col cols="6" xs="6" sm="6" md="6" lg="6">
          <nuxt-link to="/">
            <img class="logo" src="public/svgs/dappetizeLogo.svg" />
          </nuxt-link>
        </v-col>
        <v-col class="input-search-container d-flex justify-center mt-2" cols="3" xs="3" sm="3" md="3" lg="3"
          style="padding:0px;">
          <!-- <v-autocomplete
    v-model="selectedItem"
    background-color="#312351"
                dark
                dense
                rounded
                append-icon=""
                prepend-inner-icon="mdi-magnify"
                ref="input"
                :items="searchResultList"
                :loading="isLoading"
                chips
                clearable
                hide-details
                hide-selected
                item-text="name"
                item-value="id"
                placeholder="search"
                solo
                class="input-search"
  >

</v-autocomplete> -->
          <v-dialog v-model="mobilDialog" fullscreen hide-overlay dark transition="dialog-bottom-transition"
            style="z-index: 22;" class="modal-sm">
            <v-card
              style="background-color:  #1b1825; justify-content: center;    display: flex;align-items: start !important; flex-direction: row;">
              <v-btn class="mt-2" icon dark style="background-color: transparent; box-shadow: none;">
                <v-icon @click="mobilDialog = false" style="color: white;">mdi-close</v-icon>
              </v-btn>
              <div style="width: 100%;">
                <input type="text" v-bind="props" v-model="searchModel" @input="searchResultForMobileVersion()"
                  placeholder="search here" style="border-radius: 25px;background-color: 
        #4a2491;outline: none;width:100%;height: 40px;color: white;position: relative;z-index: 9999;"
                  class="searchModal-mobile  mt-4">
              </div>
              <!-- <v-list style="position: relative;z-index: 9999;" v-if="state.searchResultList.length > 0">
                    <v-list-item v-for="item in state.searchResultList" :key="item"
                      @click="goToAppOrGameDetailsPage(item.id, item.isGame)">
                      <v-list-item-title style="cursor: pointer;">
                        <div class="d-flex">
                          <img style="width: 30px;height: 30px;" :src="item.img" alt="">
                          <div class="ml-3">{{ item.name }}</div>

                        </div>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list> -->


            </v-card>
          </v-dialog>
          <v-menu style="position: relative;z-index: 9999;">

            <template v-slot:activator="{ props }">

              <input type="text" v-bind="props" v-model="searchModel" @input="searchResultForMobileVersion()"
                placeholder="search here" style="border-radius: 25px;background-color: 
        #4a2491;outline: none;height: 40px;padding: 10px;color: white;position: relative;z-index: 9999;"
                class="searchModal">
            </template>
            <v-list style="position: relative;z-index: 9999;" v-if="state.searchResultList.length > 0">
              <v-list-item v-for="item in state.searchResultList" :key="item"
                @click="goToAppOrGameDetailsPage(item.id, item.isGame)">
                <v-list-item-title style="cursor: pointer;">
                  <div class="d-flex">
                    <img style="width: 30px;height: 30px;" :src="item.img" alt="">
                    <div class="ml-3">{{ item.name }}</div>

                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="d-flex  right-top-bar">
            <v-btn class="search-sm-screen" icon dark style="margin-top: -4px;">
              <v-icon color="#312351" @click="OpenSearch()">mdi-magnify</v-icon>
            </v-btn>
            <div class="wallet-connect-container d-flex"
              style="z-index: 2; height: 40px; position: relative; gap:28px ">
              <div class="wallet-connect-container"> <w3m-button class="account-wallet-connect-btn" /></div>
              <!-- <div  style="display: flex; align-items: center" class="pr-2 pr-md-4">
           <v-text-filed  style="border-radius: 25px;background-color: 
       rgb(31 29 41);;outline: none;height: 40px;padding: 10px;color: white;">
          {{token.balance}} DT
           </v-text-filed> </div> -->
              <v-menu offset-y style="z-index: 10;">

                <template v-slot:activator="{ props }">
                  <v-avatar class="cursor " style="border:none;" v-bind="props">
                    <v-icon color="white">mdi-account-circle</v-icon>
                  </v-avatar>
                </template>

                <!-- This is the content to display when the button is clicked -->
                <v-list>
                  <v-list-item v-for="profileItem in profileList" :key="profileItem" @click="profileItem.function">
                    <v-list-item-title>
                      {{ profileItem.name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="wallet-connect-container-mobile-screen">
              <div class="text-center d-flex">
                <v-menu v-model="menu" :close-on-content-click="false" location="end">
                  <template v-slot:activator="{ props }">
                    <v-btn style="height: 30px;width: 30px;background-color:rgb(105 48 195); color:white" v-bind="props"
                      icon dark>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-card style="background-color:#1b1825; height: 50px;width: 50vw; display: none"
                    class=" card-of-wallet">


                    <v-divider></v-divider>

                    <div>
                      <w3m-button class="account-wallet-connect-btn" />
                    </div>


                  </v-card>
                </v-menu>
                <v-menu offset-y style="z-index: 10;margin-left:-16px">

                  <template v-slot:activator="{ props }">
                    <v-avatar class="cursor account" style="border:none" v-bind="props">
                      <v-icon color="white">mdi-account-circle</v-icon>
                    </v-avatar>
                  </template>

                  <!-- This is the content to display when the button is clicked -->
                  <v-list>
                    <v-list-item v-for="profileItem in profileList" :key="profileItem" @click="profileItem.function">
                      <v-list-item-title>
                        {{ profileItem.name }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
          <div class="background">
            <img v-if="developerBackground" id="imageTrigger" src="public/image/developerBackground.jpg"
              class="developerBackground" />
            <img :src="bannerUrl" alt="" v-else id="imageTrigger" class="developerBackground">
            <input style="visibility: hidden;" type="file" visi id="fileInput">
          </div>
          <!-- <div class="hover"><p>You can change the background!</p></div> -->
        </v-col>
      </v-row>
      <v-dialog v-model="isShowModel" width="auto">
        <v-card style="width: 700px;">
          <div style="display: flex; justify-content: space-between;padding: 15px;">
            <div>Cropp Image</div>
            <v-btn @click="getResult()" :loading="loading">Crop</v-btn>
          </div>
          <hr>
          <VuePictureCropper :boxStyle="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto',
          }" :img="pic" :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 16 / 9,
          }" @ready="ready" />
        </v-card>
      </v-dialog>
      <v-container class="test" fluid>
        <v-row>
          <v-col cols="3" xs="3" sm="3" md="3" lg="3" class="d-flex justify-center responsive">
            <div class="developer-information-container">
              <div class="developer-information">
                <img src="/public/image/developerAvatar.png" v-if="avatar" alt="" class="developerAvatar">
                <img :src="avatarUrl" v-else class="developerAvatar">
                <div>
                  <label>
                    <input type="file" @change="selectFile($event)" ref="uploadInput"
                      style="width:20vh; position:absolute;top: 56%; left: 38%; opacity:0;z-index:99;cursor: pointer;">
                    <v-icon class="edit-image-icon">mdi-camera</v-icon>
                  </label>
                </div>
                <v-div class="mt-2">
                  <p class="displaye-name">
                    <span @click="copyAddressToClipboard(state.userInfo.username)" class="text-gradient">{{ shortString(state.userInfo.username)
                      }}...</span>
                  </p>
                </v-div>
              </div>
              <div>
                <div class="editor">
                  <div class="editor-inner-box">
                    <div class="d-flex">
                      <v-icon style="color: gray"> mdi-information</v-icon>
                      <p style=" font-size: 15px; font-weight: bold; color: gray; margin: 0 7px;">
                        Change your name
                      </p>
                      <v-icon @click="showDialog" style="color: gray"> mdi-pen </v-icon>
                    </div>
                    <div>
                    </div>
                    <!-- Simple modal using Vue's v-if -->
                    <v-dialog v-model="dialog" width="auto">
                      <v-card style="border-radius: 16px;">
                        <v-card-text style="background-color: rgb(49, 35, 81);">
                          <div class="modal d-flex flex-column">
                            <div class="modal-content">
                              <h4 class="mb-3" style="color: white;">Change Name</h4>
                              <v-text-field outlined required class="edit-name " :rules="nameRules"
                                v-model="displayName" placeholder="Enter new name"></v-text-field>
                            </div>
                            <v-div class="d-flex justify-space-around btn-action-dialog">
                              <v-btn @click="updateUserName()" class="submit-btn">Confirm</v-btn>
                              <v-btn @click="dialog = false" class="submit-btn">Close</v-btn>
                            </v-div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col offset="1" class="container-nav-bar-tabs" cols="10" offset-xs="1" xs="10" offset-sm="1" sm="10"
            offset-md="1" md="10" offset-lg="0" lg="9">

            <v-card class="container-of-slider">
              <v-tabs class="container-tabs" v-model="tab">
                <!-- <v-tab  class="tab-line" ><NuxtLink  to="analytics"><span class="tab-text">Analytics</span></NuxtLink></v-tab>
          <v-tab  class="tab-line"><NuxtLink  to="upload-app"><span>Upload App</span></NuxtLink></v-tab>
          <v-tab  class="tab-line"><NuxtLink  to="app-list"><span>App List</span></NuxtLink></v-tab>
          <v-tab  class="tab-line"><NuxtLink  to="book-list"><span>Book list</span></NuxtLink></v-tab>
          <v-tab  class="tab-line"><NuxtLink  to="wish-lists"><span>wish lists</span></NuxtLink></v-tab>
          <v-tab   class="v-tab-profile profile tab-line" @click.prevent="goToDeveloperProfile">Your Profile</v-tab> -->
                <v-tab class="tab" v-for="(item, i) in tabItems" :key="i" :to="item.route" :value="item">
                  {{ item.name }}</v-tab>
                <v-tab class="v-tab-profile profile tab-line" @click.prevent="goToDeveloperProfile">Your Profile</v-tab>
              </v-tabs>
            </v-card>
            <v-main>
              <Nuxt />
            </v-main>
          </v-col>
        </v-row>
      </v-container>
      <slot />
      <footer>
        <span style="visibility: hidden;">Admin Footer</span>
      </footer>
    </v-container>


  </v-app>
</template>
<script>
//-----------------------------------  imports start -----------------------------------------------
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRoute } from 'vue-router';
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import axios from 'axios';
import { useMainStore } from "../store";
import {
  getAccount,
  signMessage,
  reconnect,
} from "@wagmi/core";
import Web3 from "web3";

//-------------------------------------- imports end ------------------------------------------------------------
export default {
  components: {
    VuePictureCropper,
  },

  setup() {
    //----------------------------------------------- varaibles start ------------------------------------------------
    const state = reactive({
      userInfo: {},
      searchResultList: [],
    })
    const {
      baseURL,
      fileURL,
      setNetWork,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();
    const { $auth, $walletConnect } = useNuxtApp();
    let { modal, wagmiConfig } = $walletConnect();
    const isLoggedIn = ref(true);
    const selectedItem = ref("");
    const developerBackground = ref(true);
    const avatar = ref(true);
    const displayName = ref("");
    const showWalletConnect = ref(false);
    const dialog = ref(false);
    const mobilDialog = ref(false);
    const menu = ref(false);
    const searchResultList = reactive([]);
    const isLoading = ref(false);
    const show = ref(false);
    const loading = ref(false);
    const tab = ref(null);
    const isShowModel = ref(false)
    const screenIsSmall = ref(true)
    const pic = ref('');
    const route = useRoute();
    const versionId = ref('1fdfb309-1a65-4b79-9f14-73d038fde5c5')
    const userToken = ref(null);
    const avatarUrl = ref("");
    const bannerUrl = ref("");
    const fileInput = ref(null);
    const searchModel = ref("");
    const token = reactive({
      balance: 0,
    });
    const tabItems = [{
      name: 'Analytics',
      route: 'analytics'
    }, {
      name: 'Upload App',
      route: 'upload-app'
    }, {
      name: 'App List',
      route: 'app-list'
    }, {
      name: 'Book List',
      route: 'book-list'
    },
    {
      name: 'Wish list',
      route: 'wish-lists'
    },
    ];
    const profileList = [
      {
        name: "Home",
        // function: goToHome,
      },

      {
        name: "Logout",
        // function: logout,
      },
    ];
    const nameRules = [
      value => {
        if (value?.length > 3 && value?.length < 12) return true;

        return 'The number of characters in your name must be between 3 and 12';
      },
    ];
    //----------------------------------------------- varaibles end ------------------------------------------------

    //----------------------------------------------- functions start ----------------------------------------------
    // const goToHome = () => {
    //       return navigateTo("/games");
    //     };
    // const logout = async () => {
    //   window.localStorage.removeItem("auth.nuxt3.dappetize");
    //   window.location.reload();
    //   isLoggedIn.value = await $auth.isLoggedIn();
    // };
    const goToDeveloperProfile = () => {
      return navigateTo("/dashboard/developer-profile")
    }
    

    const showDialog = () => {
      dialog.value = true;
    }
    const OpenSearch = () => {
      mobilDialog.value = true;
    }
    const openChangeProfile = () => {
      show.value = !show.value;
    }
    //select a picture to be cropped
    const selectFile = async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        pic.value = String(reader.result);
        isShowModel.value = true
      }
    }

    //Get cropping results and send to fileMangement
    const getResult = async () => {
      loading.value = true;
      if (!cropper) return;
      const base64 = cropper.getDataURL();
      const blob = await cropper.getBlob();
      const file = await cropper.getFile();
      let formData = new FormData();
      formData.append('file', file);
      userToken.value = await $auth.token();

      try {
        const res = await axios.post(fileURL + "/api/v1/addFile?subPath=icon&type=5&is_public=true&version_id=" + versionId.value, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        loading.value = false;
        isShowModel.value = false;
        await getUserProfileAvatar();
      } catch (error) {
        console.log("error", error);
      }

    }
    const getUserProfileAvatar = async () => {
      userToken.value = await $auth.token();
      try {
        const res = await axios.get(baseURL + "/api/v1/getUserProfileAvatar/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })

        const item = res.data[res.data.length - 1];
        if (item) {
          avatarUrl.value = fileURL + "/api/v1/downloadFileByName/" + item.name + "/" + item.path + "/" + item.extension
          avatar.value = false;
        }

      } catch (error) {
        console.log("error", error);
      }
    }
    const getUserProfileBanner = async () => {
      userToken.value = await $auth.token();
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      try {
        const res = await axios.get(baseURL + "/api/v1/getUserProfileBanner", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })

        const item = res.data[res.data.length - 1];
        if (item) {
          developerBackground.value = false
          bannerUrl.value = fileURL + "/api/v1/downloadFileByName/" + item.name + "/" + item.path + "/" + item.extension;
        }
        else {
          developerBackground.value = true
        }

      } catch (error) {
        console.log("error while get banner of user", error);
      }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
    const uploadBannerForUserProfile = async (event) => {
      const file = event.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append('file', file);
        userToken.value = await $auth.token();
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        try {
          const res = await axios.post(fileURL + "/api/v1/addFile?subPath=icon&type=6&is_public=true&version_id=" + versionId.value, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + userToken.value
            }
          })
          developerBackground.value = false
          await getUserProfileBanner();
        } catch (error) {
          console.log("error while upload of user banner", error);
        }
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      }
      if (!file) {
        return;
      }


    }
    const updateUserName = async () => {
      userToken.value = await $auth.token();
      try {
        if (displayName.value.length > 3 && displayName.value.length < 12) {
          const res = await axios.put(baseURL + "/api/v1/updateUser", {
            username: displayName.value
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + userToken.value
            }
          })
          state.userInfo.username = displayName.value;

          dialog.value = false;
        }
        else {
          return null;
        }

      } catch (error) {
        console.log("errro whil update User Name", error);
      }
    }
    const searchResultForMobileVersion = async () => {
      state.searchResultList = [];
      if (searchModel.value == '') {
        state.searchResultList = [];
      }
      try {
        const res = await axios.get(baseURL + "/api/v1/getAllAppsFilterByName/1/5/" + searchModel.value, {
          header: {
            'Content-Type': 'application/json',
          }
        })
        res.data.forEach((item) => {
          const appsVersionsModelRelation = item.appsVersionsModelRelation;
          const versionsFilesRelation = appsVersionsModelRelation[0].versionsFilesModelRelation;
          const image = versionsFilesRelation.find(item => item.type == 1)
          state.searchResultList.push({
            id: item.id,
            name: item.name,
            isGame: item.is_game,
            img: fileURL + "/api/v1/downloadFileByName/" + image.name + "/" + image.path + "/" + image.extension
          })
        })
      } catch (error) {
        console.log("errro", error);
      }
    }
    const checkTokensAndVerify = async () => {

      try {
        const account = getAccount(modal.wagmiConfig);
        walletAddress.value = account.address;

        let web3 = new Web3(await account.connector.getProvider());

        // 
        setNetWork(network_id[0][account.chainId]);

        let DappetizeTokenContract = new web3.eth.Contract(
          contractState.dappetizeTokenAbi,
          contractState.dappetizeTokenAddress
        );
        let decimals = await DappetizeTokenContract.methods.decimals().call();
        let balance = await DappetizeTokenContract.methods.balanceOf(walletAddress.value).call({
          from: walletAddress.value,
        })
        token.balance = (balance / (BigInt(Math.pow(10, Number(decimals)))))
      } catch (error) {
        token.balance = 0;
      }

    }

 
    const shortString = (input) => {
      return input?.substring(0, 10)
    }
    const copyAddressToClipboard = async (input) => {
      try {
        await navigator.clipboard.writeText(input);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    //------------------------------------------------------ functions end ---------------------------------------------

    // ----------------------------------------------------- events start ------------------------------------------
    onMounted(async () => {
      await $auth.isLoggedIn();
      state.userInfo = await $auth.getUser();
      await getUserProfileAvatar();
      await getUserProfileBanner();
      document.getElementById('imageTrigger').addEventListener('click', () => {
        document.getElementById('fileInput').click();
      })
      document.getElementById('fileInput').addEventListener('change', uploadBannerForUserProfile);
      setInterval(() => {
        checkTokensAndVerify();

      }, 21000);
    });
    onUnmounted(() => { });
    //------------------------------------------------------- events end -----------------------------------------
    return {
      //----------- varaibles start ----------------------
      isLoggedIn,
      avatar,
      tabItems,
      avatarUrl,
      bannerUrl,
      pic,
      isShowModel,
      selectedItem,
      displayName,
      dialog,
      showDialog,
      searchResultList,
      isLoading,
      loading,
      show,
      tab,
      state,
      goToDeveloperProfile,
      screenIsSmall,
      searchModel,
      nameRules,
      menu,
      showWalletConnect,
      token,
      mobilDialog,
      profileList,
      //-----------variables end -------------------------
      // ---------- fucntions start ----------------------
      // goToHome,
      // logout,
      copyAddressToClipboard,
      shortString,
      selectFile,
      openChangeProfile,
      getResult,
      developerBackground,
      uploadBannerForUserProfile,
      updateUserName,
      searchResultForMobileVersion,
      OpenSearch,
      checkTokensAndVerify
      // ------------ functions end -----------------------
    };
  },
};



</script>
<style scoped>
/* body{
  color: #1b1825;
} */
* {
  font-family: "Roboto";
}

.container-dashboard {
  overflow-x: hidden;
}


.search-sm-screen {
  display: none;
}

.test {
  height: 4rem;
}

.container-dashboard {
  background-color: #1b1825 !important;
}

.theme--light.v-application {
  background-color: #1b1825 !important;
}

.v-slide-group__content {
  color: #4a2491 !important;
  background-color: #1b1825 !important;
}

.nuxt-link {
  color: white !important;
}

.v-application a {
  color: white !important;
  text-decoration: none;
}

.theme--light.v-tabs>.v-tabs-bar {
  background-color: #1b1825 !important;
}

.v-slide-group__next,
.v-slide-group__prev {
  min-width: 0px !important;
}

.logo {
  width: 100px;
  cursor: pointer;
  z-index: 2;
  position: relative;
  left: 0px;
}

.modal-sm {
  display: none;
}

.input-search {
  background-color: #312351 !important;
  font-size: 20px;
  width: 248px;
  z-index: 2;
  position: absolute;
  right: 0;
  margin-right: 30px;
  margin-top: 5px;
  border-radius: 100px;
}

.input-search-container :v-deep(.v-autocomplete .v-field.v-field) {
  height: 35px !important;
}

.input-search-container :v-deep(.v-field__input) {
  height: 34px;
  align-self: center;
}

.input-search-container :v-deep(.v-chip) {
  display: none;
}



.input-search :v-deep(.mdi-magnify::before) {
  color: white;
  margin-top: -18px;
}

.input-search :v-deep(.v-label) {
  color: #c1bdcb;
}

.input-search :v-deep(input) {
  color: white;
  margin-top: -23px;
}

.input-search :v-deep(.mdi-menu-down::before) {
  margin-bottom: 18px;
}

.input-search :v-deep(.mdi-close-circle::before) {
  margin-bottom: 18px;
  /* display: none; */
}

.input-search :v-deep(.v-field--variant-filled .v-field__outline::before) {
  border: none;
}


.developerBackground {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  height: 300px;
  width: 100%;
  max-width: 100%;
}

.developer-information-container {
  background-color: #312351;
  height: 40%;
  border-radius: 30px;
  border-bottom-left-radius: 30px;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.57);

  /* bottom: 100px; */
  width: 70%;
  z-index: 99;
  height: 22vw;
  position: relative;
  bottom: 25%;

}

.developer-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 20px; */
  position: relative;
  height: 15vw;
}

.developerAvatar {
  border-radius: 50%;
  width: 50%;
  height: 50%;
  margin-top: 2rem;
  border: 2px solid #4a2491;
}

.edit-image-icon {
  position: absolute;
  color: #5946B0;
  /* color: #bfbac9; */
  top: 57%;
  left: 43%;
  font-size: 30px;
}

.displaye-name {
  font-size: 20px;
  color: white;
  padding-top: 2rem;
}

.text-gradient {
  background-image: linear-gradient(71deg,
      rgba(135, 34, 136, 1) 0%,
      rgba(182, 60, 151, 1) 100%);
  margin-top: 1rem;
  background-size: 100%;
  background-repeat: repeat;
  --webkit-background-clip: text;
}

.editor-inner-box {
  display: flex;
  flex-direction: column;
  padding: 9px;
  justify-content: center;
  align-items: center;
}

.modal {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.7); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(49, 35, 81); */
}

.modal-content {
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */

}

.edit-name :v-deep(fieldset) {
  border: none;
}

.edit-name :v-deep(input::placeholder) {
  color: #d9d9d9 !important;
}

.edit-name :v-deep(input) {
  color: #c5a3e3;
  border-bottom: 1px solid #c5a3e3;
}

.btn-action-dialog {
  width: 100%;
}

.profile {
  color: white !important;
  /* display: none; */
}

.container-tabs {
  background-color: #1b1825;
  display: flex;
  justify-content: start;
}

.tab-text {}

.tab-line {
  color: #4a2491;
}

.background :deep(.vue-file-agent.file-input-wrapper) {
  opacity: 0 !important;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  height: 300px;
  width: 100%;
}

.background :deep(.grid-block-wrapper .grid-block .file-preview) {
  display: none;
}

.background :deep(canvas) {
  width: 120px;
  height: 120px;
  position: relative;
}

.background :deep(.vue-file-agent .help-text) {
  display: none !important;
}

.submit-btn {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  border-radius: 0px 13.8848px;
  color: white;
  font-family: "Roboto";
}

.wallet-connect-container-mobile-screen {
  display: none;
}

@media only screen and (max-width: 1280px) and (min-width: 959px) {
  .developer-information-container {
    display: none;
  }

  .searchModal {
    right: 12vw !important;
  }

  .wallet-connect-container {
    right: 12vw !important;
    margin-left: 4px;
  }

  .container-nav-bar-tabs {
    margin-left: 6vw;
  }

  .container-tabs :deep(.v-slide-group__content) {
    width: 100% !important;
    display: flex !important;
    justify-content: space-around !important;
  }

  .responsive {
    display: none !important;
  }

  /* .container-nav-bar-tabs{
    margin-left: 120px;
  } */

}

@media only screen and (min-width: 1280px) {
  .v-tab-profile {
    display: none;
  }

  .searchModal {
    right: 8vw !important;
  }

  .wallet-connect-container {
    right: 7vw !important;
  }

  /* .container-nav-bar-tabs{
    margin-left: 120px;
  } */

}

/* @media screen and (max-width:850px) {
  .searchModal{
    position: relative !important;
    width: 39vw !important;
    height: 22% !important;
    right: 16vw !important;
  }
} */
@media screen and (max-width:959px) and (min-width:599px) {
  .container-tabs :deep(.v-slide-group__content) {
    overflow-x: auto !important;
  }

  .developer-information-container {
    display: none !important;
  }

  .searchModal-mobile {
    padding-left: 16px;
  }

  .modal-sm {
    display: initial;
  }

  /* .search-bg-screen{
  display: none !important;
} */
  .searchModal {
    /* width: 39vw !important; */
    /* height: 28% !important; */
    right: 6vw !important;
    display: none !important;
  }

  .container-nav-bar-tabs {
    margin-left: 6vw;
  }

  .developer-information-container {
    display: none;
  }

  .wallet-connect-container {
    right: 0vw !important;
  }

  .search-sm-screen {
    display: initial;
    z-index: 2;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }

  .search-sm-screen :deep(.v-btn__overlay) {
    opacity: 0;
  }

  .right-top-bar {
    position: relative;
    right: 12vw;
    display: flex;
    height: fit-content;
    align-items: center;


  }
}

@media screen and (max-width:599px) {
  .wallet-connect-container {
    display: none !important;
  }

  .searchModal {
    /* width: 39vw !important;
    height: 28% !important; */
    display: none;
  }

  .modal-sm {
    display: initial;
  }

  .searchModal-mobile {
    padding-left: 16px;
  }

  .search-sm-screen {
    display: initial;
    z-index: 2;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }

  .search-sm-screen :deep(.v-btn__overlay) {
    opacity: 0;
  }

  .developer-information-container {
    display: none;
  }

  .container-nav-bar-tabs {
    margin-left: 8vw;

  }

  .right-top-bar {
    position: relative;
    right: 8vw;
    display: flex;
    height: fit-content;
    align-items: center;
    margin-top: -4px !important;

  }

  .account {
    margin-top: -6px
  }

  .wallet-connect-container {
    display: none;
  }

  .wallet-connect-container-mobile-screen {
    display: flex;
    z-index: 3;
    height: 40px;
    align-items: center;
  }

  .account-wallet-connect-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .account-wallet-connect-btn :deep(button, a) {
    flex-direction: column !important;
  }

  .card-of-wallet {
    display: flex !important;
    justify-content: end;
    align-items: center;

  }

  .container-of-slider {
    width: 105%;
  }
}
</style>
<style>
.v-tab--selected .v-tab__slider {
  opacity: 1;
  color: #4a2491 !important;
}
</style>
