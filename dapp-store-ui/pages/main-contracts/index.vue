<template>
  <div class="container">
    <div class="main-container">
      <v-row class="d-flex">
        <div style="background-color: #312351; height: 90%;" class="d-flex justify-space-between back-ground-main">
          <v-col class="d-flex justify-center flex-wrap out-card" cols="12" md="8" sm="9">
            <div v-for="(app, index) in state.appName" :key="index" class="inner-card">
              <div class="d-flex flex-column align-center card-deatail">
                <div class="d-flex justify-space-between align-center ml-2 mt-2" style="width: 100%">
                  <div class="app"><span>Contract:<span style="margin-left: 2px;">{{ app.name }}</span> </span></div>
                  <div style="height: 17px">
                    <v-checkbox class="btn-app" v-model="app.selected" :value="app.box" style="height: 12px"></v-checkbox>
                  </div>
                </div>
                <div class="d-flex flex-column align-center justify-center">
                  <div class="out-box">
                    <div class="inner-box">
                      <span class="data">{{ app.numb }}</span>
                    </div>
                  </div>
                  <span class="text mt-5 mb-5">{{ app.subject }}</span>
                </div>

                <div class="d-flex flex-column flex-wrap text-test mt-1 ml-2 align-self-start">
                  <div class="d-flex align-center fix">
                    <div class="rounded-circle"></div>
                    <div class="deatail d-flex justify-space-between" style="gap: 12px;"> <span>Transaction Volume:</span> <span >{{ app.transationVolume }}DT</span></div>
                  </div>
                  <div class="d-flex align-center fix">
                    <div class="rounded-circle"></div>
                    <div class="deatail d-flex justify-space-between" style="gap: 12px;"><span>Execution Success Rate:</span><span>{{ app.executionSuccess }}</span></div>
                  </div>
                  <div class="d-flex align-center fix">
                    <div class="rounded-circle"></div>
                    <div class="deatail d-flex justify-space-between" style="gap: 12px;"><span>Call Frequency:</span><span>{{ app.callFrequency }}</span></div>
                  </div>
                  <div class="d-flex align-center fix">
                    <div class="rounded-circle"></div>
                    <div class="deatail d-flex justify-space-between" style="gap: 12px;">
                      <span>Average Transaction Time:</span><span>{{app.averageTransaction}}</span>
                    </div>
                  </div>
                  <div class="d-flex align-center fix">
                    <div class="rounded-circle"></div>
                    <div class="deatail d-flex justify-space-between" style="gap: 12px"><span>Gas Usage:</span><span>{{ app.gasUsage }}</span></div>
                  </div>
                  <div class="d-flex align-center fix">
                    <div class="rounded-circle"></div>
                    <span class="deatail ">Paused Status: {{ app.pausedstatus }}</span>
                  </div>
                  <div class="d-flex align-center fix">
                    <div class="container-btn d-flex justify-space-around">
                      <button class="btn-time">1h</button>
                      <button class="btn-time">24h</button>
                      <button class="btn-time">overall</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col class="d-flex  justify-center col-of-container-btn-work mt-4" cols="12" md="2" sm="2" xs="12" lg="2" xl="3" style="max-width: 20%">
            <div class="d-flex flex-column container-btn-work align-center">
              <v-btn style="color: white" class="btn-work btn-start" @click="startContract()">Start</v-btn>
              <v-btn class="btn-work" @click="stopContract()">Stop</v-btn>
              <v-btn class="btn-work">Update</v-btn>
              <v-btn class="btn-work" @click="getContractTransactionsData()">Deploy</v-btn>
            </div>
          </v-col>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useMainStore } from "../../store";
import { getAccount, signMessage } from "@wagmi/core";
import { network_id } from "../../web3/constants/network_id";

import Web3 from "web3";
export default {
  setup() {
    definePageMeta({
      layout: "managerial-dashboard",
    });
    const state = reactive({
      appName: [
        {
          name: "DappetizeToken",
          selected: false,
          box: 1,
          subject: "Transation Volume DT",
          numb: 0,
          transationVolume: 0,
          executionSuccess: 0,
          callFrequency: 0,
          averageTransaction: 0,
          gasUsage: BigInt(0),
          pausedstatus: false
        },
        {
          name: "AppContractFactory",
          selected: false,
          box: 2,
          subject: "Call Frequency",
          numb: 0,
          transationVolume: 0,
          executionSuccess: 0,
          callFrequency: 0,
          averageTransaction: 0,
          gasUsage: BigInt(0),
          pausedstatus: false
        },
        {
          name: "DownloadNFT",
          selected: false,
          box: 3,
          subject: "Gas Usage",
          numb: BigInt(0),
          transationVolume: 0,
          executionSuccess: 0,
          callFrequency: 0,
          averageTransaction: 0,
          gasUsage: BigInt(0),
          pausedstatus: false
        },
        {
          name: "DappetizeNFT",
          selected: false,
          box: 4,
          subject: "Execution Success rate",
          numb: 0,
          transationVolume: 0,
          executionSuccess: 0,
          callFrequency: 0,
          averageTransaction: 0,
          gasUsage: BigInt(0),
          pausedstatus: false
        },
      ],
    });

    const gradientColors = {};
    let gasSum = BigInt(0);
    const walletAddress = ref(null);
    const { contractState,setNetWork } = useMainStore();
    const { $auth, $walletConnect } = useNuxtApp();
    const { modal } = $walletConnect();

    const getContractTransactionsData = async () => {

      await modal.open();

      const account = getAccount(modal.wagmiConfig);

      walletAddress.value = account.address;
      if (account.connector != null) {
 setNetWork(network_id[0][account.chainId]); 

        //  let web3 = new Web3(await account.connector.getProvider());

        const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/ca3dcffdebc94770bcd32ea4a39d82e1"));
        let contractTransactionsInstance = []
        let contractAbi = [
          contractState.dappetizeTokenAbi, contractState.appContractFactoryAbi, contractState.downloadNFTAbi, contractState.dappetizeNFTAbi];
        let contractAddress = [
          contractState.dappetizeTokenAddress, contractState.appContractFactoryAddress, contractState.downloadNFTAddress, contractState.dappetizeNFTAddress];

        for (let index = 0; index < contractAddress.length; index++) {
          contractTransactionsInstance = await web3.eth.getPastLogs({
            fromBlock: 5700781,
            toBlock: "latest",
            address: contractAddress[index],
          });

          let DappetizeTokenContract = new web3.eth.Contract(
            contractState.dappetizeTokenAbi,
            contractState.dappetizeTokenAddress
          );

          let contractInstance = new web3.eth.Contract(
            contractAbi[index],
            contractAddress[index]
          );
          state.appName[index].pausedstatus = await contractInstance.methods
            .paused()
            .call({
              from: walletAddress.value,
              //value: amountToSend
            });

          if (index == 0) {
            state.appName[index].transationVolume = await DappetizeTokenContract.methods
              .totalSupply(contractAddress[index])
              .call({
                from: walletAddress.value,
                //value: amountToSend
              });
          } else {
            state.appName[index].transationVolume = await DappetizeTokenContract.methods
              .balanceOf(contractAddress[index])
              .call({
                from: walletAddress.value,
                //value: amountToSend
              });
          }

          state.appName[index].callFrequency =
            state.appName[index].callFrequency + contractTransactionsInstance.length;

          for (let i = 0; i < contractTransactionsInstance.length; i++) {

            const appContractInstanceTransactions =
              await web3.eth.getTransaction(
                contractTransactionsInstance[i].transactionHash
              );

            state.appName[index].gasUsage = state.appName[index].gasUsage + appContractInstanceTransactions.gas;

            const appContractInstanceTransactionsStatus =
              // its not working  await web3.eth.getTransactionReceipt(appContractInstanceTransactions.transactionHash);
              await web3.eth.getTransactionReceipt(contractTransactionsInstance[i].transactionHash);


            if (appContractInstanceTransactionsStatus.status) {
              state.appName[index].executionSuccess = state.appName[index].executionSuccess + 1;
            }
          }
          state.appName[index].averageTransaction =
            (state.appName[index].executionSuccess / state.appName[index].callFrequency) * 100;
        }

        state.appName[0].numb = state.appName[0].transationVolume
        state.appName[1].numb = state.appName[1].callFrequency
        state.appName[2].numb = state.appName[2].gasUsage
        state.appName[3].numb = state.appName[3].averageTransaction

      }

    };
    const startContract = async () => {

      let j = 0;
      let array = [];
      let proceed = false;
      for (let i = 0; i < state.appName.length; i++) {

        if (state.appName[i].selected) {
          array[j] = i;
          j++;
        }
      }
      if (array.length == 0) {
        window.alert("select app contract to start selected contract")
        proceed = false
      } else {
        proceed = true
      }
      if (proceed) {

        await modal.open();

        const account = getAccount(modal.wagmiConfig);
        walletAddress.value = account.address;
        setNetWork(network_id[0][account.chainId]);

        try {
          if (account.connector != null) {
            let web3 = new Web3(await account.connector.getProvider());

            let contractsInstance = [];
            let contractsPausedStatus = [];
            let condition = false;
            let contractAbi = [
              contractState.dappetizeTokenAbi, contractState.appContractFactoryAbi, contractState.downloadNFTAbi, contractState.dappetizeNFTAbi];
            let contractAddress = [
              contractState.dappetizeTokenAddress, contractState.appContractFactoryAddress, contractState.downloadNFTAddress, contractState.dappetizeNFTAddress];

            for (let index = 0; index < array.length; index++) {

              contractsInstance[index] = new web3.eth.Contract(
                contractAbi[array[index]],
                contractAddress[array[index]]
              );

              contractsPausedStatus[index] =
                await contractsInstance[index].methods.paused().call({
                  from: walletAddress.value,
                });
              state.appName[index].pausedstatus = contractsPausedStatus[index]
            }
            condition = contractsPausedStatus[0];
            for (let index = 0; index < array.length - 1; index++) {
              condition = condition || contractsPausedStatus[index + 1]
            }
            if (condition == false) {
              window.alert("all selected contracts are running now , please select other contract");
            } else {
              for (let index = 0; index < contractsPausedStatus.length; index++) {

                if (contractsPausedStatus[index] == true) {
                  while (contractsPausedStatus[index] == true) {
                    contractPausedMethods = await contractsInstance[index].methods
                      .unpause()
                      .send({
                        from: walletAddress.value,
                      });
                    contractsPausedStatus[index] = await contractsInstance[
                      index
                    ].methods
                      .paused()
                      .call({
                        from: walletAddress.value,
                      });
                  }
                  state.appName[array[index]].pausedstatus = await contractsInstance[index].methods.paused().call({
                    from: walletAddress.value,
                  });
                }
              }
              window.alert("selected contract is active");
            }
          }
        } catch (error) {
        }
      }
    };
    const stopContract = async () => {

      let j = 0;
      let array = [];
      let proceed = false;
      for (let i = 0; i < state.appName.length; i++) {

        if (state.appName[i].selected) {
          array[j] = i;
          j++;
        }
      }

      if (array.length == 0) {
        window.alert("select your app contract to stop the contracts")
        proceed = false

      } else {
        proceed = true
      }

      if (proceed) {
        await modal.open();

        const account = getAccount(modal.wagmiConfig);
        setNetWork(network_id[0][account.chainId]);
        
        walletAddress.value = account.address;
        try {
          if (account.connector != null) {
            let web3 = new Web3(await account.connector.getProvider());

            let contractsInstance = [];
            let contractsPausedStatus = [];
            let condition = false;

            let contractAbi = [
              contractState.dappetizeTokenAbi, contractState.appContractFactoryAbi, contractState.downloadNFTAbi, contractState.dappetizeNFTAbi];
            let contractAddress = [
              contractState.dappetizeTokenAddress, contractState.appContractFactoryAddress, contractState.downloadNFTAddress, contractState.dappetizeNFTAddress];

            for (let index = 0; index < array.length; index++) {

              contractsInstance[index] = new web3.eth.Contract(
                contractAbi[array[index]],
                contractAddress[array[index]]
              );

              contractsPausedStatus[index] =
                await contractsInstance[index].methods.paused().call({
                  from: walletAddress.value,
                });

              state.appName[index].pausedstatus = contractsPausedStatus[index]
            }
            condition = contractsPausedStatus[0];
            for (let index = 0; index < array.length - 1; index++) {
              condition = condition && contractsPausedStatus[index + 1]
            }

            if (condition == true) {
              window.alert("selected contracts are paused , select other contract");
            } else {
              for (let index = 0; index < contractsPausedStatus.length; index++) {

                if (contractsPausedStatus[index] == false) {
                  while (contractsPausedStatus[index] == false) {
                    const contractPausedMethods = await contractsInstance[index].methods
                      .pause()
                      .send({
                        from: walletAddress.value,
                      });
                    contractsPausedStatus[index] = await contractsInstance[index].methods
                      .paused()
                      .call({
                        from: walletAddress.value,
                      });
                  }
                  state.appName[array[index]].pausedstatus = await contractsInstance[index].methods
                    .paused()
                    .call({
                      from: walletAddress.value,
                    });
                }
              }
              window.alert("selected contracts are paused now");
            }
          }
        } catch (error) {
        }
      }
    };

    onMounted(async () => {
      await $auth.isLoggedIn();
      // await modal.open();
      const account = getAccount(modal.wagmiConfig);
      //state.userInfo = await $auth.getUser();
      //await getContractTransactionsData();


    });

    return {
      state,
      definePageMeta,
      gasSum,
      //function
      stopContract,
      startContract,
      getContractTransactionsData,
    };
  },
};
</script>

<style scoped>


.container {
  position: relative;
  bottom: 47%;
  left: 19%;
}

.out-card {
  /* background-image: url("@/public/img/main-contracts.png"); */
  /* background-position: center; */
  /* background-size: 839px 420px; */
  background-repeat: repeat-y;
  height: 100%;
  gap: 55px;
  background-size: cover;
  width: 100%;
  margin-top: 22px;
}
.card-deatail{
  background-image: url('/public/image/cardOfMain.png');
  max-width: 276px;
                  height: 100%;
                  background-color: white;
                  gap: 1rem;
                  border-radius: 10px;
                  width: 100%;
                  background-position-y: bottom;
    background-size: cover;
}
.btn-start {
  background: linear-gradient(180deg, #874fff 0%, #3f095a 109.37%);
}

.container-btn-work {
  gap: 10px;
}

.btn-work {
  width: 160px;
  height: 48px !important;
  /* top: 323px;
left: 1216px; */
  border-radius: 8px;
  color: #302f3d;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
}

.fix {
  min-width: 136px;
}

.container-btn {
  width: 100%;
  margin-top: 12px;
}

.btn-time {
  width: 33%;
  max-width: 38px;
  font-family: Inter;
  font-size: 9px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: 0em;
  text-align: center;
  color: #7d30d5;
  width: Hug (39px);
  height: Hug (11px);
  top: 290px;
  left: 222px;
  padding: 2px, 10px, 2px, 10px;
  border-radius: 24px;
  gap: 10px;
  background-color: #dfc4ff;
}

.app {
  background: linear-gradient(90deg, #7400b8, #4393f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  align-self: flex-start;
  margin-left:8px;

}

.btn-app {
  margin-top: -20px;
  color: #7400b8;
}

.inner-card{
  display: flex;
  justify-content: center;
  /* height: 300px;
  width: 300px; */
  width: 30%;
  height: 18vw;
  min-height: 385px;
  /* margin-top: 50px; */
}

.text {
  background: linear-gradient(90deg, #7400b8, #4393f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}

.out-box {
  width: 108px;
  height: 108px;
  position: relative;
  border-radius: 50%;

  /* Add the linear gradient background */
  /* background: linear-gradient(135.18deg, #7400b8 52.63%, rgba(116, 0, 184, 0) 73.37%); */

  /* Add the right border */
  border: 2px solid transparent;
  background-clip: padding-box;
  /* Ensure the gradient doesn't cover the border area */
  background-image: linear-gradient(142deg, #7400b8 0%, #ffffff 100%);
}

.inner-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 104.52px;
  height: 104.52px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 48.29999923706055px -9px #7400b8 inset;
}

.data {
  background: linear-gradient(90deg, #7400b8 5.77%, #4393f7 94.23%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
  font-weight: 600;
  font-family: inter;
  line-height: 24.2px;
}

.gradient-border {
  /* Set the border radius to 50% */
  border-radius: 50%;
  /* Set the height and width (adjust as needed) */
  width: 108px;
  height: 108px;
  border: 2px solid transparent;
  background-clip: padding-box;
  /* Ensure the gradient doesn't cover the border area */
  background-image: linear-gradient(142deg, #7400b8 0%, #ffffff 100%);
  position: relative;
}

.text-test{
  gap: 4px;
}
.deatail {
  /* width: 188px; */
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(0, 0, 0, 1);

  /* max-width: 108px; */
}

.rounded-circle {
  border-radius: 50%;
  margin-right: 4px;
  width: 9px;
  height: 9px;
  background: #7d30d5;
}
.back-ground-main{
  width: 81% !important;
}
.fix{
    margin-bottom: 4px;
    
  }
@media screen and (max-width:1920px) and (min-width:1280px) {
  .container{
    bottom: 39vw;
    
  }
  .inner-card{
    width: 36%;
  }

}
@media screen and (max-width:1280px) and (min-width:960px) {
  .container{
    bottom: 42%;
  }
  .back-ground-main{
    width:81% !important;
    justify-content: space-around !important;
  }
  .out-card{
    gap: 10px;
  }
  .inner-card{
    /* height: 100%; */
    min-height: 380px;
    height: 44vw;
    max-height: 420px;
    width: 49%;
  }
  
  
}
@media only screen and (max-width: 960px) and (min-width:600px) {
  .container{
    bottom: 0%;
    left: 0%;
    top: 3%;
  }
  .back-ground-main{
    width:100% !important;
justify-content: center !important;
  }
  .btn-app{
    margin-right: 12px;
  }
  .out-card{
    gap:12px;
  }
  .inner-card{
   width: 43%;
   min-width: 257px;
  }
  .btn-work {
    width: 100px !important;
  }

  .card-deatail {
    gap: 0rem !important;
  }
}
@media screen and (max-width:600px) {
  .container{
    left: 0%;
    bottom: 0%;
    top: 4%;
  }
  .back-ground-main{
    width: 100% !important;
    flex-direction: column-reverse;
    align-items: center;
  }
  .inner-card{
    width: 43%;
    min-width: 257px;
  }
  .out-card{
    gap: 12px;
    flex-wrap: wrap !important;
  }
  .btn-work{
    width: 27vw;
  }
  .container-btn-work{
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 10vw;
    justify-content: center;
    align-items: center !important;
  }
  .col-of-container-btn-work{
    max-width: 100% !important;
  }
}
</style>