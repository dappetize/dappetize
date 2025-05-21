<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  //-------------------------------------------------------------- imports start --------------------------------------------------------------
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  import { useMainStore } from "~/store";
  import axios from 'axios';
  //--------------------------------------------------------------- imports end ---------------------------------------------------------------

// ------------------------------------------------------------------------ variables start ---------------------------------------------------------
 const labelsChart = ref(["download","sales","view"]);
 const labelChart = ref("");
const canvas = ref(null);
  let myChart = null;
  const chartData=ref(null);
  const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();
    const { $auth, $walletConnect } = useNuxtApp();
  const props=defineProps({
    downloadData:Array,
    totalSalesData:Array,
    totalViews:Array,
    appId:String,
  })
 const totalDownloads=ref(null);
 const userToken=ref('');
 // const {startDate,endDate}=toRefs(props);
  //------------------------------------------------------------------------ variables end ----------------------------------------------
  //------------------------------------------------------------------------- functions start -------------------------------------------

  const generateDateLabels = () => {
    try {
      const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const labels = [];
  
    while (lastMonth <= today) {
      labels.push(`${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1}-${lastMonth.getDate()}`);
      lastMonth.setDate(lastMonth.getDate() + 1);
    }
     chartData.value=labels;
    } catch (error) {
    }
    };
    const builTheChart=async(labels)=>{
    // Generate labels for the date range
    
    const dataValues = labels.map(() => Math.random() * 0); // Example random data
 
    const ctx = canvas.value.getContext('2d');
    myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:labels, // assuming labels is an array of date strings
    datasets: [{
      label: 'Daily Data',
      data:dataValues, // example data
      fill: true,
      backgroundColor:"rgba(135, 79, 255, .5)",
      borderColor: 'rgba(135, 79, 255, 1)',
      tension: 0.5
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
          parser: 'yyyy-MM-dd'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
    });
    
 
    }
    const buildChartForDownloads=async(labels,data,total)=>{
      const ctx = canvas.value.getContext('2d');
    myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:labels, // assuming labels is an array of date strings
    datasets: [{
      label: 'TotalDownloads  '+total,
      data:data, // example data
      fill: true,
      backgroundColor:"rgba(135, 79, 255, .5)",
      borderColor: 'rgba(135, 79, 255, 1)',
      tension: 0.5
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
          parser: 'yyyy-MM-dd'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
    });
    }
    const buildChartForTotalSales=async(labels,data,total)=>{
      const ctx = canvas.value.getContext('2d');
    myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:labels, // assuming labels is an array of date strings
    datasets: [{
      label: 'totalSales '+total,
      data:data, // example data
      fill: true,
      backgroundColor:"rgba(135, 79, 255, .5)",
      borderColor: 'rgba(135, 79, 255, 1)',
      tension: 0.5
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
          parser: 'yyyy-MM-dd'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
    });
    }
    const buildChartForViews=async(labels,data,total)=>{
      const ctx = canvas.value.getContext('2d');
    myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:labels, // assuming labels is an array of date strings
    datasets: [{
      label: 'totalViews '+total,
      data:data, // example data
      fill: true,
      backgroundColor:"rgba(135, 79, 255, .5)",
      borderColor: 'rgba(135, 79, 255, 1)',
      tension: 0.5
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
          parser: 'yyyy-MM-dd'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
    });
    }
    const getAppTotalDownloads=async()=>{
      userToken.value = await $auth.token();
      try {
        const res = await axios.get(
          baseURL + "/api/v1/countGameDownloads/" + props.appId,
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.data;
      } catch (error) {
        console.log("error", error);
      }
    };
    const getAppTotalSales=async()=>{
      try {
        const res=await axios.get(baseURL+"/api/v1/countAppSales/"+props.appId,{
          header: {
              "Content-Type": "application/json",
            },
        })
        return res.data[0].totalSales
      } catch (error) {
        console.log("error while getApp total Sales",error);
      }
    }
    const getAppTotalViews=async()=>{
      try {
        const res=await axios.get(baseURL+"/api/v1/getCountViews/"+props.appId,{
          header: {
              "Content-Type": "application/json",
            },
        })
        return res.data[0].totalViews;
      } catch (error) {
        console.log('Error While getapp Total views',error);
      }
    }
    //----------------------------------------------------------------------- fuctions end ----------------------------------------------

    //-------------------------------------------------------------------------- events start ---------------------------------------------
    watch(()=>props.downloadData,async(newVal,oldVal)=>{
      
        const lables= props.downloadData.map((item)=>{
          return item.date.substring(0,10)
        })
        const dataValues=props.downloadData.map((item)=>{
          return item.count;
        })
        myChart.destroy();
        const totalDownlads=await getAppTotalDownloads();
        buildChartForDownloads(lables,dataValues,totalDownlads);
    })
    watch(()=>props.totalSalesData,async(newVal,oldVal)=>{
      const labels=props.totalSalesData.map((item)=>{
        return item.date.substring(0,10)
      })
      const dataValues=props.totalSalesData.map((item)=>{
        return item.count
      })
      myChart.destroy()
      const total= await getAppTotalSales();
      buildChartForTotalSales(labels,dataValues,total);
    })
    watch(()=>props.totalViews,async(newVal,oldVal)=>{
      const labels=props.totalViews.map((item)=>{
        return item.date.substring(0,10)
      })
      const dataValues=props.totalViews.map((item)=>{
        return item.count;
      })
      myChart.destroy();
      const total=await getAppTotalViews();
      buildChartForViews(labels,dataValues,total)
    })
  onMounted(async() => {
    generateDateLabels();
   builTheChart(chartData.value);

  });
  onBeforeUnmount(() => {
    if (myChart) {
      myChart.destroy();
    }
  });
  //------------------------------------------------------------------------------- events end -----------------------------------------------
  
 
  </script>
  