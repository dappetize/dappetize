<template>
  <div class="container">
    <v-row class="">
      <v-col cols="12" xs="10" sm="9" md="7" lg="7" xxl="8">
        <v-data-table class="app-table" :headers="headers" :item-value="item => `${item.row}`" :items="apps"
          items-per-page="10" v-model="apps.row" :page.sync="page" item-selectable show-select style="max-width: 960px;
    max-height: 862px; ">
          <template v-slot:bottom>
            <div class="container-page">
              <v-pagination class="list-page" v-model="page" :length="Math.ceil(apps.length / itemsPerPage)"
                next-icon="mdi-menu-right" prev-icon="mdi-menu-left" rounded="circle"></v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-col>
      <v-col class="d-flex flex-column align-center  btn-col" cols="12" sm="3" md="3" lg="3" xll="3" style="height: 100vh; gap: 10vw;">
        <div class="d-flex flex-column container-btn-work ">
          <v-btn class="btn-work btn-start" @click="startContract()">Start</v-btn>
          <v-btn class="btn-work" @click="stopContract()">Stop</v-btn>
          <v-btn class="btn-work">Update</v-btn>
          <v-btn class="btn-work" @click="getaaAppContractTransactionsData()">Deploy</v-btn>
        </div>
        <v-dialog ref="dialog" v-model="cal" :return-value.sync="date" persistent width="290px">
          <template #activator>
            <div class="d-flex align-center set-date "
              style="width: 160px;  background-color: white; height: 46px;min-height: 46px; border-radius: 10px;">
              <div style="background-color: #874FFF;">
                <v-icon color="white" dark @click="cal = true">mdi-calendar</v-icon>
              </div>
              <v-text-field v-model="dateRangeText" placeholder="Pick Time" readonly v-bind="$attrs" dark
                class="ml-2 white--text input-date" style="position: relative;">
              </v-text-field>
              <v-menu v-model="droppMenuItems">
                <template #activator>
                  <v-icon color="black" dark @click="droppMenuItems = true">mdi-chevron-down</v-icon>
                  <div class="d-flex" style="position: relative;">
                    <v-list class="pick-time" style="position: absolute; left: -7rem;" v-if="droppMenuItems">
                      <v-list-item v-for="(item, index) in menuItems" :key="index">
                        <v-list-item-title @click="blockTimeChoice(index)">{{ item.title
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </div>
                </template>

              </v-menu>
            </div>
          </template>


          <v-date-picker class="date-picker" v-model="dates" color="primary" multiple="2" scrollable range>
            <v-spacer></v-spacer>
            <template #actions>
              <div class="container-btn-date-picker">
                <v-btn text color="primary" class="btn-date-picker" @click="cal = false"> Cancell </v-btn>
                <v-btn text color="primary" class="btn-date-picker" @click="saveDate(), blockTimeChoice()">
                  OK
                </v-btn>
              </div>
            </template>
          </v-date-picker>


        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useMainStore } from "../../store";
import { getAccount, signMessage } from "@wagmi/core";
import Web3 from "web3";
import { network_id } from "../../web3/constants/network_id";

export default {
  setup() {
    definePageMeta({
      layout: 'managerial-dashboard'
    })
    let page = ref(1);
    let itemsPerPage = ref(10);
    let droppMenuItems = ref(false);
    const walletAddress = ref(null);
    let transactionHashTotal = [];
    let appcontractDeployerTotal = [];
    let transactionHash = [];
    let appcontractDeployer = [];
    let menuItems = reactive([{ title: 'Last 1 hour' }, { title: 'Last 24 hours' }, { title: 'Overall' }])
    let headers = reactive([
      {
        title: 'App Name',
        align: 'center',
        sortable: false,
        key: 'name',
      },
      {
        title: 'Transaction Volume DT',
        align: 'center',
        sortable: false,
        key: 'TransactionV'
      },
      {
        title: 'Call Frequency',
        align: 'center',
        sortable: false,
        key: 'CallFrequency'
      },
      {
        title: 'Gas Usage',
        align: 'center',
        sortable: false,
        key: 'GasUsage'
      },
      {
        title: 'Execution Success Number',
        align: 'center',
        sortable: false,
        key: 'ExecutionSuccessNumber'
      },
      {
        title: 'Average Transaction Rate',
        align: 'center',
        sortable: false,
        key: 'AverageTransactionRate'
      }
      ,
      {
        title: 'Contract Paused Status',
        align: 'center',
        sortable: false,
        key: 'ContractPausedStatus'
      }
    ]);
    let blockchainData = reactive({
      startBlock: 0,
      endBlock: 0,
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      oneHour: false,
      twentyFour: false,
      overal: false,
      avarageBlockTimeOut: 0,
      startTargetTimeStamp: BigInt(0),
      endTargetTimeStamp: BigInt(0),
      backWardBlock: 0
    })
    let apps = reactive([
      {
        name: "",
        TransactionV: 0 + "    DT",
        CallFrequency: 0,
        GasUsage: BigInt(0),
        ExecutionSuccessNumber: 0,
        AverageTransactionRate: 10,
        ContractPausedStatus: false,
        selected: false,
        row: 1,
        appContractAddress: 0
      },
    ]);

    let gasSum = BigInt(0);
    let totalMinted = BigInt(0);
    let dates = ref([]);
    let date = computed(() => {
      if (dates.value[0] && dates.value[1]) {
        return `${dates.value[0].toLocaleDateString()} - ${dates.value[1].toLocaleDateString()}`;
      }
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
    // // let modal = ref(false);
    let dateRangeText = ref("");
    const { $auth, $walletConnect } = useNuxtApp();
    const { modal } = $walletConnect();
    const cal = ref(false);


    const showTime = () => {
      droppMenuItems.value = !droppMenuItems.value;
    };


    const saveDate = () => {
      // showPicker.value = false;
      dateRangeText.value = date.value;
      date.value = '';
      cal.value = false;
    };
    const blockTimeChoice = async (index) => {

      if (index == 0) {
        blockchainData.oneHour = true
        blockchainData.twentyFour = false
        blockchainData.overal = false
      }
      if (index == 1) {
        blockchainData.oneHour = false
        blockchainData.twentyFour = true
        blockchainData.overal = false
      }
      if (index == 2) {
        blockchainData.oneHour = false
        blockchainData.twentyFour = false
        blockchainData.overal = true
      }

      await calculateAverageBlockTime();

    };
    const calculateAverageBlockTime = async () => {

      await modal.open();

      const account = getAccount(modal.wagmiConfig);

      walletAddress.value = account.address;
      if (account.connector != null) {

        let web3 = new Web3(await account.connector.getProvider());
        //   //  const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/ca3dcffdebc94770bcd32ea4a39d82e1"));

        // const getChainId= await web3.eth.getChainId() 
        //  const requestAccounts= await web3.eth.requestAccounts(account.address) 

        const getLatestBlock = await web3.eth.getBlock("latest")
        const getLatestBlockNumber = await web3.eth.getBlockNumber(getLatestBlock.hash)
        const getFirstdBlock = await web3.eth.getBlock(parseInt(getLatestBlockNumber - (2000)))
        blockchainData.avarageBlockTimeOut = Number(((getLatestBlock.timestamp) - (getFirstdBlock.timestamp)) / (BigInt(2000)));

        await calculateStartAndEndBlock();

      }

    };

    const calculateStartAndEndBlock = async () => {
      //  await modal.open();
      const account = getAccount(modal.wagmiConfig);

      walletAddress.value = account.address;
      if (account.connector != null) {
        let web3 = new Web3(await account.connector.getProvider());

        if (blockchainData.oneHour == true) {

          blockchainData.backWardBlock = (blockchainData.hour) / (blockchainData.avarageBlockTimeOut)
          blockchainData.backWardBlock = Math.ceil(blockchainData.backWardBlock)

          let getLatestBlock = await web3.eth.getBlock("latest")

          blockchainData.startTargetTimeStamp = getLatestBlock.timestamp - BigInt(blockchainData.hour);
          blockchainData.endTargetTimeStamp = getLatestBlock.timestamp;

          let getLatestBlockNumber = getLatestBlock.number;
          let back = blockchainData.backWardBlock;

          let getStarttBlock = await web3.eth.getBlock(BigInt(getLatestBlockNumber) - BigInt(back));
          let getstartBlockNumber = getStarttBlock.number;

          let j = 0;
          while (getStarttBlock.timestamp > blockchainData.startTargetTimeStamp) {
            getStarttBlock = await web3.eth.getBlock(parseInt((getLatestBlockNumber - back - j)));
            j++;
          }
          blockchainData.startBlock = parseInt(getstartBlockNumber) - 5;
          blockchainData.endBlock = parseInt(getLatestBlockNumber);
          await getaaAppContractTransactionsData();

        }
        if (blockchainData.twentyFour == true) {

          blockchainData.backWardBlock = (blockchainData.day) / (blockchainData.avarageBlockTimeOut)
          blockchainData.backWardBlock = Math.ceil(blockchainData.backWardBlock)

          let getLatestBlock = await web3.eth.getBlock("latest")

          blockchainData.startTargetTimeStamp = getLatestBlock.timestamp - BigInt(blockchainData.day);
          blockchainData.endTargetTimeStamp = getLatestBlock.timestamp;

          let getLatestBlockNumber = getLatestBlock.number;
          let back = blockchainData.backWardBlock;

          let getStarttBlock = await web3.eth.getBlock(BigInt(getLatestBlockNumber) - BigInt(back));
          let getstartBlockNumber = getStarttBlock.number;

          let j = 0;
          while (getStarttBlock.timestamp > blockchainData.startTargetTimeStamp) {
            getStarttBlock = await web3.eth.getBlock(parseInt((getLatestBlockNumber - back - j)));
            j++;
          }

          blockchainData.startBlock = parseInt(getstartBlockNumber) - 5;
          blockchainData.endBlock = parseInt(getLatestBlockNumber);

          await getaaAppContractTransactionsData();

        }
        if (blockchainData.overal == true) {

          blockchainData.startBlock = 5700781;
          const getLatestBlock = await web3.eth.getBlock("latest")
          blockchainData.endBlock = parseInt(getLatestBlock.number);
          await getaaAppContractTransactionsData();

        }
        if (((blockchainData.oneHour || blockchainData.twentyFour || blockchainData.overal) == false) && (dates.value[1] == undefined) && (dates.value[0] != undefined)) {
          window.alert("select second date to provide you the Data")
        }
        if (((blockchainData.oneHour || blockchainData.twentyFour || blockchainData.overal) == false) && (dates.value[1] == undefined) && (dates.value[0] == undefined)) {
          window.alert("select date to provide you the Data about Blockchain")
        }
        if (((blockchainData.oneHour || blockchainData.twentyFour || blockchainData.overal) == false) && (dates.value[1] != undefined) && (dates.value[0] != undefined)) {

          let str = dateRangeText.value;
          let matches = str.match(/\d+/g);
          const today = new Date();

          if (((Number(matches[4]) > today.getUTCDate()) && (Number(matches[3]) >= (today.getMonth() + 1)) && (Number(matches[5]) >= today.getFullYear())) ||
            ((Number(matches[1]) > today.getUTCDate()) && (Number(matches[0]) >= (today.getMonth() + 1)) && (Number(matches[2]) >= today.getFullYear()))) {
            window.alert("selected second day is biger than today")
          } else {
            let date1 = new Date(dates.value[0]);
            let date2 = new Date(dates.value[1]);
            let date3 = new Date(today);

            let DifferenceTwoDays = date2.getTime() - date1.getTime();
            let DifferenceTwoDaysFromToday_1 = date3.getTime() - date1.getTime();
            let DifferenceTwoDaysFromToday_2 = date3.getTime() - date2.getTime();

            let firstInterval = Math.abs(Math.round(DifferenceTwoDays / (1000 * 3600 * 24)));
            let secondInterval_1 = Math.abs(Math.round(DifferenceTwoDaysFromToday_1 / (1000 * 3600 * 24)));
            let secondInterval_2 = Math.abs(Math.round(DifferenceTwoDaysFromToday_2 / (1000 * 3600 * 24)));
            let secondInterval = Math.min(secondInterval_1, secondInterval_2)


            blockchainData.backWardBlock = (firstInterval * blockchainData.day) / (blockchainData.avarageBlockTimeOut)
            blockchainData.backWardBlock = Math.ceil(blockchainData.backWardBlock)

            let getLatestBlock = await web3.eth.getBlock("latest")

            //  blockchainData.startTargetTimeStamp=getLatestBlock.timestamp-BigInt(blockchainData.hour);
            //  blockchainData.endTargetTimeStamp=getLatestBlock.timestamp;
            let getLatestBlockNumber = getLatestBlock.number - Math.ceil((secondInterval * blockchainData.day) / (blockchainData.avarageBlockTimeOut));
            //let back=blockchainData.backWardBlock; 

            //let getStarttBlock= await web3.eth.getBlock(BigInt(getLatestBlockNumber)-BigInt(back)) ; 
            let getstartBlockNumber = getLatestBlockNumber - blockchainData.backWardBlock;

            // let j=0; 
            //  while (getStarttBlock.timestamp > blockchainData.startTargetTimeStamp) {
            //     getStarttBlock= await web3.eth.getBlock(parseInt((getLatestBlockNumber-back-j))) ;
            //   j++;
            // }     
            blockchainData.startBlock = parseInt(getstartBlockNumber) - 500;
            blockchainData.endBlock = parseInt(getLatestBlockNumber) + 500;
            await getaaAppContractTransactionsData();
 
          }
 

        }

      }

    }
    const getaaAppContractTransactionsData = async () => {

      //  await modal.open();

      const account = getAccount(modal.wagmiConfig);

      walletAddress.value = account.address;
      if (account.connector != null) {
        //  let web3 = new Web3(await account.connector.getProvider());
        const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/ca3dcffdebc94770bcd32ea4a39d82e1"));
        setNetWork(network_id[0][account.chainId]); 

        const AppContractFactoryContract = new web3.eth.Contract(
          contractState.appContractFactoryAbi,
          contractState.appContractFactoryAddress
        );
        const DappetizeTokenContract = new web3.eth.Contract(
          contractState.dappetizeTokenAbi,
          contractState.dappetizeTokenAddress
        );
        const appContractFactoryTransactionsTotal = await web3.eth.getPastLogs({
          fromBlock: blockchainData.startBlock,
          toBlock: blockchainData.endBlock,
          address: contractState.appContractFactoryAddress,
        });

        let j = 0;

        if (appContractFactoryTransactionsTotal.length != 0) {


          for (let i = 0; i < appContractFactoryTransactionsTotal.length; i++) {
            const appContractFactoryTransactionsStatus =
              await web3.eth.getTransactionReceipt(
                appContractFactoryTransactionsTotal[i].transactionHash
              );

            if (appContractFactoryTransactionsStatus.status) {
              transactionHashTotal[j] = appContractFactoryTransactionsTotal[i].transactionHash;
              appcontractDeployerTotal[j] = appContractFactoryTransactionsStatus.from;
              j++;
            }
          }
          transactionHash[0] = transactionHashTotal[0];
          appcontractDeployer[0] = appcontractDeployerTotal[0];
          j = 1;
          let repeat = false;
          for (let i = 0; i < appcontractDeployerTotal.length; i++) {
            for (let k = 0; k < appcontractDeployer.length; k++) {
              if (appcontractDeployer[k] == appcontractDeployerTotal[i]) {
                repeat = true;
              }
            }
            if (repeat == false) {
              transactionHash[j] = transactionHashTotal[i];
              appcontractDeployer[j] = appcontractDeployerTotal[i];
              j++;
            }
            repeat = false;
          }

          let k = 0;
          let appContractaddressByAppContractFactory = [];
          for (let i = 0; i < appcontractDeployer.length; i++) {
            appContractaddressByAppContractFactory =
              await AppContractFactoryContract.methods.getdeployedAppContractAddress(appcontractDeployer[i]).call({
                from: walletAddress.value
              });
            for (let index = 0; index < appContractaddressByAppContractFactory.length; index++) {
              let appContractInstance = new web3.eth.Contract(
                contractState.appContractAbi,
                appContractaddressByAppContractFactory[index]
              );

              const appContractTransactions = await web3.eth.getPastLogs({
                fromBlock: 5700781,
                toBlock: "latest",
                address: appContractaddressByAppContractFactory[index],
              });

              let successNumber = 0;
              gasSum = BigInt(0);
              for (let j = 0; j < appContractTransactions.length; j++) {
                const appContractInstanceTransactionsgas =
                  await web3.eth.getTransaction(
                    appContractTransactions[j].transactionHash
                  );
                gasSum = gasSum + appContractInstanceTransactionsgas.gas;
                const appContractTransactionsStatus =
                  await web3.eth.getTransactionReceipt(
                    appContractTransactions[j].transactionHash
                  );
                if (appContractTransactionsStatus.status) {
                  successNumber = successNumber + 1;
                }
              }
              const _name = await appContractInstance.methods.getAppInfo().call({
                from: walletAddress.value,
              });

              const _TransactionV = await DappetizeTokenContract.methods.balanceOf(appContractaddressByAppContractFactory[index]).call({
                from: walletAddress.value,
              });

              const _CallFrequency = appContractTransactions.length
              const _GasUsage = gasSum
              const _ExecutionSuccessNumber = successNumber
              const _AverageTransactionRate = ((successNumber) / (appContractTransactions.length)) * 100
              const _ContractPausedStatus = await appContractInstance.methods.paused().call({
                from: walletAddress.value,
              });


              apps[k] = {
                name: _name,
                TransactionV: _TransactionV + "    DT",
                CallFrequency: _CallFrequency,
                GasUsage: _GasUsage,
                ExecutionSuccessNumber: _ExecutionSuccessNumber,
                AverageTransactionRate: _AverageTransactionRate,
                ContractPausedStatus: _ContractPausedStatus,
                selected: false,
                row: k++,
                appContractAddress: appContractaddressByAppContractFactory[index]
              }


            }
          }

        }
      }

      blockchainData.oneHour = false
      blockchainData.twentyFour = false
      blockchainData.overal = false


    };
    const startContract = async () => {
      let array = [];
      let proceed = false;
      try {

        for (let i = 0; i < apps.length; i++) {
          if (apps.row[i] != undefined) {
            array[i] = apps.row[i]
          }

        }
        if (array.length == 0) {
          window.alert("select app contract to start selected contract")
          proceed = false

        } else {
          proceed = true
        }
      } catch (error) {
        window.alert("select app contract to start selected contract")

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


            for (let index = 0; index < array.length; index++) {
              contractsInstance[index] = new web3.eth.Contract(
                contractState.appContractAbi,
                apps[array[index]].appContractAddress);
              contractsPausedStatus[index] =
                await contractsInstance[index].methods.paused().call({
                  from: walletAddress.value,
                });

              apps[array[index]].ContractPausedStatus = contractsPausedStatus[index]
            }
            condition = contractsPausedStatus[0];
            for (let index = 0; index < array.length - 1; index++) {
              condition = condition || contractsPausedStatus[index + 1]
            }

            if (condition == false) {
              window.alert("all selected contracts are runing now , please select other contract");
            } else {
              for (let index = 0; index < contractsPausedStatus.length; index++) {

                if (contractsPausedStatus[index] == true) {
                  while (contractsPausedStatus[index] == true) {
                    const contractPausedMethods = await contractsInstance[index].methods
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
                  apps[array[index]].ContractPausedStatus = contractsPausedStatus[index]

                }
              }
              window.alert("selected contract are Active");

            }

          }

        } catch (error) {
        }
      }
    };
    const stopContract = async () => {
      let array = [];
      let proceed = false;
      try {

        for (let i = 0; i < apps.length; i++) {
          if (apps.row[i] != undefined) {
            array[i] = apps.row[i]
          }

        }
        if (array.length == 0) {
          window.alert("select app contract to pause selected contract")
          proceed = false

        } else {
          proceed = true
        }
      } catch (error) {
        window.alert("select app contract to pause selected contract")

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


            for (let index = 0; index < array.length; index++) {
              contractsInstance[index] = new web3.eth.Contract(
                contractState.appContractAbi,
                apps[array[index]].appContractAddress);
              contractsPausedStatus[index] =
                await contractsInstance[index].methods.paused().call({
                  from: walletAddress.value,
                });

              apps[array[index]].ContractPausedStatus = contractsPausedStatus[index]
            }
            condition = contractsPausedStatus[0];
            for (let index = 0; index < array.length - 1; index++) {
              condition = condition && contractsPausedStatus[index + 1]
            }



            if (condition == true) {
              window.alert("all selected contracts are paused now , please select other contract");
            } else {
              for (let index = 0; index < contractsPausedStatus.length; index++) {

                if (contractsPausedStatus[index] == false) {
                  while (contractsPausedStatus[index] == false) {
                    const contractPausedMethods = await contractsInstance[index].methods
                      .pause()
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
                  apps[array[index]].ContractPausedStatus = contractsPausedStatus[index]

                }
              }
              window.alert("selected contract are stoped");

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
      //  await getaaAppContractTransactionsData();
    });

    return {
      definePageMeta,
      headers,
      apps,
      page,
      itemsPerPage,
      dates,
      date,
      modal,
      dateRangeText,
      saveDate,
      droppMenuItems,
      menuItems,
      showTime,
      cal,
      transactionHashTotal,
      appcontractDeployerTotal,
      transactionHash,
      appcontractDeployer,
      blockchainData,
      //function
      stopContract,
      startContract,
      getaaAppContractTransactionsData,
      blockTimeChoice,
      calculateAverageBlockTime,
      calculateStartAndEndBlock
    }
  },
}
</script>
<style scoped>
.container {
  position: relative;
  bottom: 43%;
  left: 22vw;
  overflow-x: hidden;
  background-color: #1b1825 ;
}

.app-table {
  background-color: #312351;
}
 
.app-table :deep(tr) {
  background-color: #43366E;
  color: #FFFFFF;
  border-radius: 5px;
  line-height: 14.52px;
}

.app-table :deep(.v-data-table.row-height-50 td) {
  height: 18px !important;
}

.app-table :deep(td) {
 
  font-size: 12px;
 
}

 
.app-table :deep(.v-selection-control__input) {
  height: 40%;
}

.app-table :deep(th) {
  height: 40px;
  font-size: 12px;
  font-family: Inter;
  font-weight: 500;

}

.app-table :deep(.v-data-table-header__content) {
  height: 40px;
  width: max-content;
}

.app-table :deep(.v-data-table-header__content span) {
  height: 15px;
}

.app-table :deep(.v-data-table__tr) {
  height: 40px;
}

.app-table :deep(.v-data-table__td) {
  height: 40px;
  padding: 8px;
}

.app-table :deep(.v-data-table__td span) {
  height: 15px;

}

.app-table :deep(table) {
  border-spacing: 0 1rem !important;
}
/* .app-table::-webkit-scrollbar {
    width: 12px;
}
.app-table::-webkit-scrollbar-track {
  background: red;
}
.app-table ::-webkit-scrollbar-thumb {
    background: blue !important;
    border-radius: 10px;
}
.app-table::-webkit-scrollbar-thumb:hover {
    background: yellow;
} */
.app-table{
   scrollbar-width: thin;
    scrollbar-color:;
    
}

/* .list-page :deep(.v-pagination__item) {
width: 16px;
    height: 16px;
    padding: 2px 10px, 2px 10px;
    border-radius: 100%;
    text-align: center;
    top: 942px;
    left: 812px;

} */
.list-page :deep(.v-btn) {
  width: 100%;
  height: 100%;
  font-size: 10px;
  width: 7px;
  height: 12px;
}

/* .list-page :deep(.list-page[data-v-55f52731]){
  background-color: aqua!important;
} */
.btn-start {
  background: linear-gradient(180deg, #874FFF 0%, #3F095A 109.37%);
}

.btn-start :deep(.v-btn__content) {
  color: white;
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
  color: #302F3D;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;


}
.set-date :deep(.v-field__input) {
  padding:2px;
}

.input-date :depp(.v-text-field .v-field--active input) {
  background-color: red;
}

.input-date :deep(.v-input__details) {
  display: none !important;
}

.input-date :depp(input) {
  padding-left: 6px;
  padding-right: 6px;
  width: 100%;
  font-size: 14px;
  font-family: roboto;
  line-height: 16.41px;
  font-weight: 500;
}

/* .pick-time{
  position: absolute;
  right: -87vw;
  bottom: -45.5vw;


} */
.pick-time :deep(.v-list-item-title) {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
}

.input-date ::placeholder {
  color: #302F3D;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.41px;
  text-align: left;
}
@media screen and (max-width:1920px) and (min-width:1280px) {
  .container{
    left: 19vw !important;
  }

}
@media screen and (max-width:1280px) and (min-width:960px) {
 
  .container{
    left:17vw !important;
  }
  .btn-work{
    width: 12.5vw;
  }
  .set-date{
    width: 12.5vw !important;
  }
}
@media screen and (max-width:960px) and (min-width:600px) {
  .container{
    left: 1vw;
    bottom: 0%;
    margin-top: 32px;
  }
  .btn-work{
    width: 16.7vw;
  }
  .container-btn-work{

    margin-right:16px ;
  }
  .btn-col{
    /* align-items: self-start !important; */
  }
  .set-date{
    width: 16.7vw !important;
    margin-right: 16px;
    font-size: 2.2vmin;
  }
}
@media screen and (max-width:600px) {
  .container{
    left: 1vw;
    bottom: 0%;
    margin-top: 32px;
  }
  .app-table{
    width: 97.5vw;
  }
  .set-date{
  translate: 0px 89px;
    margin-right: 10px;
}
.btn-col{
  gap: 4vw;
    flex-direction: row !important;
    align-items: self-start !important;
    justify-content: center;

}
}

</style>

 