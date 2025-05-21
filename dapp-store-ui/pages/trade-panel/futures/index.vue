<!-- pages/index.vue -->
<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Size</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, id) in state.asks" :key="id">
              <td class="text-red">{{ item.price }}</td>
              <td class="text-red">{{ item.size }}</td>
              <td class="text-red">{{ item.sum }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Price"
          v-model="price"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          label="Size"
          v-model="size"
          variant="outlined"
        ></v-text-field>

        <v-btn @click="short()"> Short </v-btn>
        <v-btn @click="long()"> Long </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-table>
          <!-- <thead>
            <tr>
              <th>Price</th>
              <th>Size</th>
              <th>Sum</th>
            </tr>
          </thead> -->
          <tbody>
            <tr v-for="(item, id) in state.bids" :key="id">
              <td class="text-green">{{ item.price }}</td>
              <td class="text-green">{{ item.size }}</td>
              <td class="text-green">{{ item.sum }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="6">
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="one"> Position</v-tab>
          <v-tab value="two">Open Order</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one"> Position </v-window-item>

            <v-window-item value="two"> Open ORder </v-window-item>
          </v-window>
        </v-card-text>
        <!-- <div id="tvChart" class="tradingview-chart"></div> -->
      </v-col>
    </v-row>
    <v-row>
      <div id="tvChartContainer"></div>
    </v-row>
  </v-container>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { createChart } from "lightweight-charts";

export default {
  setup() {
    definePageMeta({
      layout: "default",
    });

    // Define your reactive data
    let state = reactive({ asks: [], bids: [] });
    let price = ref(0);
    let size = ref(0);
    let tab = ref(null);
    // Define your methods

    const updateOrderBook = async () => {
      const res = await axios.get(
        "http://localhost:14000/api/v1/getOrderBook",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYWM4MzQwLTE1MmUtNDI1MS05NGY5LWJhNTA2MTk5NGViMiIsIm5hbWUiOm51bGwsImZhbWlseSI6bnVsbCwiaXNfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOiIyMzEyMzEyMyIsImVtYWlsIjoibWF0cml4X2FtcDFAZ21haWwuY29tIiwicmVmZXJyYWxfaWQiOm51bGwsInVzZXJuYW1lIjoibWF0cml4X2FtcDEiLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTA0VDE5OjE3OjAyLjUxM1oiLCJ1cGRhdGVkQXQiOiIyMDI0LTAxLTA0VDE5OjE3OjAyLjUxM1oiLCJpYXQiOjE3MDQ0ODI0NzIsImV4cCI6MTcwNDU2ODg3Mn0.opxPlC-aqA6nY1QdE3XvFL5fQSK4p6z-DCojCrytEfA`,
          },
        }
      );

      let response = res.data;
      let sum = 0;
      state.asks = [];
      response.asks.forEach((ask) => {
        sum += parseFloat(ask[1]);

        state.asks.push({
          price: ask[0],
          size: ask[1],
          sum: sum,
        });
      });
      state.asks.reverse();

      sum = 0;
      state.bids = [];
      response.bids.forEach((bid) => {
        sum += parseFloat(bid[1]);

        state.bids.push({
          price: bid[0],
          size: bid[1],
          sum: sum,
        });
      });
    };
    const loadData = async () => {
      
    };
    const short = async () => {};
    const long = async () => {};
    // Set up interval and cleanup
    let interval;
    onMounted(() => {
      loadData();
      // interval = setInterval(updateOrderBook, 1000);

      // // Ensure the TradingView script is loaded
      // const checkExist = setInterval(() => {
      //   if (window.TradingView) {
      //     clearInterval(checkExist);
      //     // if (window.Datafeeds)
      //     initTradingViewWidget();
      //   }
      // }, 100);

      // function initTradingViewWidget() {
      //   const dataFeed = {
      //     onReady: (cb) => {
      //       cb({
      //         supports_search: false,
      //         supports_group_request: false,
      //         supports_marks: false,
      //         supports_timescale_marks: false,
      //         supports_time: false,
      //         exchanges: [{ value: "", name: "", desc: "" }],
      //         symbols_types: [{ name: "crypto", value: "crypto" }],
      //         supported_resolutions: ["1D", "1W", "1M"],
      //       });
      //     },
      //     resolveSymbol: (
      //       symbolName,
      //       onSymbolResolvedCallback,
      //       onResolveErrorCallback
      //     ) => {
      //       if (symbolName === "MY_CUSTOM_SYMBOL") {
      //         onSymbolResolvedCallback({
      //           name: symbolName,
      //           ticker: symbolName,
      //           type: "crypto",
      //           session: "24x7",
      //           timezone: "Etc/UTC",
      //           exchange: "custom",
      //           minmov: 1,
      //           pricescale: 100,
      //           has_intraday: false,
      //           has_daily: true,
      //           has_weekly_and_monthly: true,
      //           data_status: "streaming",
      //           // other symbol details...
      //         });
      //       } else {
      //         onResolveErrorCallback("Symbol not found");
      //       }
      //     },
      //     getBars: (
      //       symbolInfo,
      //       resolution,
      //       from,
      //       to,
      //       onHistoryCallback,
      //       onErrorCallback,
      //       firstDataRequest
      //     ) => {
      //       // This is where you would fetch historical data for 'MY_CUSTOM_SYMBOL'
      //       // For example, from your server or an external API
      //       // The data should be in the format of an array of bar objects
      //       // Each bar object should have { time, low, high, open, close, volume }

      //       // Dummy data for demonstration purposes
      //       const bars = [
      //         {
      //           time: 1543945600000,
      //           low: 66.62,
      //           high: 69.52,
      //           open: 68.12,
      //           close: 68.48,
      //           volume: 13187800,
      //         },
      //         {
      //           time: 1543945700000,
      //           low: 66.62,
      //           high: 69.52,
      //           open: 68.12,
      //           close: 68.48,
      //           volume: 13187800,
      //         },
      //         {
      //           time: 1543945800000,
      //           low: 66.62,
      //           high: 69.52,
      //           open: 68.12,
      //           close: 68.48,
      //           volume: 13187800,
      //         },
      //         // ... more bars
      //       ];

      //       if (bars.length) {
      //         onHistoryCallback(bars, { noData: false });
      //       } else {
      //         onHistoryCallback([], { noData: true });
      //       }
      //     },
      //     // ...other required methods, like subscribeBars, etc.
      //   };

      //   const tradingViewWidget = new TradingView.widget({
      //     container_id: document.getElementById("tvChartContainer").id,
      //     // ...other widget options
      //     // symbol: "MY_CUSTOM_SYMBOL", // Replace with your symbol
      //     interval: "D", // Time interval

      //     datafeed: dataFeed,
      //     enabled_features: ["drawings"],
      //     toolbar_bg: "#f1f3f6",
      //     hide_top_toolbar: false,

      //     // library_path:
      //     //   "https://charting-library.tradingview-widget.com/charting_library/",
      //     // // debug: true, // uncomment this line to see Library errors and warnings in the console
      //     // fullscreen: true,
      //     // symbol: "AAPL",
      //     // interval: "1D",
      //     // container: "tvChartContainer",
      //     // datafeed: new Datafeeds.UDFCompatibleDatafeed(
      //     //   "https://demo-feed-data.tradingview.com"
      //     // ),
      //     // locale: "en",
      //     // disabled_features: [],
      //     // enabled_features: [],
      //   });

      //   // const chart = createChart(document.getElementById("tvChart"), {
      //   //   width: 400,
      //   //   height: 300,
      //   // });
      //   // const lineSeries = chart.addLineSeries();
      //   // lineSeries.setData([
      //   //   { time: "2019-04-11", value: 80.01 },
      //   //   { time: "2019-04-12", value: 96.63 },
      //   //   { time: "2019-04-13", value: 76.64 },
      //   //   { time: "2019-04-14", value: 81.89 },
      //   //   { time: "2019-04-15", value: 74.43 },
      //   //   { time: "2019-04-16", value: 80.01 },
      //   //   { time: "2019-04-17", value: 96.63 },
      //   //   { time: "2019-04-18", value: 76.64 },
      //   //   { time: "2019-04-19", value: 81.89 },
      //   //   { time: "2019-04-20", value: 74.43 },
      //   // ]);

      //   // const chartOptions = {
      //   //   layout: {
      //   //     textColor: "black",
      //   //     background: { type: "solid", color: "white" },
      //   //   },
      //   //   width: 400,
      //   //   height: 300,
      //   // };
      //   // const chart = createChart(
      //   //   document.getElementById("tvChart"),
      //   //   chartOptions
      //   // );
      //   // const areaSeries = chart.addAreaSeries({
      //   //   lineColor: "#2962FF",
      //   //   topColor: "#2962FF",
      //   //   bottomColor: "rgba(41, 98, 255, 0.28)",
      //   // });
      //   // areaSeries.setData([
      //   //   { time: "2018-12-22", value: 32.51 },
      //   //   { time: "2018-12-23", value: 31.11 },
      //   //   { time: "2018-12-24", value: 27.02 },
      //   //   { time: "2018-12-25", value: 27.32 },
      //   //   { time: "2018-12-26", value: 25.17 },
      //   //   { time: "2018-12-27", value: 28.89 },
      //   //   { time: "2018-12-28", value: 25.46 },
      //   //   { time: "2018-12-29", value: 23.92 },
      //   //   { time: "2018-12-30", value: 22.68 },
      //   //   { time: "2018-12-31", value: 22.67 },
      //   // ]);

      //   // const candlestickSeries = chart.addCandlestickSeries({
      //   //   upColor: "#26a69a",
      //   //   downColor: "#ef5350",
      //   //   borderVisible: false,
      //   //   wickUpColor: "#26a69a",
      //   //   wickDownColor: "#ef5350",
      //   // });
      //   // candlestickSeries.setData([
      //   //   {
      //   //     time: "2018-12-22",
      //   //     open: 75.16,
      //   //     high: 82.84,
      //   //     low: 36.16,
      //   //     close: 45.72,
      //   //   },
      //   //   {
      //   //     time: "2018-12-23",
      //   //     open: 45.12,
      //   //     high: 53.9,
      //   //     low: 45.12,
      //   //     close: 48.09,
      //   //   },
      //   //   {
      //   //     time: "2018-12-24",
      //   //     open: 60.71,
      //   //     high: 60.71,
      //   //     low: 53.39,
      //   //     close: 59.29,
      //   //   },
      //   //   {
      //   //     time: "2018-12-25",
      //   //     open: 68.26,
      //   //     high: 68.26,
      //   //     low: 59.04,
      //   //     close: 60.5,
      //   //   },
      //   //   {
      //   //     time: "2018-12-26",
      //   //     open: 67.71,
      //   //     high: 105.85,
      //   //     low: 66.67,
      //   //     close: 91.04,
      //   //   },
      //   //   {
      //   //     time: "2018-12-27",
      //   //     open: 91.04,
      //   //     high: 121.4,
      //   //     low: 82.7,
      //   //     close: 111.4,
      //   //   },
      //   //   {
      //   //     time: "2018-12-28",
      //   //     open: 111.51,
      //   //     high: 142.83,
      //   //     low: 103.34,
      //   //     close: 131.25,
      //   //   },
      //   //   {
      //   //     time: "2018-12-29",
      //   //     open: 131.33,
      //   //     high: 151.17,
      //   //     low: 77.68,
      //   //     close: 96.43,
      //   //   },
      //   //   {
      //   //     time: "2018-12-30",
      //   //     open: 106.33,
      //   //     high: 110.2,
      //   //     low: 90.39,
      //   //     close: 98.1,
      //   //   },
      //   //   {
      //   //     time: "2018-12-31",
      //   //     open: 109.87,
      //   //     high: 114.69,
      //   //     low: 85.66,
      //   //     close: 111.26,
      //   //   },
      //   // ]);

      //   // chart.timeScale().fitContent();
      // }
    });
    onUnmounted(() => {
      clearInterval(interval);
    });

    // Return what's needed in the template
    return {
      state,
      price,
      size,
      tab,
      // functions
      short,
      long,
    };
  },
};
</script>
<style scoped></style>
