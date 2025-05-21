<template>
  <div>
  <div class="main-container">
    <v-container class="table-container">
      <v-row>
        <v-col style="overflow-x: auto">
          <v-table class="table-apps">
            <thead>
              <tr class="title-table">
                <th v-for="item in state.tableHeaders" :ket="item" class="text-center">
          {{ item }}</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border:1px solid white !important" class="deatail-table" v-for="app in state.apps" :key="app">
                <td class="td-avatar">
                  <img class="avatar" :src="app.img" />
                </td>
                <td class="td-text">{{ app.name }}</td>
                <td class="td-text">{{ app.rate }}</td>
                <td class="td-edit">
                  <v-btn class="btn-in-table" @click="goToAppDetails(app.id,app.isGame)"> Get </v-btn>
                </td>
                <td class="td-edit">
                  <v-btn class="btn-in-table" @click="removeAppFromWishList(app.wishListId)"> Remove </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row v-if="showPaging">
        <v-col>
          <div class="text-center">
            <v-pagination
              v-model="skip"
              :length="allPage"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</div>
</template>

<script>
import {ref,reactive,onMounted,onUnmounted} from "vue";
import { useMainStore } from "~/store";
import axios from 'axios';
import auth from "~/plugins/auth";
export default {
  setup(){
  definePageMeta({
    layout:'dashboard',
  })
  //variables
  const {
    baseURL,
    fileURL,
    gatewayWS,
    wsPort,
    setWebsocketClient,
    getWebsocketClient,
  } = useMainStore();
  const { $auth, $walletConnect } = useNuxtApp();
  const router=useRouter();
  const state=reactive({
    apps:[],
    userInfo:{},
    tableHeaders:['Avatar','Name','Rating','Get','Remove']
  })
  const showPaging = ref(false);
  const  skip = ref(1);
  const take=ref(5);
  const allPage =ref(0);
  const userToken=ref(null);
  //---------------------------------------------------------------
  //functions
  const goToAppDetails=reactive((id,isGame)=> {
      if(isGame==true)
      {
          router.push({
          path:"/game-details",
          query:{gameId:id}
      })
      }
      else{
          router.push({
              path:"/app-details",
              query:{appId:id}
          })
      }
    
  });
  //------------------------------------------------------
  const getAppBelongToUserWishList=async()=>{
      userToken.value=await $auth.token();
      state.apps=[];
      try {
          const res=await axios.get(baseURL+"/api/v1/getAllAppBelongToUserWishList/"+state.userInfo.id,{
              headers:{
          'Content-Type': 'application/json',
          "Authorization":"Bearer " + userToken.value
        }
          })
         
          res.data.forEach(async(item)=>{
              const versionRelation=item.appsVersionsModelRelation[0];
              const fileRelation=versionRelation.versionsFilesModelRelation
              let rating = item.rating / item.ratingNumber
          if (!rating || Number.isNaN(rating) ) {
            rating = 0
          }
          rating = rating.toFixed(2)
              //--------------------------------------------------------------
              const img=fileRelation.find((item)=>item.type==1)
              state.apps.push({
                  id:item.id,
                  name:item.name,
                  rate:rating,
                  isGame:item.is_game,
                  img:fileURL+"/api/v1/downloadFileByName/"+img.name+"/"+img.path+"/"+img.extension,
                  wishListId:await getWishListId(item.id)
                 
              })
              
          })
          
      } catch (error) {
      }
  }
  //-------------------------------------------------
  const removeAppFromWishList=async(id)=>{
    userToken.value=await $auth.token();
    try {
      const res= await axios.delete(baseURL+"/api/v1/deleteWishList/"+id,{
        headers:{
          'Content-Type': 'application/json',
          "Authorization":"Bearer " + userToken.value
        }
      })
      if(res.status==200)
      {
       await getAppBelongToUserWishList();
      }
    } catch (error) {
    }
  }
  //-----------------------------------------------------
  const getWishListId=async(id)=>{
    userToken.value=await $auth.token();
    try {
      const res=await axios.get(baseURL+"/api/v1/getWishListIdByAppId/"+id,{
        headers:{
          'Content-Type': 'application/json',
          "Authorization":"Bearer " + userToken.value
        }
      })
      return res.data.id
    } catch (error) {
    }
  }
  //------------------------------------------------------
  onMounted(async()=>{  
    await $auth.isLoggedIn();
    state.userInfo=await $auth.getUser();
      await getAppBelongToUserWishList();
  })
  return{
        //variables
      state,
      showPaging,
      skip,
      allPage,
      //functions
      goToAppDetails,
      removeAppFromWishList,
  }
}

}
</script>

<style scoped>
body {
background-color: #1b1825 !important;
}
@media only screen and (max-width: 1280px) {
.table-container {
  max-width: 100%;
}
}
@media only screen and  (max-width: 992px){
.main-container{
  left: 10% !important;
  margin-top: 2rem !important;
  width: 80% !important ;
  
}

.text{
  text-align: center;
}

}
@media only  screen and  (max-width: 768px){
.main-container{
  left: 10% ;
  margin-top: 2rem ;
  width: 81% ;
}
.deatail-table :v-deep(.td-text) {
  padding: 0px 6px ;
}
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
.table-container{
width: 71vw;
  
  margin-top: 1rem;
  width: 100%;
  /* height: 100%; */
/* height: 750px; */
background-color: #312351;
margin: 1rem 0;
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
.td-avatar {
/* border-left: 1px solid white; */
border: none;
border-top-left-radius: 10px;
border-bottom-left-radius: 10px;
background-color: #312351;
}
.v-application .avatar {
width: 50px;
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
.btn-in-table {
border-radius: 24px;
background: linear-gradient(#7400B8,#5390D9);
color: white;
padding:13.88px,92.57px,13.88px ;
}
</style>
<style>
.v-table > .v-table__wrapper > table {
  border-spacing: 13px !important;
}
</style>