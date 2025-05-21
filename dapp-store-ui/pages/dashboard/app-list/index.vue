btn-in-table<template>
<div class="main-container">
  <v-container class="table-container">
<v-row>
  <v-col style="overflow-x: auto;">
<v-table class="table-apps">
  <thead>
    <tr class="title-table">
             <th v-for="item in state.tableHeaders" :ket="item" class="text-center">
            {{ item }}</th>
      </tr>
  </thead>
  <tbody>
<tr class="deatail-table" v-for="app in state.apps" :key="app">
  <td class="text-center"> 
    <img class="avatar" :src="app.img" /> 
  </td>
  <td class="text-center">{{ app.name }}</td>
  <td class="text-center">{{ app.contractAddress }}</td>
  <td class="text-center">{{ app.version }}</td>
  <td class="text-center">{{ app.rate }}</td>
  <td class="text-center">{{ app.downloadNumber }}</td>
  <td class="text-center">{{ app.appRank }}</td>
  <td class="td-edit" v-if="app.active" @click="updateAppStatus(false,app.id)"> <v-btn style="font-size: 13px;" class="dactive-btn"> Deactivate </v-btn> </td>
  <td class="td-edit" v-if="!app.active" @click="updateAppStatus(true,app.id)"> <v-btn style="font-size: 13px;"  class="btn-in-table"> Activate</v-btn> </td>
  <td class="td-edit"> <v-btn  class="btn-in-table" @click.prevent="goToDeveloperEditApp(app.id,app.isGame)">Edit</v-btn></td>
</tr>
  </tbody>
</v-table>
  </v-col>
</v-row>
<v-row v-if="showPaging">
  <v-col>
    <div class="text-center">
      <v-pagination v-model="skip" :length="allPage" :total-visible="7"></v-pagination>
    </div>
  </v-col>
</v-row>
  </v-container>
</div>
</template>

<script>
 //------------------------------------------------------------------- imports start -----------------------------------------------------------------
import {ref,reactive,onMounted,onUnmounted } from "vue";
import { useMainStore } from "~/store";
import axios from 'axios';
 //------------------------------------------------------------------- imports start -----------------------------------------------------------------
export default {
setup(){
  //------------------------------------------------------------------- varaibles start -----------------------------------------------------------------
definePageMeta({
  layout:'dashboard',
  middleware: ["auth"],
});
  const state=reactive({
    apps:[],
    userInfo:{},
    tableHeaders:['Avatar','Name','Contract Address','Version','Rating','Number Of DI','Rank','','']
  })
  const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();
    const { $auth, $walletConnect } = useNuxtApp();

let showPaging = ref(false);
const skip = ref(1);
const take=ref(5)
const userToken=ref(null)
let allPage=ref(0);
  //------------------------------------------------------------------- varaibles end -----------------------------------------------------------------   
//----------------------------------- functions start ------------------------------------------------
const getAppsOfUser=async()=>{
  userToken.value=await $auth.token();
  try {
    const res = await axios.get(baseURL+"/api/v1/getAppsofUser/"+skip.value+"/"+take.value,{
      headers:{
            'Content-Type': 'application/json',
            "Authorization":"Bearer " + userToken.value
          }
    })
    state.apps=[];
    try {
      res.data.forEach((item)=>{
        const [firstRelation]=item.appsVersionsModelRelation;
        if(firstRelation!=null)
        {
          let img=firstRelation.versionsFilesModelRelation.find((x)=>x.type==1)
          const blockChainRelation=item.appBlockchainRM;
        const appVersion=item.appsVersionsModelRelation;
        appVersion.find((x)=>x.version_number);
        let rating=item.rating / item.ratingNumber;
        if(!rating || Number.isNaN( rating))
        {
          rating=0
        }
        rating=rating.toFixed(2)
        if(img)
        {
          state.apps.push({
            id:item.id,
            active:item.active,
            name:item.name,
            contractAddress: item.appBlockchainRM[0].contract_address,
            version:appVersion[0].version_number,
            downloadNumber: item.downloadNumber,
            rate:rating,
            isGame:item.is_game,
            img:fileURL+"/api/v1/downloadFileByName/"+img.name+"/"+img.path+"/"+img.extension
          })
        }
        }
      })
      
    } catch (error) {
    }
  } catch (error) {
  }
}
const goToDeveloperEditApp=(id,flag)=>{
  return navigateTo({
    path:'edit-app',
    query:{
      appId:id,
      isGame:flag
    }
  })
} 
const updateAppStatus= async(status,id)=>{
  userToken.value=await $auth.token();
  try {
    const res=await axios.put(baseURL+"/api/v1/updateApp/"+id,{
      active:status,
      user_id:"",
    },{
      headers:{
            'Content-Type': 'application/json',
            "Authorization":"Bearer " + userToken.value
          }
    })
    if(res.status==200)
    {
      await getAppsOfUser();
    }
  } catch (error) {
  }
}
// --------------------------------------- functions end ------------------------------------------
//-------------------------------- events start -------------------------------------------------
onMounted(async()=>{
  await $auth.isLoggedIn();
 state.userInfo=await $auth.getUser();
 await getAppsOfUser();
})
// ----------------------------------- events end ------------------------------------------------
    
return{
  //-----variables start-------
  state,
  //-----variables end--------
  //-----functions start--------
  showPaging,
  goToDeveloperEditApp,
  skip,
  allPage,
  updateAppStatus,
  //---------functions end-------
  
}
}
}
</script>

<style scoped>
body {
  background-color: #1b1825 !important;
}

.main-container {
  background-color: #312351;
  left: 26% ;
  width: 70vw ;
/* height: 1000px; */
height: 25vw;
min-height: 450px;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
}
.table-container{
  width: 71vw;
    margin-top: 1rem;
    width: 100%;
    /* height: 100%; */
  /* height: 750px; */
  background-color: #312351;
  margin: 1rem 0;
}
.td-avatar {
  /* border-left: 1px solid white; */
  border: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #312351;
}
.v-application .avatar {
  width: 40px;
  height: 41px;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.623);
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 74, 74, 0.705);
}
.table-apps{
 background-color: #312351;
 /* margin-left:  14rem;  */
}
.td-text{
  border: none !important;
}
.deatail-table{
  color: #808080;
  text-align: center;
}
.title-table{
  color: white;
}
.table-apps :deep(th) {
  color:white;
}
.v-table > .v-table__wrapper > table {
    width: 100%;
    border-spacing: 5px !important;
   
}
.btn-in-table{
  background: linear-gradient(
    71deg,
    rgba(116, 0, 184, 1) 0%,
    rgba(83, 144, 217, 1) 100%
  ) !important;
  width: 84px !important;
  height: 32px !important;
  border-radius: 24px !important;
  color: white !important;
  letter-spacing: 0px !important;
}
.dactive-btn{
  background-color: #dc3545 !important;
  width: 84px !important;
  height: 32px !important;
  border-radius: 24px !important;
  color: white !important;
  letter-spacing: 0px !important;
}
@media  screen and (max-width: 1280px) {
  .table-container {
    max-width: 100%;
  }
  .main-container{
    left: 8% !important;
    top: 2% !important;
    width: 80%;
  }
}
@media only screen and (max-width: 960px){
  .main-container{
    left: 10% !important;
    top: 4% !important;
    width: 80% !important;
  }
  
}
@media only screen and (max-width: 600px){
  .td-edit{
    padding: 0px 3px !important;
  }
  
  .text{
    padding: 0px 3px !important;
  }
  .td-text{
    padding: 0px 3px !important;
  }
}
</style>