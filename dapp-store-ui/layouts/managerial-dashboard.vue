<template>

    <div v-if="isSuperUser" class="page">
      <v-app class="d-flex" style="overflow-x: hidden; background-color: #1b1825;">
      <v-container fluid class="ma-0 container pa-0">
        <v-dialog v-model="openSearch" fullscreen hide-overlay dark transition="dialog-bottom-transition" class="search-mobile">
        <v-card style="background-color:  #1b1825;    display: flex;
    flex-direction: column;
    align-items: start !important;">
   <v-toolbar style="background-color: #1b1825">
    <v-btn icon dark @click="openSearch=false">
              <v-icon style="color: white;">mdi-close</v-icon>
            </v-btn>
            <input type="text" placeholder="search" style="
                width: 100%;
                border: 1px solid rgb(49, 35, 81);
                border-radius: 20px;
                background: rgb(49, 35, 81);
                padding: 8px;
                color: white;
                outline: none;"/>
  </v-toolbar> 
  </v-card>
        </v-dialog>
        <!-- <v-rov>
          <col>
        </v-rov> -->
        <v-row class="responsive d-flex pa-0  " >
          
            <v-col  cols="2" md="2" sm="2" lg="2" xxl="2" class="pa-0 drawer-res-dashboard">        
            <!-- <div class="side-bar-container">
                <div class="side-bar">
                    <div class="logo-container ">
                        <v-img class="logo" style="background-color: transparent;" src="/public/img/dappetizeLogo.png"></v-img>
                        
                    </div>
                    <div class="options-dashboard d-flex flex-column justify-space-around">
                    <div class="deatail-dashboard  d-flex">
                        <v-img class="dashboard-logo" src="/public/svgs/share.4 1.svg"></v-img>
                        <p class="option">Inbox</p>
                    </div>
                    <div class="deatail-dashboard d-flex ">
                        <v-img class="dashboard-logo" src="/public/svgs/Dashboard.svg"></v-img>
                        <p class="option">Wallet</p>
                    </div>
                    <div style="cursor: pointer;"   class="deatail-dashboard  d-flex flex-column">
                        <div @click="listContracts = !listContracts " class="d-flex" style="width: 100%;">
                        <v-img class="dashboard-logo"   src="/public/svgs/Group.svg"></v-img>
                        <p class="option">App contracts</p>
                    </div>
                    <div v-if="listContracts" class="contracts d-flex flex-column" >
                        <div @click="goMainContracts" class="d-flex align-center ml-2" style="width:100%; cursor: pointer;">
                            <div   :class="{ active: mainContracts, unactive: !mainContracts }" ></div>
                            <p class="deatail-contracts">main-contracts</p>
                        </div>
                        <div @click="goSubContracts" style="cursor: pointer; width: 100%;" class="d-flex align-center ml-2" >
                            <div  :class="{ active: subContracts, unactive: !subContracts }" ></div>
                            <p class="deatail-contracts">sub-contracts</p>
                        </div>
                    </div>
                    </div>
                   
                    <div class="deatail-dashboard  d-flex">
                        <v-img class="dashboard-logo" src="/public/svgs/Business, Chart.10 1.svg"></v-img>
                        <p class="option">Analytics</p>
                    </div>
                    <div class="deatail-dashboard  d-flex">
                        <v-img class="dashboard-logo" src="/public/svgs/ticket 1.svg"></v-img>
                        <p class="option">Ticket</p>
                    </div>
                </div>
                </div>
              
            </div> -->
            <v-card class="d-flex flex-column align-center" style="width: 100%;background-color: #312351; height: 100vh;  ">
                <div class="logo-container mt-12 ">
                        <v-img class="logo" style="background-color: transparent;" src="/public/img/dappetizeLogo.png"></v-img>
                        
                    </div>
    <v-layout style="width: 100%;">
      <v-navigation-drawer class="drawer-dashboard "  style="width: 100% ;background-color: inherit; height: 100%; border: none;" theme="dark" >
        <v-list class="container-items d-flex align-center"  color="transparent">
          <v-list-item class="d-flex align-center  option" >
            <img class="icon-option"  src="/public/svgs/share.4 1.svg" alt="Dashboard" />
            <span class="ml-2 mt-1">Inbox</span>
          </v-list-item>
          <v-list-item class="d-flex align-center  option">
            <img class="icon-option"  src="/public/svgs/Dashboard.svg" alt="Dashboard" />
           <span class="ml-2 mt-1"> Wallet</span>
          </v-list-item>
          <v-list-item class="d-flex align-center   option" >
            <div  class="d-flex flex-column align-center">
              
           <div @click="listContracts = !listContracts " class="d-flex align-center" :class="{show : listContracts ,hide : !listContracts}">
            <div  v-if="listContracts" style="background-color: rgba(135, 79, 255, 1);width: 7px; height: 32px ; border-radius: 0px 0px 8px 8px;"></div>
            <img class="icon-option"  src="/public/svgs/Group.svg" alt="Dashboard" />
            <span class="ml-2">App Contracts</span>
           </div>
            <div v-if="listContracts" class="contracts d-flex flex-column" >
                        <v-input type="btn" v-model="page" @click="goMainContracts" class="d-flex align-center ml-2 pt-1 pb-1" style="width:100%; cursor: pointer; background-color: transparent; " value="'main contract'">
                            <div   :class="{ active: mainContracts, unactive: !mainContracts }" ></div>
                            <p class="deatail-contracts">Main Contracts</p>
                        </v-input>
                        <v-input type="btn"  v-model="page"  @click="goSubContracts" style="cursor: pointer; width: 100%; background-color: transparent; " class="d-flex align-center ml-2" value="'sub contract'" >
                            <div  :class="{ active: subContracts, unactive: !subContracts }" ></div>
                            <p class="deatail-contracts">Sub Contracts</p>
                        </v-input>
                    </div>
          </div>
          
          </v-list-item>
         
          <v-list-item class="d-flex align-center  option">
            <img class="icon-option" src="/public/svgs/Business, Chart.10 1.svg" alt="Dashboard" />
            <span class="ml-2">Analytics</span>
          </v-list-item>
          
          <v-list-item class="d-flex align-center option">
            <img class="icon-option"  src="/public/svgs/ticket 1.svg" alt="Dashboard" />
            <span class="ml-2">Ticket</span>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- <v-main style="height: 400px"></v-main> -->
    </v-layout>
  </v-card>
        </v-col>
        <v-col cols="10" md="10" sm="12" lg="10" class="" style="height: 10vh ">
          <v-card
    class="pa-4 d-flex justify-space-between card-of-top-bar"
    style="background-color: #1b1825;"
    flat
  >
    <v-toolbar
    class="d-flex justify-space-between top-bar"
      dense
      floating
     
    >
    <v-btn @click="menu = true " dark icon class="btn-of-dashboard-sm">
    <v-icon style="color: white">mdi-menu</v-icon>
  </v-btn>
    <v-dialog class="btn-of-dashboard-sm drawer-of-dashboard-sm" v-model="menu" style="overflow-x: hidden;" scrollable>
      
      <v-list class="container-items d-flex align-center"  color="transparent">
        <div class="logo-container-modal">
                        <v-img class="logo" style="background-color: transparent;" src="/public/img/dappetizeLogo.png"></v-img>
                        
                    </div>
          <v-list-item class="d-flex align-center  option" style="overflow-x: hidden;" >
            <img class="icon-option"  src="/public/svgs/share.4 1.svg" alt="Dashboard" />
            <span class="ml-2 mt-1">Inbox</span>
          </v-list-item>
          <v-list-item class="d-flex align-center  option">
            <img class="icon-option"  src="/public/svgs/Dashboard.svg" alt="Dashboard" />
           <span class="ml-2 mt-1"> Wallet</span>
          </v-list-item>
          <v-list-item class="d-flex align-center   option" >
            <div  class="d-flex flex-column align-center">
              
           <div @click="listContracts = !listContracts " class="d-flex align-center" :class="{show : listContracts ,hide : !listContracts}">
            <div  v-if="listContracts" style="background-color: rgba(135, 79, 255, 1);width: 7px; height: 32px ; border-radius: 0px 0px 8px 8px;"></div>
            <img class="icon-option"  src="/public/svgs/Group.svg" alt="Dashboard" />
            <span class="ml-2">App contracts</span>
           </div>
            <div v-if="listContracts" class="contracts d-flex flex-column" >
                        <v-input type="btn" v-model="page" @click="goMainContracts " class="d-flex align-center ml-2 pt-1 pb-1" style="width:100%; cursor: pointer; background-color: transparent; " value="'main contract'">
                            <div   :class="{ active: mainContracts, unactive: !mainContracts }" ></div>
                            <p class="deatail-contracts">main contracts</p>
                        </v-input>
                        <v-input type="btn"  v-model="page"  @click="goSubContracts" style="cursor: pointer; width: 100%; background-color: transparent; " class="d-flex align-center ml-2" value="'sub contract'" >
                            <div  :class="{ active: subContracts, unactive: !subContracts }" ></div>
                            <p class="deatail-contracts">sub contracts</p>
                        </v-input>
                    </div>
          </div>
          
          </v-list-item>
         
          <v-list-item class="d-flex align-center  option">
            <img class="icon-option" src="/public/svgs/Business, Chart.10 1.svg" alt="Dashboard" />
            <span class="ml-2">Analytics</span>
          </v-list-item>
          
          <v-list-item class="d-flex align-center option">
            <img class="icon-option"  src="/public/svgs/ticket 1.svg" alt="Dashboard" />
            <span class="ml-2">Ticket</span>
          </v-list-item>
        </v-list>
    </v-dialog>
   
    <!-- <div class="text-center dashboard-sm">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="indigo"
          v-bind="props"
        >
          Menu as Popover
        </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            subtitle="Founder of Vuetify"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="menu = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div> -->
    <p class="page-contracts" style="color:white; min-width: 121px; flex-shrink: 1;">{{ page }}</p>
      <!-- <v-text-field
        prepend-icon="mdi-magnify"
        class="search-bar"
        color="white"
        placeholder="search anything"
        hide-details
        single-line
        style="width: 40%;"
      ></v-text-field> -->
      <div class="d-flex align-center container-search-bar" style="flex-shrink: 1;">
        <v-btn  @click="openSearch=true" icon dark class="icon-search" ><v-icon class="icon-search"  style="color: white;" >mdi-magnify</v-icon></v-btn>
        <input style="color: white; border-radius: 6px" placeholder="search anything" class="search-bar" type="search">
      </div>
      
      <div class="d-flex align-center right-top-bar " style="flex-shrink: 1; gap: 24px;" >
      <button class="bell-icon btn-navbar d-flex justify-center align-center mr-2"  dark> 
        <v-icon class="bell-icon icon-navbar" color="white" style="font-size: 24px;" >mdi-bell-outline</v-icon>
      </button>
      <div class="container-account d-flex align-center justify" >
      <button class="account-icon btn-navbar d-flex justify-center align-center"  icon>
        <v-icon color="white" class="account-icon icon-navbar">mdi-account</v-icon>
      </button>
      <div class="container-detail-page d-flex justify-center">
        <div class="container-account-name">
          <input class="account-name" type="text" disabled :value="nameAccount">
        </div>
        <div> 
          <v-icon style="color: rgba(255, 255, 255, 1);font-size:24px;">mdi-chevron-down</v-icon>
        </div>
      </div>
      <!-- <v-select
    v-model="select.state"
    :hint="`${select.state}, ${select.abbr}`"
    :items="accounts"
    item-title="state"
    item-value="abbr"
    label="flexudio"
    persistent-hint
    return-object
    single-line
    class="container-account"
    style="width:98px; "
  >
</v-select> -->
</div>
</div>
    </v-toolbar>
    <!-- <div v-if="menu" style="position: relative; width: 100%;height: 100vw;  z-index: 10000; right:100%;" class="dashboard-sm">
      <v-card class="d-flex flex-column align-center card-of-dashboard" style="width: 100%;background-color: #312351; height: 100vh;  ">
        <v-btn @click="menu = false"  dark icon style="background-color: transparent; position: absolute;right: 0%;">
          <v-icon style="color: white;z-index: 1000;">mdi-close</v-icon>
        </v-btn>
                <div class="logo-container mt-12 ">
                        <v-img class="logo" style="background-color: transparent;" src="/public/img/dappetizeLogo.png"></v-img>
                        
                    </div>
    <v-layout style="width: 100%;">
      <v-navigation-drawer class="drawer-dashboard "  style="width: 100% ;background-color: inherit; height: 100%; border: none;" theme="dark" >
        <v-list class="container-items d-flex align-center"  color="transparent">
          <v-list-item class="d-flex align-center  option" >
            <img class="icon-option"  src="/public/svgs/share.4 1.svg" alt="Dashboard" />
            <span class="ml-2 mt-1">Inbox</span>
          </v-list-item>
          <v-list-item class="d-flex align-center  option">
            <img class="icon-option"  src="/public/svgs/Dashboard.svg" alt="Dashboard" />
           <span class="ml-2 mt-1"> Wallet</span>
          </v-list-item>
          <v-list-item class="d-flex align-center   option" >
            <div  class="d-flex flex-column align-center">
              
           <div @click="listContracts = !listContracts " class="d-flex align-center" :class="{show : listContracts ,hide : !listContracts}">
            <div  v-if="listContracts" style="background-color: rgba(135, 79, 255, 1);width: 7px; height: 32px ; border-radius: 0px 0px 8px 8px;"></div>
            <img class="icon-option"  src="/public/svgs/Group.svg" alt="Dashboard" />
            <span class="ml-2">App contracts</span>
           </div>
            <div v-if="listContracts" class="contracts d-flex flex-column" >
                        <v-input type="btn" v-model="page" @click="goMainContracts" class="d-flex align-center ml-2 pt-1 pb-1" style="width:100%; cursor: pointer; background-color: transparent; " value="'main contract'">
                            <div   :class="{ active: mainContracts, unactive: !mainContracts }" ></div>
                            <p class="deatail-contracts">main-contracts</p>
                        </v-input>
                        <v-input type="btn"  v-model="page"  @click="goSubContracts" style="cursor: pointer; width: 100%; background-color: transparent; " class="d-flex align-center ml-2" value="'sub contract'" >
                            <div  :class="{ active: subContracts, unactive: !subContracts }" ></div>
                            <p class="deatail-contracts">sub-contracts</p>
                        </v-input>
                    </div>
          </div>
          
          </v-list-item>
         
          <v-list-item class="d-flex align-center  option">
            <img class="icon-option" src="/public/svgs/Business, Chart.10 1.svg" alt="Dashboard" />
            <span class="ml-2">Analytics</span>
          </v-list-item>
          
          <v-list-item class="d-flex align-center option">
            <img class="icon-option"  src="/public/svgs/ticket 1.svg" alt="Dashboard" />
            <span class="ml-2">Ticket</span>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      
    </v-layout>
  </v-card>
    </div> -->
  </v-card>
        </v-col>
        </v-row>
        <slot />
      </v-container>
    </v-app>
    </div>
    <div v-if="isNotSuperUser">
    <v-dialog width="auto" v-model="showModal" style="z-index: -1;" >
      <v-card>
          <v-card-title> Register SuperUser </v-card-title>
          <v-card-text>
            Welcome to Dappetize Sub Contracts
            <br />
            You Are Super User
            <br />
            You must Be Super user To Access To The Contracts And  You must register As Super User.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="backToHome()">Close</v-btn>
            <v-btn color="green darken-1" text @click="logInSuperUser()" >Connect Wallet</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    </div>

    
</template>

<script>
import{ref,reactive} from "vue";
import {
  // watchAccount,
  // disconnect,
  // connect,
  // signMessage,
  getAccount,
  // fetchBlockNumber,
  // getNetwork,
  // fetchBalance,
  // getContract,
  // readContract,
  // watchNetwork,
  signMessage,
  connect,
} from "@wagmi/core";

import { injected } from "@wagmi/connectors";

import { useMainStore } from "~/store";
import Web3 from "web3";
import axios from "axios";
export default{
    setup()
    {
        let listContracts=ref(false);
       let items= reactive([
        {
          name: 'Item #1',
          id: 1,
        },
        {
          name: 'Item #2',
          id: 2,
        },
        {
          name: 'Item #3',
          id: 3,
        },
      ]);
      // let fav= ref(true);
      // let message= ref(false);
      // let hints= ref(true);
      const nameAccount=ref("Elahe Fallahi");
      let openSearch = ref(false);
      let menu= ref(false);
      let select= reactive({ state: 'Flexudio', abbr: 'FL' });
       let accounts= reactive([
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ]);
      let mainContracts=ref(false);
      let subContracts=ref(false);
      const showModal=ref(true)
      const showLogInModal=ref(false)
      const walletAddress=ref(null)
      const isNotSuperUser=ref(true)
      const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();

    const { $auth, $walletConnect } = useNuxtApp();
    let { modal } = $walletConnect();
    const isSuperUser=ref(false);
        //loginSuperUser start

        
        const logInSuperUser= async()=>{
          try {
            modal.open();
            const account=getAccount(modal.wagmiConfig);
            let web3=new Web3(await account.connector.getProvider());
            walletAddress.value=account.address;       
            const response=await axios.get(baseURL+"/generateChallenge",{
              header: {
            "Content-Type": "application/json",
            //     // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
            })
            const message=web3.utils.utf8ToHex(response.data.challenge);
            let hash=web3.utils.sha3(message);
            let signature=await web3.eth.personal.sign(hash,walletAddress.value,"");

            try {
              const res= await $auth.logInSuperUser(
                {
                sessionId:response.data.sessionId,
                signature:signature,
                networkId: "goerli",
              },"/api/v1/logInSuperUser")
              if(res.isSuperUser==true)
              {
                isNotSuperUser.value=false;
                isSuperUser.value=true;
              }
              else{
                isNotSuperUser.value=true;
                isSuperUser.value=false;
              }
            } catch (error) {
              console.log("eror",error);
            }

          } catch (error) {
            
          }
        }

        //loginSuperUser End
        const backToHome=async()=>{
          showModal.value=false;
        await navigateTo("/games")
          window.location.reload();
        }

      const goMainContracts=()=>{
        menu.value=!menu.value;
        mainContracts.value=true;
        subContracts.value=false;
         navigateTo({ path: '/main-contracts' });
         if (mainContracts.value = true){
          return page.value= "Main Contracts";
         };
      };
      const goSubContracts=()=>{
        menu.value= !menu.value;
        mainContracts.value=false;
        subContracts.value=true;
         navigateTo({ path: '/sub-contracts' });
         if(subContracts.value = true){
          return page.value = "Sub Contracts";
         }
         
      };
 
      onMounted(async()=>{
       //modal.open();
      //const account= getAccount(modal.wagmiConfig);
      isSuperUser.value= await $auth.isSuperUserLoggedIn();
      if(isSuperUser.value==true)
      {
        isNotSuperUser.value=false
      }
      })
      let page=ref ("");
        return{
            listContracts,
            showModal,
            backToHome,
            items,
            mainContracts,
            walletAddress,
            subContracts,
            goMainContracts,
            goSubContracts,
            subContracts,
            accounts,
            select,
            page,
            logInSuperUser,
            isSuperUser,
            isNotSuperUser,
            // hints,
            // fav,
            // message,
            menu,
            openSearch,
            nameAccount,
        }
    }
}
</script>

<style scoped>
.search-mobile{
  display: none;
}
.show{
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0px 10px 10px 0px ;
}
/* .drawer-dashboard{
    left: 110% !important;
    width: 100%;
  } */
  
.top-bar{
  display: flex;
  background-color: #1b1825;
  width: 98%;
  margin-left: 16px;
}

.top-bar :deep(.v-toolbar__content){
  width: 100%;
  justify-content:space-between;
  
  /* justify-content: center; */
  
}
.container{
    background-color: #1b1825;   
}
.dashboard-sm{
  display: none;
}
.side-bar-container {
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: #312351;
    position:absolute;
    z-index: 1;
    width: 18.5%;
    height: 97%;
}
.side-bar{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 79%;
    height: 70%;
}
.logo-container{
    width: 62%;
    display: flex;
    justify-content: center;
    margin-top: 24px;
}
.btn-of-dashboard-sm{
  display: none;
}
.dashboard-logo{
    max-width: 24px;
    max-height: 24px;
}
.deatail-dashboard{
    display: flex;
    align-items: center;
}

.contracts{
    width: 100%;
}
.unactive{
    background-color: transparent;
    width: 8px; 
    height: 8px; 
    border-radius: 100%;
    margin-right: 4px;
}
/* .option{
  

} */
.active{
    background-color: white;
    width: 8px; 
    height: 8px; 
    border-radius: 100%;
    margin-right: 4px;
}
.options-dashboard{
    height: 77%;
}
.option{
  gap: 4px;
  width: 67%;
  font-family: Roboto;
font-size: 14px;
font-weight: 500;
line-height: 16.41px;
text-align: left;
color: white;

}
.deatail-contracts{
font-family: Roboto;
font-size: 14px;
font-weight: 500;
line-height: 16.41px;
text-align: left;
color: white;
}
.option :deep(.v-list-item__content){
display: flex;
align-items: center  
}
/* .option :deep(span) {
display: inline-block;
height: 24px;
} */
.logo :deep(.v-img__img){
  width: 51%;
  height: 51%;
}
.container-items{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 60%;
}
/* .search-bar :deep(.mdi-magnify::before) {
color: white;
} */



.container-account{
  gap: 12px;
}
.container-account-name{
  width: 100px;
  max-width: 150px;
}
.account-name {

  font-family: Roboto;
font-size: 12px;
font-weight: 500;
line-height: 14.06px;
text-align: left;
color: rgba(255, 255, 255, 1);
}

/* .search-bar :deep(.v-field__field) {
background-color: #312351;
border-radius: 10px;
height: 23px;
} */
.search-bar  {
background-color: #312351;
/* border-radius: 10px; */
width: 378px;
height: 24px;
padding: 8px;
}
.search-bar :deep(.v-field__input) {
  margin-top: -17px;
  color: white;
 
}
/* .search-bar {
  margin-left: 2rem ;
} */
/* .search-bar :deep(.v-input__details) {
  display: none;
} */



.page-contracts{
  min-width: 112px;
  font-family: Roboto;
font-size: 18px;
font-weight: 500;
line-height: 21.09px;
text-align: left;

}
.btn-navbar{
  flex-shrink: 1;
  border:1px solid rgba(38, 36, 63, 1);
  background-color: rgba(32, 33, 36, 1);
  border-radius: 10px;
  width: 40px;
  height: 40px;
}
.contracts :deep(.v-input__control) {
  align-items: center;
}
.icon-option{
  width: 24px;
  height: 24px;
} 
@media screen and (max-width:1992px) and (min-width:1280px) {
  .top-bar :deep(.v-toolbar__content){
    /* gap: 12vw; */
  }
  
}
@media only screen and (max-width:1280px) and (min-width:960px) {
  .top-bar :deep(.v-toolbar__content){
    justify-content: space-between;
  }
  .container-search-bar{
    width: 29.5vw;
  }
  .search-bar{
    width: 320px;
  }

    .drawer-dashboard{
    left: 110% !important;
    width: 100%;
  }
  .top-bar{
    /* width: 100% !important; */
    width: 95%;
    margin-left: -8px;
  }
  .icon-search{
  width: 18px !important;
  margin-right: 4px;
}
  .page-contracts{
    font-size: 16px;
  }
  .option{
    font-size: 1.1vw;
    line-height: 1.5vw;
  }
  .icon-option{
    width: 2vw;
    height: 2vw;
  }
  .deatail-contracts{
    font-size: 1.1vw;
  }
  .logo :deep(.v-img__img){
  width: 10vw;
  height: 2.5vw;
}
/* .card-of-top-bar{
  padding-left: 0px !important;
} */
.right-top-bar{
  gap:0px !important;
}
.container-items{
  height: 73%;
}


  }
@media only screen and (max-width: 960px) and (min-width:600px) {
  .search-mobile{
    display: initial;
  }
  .btn-navbar{
    width: 24px;
    height: 24px;
  }
  .icon-navbar{
    font-size: 18px !important;
  }
  .card-of-top-bar{
    padding: 0px !important;
  }

  .page-contracts{
    font-size: 14px;
  }
  .icon-search{
  width: 18px !important;
  margin-right: 4px;
}
.btn-of-dashboard-sm{
  display: initial;
 
}
.drawer-of-dashboard-sm{
  width: 33vw;
  right:63%;
}
  .dashboard-sm{
    display: initial;
  }
  .drawer-res-dashboard{
    display: none;
  }
  .drawer-dashboard{
    left: 109% !important;
    width: 40vw !important;
  }
  .drawer-dashboard :deep(.v-main){
    padding-left:1.5rem ;
  }
  .top-bar{
    width: 100%;
    margin-left:0px;
  }
  .top-bar :deep( .v-toolbar__content){
    gap: 0px !important;
  }
  .container-search-bar{
    margin-left: -24px;
  }
  .search-bar{
    width: 230px;
  }
  .card-of-dashboard{
    width: 21vw !important;
    margin-left: -16px;
  }
  .right-top-bar{
    gap:0px !important;
  }
 
.icon-option{
  width: 18px;
}
.option{
  font-size: 12px;
  min-width: 108px;
}
.container-items{
  background-color: #312351;
  height: 52vw;
  min-height: 400px;
}
.logo-container-modal{
  width: 100%;
  
}
.logo{
  width: 55%;
    height: 100%;
    translate: 39%;
}

.logo :deep(.v-img__img) {
  width: 100%;
  height: 100%;
  max-width: 116px;
  max-height: 30px;
  /* min-width: 80px;
  min-height: 80px; */
}
.deatail-contracts{
  font-size: 12px;
}
.container-account-name{
  width: 75px;
}
}
@media only screen and (max-width:600px) {
  .drawer-of-dashboard-sm{
    width: 33vw;
    min-width: 200px;
  }
  .search-mobile{
    display: initial;
  }
  .contracts :deep(.v-input--horizontal){
    width: 100% !important;
  }
  .btn-of-dashboard-sm{
  display: initial;
}
  .dashboard-sm{
    display: initial;
  }
  icon-option{
  width: 18px;
}
.option{
  font-size: 12px;
  min-width: 125px;
}
  .container-items{
  background-color: #312351;
  height: 52vw;
  min-height: 400px;
}
  .logo-container-modal{
  width: 100%;
  
}
  .logo{
  width: 55%;
    height: 100%;
    translate: 39%;
}
  .logo :deep(.v-img__img) {
  width: 100%;
  height: 100%;
}
.deatail-contracts{
  font-size: 12px;
}
  .responsive{
    display: none;
    margin-top: -24px;
    height: 10vh;
  }
  .deatail-contracts{
    font-size: 12px;
  }
  .drawer-res-dashboard{
    display: none
  }
  .btn-of-dashboard-sm{
  display: initial;
  margin-left: 0px !important;
}
  .dashboard-sm{
    display: initial;
  }
  .btn-navbar{
    width: 24px;
    height: 24px;
  }
  .icon-navbar{
    font-size: 18px !important;
  }
  .search-bar{
    display: none;
  }
  .top-bar{
    width: 100%;
    margin-left: 0px ;
  }
  .card-of-top-bar{
    width: 100vw;
    padding: 0px !important;
  }
  .right-top-bar{
    gap: 0px;
  }
  .right-top-bar{
    gap: 0px !important;
  }
  .icon-search{
    width: 18px;
    font-size: 18px;

  }
  .bell-icon{
    font-size: 18px;
    width: 18px;
  }
.account-icon{
  width: 18px;
  font-size: 18px;
}
.page-contracts{
    font-size: 14px;
  }
  .container-account-name{
  width: 75px;
}
}
@media screen and (max-width: 340px) {
 
  .icon-search{
    translate: -1vw;
  }
  .account-icon{
    translate: -1vw;
  }
.bell-icon{
  translate: -1vw;
}
.container-detail-page{
  translate: -6vw;
}

}
</style>