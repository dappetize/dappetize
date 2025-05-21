<template>
  <div class="main-container">
    <v-stepper class="conatiner-stepper" editable disabled :items="items" v-model="step" prev-text="Back"
      next-text="Continue">
      <template v-slot:item.1>
        <v-form ref="formRef">
          <v-row>
            <v-col>
              <!-- <p v-if="successUpload" style="color: white">yor file is upload</p> -->
              <v-text-field class="mt-5 deatail" dark label="Name" outlined required :counter="30" maxlength="30"
                v-model="appName" :rules="[rules.appName]" style="color: white;">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field dark label="Description" outlined v-model="appDescription" class="deatail"
                style="color: white;" :counter="150" :rules="[rules.appDescription]" maxlength="150">

              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field class="mt-5 deatail" label="Version Name" outlined v-model="versionName"
                style="color: white;" :counter="20" :rules="[rules.versionName]" maxlength="20">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row><v-col>
              <v-text-field class="mt-5 deatail" label="Version Description" outlined v-model="versionDescription"
                style="color: white;" :counter="40" :rules="[rules.versionDescription]" maxlength="40">
              </v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <v-btn class="action-step white--text" text @click="goToSecondStep();">
              Continue
            </v-btn>
          </div>
        </v-form>
      </template>
      <template v-slot:item.2>
        <v-form class="" ref="secondFormRef">
          <v-row>
            <v-col>
              <v-text-field class="mt-5 deatail" dark label="Price (Dappetize Token)" :rules="[rules.appPrice]"
                v-model="appPrice" style="color: #ffffff;" outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="row-res">
            <v-col class="switch-btn-container">
              <v-card class="d-flex justify-start mb-12 v-card-second ">
                <v-switch v-model="isAppModel" v-on:change="switchChange('app')" class="ma-6 choose-type" label="App"
                  color="indigo" hide-details></v-switch>
                <v-switch v-model="isBookModel" v-on:change="switchChange('book')" class="ma-6 choose-type" label="Book"
                  color="indigo" hide-details></v-switch>
                <v-switch v-model="isGameModel" v-on:change="switchChange('game')" class="ma-6 deatail choose-type"
                  label="Game" color="indigo" hide-details></v-switch>
              </v-card>
            </v-col>
          </v-row>
          <div class="d-flex justify-end align-center">
            <v-btn text class="action-step white--text mr-2" @click="backToPreviousStep()"> Back </v-btn>
            <v-btn text class="action-step white--text" @click="goToThirdStep()">
              Continue
            </v-btn>

          </div>
        </v-form>
      </template>
      <template v-slot:item.3>
        <v-form ref="thirdFormRef">
          <v-row>
            <v-col v-if="!isBookModel">
              <p style="color: #ffffff " class="mb-2">Upload App or Game</p>
              <v-file-input dark label="File input" multiple outlined :rules="[rules.fileValidation]" v-model="appFile"
                accept=".apk, application/vnd.android.package-archive" style="color: #ffffff;"
                class="deatail"></v-file-input>
            </v-col>
            <v-col v-if="isBookModel">
              <p style="color: #ffffff" class="mb-2">Upload Book</p>
              <v-text-field class="mt-5 deatail" dark label="Author" outlined required :counter="30" maxlength="30"
                v-model="author" style="color: white;">
              </v-text-field>

              <v-file-input dark label="File input" multiple outlined :rules="[rules.fileValidation]" v-model="appFile"
                accept=".pdf,.epub,.mobi,.azw, .azw3, .djvu, .fb2, .txt, .doc, .docx, .html, .cbr, .cbz"
                style="color: #ffffff;" class="deatail"></v-file-input>
            </v-col>
          </v-row>
          <v-row v-if="!isBookModel">
            <v-col>
              <p style="color: #ffffff" class="mb-2">Upload Trailer</p>
              <v-file-input dark label="File input" multiple v-model="trailerFile" class="deatail" outlined
                accept="video/*" :rules="[rules.fileValidation]" style="color: #ffffff;"></v-file-input>

            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <v-btn text class="action-step white--text mr-2" @click="backToPreviousStep()"> Back </v-btn>
            <v-btn text class="action-step white--text" @click="goTofourthStep()">
              Continue
            </v-btn>
          </div>
        </v-form>
      </template>
      <template v-slot:item.4>
        <v-form ref="fourthFormRef">
          <v-row>
            <v-col>
              <p style="color: #ffffff" class="mb-2">Upload Icon</p>
              <v-file-input dark label="File input" multiple v-model="iconFile" class="deatail" outlined
                accept="image/*" :rules="[rules.fileValidation]" style="color: #ffffff;"></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p style="color: #ffffff" class="mb-2">Upload Banner</p>
              <v-file-input dark label="File input" multiple v-model="bannerFile" outlined
                :rules="[rules.fileValidation]" accept="image/*" class="deatail" style="color: #ffffff;"></v-file-input>
            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <v-btn text class="action-step white--text mr-2" @click="backToPreviousStep()"> Back </v-btn>
            <v-btn text class="action-step white--text" @click="goToFifthStep()">Continue</v-btn>
          </div>
        </v-form>
      </template>
      <template v-slot:item.5>
        <v-row>
          <v-col>
            <p style="color: #ffffff" class="mb-2">Genre</p>
            <v-select v-model="appGenreItemsvalue" class="genre-input" :items="state.appGenreItems" item-value="id"
              item-text="name" item-title="name" label="App Genre" outlined background-color="#FFFFFF42"
              style="color: #ffffff;"></v-select>
          </v-col>
          <!-- <v-col>
        <p style="color: #ffffff">Wallet</p>
        <v-select
          background-color="#FFFFFF"
          :items="walletItems"
          label="User's Wallets"
          outlined
        ></v-select>
      </v-col> -->
        </v-row>
        <v-row>
          <v-col cols="12">
            <p style="color: #ffffff">Upload image</p>
            <p style="color: #bababa; font-size: 14px" class="mb-2">
              upload 3 image of your application Hold Shift And Select Image
            </p>

            <div>
              <v-file-input multiple label="File input" v-model="fileRecordsForUpload" :rules="[rules.fileValidation]"
                accept="image/*" style="color: #ffffff;"></v-file-input>
              <br />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end end-of-action-btn">
            <v-btn text class="action-step white--text mr-2" @click="step--"> Back </v-btn>
            <v-btn text @click="uploadAppOrBook()" class="action-step white--text" :loading="loading">
              Upload {{ fileRecordsForUpload.length }} files
            </v-btn>
          </v-col>
        </v-row>

      </template>
    </v-stepper>
    <v-snackbar v-model="successUpload">
      <p style="text-align: center;">Your file has been successfully uploaded</p>
    </v-snackbar>
  </div>
</template>

<script>
// ------------------------------------- imports start ----------------------------------------------------
import { ref, reactive, onMounted, onUnmounted } from "vue";

// import { useVuelidate } from '@vuelidate/core'
//   import { email, required } from '@vuelidate/validators'
// import dashboard from '~/layouts/dashboard.vue';
import axios from 'axios';
import { useMainStore } from "../../../store";
import {
  getAccount,
  signMessage,
  getChainId,
} from "@wagmi/core";
import Web3 from "web3";
import { network_id } from "../../../web3/constants/network_id";

//--------------------------------------------- imports end -----------------------------------------------
export default {
  setup() {
    //----------------------------------------------variables start --------------------------------------------
    definePageMeta({
      layout: "dashboard",
      middleware: ["auth"],
    });
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
    const items = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']
    let step = ref(1);
    const successUpload = ref(false);
    const state = reactive({
      isBookModel: false,
      isGameModel: false,
      isAppModel: true,
      appGenreItemsvalue: [],
      genreNameAndId: {},
      appGenreItems: [],
      userInfo: {},
    });

    const rules = reactive({
      fileValidation: (value) => {
        if (value == null || value.length == 0) {
          return "Please Select File For Upload.";
        }
        else {
          return true
        }

      },
      appName: (value) => {
        if (!value) {
          return 'This field is required.'
        }
        else if (value.length > 30) {
          return "this field must be less than 30 characters."
        }
        else {
          return true
        }
      },
      appDescription: (value) => {
        if (!value) {
          return "This field is required."
        }
        else if (value.length > 150) {
          return "This field must be less than 150 characters"
        }
        else {
          return true
        }
      },
      versionName: (value) => {
        if (!value) {
          return 'This field is required.'
        }
        else if (value.length > 20) {
          return "this field must be less than 20 characters."
        }
        else {
          return true
        }
      },
      versionDescription: (value) => {
        if (!value) {
          return 'This field is required.'
        }
        else if (value.length > 40) {
          return "this field must be less than 40 characters."
        }
        else {
          true
        }
      },
      appPrice: (value) => {
        const pattern = /(([0-9]*[.])?[0-9]$)/
        return pattern.test(value) || 'plase Fill The field With numbers.'
      },
    });
    const formRef = ref(null)
    const secondFormRef = ref(null)
    const thirdFormRef = ref(null);
    const fourthFormRef = ref(null);
    const { $auth, $walletConnect } = useNuxtApp();
    const { modal } = $walletConnect();
    const router = useRouter();
    const loading = ref(false);
    const appPrice = ref(null);
    const userToken = ref(null);
    const iconFile = ref([]);
    const trailerFile = ref([]);
    const appFile = ref([]);
    const bannerFile = ref([]);
    const fileRecordsForUpload = ref([]);
    const appName = ref(null);
    const author = ref(null);
    const appDescription = ref(null);
    const versionName = ref(null);
    const versionDescription = ref(null);
    const appGenreItemsvalue = ref([]);
    const isBookModel = ref(false);
    const isGameModel = ref(false);
    const isAppModel = ref(true)
    const walletAddress = ref('');
    const chainId = ref('');
    const versionId = ref('1fdfb309-1a65-4b79-9f14-73d038fde5c5')
    //------------------------------------------------variables end -----------------------------------------------
    //------------------------------------------------- functions start -------------------------------------------
    const goToSecondStep = () => {
      formRef.value.validate().then((item) => {
        if (item.valid == true) {
          step.value++
        }
        else {
          return;
        }
      })
    }
    const goToThirdStep = () => {
      secondFormRef.value.validate().then((item) => {
        if (item.valid == true) {
          step.value++;
        }
        else {
          return;
        }
      })
    }
    const goTofourthStep = () => {
      thirdFormRef.value.validate().then((item) => {
        if (item.valid == true) {
          step.value++;
        }
        else {
          return;
        }
      })
    }
    const goToFifthStep = () => {
      fourthFormRef.value.validate().then((item) => {
        if (item.valid == true) {
          step.value++;

        }
        else {
          return;
        }
      })
    }
    const uploadAppOrBook = async () => {
      loading.value = true;
      if (isAppModel.value == true) {
        let contract = await createAppContract();
        let appVersion = await uploadAppInfo(contract, false)

        //post all Files
        await uploadTrailerFile(appVersion);
        await uploadInstallFile(appVersion);
        await uploadImageSliderFiles(appVersion);
        await uploadIcon(appVersion);
        await uploadBannerOrPreview(appVersion);
      }
      else if (isGameModel.value == true) {
        let contract = await createAppContract();
        let appVersion = await uploadAppInfo(contract, true);

        console.log("contract", contract);
        console.log("appVersion", appVersion);



        //post all Files
        await uploadTrailerFile(appVersion);
        await uploadInstallFile(appVersion);
        await uploadImageSliderFiles(appVersion);
        await uploadIcon(appVersion);
        await uploadBannerOrPreview(appVersion);
      }
      else {
        //book
        let contract = await createAppContract();
        let bookVersion = await uploadBookInfo(contract);

        //post all Files
        await uploadInstallFile(bookVersion);
        await uploadImageSliderFiles(bookVersion);
        await uploadIcon(bookVersion);
        await uploadBannerOrPreview(bookVersion);
      }
      loading.value = false;
      step.value = 1;
      successUpload.value = true;
      setTimeout(() => {
        successUpload.value = false;
      }, 5000);
    }
    const uploadTrailerFile = async (versionId) => {
      userToken.value = await $auth.token();

      let formData = new FormData();
      await trailerFile.value.forEach((item) => {
        formData.append('file', item)
      })
      try {
        const res = await axios.post(fileURL + "/api/v1/addFile?subPath=video&type=2&is_public=true&version_id=" + versionId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if (res.status == 200) {
          trailerFile.value = [];
        }
      } catch (error) {
      }

    }
    const uploadInstallFile = async (versionId) => {
      userToken.value = await $auth.token();
      var formData = new FormData();
      await appFile.value.forEach((item) => {
        formData.append('file', item);
      })
      try {
        const res = await axios.post(fileURL + "/api/v1/addFile?subPath=source&type=0&is_public=false&version_id=" + versionId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if (res.status == 200) {
          appFile.value = [];
        }
      } catch (error) {
      }
    }
    const uploadIcon = async (versionId) => {
      userToken.value = await $auth.token();
      var formData = new FormData();
      await iconFile.value.forEach((item) => {
        formData.append('file', item)
      })
      try {
        const res = await axios.post(fileURL + "/api/v1/addFile?subPath=icon&type=1&is_public=true&version_id=" + versionId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if (res.status == 200) {
          iconFile.value = [];
        }
      } catch (error) {
      }

    }
    const uploadBannerOrPreview = async (versionId) => {
      userToken.value = await $auth.token();
      let formData = new FormData();
      await bannerFile.value.forEach((item) => {
        formData.append('file', item)
      })
      try {
        const res = await axios.post(fileURL + "/api/v1/addFile?subPath=banner&type=3&is_public=true&version_id=" + versionId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if (res.status == 200) {
          bannerFile.value = [];
        }
      } catch (error) {
      }
    }
    const uploadImageSliderFiles = async (versionId) => {
      userToken.value = await $auth.token();
      try {
        fileRecordsForUpload.value.forEach(async (item, index) => {
          let formData = new FormData();
          formData.append('file', item)
          const res = await axios.post(fileURL + "/api/v1/addFile?subPath=silder&type=4&is_public=true&version_id=" + versionId, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + userToken.value
            }
          })
          if (index == fileRecordsForUpload.value.length - 1) {
            if (res.status == 200) {
              fileRecordsForUpload.value = [];
            }
          }
        })
      } catch (error) {
      }
    }
    const getAllGenres = async () => {
      try {
        const res = await axios.get(baseURL + "/api/v1/getAllGenres/1/50", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          },
        })

        res.data.forEach((item) => {
          state.appGenreItems.push({
            name: item.name,
            id: item.id,
          })
        })
      } catch (error) {
      }
    };
    const uploadAppInfo = async (contract, isGame) => {
      userToken.value = await $auth.token();

      const account = getAccount(modal.wagmiConfig);
      walletAddress.value = account.address;

      console.log('network_id[0][account.chainId]', network_id[0][account.chainId]);
      console.log('userToken.value', userToken.value);

      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      const res = await axios.post(baseURL + "/api/v1/postApp", {
        name: appName.value,
        user_id: "",
        is_game: isGame,
        active: true,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userToken.value
        }
      })
      ///--------------------------------------------------------------------------------

      const getNetWork = await axios.get(baseURL + "/api/v1/getBlockchainNetworkByKey/" + network_id[0][account.chainId],
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          },
        })
      console.log('getNetWork.data ',getNetWork.data);


      ///--------------------------------------------------------------------------------------
      const appNetwork = await axios.post(baseURL + "/api/v1/postAppBlockchainNetwork", {
        app_id: res.data.id,
        blockchain_network_id: getNetWork.data.id,
        contract_address: contract,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userToken.value
        },
      })
      ///---------------------------------------------------------------------------------------
      const resAppDetails = await axios.post(baseURL + "/api/v1/postAppOrBookDetails", {
        app_id: res.data.id,
        about: appDescription.value,
        price: appPrice.value
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          },
        })
      ///-------------------------------------------------------------------------------------------
      const resGenre = await axios.post(baseURL + "/api/v1/postAppOrBookGenre", {
        app_id: res.data.id,
        genre_id: appGenreItemsvalue.value
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          },
        })
      ///-----------------------------------------------------------------------------------------------
      const appVersion = await axios.post(baseURL + "/api/v1/postVersion", {
        app_id: res.data.id,
        name: versionName.value,
        description: versionDescription.value,
        version_number: 1,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userToken.value
        },
      })

      console.log("appVersion", appVersion);



      if (res.status == 200) {
        appName.value = "";
        appPrice.value = "";
        appDescription.value = ""
        versionDescription.value = "";
        versionName.value = "";
        appGenreItemsvalue.value = []
      }
      return appVersion.data.id;

    }
    const uploadBookInfo = async (contract) => {
      userToken.value = await $auth.token();
      try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const res = await axios.post(baseURL + "/api/v1/postBook", {
          name: appName.value,
          author: author.value,
          contract_address: contract,
          user_id: "",
          active: true,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //------------------------------------------------------------------
        const getNetWork = await axios.get(baseURL + "/api/v1/getBlockchainNetworkByKey/" + contractState.blockchainNetwork, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //--------------------------------------------------------------------
        const bookNetwork = await axios.post(baseURL + "/api/v1/postBookBlockchainNetwork", {
          book_id: res.data.id,
          blockchain_network_id: getNetWork.data.id,
          contract_address: contract,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //--------------------------------------------------------------------------
        const resBookDetials = await axios.post(baseURL + "/api/v1/postAppOrBookDetails", {
          book_id: res.data.id,
          about: appDescription.value,
          price: appPrice.value
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //------------------------------------------------------------------------------
        const resGenre = await axios.post(baseURL + "/api/v1/postAppOrBookGenre", {
          book_id: res.data.id,
          genre_id: appGenreItemsvalue.value
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //--------------------------------------------------------------------------------
        const bookVersion = await axios.post(baseURL + "/api/v1/postVersion", {
          book_id: res.data.id,
          name: versionName.value,
          description: versionDescription.value,
          version_number: 1
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if (res.status == 200) {
          appGenreItemsvalue.value = [];
          appName.value = '';
          author.value = '';
          appDescription.value = '';
          versionName.value = '';
          versionDescription.value = '';
        }
        return bookVersion.data.id
      } catch (error) {
      }
    }
    const switchChange = (type) => {
      if (type === 'app') {
        isAppModel.value = true
        isBookModel.value = false
        isGameModel.value = false
      } else if (type === 'game') {
        isGameModel.value = true;
        isAppModel.value = false
        isBookModel.value = false
      } else {
        //book
        isBookModel.value = true
        isAppModel.value = false
        isGameModel.value = false
      }
    };
    const backToPreviousStep = () => {
      step.value--;
      if (appPrice.value || appFile.value || trailerFile.value || iconFile.value || bannerFile.value || fileRecordsForUpload.value) {
        appPrice.value = null;
        appFile.value = null
        trailerFile.value = null;
        iconFile.value = null;
        bannerFile.value = null

      }

    }
    //---------------------------------------------------- functions end -------------------------------------------
    //---------------------------------------------- blockChain Function start ------------------------------------
    const createAppContract = async () => {
      const account = getAccount(modal.wagmiConfig);
      walletAddress.value = account.address;
      try {
        if (account.connector != null) {
          setNetWork(network_id[0][account.chainId]);
          let web3 = new Web3(await account.connector.getProvider());

          let DappetizeTokenContract = new web3.eth.Contract(contractState.dappetizeTokenAbi, contractState.dappetizeTokenAddress);
          let appContractFactory = new web3.eth.Contract(contractState.appContractFactoryAbi, contractState.appContractFactoryAddress);

          let decimals = await DappetizeTokenContract.methods.decimals().call();

          let price = parseInt(appPrice.value) * parseInt(10 ** parseInt(decimals));

          //const amountToSend=web3.utils.toWei(amount,"ether")
          const amountToSend = '0'

          let contract = null;
          try {
            contract = await appContractFactory.methods.createAppContract(
              price,
              appName.value,
              contractState.contractOptionsAddress,
              contractState.dappetizeTokenAddress,
              contractState.nftContractAddress,
              contractState.downloadNFTAddress,
              appDescription.value
            ).send({
              from: walletAddress.value,
              value: amountToSend
            })
            const createContractAddress = contract.events.createContractAddressEvent.returnValues[0]
            return createContractAddress
          } catch (error) {
          }
        }
        else {
        }
      } catch (error) {
      }

    }
    //---------------------------------------------- blockchain function end --------------------------------------
    //-----------------------------------------------events start ------------------------------------------------
    onMounted(async () => {
      await $auth.isLoggedIn();
      const account = getAccount(modal.wagmiConfig);
      state.userInfo = await $auth.getUser();
      await getAllGenres()
    });
    //------------------------------------------------- events end ----------------------------------------------
    return {
      //---------------- variables start --------------------
      state,
      secondFormRef,
      thirdFormRef,
      fourthFormRef,
      items,
      formRef,
      step,
      rules,
      iconFile,
      trailerFile,
      appFile,
      loading,
      appPrice,
      bannerFile,
      fileRecordsForUpload,
      appName,
      author,
      appDescription,
      versionName,
      versionDescription,
      appGenreItemsvalue,
      isAppModel,
      isBookModel,
      isGameModel,
      successUpload,
      //---------------- variables end --------------------
      //------------ functions start --------------------
      // uploadAppOrBook,
      goToSecondStep,
      goToThirdStep,
      goTofourthStep,
      goToFifthStep,
      switchChange,
      uploadAppOrBook,
      uploadIcon,
      uploadTrailerFile,
      uploadInstallFile,
      uploadBannerOrPreview,
      uploadImageSliderFiles,
      createAppContract,
      uploadAppInfo,
      uploadBookInfo,
      backToPreviousStep,
      //------------ functions end -----------------------
    }

  }
}
</script>

<style scoped>
/* body{
  color: #1b1825;
} */
@media screen and (max-width:1280px) {
  .main-container {
    left: 0% !important;
    top: 2% !important;
  }
}

@media only screen and (max-width: 960px) {
  .conatiner-stepper {
    margin-top: 2rem;
    width: 80%;
  }

  .main-container {
    left: 0% !important;
    width: 100% !important;
    top: 0 !important;
  }

  .conatiner-stepper {
    width: 77vw !important;
  }
}

@media only screen and (max-width: 600px) {
  .main-container {
    left: 11% !important;
    width: 79% !important;

  }

  .choose-type {
    /* margin: 0px !important; */
    /* margin-right: 36px !important; */
    margin: 12px;
  }

  .end-of-action-btn {
    flex-wrap: wrap;
  }

  .conatiner-stepper :deep(.v-stepper-window) {
    margin: 1rem !important;
  }

  .switch-btn-container {
    margin-left: -12px;
  }

  .row-res {
    margin-top: 0px !important;
  }

  .conatiner-stepper :deep(.v-stepper-item__title) {
    display: none !important;
  }

  .v-card-second :deep(.v-switch .v-label) {
    padding-inline-start: 0px;
  }

  .choose-type :deep(.v-selection-control) {
    display: flex !important;
    flex-direction: column !important;
    align-items: self-start;
  }
}

@media only screen and (min-width: 600px) {
  .v-card-second :deep(.v-switch) {
    flex-direction: column !important;
  }
}

.main-container {
  left: 16%;
  width: 92%;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.custom-step :deep(.v-stepper__label) {
  color: white;
}

.v-stepper {
  width: 90%;
  /* height: 750px; */
  background-color: #312351;
}

.v-card-second {
  border: none !important;
  background-color: rgba(255, 255, 255, 0.274);
}

.main-container :deep(.v-stepper-header) {
  margin-bottom: 10px !important;
}

.v-card {
  background-color: transparent;
  border: 1px solid black;
}

.action-step {
  color: white;
  background-color: #6447A5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #6447A5;
  margin-top: 0.8rem;
}

.conatiner-stepper :deep(.v-stepper-header) {
  color: white;
}

.conatiner-stepper :deep(.v-stepper-actions) {
  display: none;

}

.conatiner-stepper :deep(.v-avatar) {
  background: rgba(0, 0, 0, 0.38);
}

.conatiner-stepper :deep(.v-stepper-item--selected .v-stepper-item__avatar.v-avatar) {
  background-color: rgb(100, 71, 165);
}

.conatiner-stepper :deep(.v-stepper-item__title) {
  color: white !important;
}

.conatiner-stepper :deep(.v-stepper-item__content) {
  color: white !important;
}

.conatiner-stepper {
  width: 71vw;
  left: 26%;
}

.deatail :deep(.v-field--center-affix .v-label.v-field-label) {
  color: white !important;
}

.deatail :deep(.mdi-paperclip::before) {
  color: white;
}

.conatiner-stepper :deep(.v-stepper-item__title) {
  color: white !important;
}

.genre-input :deep(.v-field--center-affix .v-label.v-field-label) {
  color: white !important;
}

.genre-input :deep(.v-select__selection-text) {
  color: white;
}

.switch-btn-container :deep(.v-switch) {
  color: white;
}

.conatiner-stepper :deep(.v-stepper-item) {
  pointer-events: none;
}
</style>