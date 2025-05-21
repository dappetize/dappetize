<template>
  <div class="main-container">
    <v-snackbar v-model="snackBar" :color="state.snackBarOptions.color">
      {{ state.snackBarOptions.text }}
      <template v-slot:actions>
        <v-btn :color="state.snackBarOptions.btnColor" variant="text" @click="snackBar = false">
          close
        </v-btn>
      </template>

    </v-snackbar>
    <v-row>
      <v-col cols="12" lg="9">
        <v-row class="container-all-charts">
          <v-col class="container-chart" cols="12" lg="6">
            <div style="background: white; border-radius: 8px" class="pa-4 chart">
              <LineChart class="inner-chart" :downloadData="chartDataDownloads" :appId="appIdValue" />
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div style="background: white; border-radius: 8px" class="pa-4">
              <LineChart :totalSalesData="chartDataTotalSales" :appId="appIdValue" />
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div style="background: white; border-radius: 8px" class="pa-4">
              <LineChart :totalViews="chartDataForViews" :appId="appIdValue" />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="container-calender d-flex flex-column align-center" cols="12" lg="3" style="text-align: center">
        <v-btn class="export-btn-style px-5 py-5 text-capitalize" style="width: 72%;display: flex; height: 40px;">Export
        </v-btn>
        <br />
        <br />
        <v-btn class="text-capitalize" style="width: 72%;height: 40px;">
          Go To Contract</v-btn>
        <br />
        <br />


        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ props }">
            <div class="d-flex align-center set-date " style="width: 65%; margin: auto">
              <v-icon color="white" dark @click="openCalender()">mdi-calendar</v-icon>
              <v-text-field v-model="dateRangeText" label="Picker in dialog" readonly v-bind="props" dark
                class="ml-2 white--text input-date"></v-text-field>

              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-icon color="white" dark @click="droppMenuItems = true">mdi-chevron-down</v-icon>
                  <div style="position: relative;">
                    <v-list style="position: absolute; left: -7rem;top: 20px; z-index: 2;" v-if="droppMenuItems">
                      <v-list-item v-for="(item, index) in menuItems" :key="index">
                        <v-list-item-title @click="droppMenuItems = false, timeChart = item" style="cursor: pointer;">{{
                          item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </div>
                </template>
                <!-- <v-list>
        <v-list-item
        v-for="(item, index) in menuItems" :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list> -->
                <!-- <v-list v-if="droppMenuItems">
        <v-list-item
        v-for="(item, index) in menuItems" :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list> -->
              </v-menu>


            </div>
          </template>


          <v-date-picker class="date-picker" v-model="dates" color="primary" multiple="2" scrollable range>
            <v-spacer></v-spacer>
            <template #actions>
              <div class="container-btn-date-picker">
                <v-btn text color="primary" class="btn-date-picker" @click="modal = false"> Cancell </v-btn>
                <!-- <v-btn text color="primary" class="btn-date-picker" @click="$refs.dialog.save(date)">
              OK
            </v-btn> -->
                <v-btn text color="primary" class="btn-date-picker" @click="sendData()">
                  OK
                </v-btn>
              </div>
            </template>
          </v-date-picker>


        </v-dialog>
        <v-alert :value="alert" dismissible type="error">
          {{ alertMessage }}
        </v-alert>
        <br /><br />
        <v-select dense v-model="appIdValue" :items="state.apps" item-value="id" item-title="name" item-text="text"
          background-color="#FFFFFF" placeholder="Pick App" outlined class="pick-app-style"></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//------------------------------------------------------------- imports end -------------------------------------------------------------
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useMainStore } from "~/store";
import axios from 'axios';
//---------------------------------------------------------------- imports start --------------------------------------------------------
export default {
  setup() {

    //------------------------------------------------------- varibales start --------------------------------------------------------
    definePageMeta({
      layout: 'dashboard',
      middleware: ["auth"],
    });
    const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();
    const { $auth, $walletConnect } = useNuxtApp();
    let chartData = reactive([
      {
        labels: ['2023-01-01', '2023-01-02',],
        datasets: [5, 2],
      },
      {
        labels: [],
        datasets: [],
      },
      {
        labels: [],
        datasets: [],
      },
    ]);
    const state = reactive({
      apps: [],
      snackBarOptions: {}
    })
    const dates = ref([]);
    const date = computed(() => {
      try {
        if (dates.value[0] && dates.value[1]) {
          return `${dates.value[0]} - ${dates.value[1]}`;
        }
      } catch (error) {
      }
      // else {
      //   return "Picker in dialog";
      // }
    });
    const droppMenuItems = ref(false);
    let timeChart = ref("");
    const alert = ref(false);
    const alertMessage = ref('');
    const time = ref("");
    const showMenu = ref(false);
    const startDate = ref(null);
    const endDate = ref(null);
    const chartDataDownloads = ref(null);
    const chartDataTotalSales = ref(null);
    const chartDataForViews = ref(null);
    const totalDownloads = ref(null);
    const snackBar = ref(false);
    const dateRangeText = ref("");
    const modal = ref(false);
    const menuItems = [{ title: 'By Week' }, { title: 'By Month' }]
    const appIdValue = ref(null);
    // const closeDialog =()=>{
    //   modal.value= false;
    // };
    let listOfAppsInfoValue = reactive([]);
    let listOfAppsInfo = reactive([]);
    const labelsForChart = ref([]);
    const userToken = ref('');
    //----------------------------------------------------------------------- variables end -------------------------------------------------------------
    //------------------------------------------------------------------------- functions start -----------------------------------------------------------
    const getChartData = async (title) => {
      try {
        if (appIdValue.value) {
          if (title == 'By Week') {
            const today = new Date();
            const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            dates.value[0] = today.toISOString()
            dates.value[1] = lastWeek.toISOString()
            await sendData()
          }
          else if (title == 'By Month') {
            const today = new Date();
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
            dates.value[0] = today.toISOString();
            dates.value[1] = lastMonth.toISOString();
            await sendData();
          }
        }
        else {
          snackBar.value = true
          state.snackBarOptions.text = "Please pick  A App.";
          state.snackBarOptions.color = "error";
          state.snackBarOptions.btnColor = "primary"
        }
      } catch (error) {
      }

    };
    const test = () => {
      droppMenuItems.value = true;
    };
    const openCalender = () => {
      modal.value = !modal.value;
    }
    // Function to generate dates from the first day of last month to today

    const saveDate = () => {
      // showPicker.value = false;
      startDate.value = dates.value[0].toISOString().substring(0, 10)
      endDate.value = dates.value[1].toISOString().substring(0, 10)
      modal.value = false;

      dateRangeText.value = startDate.value + "," + endDate.value
    };

    const getAppsOfUser = async () => {
      userToken.value = await $auth.token();
      try {
        const res = await axios.get(baseURL + "/api/v1/getAppsofUser/" + 1 + "/" + 100, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          }
        })
        state.apps = [];
        try {
          res.data.forEach((item) => {
            const [firstRelation] = item.appsVersionsModelRelation;
            if (firstRelation != null) {
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type == 1)
              const blockChainRelation = item.appBlockchainRM;
              const appVersion = item.appsVersionsModelRelation;
              appVersion.find((x) => x.version_number);
              let rating = item.rating / item.ratingNumber;
              if (!rating || Number.isNaN(rating) ) {
                rating = 0
              }
              rating = rating.toFixed(2)
              if (img) {
                state.apps.push({
                  id: item.id,
                  name: item.name,
                })
              }
            }
          })
        } catch (error) {
        }
      } catch (error) {
      }
    }
    const getAppDownloadsCountForChart = async () => {
      userToken.value = await $auth.token();
      try {
        const res = await axios.post(baseURL + "/api/v1/getAppOrBookUserDownloadsCount", {
          app_id: appIdValue.value,
          startOfDateRange: dates.value[0],
          endOfDateRange: dates.value[1]

        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          }
        })
        chartDataDownloads.value = res.data
      } catch (error) {
      }
    }
    const getAppTotalSalesForChart = async () => {
      userToken.value = await $auth.token();
      try {
        const res = await axios.post(baseURL + "/api/v1/getAppTotalSales", {
          app_id: appIdValue.value,
          startOfDateRange: dates.value[0],
          endOfDateRange: dates.value[1]
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          }
        })
        chartDataTotalSales.value = res.data;
      } catch (error) {
      }
    }
    const getAppTotalViewsForChart = async () => {
      userToken.value = await $auth.token();
      try {
        const res = await axios.post(baseURL + "/api/v1/getAppViewsCount", {
          app_id: appIdValue.value,
          startOfDateRange: dates.value[0],
          endOfDateRange: dates.value[1]
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          }
        })
        chartDataForViews.value = res.data;
      } catch (error) {
      }
    }

    const sendData = async () => {
      try {
        if (appIdValue.value) {
          await getAppDownloadsCountForChart();
          await getAppTotalSalesForChart();
          await getAppTotalViewsForChart();
          saveDate();
        }
        else {
          snackBar.value = true;
          state.snackBarOptions.text = "Please Select A app";
          state.snackBarOptions.color = "error";
          state.snackBarOptions.btnColor = "primary"
        }
      } catch (error) {
      }


    }
    //----------------------------------------------------------------------------- functions end --------------------------------------------------------------

    //------------------------------------------------------------------------------- events start -----------------------------------------------------------

    watch(appIdValue, async (newVal, oldVal) => {
      if (dates.value[0] && dates.value[1]) {
        await sendData();
      }

    })
    onMounted(async () => {
      await getAppsOfUser();
    })
    //--------------------------------------------------------------------------- events end------------------------------------------------------------------
    return {
      chartData,
      totalDownloads,
      snackBar,
      startDate,
      endDate,
      chartDataDownloads,
      modal,
      menuItems,
      state,
      appIdValue,
      labelsForChart,
      chartDataTotalSales,
      chartDataForViews,
      // closeDialog,
      listOfAppsInfoValue,
      listOfAppsInfo,
      date,
      dates,
      droppMenuItems,
      alert,
      alertMessage,
      time,
      getChartData,
      saveDate,
      dateRangeText,
      showMenu,
      test,
      sendData,
      openCalender,
      timeChart,
    }
  }
}
</script>

<style scoped>
.export-btn-style {
  background: linear-gradient(180deg, #874fff 0%, #3f095a 109.37%);
  border-radius: 8px;
  color: #ffffff;

}

.pick-app-style {
  border-radius: 8px;
  width: 80%;
  max-height: 40px;
  margin-bottom: 3rem;
  background-color: transparent !important;
}

.pick-app-style :deep(.v-field__input) {
  background-color: white !important;
}

.pick-app-style :deep(.v-field) {
  background-color: white !important;
}

.pick-app-style ::placeholder {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.41px;
  text-align: left;

}

 
.main-container {
  width: 70vw;
  left: 26%;
  padding: 1rem 0rem 1rem 1rem;
  background-color: #312351;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
}

.container-calender :deep(.v-text-field .v-input__details) {
  display: none;
}

.container-calender:deep(.v-alert--density-default) {
  display: none;
}

.set-date:deep(.v-text-field .v-field) {
  color: white !important;
  background-color: #312351;
}

.date-picker {
  width: 328px;
}

.date-picker :deep(.v-picker__body) {
  width: 100%;
}

 
.date-picker :deep(.v-date-picker-month) {
  height: 24vw;
  width: 100% !important;
  min-height: 300px;
}
 
.input-date :deep(.v-field__overlay) {
  background-color: transparent !important;
}

@media screen and (max-width: 599px) {
  .date-picker {
    width: 300px;
    margin-left: -11px;
  }

  .main-container {
    margin: 0px !important;
    width: 74vw;
    left: 12%;
    top: 3%;
  }

  .container-all-charts {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
  }

  .container-calender {
    padding-left: 0px !important;
    padding-right: 24px !important;
  }
}

@media screen and (max-width:959px) {}

@media only screen and (max-width:959px) and (min-width:599px) {
  .main-container {
    margin: 0px !important;
    width: 74vw;
    left: 12%;
    top: 2%;
  }

  .container-all-charts {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
  }

  .container-calender {
    padding-left: 0px !important;
    padding-right: 24px !important;
  }

  /* .main-container{
    left: 8% !important;
   top:2% !important;
    width: 74vw !important;
    
  } */
  .container-all-charts {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
  }
}

@media screen and (max-width:1280px) and (min-width:959px) {
  .main-container {
    left: 8% !important;

    top: 1% !important;
    width: 74vw !important;
  }

  .container-all-charts {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
  }
}

@media screen and (min-width:1280px) {
  .main-container {

    top: 2% !important;
  }
}
</style>