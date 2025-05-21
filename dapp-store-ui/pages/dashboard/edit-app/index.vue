<template>
  <div class="main-container">
    <v-stepper class="conatiner-stepper" editable disabled :items="items" v-model="step" prev-text="Back" next-text="Continue"
       >
      <template v-slot:item.1>
        <v-form ref="formRef">
          <v-row>
          <v-col>
            <v-text-field class="mt-5 deatail" dark label="Name" outlined 
            required
            :counter="20"
            maxlength="20"
            v-model="state.appName"
            :rules="[rules.appName]"
              style="color: white;">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field dark label="Description" outlined  v-model="state.appDescription"
              class="deatail" style="color: white;"
              :counter="150"
              :rules="[rules.appDescription]"
              maxlength="150">

            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field class="mt-5 deatail" label="Version Name" outlined 
              v-model="state.versionName" style="color: white;"
              :counter="20"
              :rules="[rules.versionName]"
            maxlength="20">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row><v-col>
            <v-text-field class="mt-5 deatail" label="Version Description" outlined 
              v-model="state.versionDescription" style="color: white;"
              :counter="40"
              :rules="[rules.versionDescription]"
            maxlength="40">
            </v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-end">
          <v-btn  class="action-step white--text" text @click="goToSecondStep();">
            Continue
          </v-btn>
        </div>
        </v-form>
      </template>
      <template v-slot:item.2>
        <v-form ref="secondFormRef">
          <v-row>
          <v-col>
            <v-text-field class="mt-5 deatail" dark label="Price (Dappetize Token)" :rules="[rules.appPrice]"
              v-model="state.appPrice" style="color: #ffffff;" outlined>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col class="switch-btn-container">
            <v-card class="d-flex mb-12 v-card-second">
              <v-switch v-model="state.isAppModel"  class="ma-6" label="App" color="indigo"
                hide-details :readonly="readOnly" ></v-switch>
              <v-switch v-model="state.isBookModel"  class="ma-6" label="Book"
                color="indigo" hide-details :readonly="readOnly" ></v-switch>
              <v-switch v-model="state.isGameModel"  class="ma-6 deatail" label="Game"
                color="indigo" hide-details :readonly="readOnly" ></v-switch>
            </v-card>
          </v-col>
        </v-row> -->
        <div class="d-flex justify-end" >
          <v-btn text class="action-step white--text mr-2" @click="step--"> Back </v-btn>
          <v-btn text class="action-step white--text" @click="goToThirdStep()">
          Continue
        </v-btn>
        </div>
        

        
        </v-form>
      </template>
      <template v-slot:item.3>
        <v-form ref="thirdFormRef">
          <v-row>
          <v-col v-if="!state.isBookModel">
            <p style="color: #ffffff" class="mb-2">Upload App or Game</p>
            <v-file-input dark label="File input" multiple outlined :rules="[rules.fileValidation]" v-model="state.appFile"
            accept=".apk, application/vnd.android.package-archive"
              style="color: #ffffff;" class="deatail"></v-file-input>
          </v-col>
          <v-col v-if="state.isBookModel">
            <p style="color: #ffffff" class="mb-2">Upload  Book</p>
            <v-file-input dark label="File input" multiple outlined :rules="[rules.fileValidation]" v-model="state.appFile"
              accept=".pdf,.epub,.mobi,.azw, .azw3, .djvu, .fb2, .txt, .doc, .docx, .html, .cbr, .cbz"
              style="color: #ffffff;" class="deatail"></v-file-input>
          </v-col>
        </v-row>
        <v-row v-if="!state.isBookModel">
          <v-col>
            <p style="color: #ffffff" class="mb-2">Upload Trailer</p>
            <v-file-input dark label="File input" multiple v-model="state.trailerFiles" class="deatail" outlined accept="video/*"
              :rules="[rules.fileValidation]" style="color: #ffffff;"></v-file-input>

          </v-col>
        </v-row>
        <div class="d-flex justify-end">
          <v-btn text class="action-step white--text mr-2" @click="step--"> Back </v-btn>

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
            <v-file-input dark label="File input" multiple v-model="state.iconFile" class="deatail" outlined
              :rules="[rules.fileValidation]" style="color: #ffffff;"></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p style="color: #ffffff" class="mb-2">Upload Banner</p>
            <v-file-input dark label="File input" multiple v-model="state.bannerFile" outlined :rules="[rules.fileValidation]"
              class="deatail" style="color: #ffffff;"></v-file-input>
          </v-col>
        </v-row>
        <div class="d-flex justify-end">
          <v-btn text class="action-step white--text mr-2" @click="step--"> Back </v-btn>
          <v-btn text class="action-step white--text" @click="goToFifthStep()">Continue</v-btn>
        </div>
        </v-form>
      </template>
      <template v-slot:item.5>
        <v-row>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p style="color: #ffffff">Upload image</p>
            <p style="color: #bababa; font-size: 14px" class="mb-2">
              upload 3 image of your application Hold Shift And Select Image
            </p>

            <div>
              <v-file-input multiple label="File input" v-model="state.fileRecordsForUpload"
              :rules="[rules.fileValidation]"
                style="color: #ffffff;"></v-file-input>
              <br />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end btn-upload-container" >
            <v-btn text class="action-step white--text mr-2" @click="step--"> Back </v-btn>
            <v-btn text @click="updateAppOrBook()" class="action-step white--text" :loading="loading">
              Upload {{ state.fileRecordsForUpload.length }} files
            </v-btn>
          </v-col>
        </v-row>

      </template>
    </v-stepper>
  </div>
</template>

<script>
//---------------------------------------------------------- imports start ------------------------------------------------------
import axios from 'axios';
import {ref , reactive,onMounted,onUnmounted,computed} from 'vue'
import { useMainStore } from "~/store";
import {
  getAccount,
  signMessage,
} from "@wagmi/core";
import Web3 from "web3";
//----------------------------------------------------------- imports end -------------------------------------------------------
export default {
setup(){
  //------------------------------------------------------- variables start -----------------------------------------------------
  definePageMeta({
      layout: "dashboard",
      middleware: ["auth"],
    });
    
    const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
      contractState,
    } = useMainStore();
    const { $auth, $walletConnect } = useNuxtApp();
    const  items=['Step 1', 'Step 2', 'Step 3','Step 4','Step 5']
          let step=ref(1);
          const formRef=ref(null)
    const secondFormRef=ref(null)
    const thirdFormRef=ref(null);
    const fourthFormRef=ref(null);
          const userToken=ref(null);
          const readOnly=ref(true);
          const state= reactive({
            appName:'',
      appDescription:'',
      versionName:'',
      versionDescription:'',
      appDetailsId:"",
      appPrice:null,
      isBookModel: false,
     isGameModel: false,
     isAppModel: false,
     loading:false,
     fileRecords:[],
     fileRecordsForUpload:[],
     trailerFiles: [],
     iconFile:[],
     bannerFile:[],
     appFile:[],
     appGenreItemsvalue: [],
     appId:'',
     bookId:'',
     versionNumber:0,
    });
     let appGenreItems =reactive(['action','sterategy']);
      const isGame=ref(null);
      const { modal } = $walletConnect();
      const walletAddress=ref("");
      const loading=ref(false);
     const rules = reactive({
      fileValidation: (value)=>{
        if(value==null || value.length==0)
        {
          return "Please Select File For Upload.";
        }
        else {
          return true
        }

      },
      appName:(value)=>{
        if(!value)
        {
          return 'This field is required.'
        }
        else if(value.length>20)
        {
          return "this field must be less than 20 characters."
        }
        else{
          return true
        }
      },
      appDescription:(value)=>{
        if(!value)
        {
          return "This field is required."
        }
        else if(value.length>150)
        {
          return "This field must be less than 150 characters"
        }
        else {
          return true
        }
      },
      versionName:(value)=>{
        if(!value)
        {
          return 'This field is required.'
        }
        else if(value.length>20)
        {
          return "this field must be less than 20 characters."
        }
        else{
          return true
        }
      },
      versionDescription:(value)=>{
        if(!value)
        {
          return 'This field is required.'
        }
        else if (value.length>40){
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
    const router = useRouter();
    const route=useRoute();
    //--------------------------------------------------------------- variables end ----------------------------------------------------------------

    // -------------------------------------------------------------- functions start -------------------------------------------------------------
    const goToSecondStep=()=>{ 
      formRef.value.validate().then((item)=>{
        if(item.valid==true)
        {
          step.value++
        }
        else{
          return;
        }
      })
    }
    const goToThirdStep=()=>{
      secondFormRef.value.validate().then((item)=>{
        if(item.valid==true)
        {
          step.value++;
        }
        else{
          return;
        }
      })
    }
    const goTofourthStep=()=>{
      thirdFormRef.value.validate().then((item)=>{
        if(item.valid==true)
        {
          step.value++;
        }
        else{
          return ;
        }
      })
    }
    const goToFifthStep=()=>{
      fourthFormRef.value.validate().then((item)=>{
        if(item.valid==true)
        {
          step.value++;

        }
        else{
          return;
        }
      })
    }
    
    const getCurrentAppOrGame=async()=>
    {
      userToken.value=await $auth.token();
      try {
        const item=await axios.get(baseURL+"/api/v1/getApp/"+state.appId,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        const detailRelation=item.data.appsAppOrBookDetailsModelRelation;
        const versionRelation=item.data.appsVersionsModelRelation[0];
        state.appName=item.data.name;
        state.appDetailsId=detailRelation.id;
        state.appDescription=detailRelation.about;
        state.appPrice=detailRelation.price
        state.versionName=versionRelation.name;
        state.versionDescription=versionRelation.description
        state.versionNumber=versionRelation.version_number;
      } catch (error) {
      }
    }
    const getCurrentBook=async()=>{
      userToken.value=await $auth.token();
      try {
        const res=await axios.get(baseURL+"/api/v1/getBook/"+state.bookId,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        const versionRelation=res.data.booksVersionsModelRelation[0];
        const detailRelation=res.data.booksAppOrBookDetailsModelRelation;
        state.appName=res.data.name;
        state.appDetailsId=detailRelation.id
        state.appDescription=detailRelation.about;
        state.versionName=versionRelation.name;
        state.versionDescription=versionRelation.description;
        state.appPrice=detailRelation.price
        state.versionNumber=versionRelation.version_number;
      } catch (error) {
      }
    }

    const updateAppOrBook=async()=>{
      loading.value=true;
      if(state.appId)
      {

        let contract=await createAppContract();
        let appVersion=await uploadAppInfo(contract);
        
        //post All files For App
        await uploadTrailerFile(appVersion);
        await uploadBannerOrPreview(appVersion);
        await uploadIconFile(appVersion);
        await uploadInstallFile(appVersion);
        await uploadImageSliderFiles(appVersion)

      }
      else {
        let contract=await createAppContract();
        let bookVersion=await uploadBookInfo(contract);

        //post All Files for Book
        await uploadBannerOrPreview(bookVersion);
        await uploadIconFile(bookVersion);
        await uploadInstallFile(bookVersion);
        await uploadImageSliderFiles(bookVersion)
      }
      loading.value=false;
    }

    const uploadInstallFile=async(versionId)=>{
      userToken.value=await $auth.token();
      //--------------------------------------------------------------------------------------------------
      try {
        var formData=new FormData();
        state.appFile.forEach((item)=>{
        formData.append('file',item)
      })
      const res=await axios.post(fileURL+"/api/v1/addFile?subPath=source&type=0&is_public=false&version_id="+versionId,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
      })
      if(res.status==200)
      {
        state.appFile=[];
      }
      } catch (error) {
      }
      //-----------------------------------------------------------------------------------------------------
    }
    const uploadTrailerFile=async(versionId)=>{
     userToken.value=await $auth.token();
      try {
        var formData=new FormData();
        state.trailerFiles.forEach((item)=>{
          formData.append('file',item)
        })
        const res=await axios.post(fileURL+"/api/v1/addFile?subPath=video&type=2&is_public=true&version_id="+versionId,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if(res.status==200)
        {
          state.trailerFiles=[];
        }
     } catch (error) {
     }
    }
    const uploadImageSliderFiles=async(versionId)=>{
      userToken.value = await $auth.token();
      try {
        state.fileRecordsForUpload.forEach(async (item, index) => {
          let formData = new FormData();
          formData.append('file', item)
          const res = await axios.post(fileURL + "/api/v1/addFile?subPath=silder&type=4&is_public=true&version_id=" + versionId, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + userToken.value
            }
          })
          if (index == state.fileRecordsForUpload.length - 1) {
            if (res.status == 200) {
              state.fileRecordsForUpload= [];
            }
          }
        })
      } catch (error) {
      }
    }
    const uploadIconFile=async(versionId)=>{
      userToken.value=await $auth.token();

      try {
        var formData=new FormData();
         state.iconFile.forEach((item)=>{
          formData.append('file',item);
        })
        const res=await axios.post(fileURL+"/api/v1/addFile?subPath=icon&type=1&is_public=true&version_id="+versionId,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if(res.status==200)
        {
          state.iconFile=[];
        }
      } catch (error) {
      }
    }
    const uploadBannerOrPreview=async(versionId)=>{
      userToken.value=await $auth.token();

      try {
        var formData=new FormData();
        state.bannerFile.forEach((item)=>{
          formData.append('file',item);
        })
        const res=await axios.post(fileURL+"/api/v1/addFile?subPath=banner&type=3&is_public=true&version_id="+versionId,formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if(res.status==200)
        {
          state.bannerFile=[];
        }
      } catch (error) {
      }
    }

    const uploadAppInfo=async(contract)=>{
      userToken.value=await $auth.token();
      try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const res=await axios.put(baseURL+"/api/v1/updateApp/"+state.appId,
        {
          name:state.appName,
          user_id:"",
          is_game:JSON.parse(route.query.isGame)
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const getNetWork=await axios.get(baseURL+"/api/v1/getBlockchainNetworkByKey/"+contractState.blockchainNetwork,
        {
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + userToken.value
            },
        })
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const appNetWork=await axios.post(baseURL+"/api/v1/postAppBlockchainNetWork",{
          app_id:state.appId,
          blockchain_network_id: getNetWork.data.id,
          contract_address: contract,
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          },
        })
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const resAppDetails=await axios.put(baseURL+"/api/v1/updateAppDetail/"+state.appDetailsId,{
          app_id:state.appId,
          about:state.appDescription,
          price:state.appPrice
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const appVersion=await axios.post(baseURL+"/api/v1/postVersion",{
          app_id:state.appId,
          name:state.versionName,
          description:state.versionDescription,
          version_number:state.versionNumber+1,
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if(appVersion.status==200)
        {
          state.appName="";
          state.appPrice="";
          state.appDescription="";
        }
        return appVersion.data.id;
      } catch (error) {
      }
    }
    const uploadBookInfo=async(contract)=>{
      userToken.value=await $auth.token();
      try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const res= await axios.put(baseURL+"/api/v1/updateBook/"+state.bookId,{
          name:state.appName,
          user_id:"",
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const getNetWork=await axios.get(baseURL+"/api/v1/getBlockchainNetworkByKey/"+contractState.blockchainNetwork,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const bookNetWork=await axios.post(baseURL+"/api/v1/postBookBlockchainNetwork/",{
          book_id:state.bookId,
          blockchain_network_id: getNetWork.data.id,
          contract_address: contract,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const resBookDetails=await axios.put(baseURL+"/api/v1/updateAppDetail/"+state.appDetailsId,{
          book_id:state.bookId,
          about:state.appDescription,
          price:state.appPrice
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const bookVersion=await axios.post(baseURL+"/api/v1/postVersion/",{
          book_id:state.bookId,
          name:state.versionName,
          description:state.versionDescription,
          version_number:state.versionNumber+1,
        },{
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
        })
        if(bookVersion.status=200)
        {
          state.appName="";
          state.appDescription="";
          state.versionDescription="";
          state.versionName="";
        }
        return bookVersion.data.id
      } catch (error) {
      }
    }
    const switchChange = (type)=>{
      try {
       if(type==true)
       {
        state.isGameModel=true;
        state.isAppModel=false;
        state.isBookModel=false
       }
       else if(type=='book')
       {
        state.isBookModel=true;
        state.isAppModel=false;
        state.isGameModel=false;
       }
       else if (type==false){
        state.isAppModel=true;
        state.isGameModel=false;
        state.isBookModel=false
       }
      } catch (error) {
      }
    };
    //---------------------------------------------------------------- functions end ---------------------------------------------------------------
    //---------------------------------------------- blockChain Function start ---------------------------------------------------------------------
      const createAppContract = async () => {
      await modal.open();
      const account = getAccount(modal.wagmiConfig);
      walletAddress.value = account.address;
      try {
        if (account.connector != null) {
          let web3 = new Web3(await account.connector.getProvider());

          let DappetizeTokenContract = new web3.eth.Contract(contractState.dappetizeTokenAbi, contractState.dappetizeTokenAddress);
          let appContractFactory = new web3.eth.Contract(contractState.appContractFactoryAbi, contractState.appContractFactoryAddress);

          let decimals = await DappetizeTokenContract.methods.decimals().call();

          let price = parseInt(state.appPrice) * parseInt(10 ** parseInt(decimals));

          //const amountToSend=web3.utils.toWei(amount,"ether")
          const amountToSend = '0'

      
          let contract = null;
          try {
            contract = await appContractFactory.methods.createAppContract(
              price,
              contractState.contractOptionsAddress,
              contractState.dappetizeTokenAddress,
              contractState.nftContractAddress,
              contractState.downloadNFTAddress,
              state.appDescription
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
    //---------------------------------------------- blockchain function end -----------------------------------------------------------------------
    //----------------------------------------------------------------- events start ---------------------------------------------------------------
    onMounted( async()=>{
      state.appId=route.query.appId;
      state.bookId=route.query.bookId
      await modal.open();
      const account = getAccount(modal.wagmiConfig);
      if(state.appId)
      {
        await getCurrentAppOrGame();
        const routeValue=JSON.parse(route.query.isGame);
       switchChange(routeValue)
      }
      else{
        await getCurrentBook();
        const routeValueBook=route.query.typeOfItem
        switchChange(routeValueBook);
      }
   
    });
    // ------------------------------------------------------------------ events end ---------------------------------------------------------------
  return{
    //---------variabels start -----
    state,
    loading,
    readOnly,
    secondFormRef,
    thirdFormRef,
    fourthFormRef,
    formRef,
    items,
    step,
    rules,
    definePageMeta,
    userToken,
    //--------functions start -------------
    switchChange,
    goToSecondStep,
    goToThirdStep,
    goTofourthStep,
    goToFifthStep,
    uploadInstallFile,
    updateAppOrBook,
    //---------- functions end -------------

  }  
}
}
</script>

<style scoped>
/* body{
  color: #1b1825;
} */
@media screen and (max-width:1280px) {
  .main-container{
    left: 0% !important;
    top:2% !important;
  }
}
@media only screen and (max-width: 960px){
  .conatiner-stepper{
    margin-top: 2rem ;
    width: 80% ;
  }
  .main-container{
    left: 0% !important;
    width: 100% !important;
    top: 0 !important;
  }

  .conatiner-stepper{
    width: 77vw !important;
  }
}
@media only screen and (max-width: 600px){
  .main-container{
    left: 11% !important;
    width: 79% !important;

  }
  .btn-upload-container{
  flex-wrap: wrap;
 }
  .conatiner-stepper :deep(.v-stepper-item__title) {
  display: none !important;
}
.v-card-second :deep(.v-switch .v-label) {
  padding-inline-start:0px;
}
}
@media only screen and (min-width: 600px) {
 .v-card-second :deep(.v-switch) {
  flex-direction: column  !important;
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
.custom-step :deep(.v-stepper__label)  {
color:white;
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
.main-container :deep(.v-stepper-header)  {
  margin-bottom: 10px !important;
}
.v-card {
  background-color: transparent;
  border: 1px solid black;
}
.action-step{
  color:white;
  background-color: #6447A5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #6447A5;
  margin-top: 0.8rem;
}
.conatiner-stepper :deep(.v-stepper-header){
  color: white;
}
.conatiner-stepper :deep(.v-stepper-actions) {
  display: none;

}
.conatiner-stepper :deep(.v-avatar) {
  background:rgba(0, 0, 0, 0.38);
}
.conatiner-stepper :deep(.v-stepper-item--selected .v-stepper-item__avatar.v-avatar) {
  background-color:rgb(100, 71, 165);
}
.conatiner-stepper :deep(.v-stepper-item__title) {
  color: white !important;
}
.conatiner-stepper :deep(.v-stepper-item__content) {
  color: white !important;
}
.conatiner-stepper{
  width: 71vw;
    left: 26%;
}
.deatail :deep(.v-field--center-affix .v-label.v-field-label) {
  color: white !important;
}
.deatail :deep(.mdi-paperclip::before)  {
  color: white;
}
.conatiner-stepper :deep(.v-stepper-item__title) {
  color: white !important;
} 
.genre-input :deep(.v-field--center-affix .v-label.v-field-label) {
  color:white !important;
}
.genre-input :deep(.v-select__selection-text) {
  color: white;
}
.switch-btn-container :deep(.v-switch) {
  color: white;
}
</style>