<template>
  <v-container fluid class="ma-0">
    <div v-if="state.skeletonLoader">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mt-10 d-flex justify-center" v-if="!display.mdAndUp">
        <v-col cols="12" v-if="display.mdAndUp">
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div style="display: flex; gap: 30px; margin-left: 1rem" v-if="display.mdAndUp">
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
        <v-col cols="12" v-if="!display.mdAndUp" style="display: flex; justify-content: center">
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div style="
            display: flex;
            gap: 30px;
            margin-left: 1rem;
            justify-content: center;
          " v-if="!display.mdAndUp">
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
      </v-row>
      <v-row class="mt-10" v-if="display.mdAndUp">
        <v-col cols="12" v-if="display.mdAndUp">
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div style="display: flex; gap: 30px; margin-left: 1rem" v-if="display.mdAndUp">
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
        <v-col cols="12" v-if="!display.mdAndUp" style="display: flex; justify-content: center">
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div style="
            display: flex;
            gap: 30px;
            margin-left: 1rem;
            justify-content: center;
          " v-if="!display.mdAndUp">
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
      </v-row>
      <v-row class="mt-15">
        <v-col v-for="(game, i) in state.topChartGames" :key="i" cols="6" md="3" sm="6" lg="3">
          <div class="d-flex align-center" style="gap: 5px">
            <v-skeleton-loader style="width: 100px; height: 100px; border-radius: 15px"
              type="image"></v-skeleton-loader>
            <div>
              <v-skeleton-loader width="150" type="text"></v-skeleton-loader>
              <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              <div class="d-flex align-center" style="gap: 8px">
                <v-skeleton-loader style="border-radius: 28px" type="button"></v-skeleton-loader>
                <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-15">
        <v-col v-if="display.mdAndUp">
          <v-skeleton-loader width="250" type="text"></v-skeleton-loader>
        </v-col>
        <v-col align="center" v-if="!display.mdAndUp">
          <v-skeleton-loader width="250" type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(app, i) in state.appsOfTheDay" :key="i" style="position: relative" cols="12" md="3" sm="6">
          <v-skeleton-loader type="image"></v-skeleton-loader>
          <v-skeleton-loader style="
              position: absolute;
              top: 70%;
              right: 30px;
              border-radius: 28px;
            " dark type="button"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row style="display: flex; align-items: center">
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-skeleton-loader style="width: 100%; height: 60px" type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-skeleton-loader style="width: 100%; height: 60px" type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-skeleton-loader style="width: 100%; height: 60px" type="image"></v-skeleton-loader>
        </v-col>
        <v-col class="d-flex justify-center" cols="12" sm="12" md="3" lg="3">
          <v-skeleton-loader width="150px" type="text"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(app, i) in state.suggestedAppsByFilter" :key="i" align="center" cols="6" sm="6" md="3" lg="3">
          <div style="max-width: 264px">
            <div>
              <v-skeleton-loader type="image"></v-skeleton-loader>
            </div>
            <div class="d-flex justify-space-between mt-4">
              <div>
                <v-skeleton-loader width="150" type="sentences"></v-skeleton-loader>
                <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              </div>
              <div>
                <v-skeleton-loader style="border-radius: 28px" type="button"></v-skeleton-loader>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-15">
        <v-col class="d-flex justify-center">
          <v-skeleton-loader style="width: 25%; height: 50px; border-radius: 0px 13.8848px"
            type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <v-snackbar v-model="state.snackbar" :color="state.snackbarInfo.color">
      {{ state.snackbarInfo.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="state.snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div v-if="!state.skeletonLoader">

      <div>
        <v-row class="background-banner-img-style">
          <v-col class="pt-16" style="position: relative">
            <br />

            <div class="pink-color"></div>
            <div class="skyblue-color"></div>
            <br />

            <br />
          </v-col>
          <div class="Aplications-on-img">
            <p class="pl-10 text-md-h3 text-h5 text-on-img">
              All Best Applications<br />
              In One Spot
            </p>
          </div>
        </v-row>
        <v-row class="mx-4">
          <v-col>
            <p class="title-text ml-2 mb-4">Top Chart</p>
            <div class="v-chip-center">
              <v-chip class="ma-2" :class="{ filterSelect: filterSelect == 'topNew' }" color="#ffffff"
                variant="outlined" @click="getTopChartApps()">
                Top New
              </v-chip>

              <v-chip class="ma-2" color="#ffffff" variant="outlined"
                :class="{ filterSelect: filterSelect == 'topSelling' }" @click="topSellingApps()">
                Top Selling
              </v-chip>

              <v-chip class="ma-2" color="#ffffff" variant="outlined"
                :class="{ filterSelect: filterSelect == 'popular' }" @click="popularApps()">
                Popular
              </v-chip>
            </div>
            <br />
            <v-row>
              <v-col v-for="(game, i) in state.topChartGames" :key="i" cols="12" md="3" sm="6" class="d-flex align-center"
                @click="goToAppDetailsPage(game.id)">
                <SwiperMultiCards :cardContents="game" />
              </v-col>
            </v-row>
            <v-row>
              <v-col style="display:flex;justify-content:center">
                <v-btn style="font-size: 15px;" size=x-large class="mt-8 text-white buy-now-btn px-15 text-capitalize"
                  dark @click="showMoreTopNewChart()">{{ state.topChartAllDataLoaded ? 'Show Less' : 'Show More' }}
                </v-btn>

              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mx-4 d-block">
          <v-row class="mt-14">
            <v-col>
              <p class="title-text ml-2 mt-4">App Of The Day</p>
            </v-col>
          </v-row>
          <v-row class="mt-13 mb-16">
            <v-col style="position: relative; " class="mb-15" v-for="(app, i) in state.appsOfTheDay.slice(0, 6)"
              :key="i" cols="12" lg="3" sm="6" md="4">

              <v-card style="box-shadow: none; background: transparent; max-width: 200px;"
                class="d-flex justify-space-between">
                <!-- <img :src="app.img" style="max-width: 100%" /> -->
                <v-img :src="app.img" class="app-of-the-day-img" @click="goToAppDetailsPage(app.id)">
                </v-img>
              </v-card>
              <div style="position: absolute; right: 30px; bottom: 10%">
                <v-btn rounded class="get-btn-style" @click="goToAppDetailsPage(app.id)">
                  Get
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-row>
        <v-row style="background: #39276f" class="mt-16 mx-4 pt-5 d-flex justify-space-around rounded-lg">
          <v-col cols="12" sm="12" md="2" class="d-flex justify-center">
            <v-btn class="mb-5" style="background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
              border-radius: 0px 13.8848px;color: white;" @click="removeQueryFilter()">
              remove Filter
            </v-btn>
          </v-col>
          <v-col class="text-center py-0" cols="12" md="2" sm="12">
            <v-select :items="state.genreItems" label="Genre" dense elevation="5" dark style="color: white;"
              background-color="#853FC5" outlined v-model="genre" class="select"></v-select>
          </v-col>
          <v-col class="text-center py-0" cols="12" md="2" sm="12">
            <v-select :items="state.systemItems" label="System" dense elevation="5" dark style="color: white;"
              background-color="#853FC5" outlined v-model="system" class="select"></v-select>
          </v-col>
          <!-- /////////// -->
          <v-col class="text-center py-0" cols="12" md="2" sm="12">
            <v-select :items="state.languageItems" label="English" dense elevation="5" dark style="color: white;"
              background-color="#853FC5" outlined v-model="state.language" class="select" @click="filter()"></v-select>
          </v-col>
          <!-- /////////// -->
          <v-col class="text-center  " cols="12" md="2">
            <span style="color:#ffffff;font-size: 20px;">Price : ${{ parseInt(priceFilterValue) }}</span>
          </v-col>
          <v-col class="d-flex align-center text-center py-0" cols="12" md="2">
            <v-slider min="0" v-model="priceFilterValue" max="100" color="#6740E1" track-color="#9F84F3"
              thumb-color="#853FC5" @click="filter()"></v-slider>
          </v-col>
        </v-row>
        <v-row class="mx-md-15 mt-15 ml-3 ml-md-10">
          <!-- cols="6" md="3" sm="6" lg="3" -->
          <v-col style="align-content: end;" v-for="(app, i) in state.suggestedAppsByFilter" :key="i" cols="12" md="4"
            sm="6" lg="3">
            <br />

            <v-card class="align-end" style="box-shadow: none; max-width: 314px; background: transparent">
              <img :src="app.img" style="max-width: 100%; width: 100%; border-radius: 35px;object-fit:cover;" />
              <div style="display: flex; justify-content: space-between">
                <div>
                  <div class="title-filter-app d-flex justify-left">
                    {{ app.name }}
                  </div>
                  <div class="d-flex justify-left">
                    <span class="subtitle-filter-app mt-1">
                    Rate:
                    </span>

                    <v-icon color="#FFC83A" style="font-size: larger;" class="ml-2">
                      mdi-star
                    </v-icon>
                    <span class="rate-filter-app "> {{ app.rate }}</span>
                  </div>
                </div>
                <div style="align-items: center; display: flex">
                  <v-btn @click="goToAppDetailsPage(app.id)" rounded class="get-btn-style px-5">Get</v-btn>
                </div>
              </div>
            </v-card>
            <v-card></v-card>
          </v-col>
          <div style="width: 100%; text-align: center">
            <br />
            <br />
            <br />
            <v-btn size="x-large" class="text-white buy-now-btn px-15 text-capitalize" dark @click="showMore()">{{
              state.isAllDataLoaded ? 'Show Less' : 'Show More' }}</v-btn>

          </div>
        </v-row>


      </div>
    </div>
  </v-container>

</template>
<script>
import { useMainStore } from "~/store";
import SwiperMultiCards from '../../components/SwiperMultiCards.vue'
import { useDisplay } from "vuetify";
import axios from "axios";
import { ref, reactive, onMounted, onUnmounted } from "vue";
export default {
  components: {
    SwiperMultiCards,
  },
  setup() {
    //variables start
    const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();

    const { $auth, $walletConnect } = useNuxtApp();
    const router = useRouter();
    const route = useRoute();
    //const baseUrl = 'http://localhost:14040';
    // const fileURL = 'http://localhost:14030';
    const display = ref(useDisplay());
    const genre = ref(null);
    const priceFilterValue = ref(1);
    const system = ref(null)
    const filterSelect = ref("topNew");
    const state = reactive({
      topChartAllDataLoaded: false,
      topSellingIsAllDataLoaded: false,
      topPopullarIsAllDataLoaded: false,
      isAllDataLoaded: false,
      skeletonLoader: true,
      appsOfTheDay: [],
      snackbar: false,
      snackbarInfo: [],
      takeAppOfTheDay: 5,
      skip: 1,
      take: 4,
      topChartGames: [],
      suggestedAppsByFilter: [],
      takeGenre: 4,
      genreNameAndId: {},
      takeTopNewApp: 4,
      genreItems: [],
      systemItems: ['Android', 'PC'],
      language: null,
      languageItems: ['Action', 'Racing', 'Casual', 'Realistic'],
      takePopularApps: 4,
      takeTopSellingApps: 4,
      suggestedAppsByFilterSkip: 1,
      topChartSkip: 1,

    })
    const userToken = ref(null);
    //variables  end
    //functions start
    const goToAppDetailsPage = async (id) => {
      return await navigateTo({ path: '/app-details', query: { appId: id } })
    };

    const topSellingApps = async () => {
      userToken.value = await $auth.token();
      try {
        state.topChartGames = []
        const res = await axios.get(baseURL + '/api/v1/getTopSellingApps/1/' + state.takeTopSellingApps, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          },
        }).then((res) => {
          if (res.data.length < state.takeTopSellingApps) {
            state.topChartAllDataLoaded = true;
          } else {
            state.topChartAllDataLoaded = false;
          }
          try {
            res.data.forEach((item, index) => {
              const firstRelation = item.appsVersionsModelRelation[0];
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type == 1)
              if (img)
                state.topChartGames.push({
                  id: item.id,
                  name: item.name,
                  text: item.name,
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  price: '',
                })

            })
            let queryGenre = route.query.genre;
            let querySystem = route.query.system;
            if (queryGenre == null && querySystem == null) {
              router.push({
                path: "/apps",
                query: { filter: "topSelling" }
              })
              filterSelect.value = 'topSelling'
            }
            else if (queryGenre != null) {
              router.push({
                path: "/apps",
                query: { filter: "topSelling", genre: queryGenre, system: querySystem }
              })
              filterSelect.value = 'topSelling'
            }
            else if (querySystem != null) {
              router.push({
                path: "/apps",
                query: { filter: "topSelling", system: querySystem, genre: queryGenre }
              })
              filterSelect.value = 'topSelling'
            }

          } catch (error) {
            state.snackbar = true
            state.snackbarInfo.text = error
            state.snackbarInfo.color = 'error'
          }
        });

      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const getAllGenres = async () => {
      try {
        const res = await axios.get(baseURL + '/api/v1/getAllGenresOfApps/1/30', {
          header: {
            'Content-Type': 'application/json',
            // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
        }).then((res) => {
          res.data.forEach((item) => {
            state.genreItems.push(item.name)
            state.genreNameAndId[item.name] = item.id
          })
        });

      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const getAppsOfTheDay = async () => {
      try {
        const res = await axios.get(baseURL + '/api/v1/getDifferentCategoryOfApps/' + state.skip + '/4', {
          header: {
            'Content-Type': 'application/json',
            // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
        })


        state.appsOfTheDay = [];
        try {
          res.data.forEach((item) => {
            const [firstRelation] = item.appsVersionsModelRelation;
            //let img = firstRelation.versionsFilesModelRelation.find((x) => x.type === 3)
            let img = item.appsVersionsModelRelation[0].versionsFilesModelRelation.find((x) => x.type == 1)
            if (img)
              state.appsOfTheDay.push({
                id: item.id,
                name: item.name,
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
              })
          })
        } catch (error) {
          state.snackbar = true
          state.snackbarInfo.text = 'not found'
          state.snackbarInfo.colo = 'error'
        }


      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const gamesByGenre = async () => {
      userToken.value = await $auth.token();
      try {
        const res = await axios.get(baseURL + '/api/v1/getAppForGenre/1/' + state.takeGenre + '/' + state.genreNameAndId[genre.value] +
          '/' +
          parseInt(priceFilterValue.value), {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          },
        }).then((res) => {
          try {
            state.suggestedAppsByFilter = []
            res.data.forEach((item) => {
              const [firstRelation] = item.appsVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type == 1)
              let rating = item.rating / item.ratingNumber
              if (!rating || Number.isNaN(rating)) {
                rating = 0
              }
              rating = rating.toFixed(2)
              if (img)
                state.suggestedAppsByFilter.push({
                  id: item.id,
                  name: item.name,
                  text: item.header,
                  contract_address: item.contract_address,
                  appsFilesModelRelation: item.appsFilesModelRelation,
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  rate: rating,
                })
              // } catch (error) {}
            })
          } catch (error) {
            state.snackbar = true
            state.snackbarInfo.text = "fhbfghfh"
            state.snackbarInfo.color = 'error'

          }
        });

      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = 'not found'
        state.snackbarInfo.color = 'error'
      }
    };
    const getSuggestedAppsByFilter = async () => {

      userToken.value = await $auth.token();
      try {
        const res = await axios.get(baseURL + '/api/v1/getAllAppsNotGame/' + state.suggestedAppsByFilterSkip + '/' + state.take, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          },
        }).then((res) => {

          //  state.suggestedAppsByFilter = [];
          //   if (res.data.length == 0) {
          //   state.isAllDataLoaded = true; 
          //  } else {
          //   state.isAllDataLoaded = false;
          //   }
          res.data.forEach((item) => {
            const [firstRelation] = item.appsVersionsModelRelation;
            let img = firstRelation.versionsFilesModelRelation.find((x) => x.type == 1)
            let rating = item.rating / item.ratingNumber
            if (!rating || Number.isNaN(rating)) {
              rating = 0
            }
            rating = rating.toFixed(2)

            // try {
            if (img)
              state.suggestedAppsByFilter.push({
                id: item.id,
                name: item.name,
                text: item.header,
                contract_address: item.contract_address,
                appsFilesModelRelation: item.appsFilesModelRelation,
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,

                rate: rating,
              })
            // } catch (error) {
            // state.snackbar = true
            // state.snackbarInfo.text = error
            // state.snackbarInfo.color = 'error'
            // }

          })
        });
      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const getTopChartApps = async () => {
      //this function is for filter in querystring

      userToken.value = await $auth.token();
      try {

        const res = await axios.get(baseURL + '/api/v1/getTopNewApps/' + state.topChartSkip + '/' + state.take, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          },
        }).then((res) => {
          // state.topChartGames = []
          try {
            res.data.forEach((item, index) => {
              const [firstRelation] = item.appsVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type === 3)
              if (img)
                if (index < res.data.length) {
                  state.topChartGames.push({
                    id: item.id,
                    name: item.name,
                    text: item.name,
                    img:
                      fileURL +
                      '/api/v1/downloadFileByName/' +
                      img.name +
                      '/' +
                      img.path +
                      '/' +
                      img.extension,
                    price: '',
                  })
                }
            })
          } catch (error) {
            state.snackbar = true
            state.snackbarInfo.text = error
            state.snackbarInfo.color = 'error'
          }
        });

        let queryGenre = route.query.genre;
        let querySystem = route.query.system;

        if (queryGenre == null && querySystem == null && filterSelect.value != 'topNew') {
          router.push({
            path: "/apps",
            query: { filter: "topNew" }
          })
          filterSelect.value = 'topNew'
        }
        else if (queryGenre != null) {
          router.push({
            path: "/apps",
            query: { filter: "topNew", genre: queryGenre, system: querySystem }
          })
          filterSelect.value = 'topNew'
        }
        else if (querySystem != null) {
          router.push({
            path: "/apps",
            query: { filter: "topNew", system: querySystem, genre: queryGenre }
          })
          filterSelect.value = 'topNew'
        }

      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const popularApps = async () => {
      try {
        state.topChartGames = []
        const res = await axios.get(baseURL + '/api/v1/getPopularApps/1/' + state.takePopularApps, {
          header: {
            'Content-Type': 'application/json',
            // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
        }).then((res) => {

          if (res.data.length < state.takePopularApps) {
            state.topChartAllDataLoaded = true;
          } else {
            state.topChartAllDataLoaded = false;
          }

          try {
            res.data.forEach((item) => {
              const [firstRelation] = item.appsVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type === 3)
              state.topChartGames.push({
                id: item.id,
                name: item.name,
                text: item.name,
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                price: 'In-AppPurchases',
              })
            })
          } catch (error) {
            state.snackbar = true
            state.snackbarInfo.text = 'not found'
            state.snackbarInfo.colo = 'error'
          }
        });
        let queryGenre = route.query.genre;
        let querySystem = route.query.system;
        if (queryGenre == null && querySystem == null) {
          router.push({
            path: "/apps",
            query: { filter: "popular" }
          })
          filterSelect.value = 'popular'
        }
        else if (queryGenre != null) {
          router.push({
            path: "/apps",
            query: { filter: "popular", genre: queryGenre, system: querySystem }
          })
          filterSelect.value = 'popular'
        }
        else if (querySystem != null) {
          router.push({
            path: "/apps",
            query: { filter: "popular", system: querySystem, genre: queryGenre }
          })
          filterSelect.value = 'popular'
        }

      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const filter = async () => {
      if (genre.value == null) {
        await getSuggestedAppsByFilter();
      }
      if (genre.value != null) {
        if (system.value != null) {
          await gamesBySystemAndGenre()
        } else {
          await gamesByGenre()
        }
      } else {
        if (system.value != null) {
          await gamesBySystem()
        }
      }
    };
    const gamesBySystem = async () => {
      userToken.value = await $auth.token();
      try {
        if (system.value != null) {
          const res = await axios.get(baseURL + '/api/v1/getAppForOs/System' + system.value, {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + userToken.value
            },
          }).then((res) => {
            state.suggestedAppsByFilter = []
            res.data.forEach((item) => {
              let img = item.appsFilesModelRelation.find((x) => x.type == 3)

              let rating = item.rating / item.ratingNumber
              if (!rating || Number.isNaN(rating)) {
                rating = 0
              }
              rating = rating.toFixed(2)

              // try {
              if (img)
                state.suggestedAppsByFilter.push({
                  id: item.id,
                  name: item.name,
                  text: item.header,
                  contract_address: item.contract_address,
                  appsFilesModelRelation: item.appsFilesModelRelation,
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,

                  rate: rating,
                })
              // } catch (error) {}
            })
          });

        }
      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const gamesBySystemAndGenre = async () => {
      userToken.value = await $auth.token();

      try {
        const res = await axios.get(baseURL + '/api/v1/getAppForSystemAndGenre/1/10/' +
          system.value +
          '/' +
          state.genreNameAndId[genre.value] +
          '/' +
          parseInt(priceFilterValue.value), {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + userToken.value
          },
        })
        state.suggestedAppsByFilter = []
        res.data.forEach((item) => {

          const [firstRelation] = item.appsVersionsModelRelation;
          let img = firstRelation.versionsFilesModelRelation.find((x) => x.type = 3)

          let rating = item.rating / item.ratingNumber
          if (!rating || Number.isNaN(rating)) {
            rating = 0
          }
          rating = rating.toFixed(2)

          // try {
          if (img)
            state.suggestedAppsByFilter.push({
              id: item.id,
              name: item.name,
              text: item.header,
              contract_address: item.contract_address,
              appsFilesModelRelation: item.appsFilesModelRelation,
              img:
                this.$store.state.fileURL +
                '/api/v1/downloadFileByName/' +
                img.name +
                '/' +
                img.path +
                '/' +
                img.extension,

              rate: rating,
            })
          // } catch (error) {}
        })
      } catch (error) {
        state.snackbar = true
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
      }
    };
    const showMore = async () => {

      const res = await axios.get(baseURL + '/api/v1/getAllAppsNotGameTotal/', {
        headers: {
          'Content-Type': 'application/json',
          //   "Authorization": "Bearer " + userToken.value
        },
      })
      if (genre.value == null) {
        if (state.isAllDataLoaded == false) {
          state.suggestedAppsByFilterSkip += 1;
          await getSuggestedAppsByFilter();
          if (res.data.length == state.suggestedAppsByFilter.length) {
            state.isAllDataLoaded = true;
          }
        } else {
          state.suggestedAppsByFilter = [];
          state.suggestedAppsByFilterSkip = 1;
          await getSuggestedAppsByFilter();
          state.isAllDataLoaded = false;
        }
      }
      else {
        state.takeGenre += 4
        await gamesByGenre();
      }
    };
    const showMoreAppOfTheDay = async () => {
      state.takeAppOfTheDay += 4;
      await getAppsOfTheDay()
    };
    const showMoreTopNewChart = async () => {
      if (filterSelect.value == 'topNew') {
        const res = await axios.get(baseURL + '/api/v1/getTopNewAppsTotal/', {
          headers: {
            'Content-Type': 'application/json',
            //   "Authorization": "Bearer " + userToken.value
          },
        })

        if (state.topChartAllDataLoaded == false) {
          state.topChartSkip += 1;
          await getTopChartApps();
          if (res.data.length == state.topChartGames.length) {
            state.topChartAllDataLoaded = true;
          }
        } else {
          state.topChartGames = [];
          state.topChartSkip = 1;
          await getTopChartApps();
          state.topChartAllDataLoaded = false;
        }
      }
      else if (filterSelect.value == 'topSelling') {
        if (state.topChartAllDataLoaded) {
          state.takeTopSellingApps = 4;
          state.skip = 1;
          state.topChartAllDataLoaded = false;
        } else {
          state.takeTopSellingApps += 4;
        }
        await topSellingApps();
      }
      else if (filterSelect.value == 'popular') {
        if (state.topChartAllDataLoaded) {
          state.takePopularApps = 4;
          state.skip = 1;
          state.topChartAllDataLoaded = false;
        } else {
          state.takePopularApps += 4;
        }
        await popularApps();
      }

    };
    watch(genre, async (newValue, oldValue) => {
      let querySystem = route.query.system;
      let filterQuery = route.query.filter
      if (querySystem != null || filterQuery != null) {
        router.push({
          path: "/apps",
          query: { genre: genre.value, system: querySystem, filter: filterQuery }
        })
      }
      else if (querySystem == null && filterQuery == null) {
        router.push({
          path: "/apps",
          query: { genre: genre.value }
        })

      }
      else if (filterQuery != null) {
        router.push({
          path: "/apps",
          query: { genre: genre.value, filter: filterQuery }
        })
      }
      await filter();

    })
    watch(system, async (newValue, oldValue) => {
      let queryGenre = route.query.genre;
      let filterQuery = route.query.filter;
      if (queryGenre != null || filterQuery != null) {
        router.push({
          path: "/apps",
          query: { system: system.value, genre: queryGenre, filter: filterQuery }
        })
      }
      else if (queryGenre == null && filterQuery == null) {
        router.push({
          path: "/apps",
          query: { system: system.value }
        })
      }
      else if (filterQuery != null) {
        router.push({
          path: "/apps",
          query: { system: system.value, filter: filterQuery }
        })
      }

      await filter();
    })
    watch(priceFilterValue, async (newValue, oldValue) => {
      // await filter();
    })
    const filterSelectWithQuery = async () => {
      let queryGenre = route.query.genre;
      let querySystem = route.query.system;
      let filterTopNew = route.query.filter;
      if (queryGenre != null || querySystem != null) {
        genre.value = queryGenre;
        system.value = querySystem;
        await filter();
      }
      else {
        return;
      }

    }
    const filterChipWithQuery = async () => {
      let filter = route.query.filter;
      if (filter == 'topNew') {
        filterSelect.value = 'topNew';
        await getTopChartApps();
      }
      else if (filter == 'topSelling') {
        filterSelect.value = 'topSelling';
        await topSellingApps();
      }
      else if (filter == 'popular') {
        filterSelect.value = 'popular';
        await popularApps();
      }
    }
    const removeQueryFilter = async () => {
      genre.value = null;
      system.value = null;
      await filter();
      return await navigateTo({ path: "/apps", query: {}, replace: true })
    }
    //functions  end
    //events start
    onMounted(async () => {
      $auth.isLoggedIn();
      if (route.query.filter == null) {
        await getTopChartApps();
      }

      await getAppsOfTheDay();
      await getSuggestedAppsByFilter();
      await getAllGenres();
      await filterSelectWithQuery();
      await filterChipWithQuery();
      state.skeletonLoader = false;

    });
    //events end
    return {
      // variables start
      display,
      state,
      genre,
      priceFilterValue,
      system,
      filterSelect,
      // variables end

      //functions start
      getAppsOfTheDay,
      goToAppDetailsPage,
      topSellingApps,
      popularApps,
      filter,
      gamesBySystem,
      gamesBySystemAndGenre,
      showMore,
      showMoreAppOfTheDay,
      showMoreTopNewChart,
      getTopChartApps,
      removeQueryFilter,
      //functions end
    };
  },
};


</script>
<style scoped>
.background-banner-img-style {
  /* width: 100%; */
  background-image: url(../../public/img/appBanner.png);
  min-height: 600px;
  background-position: center;
  background-size: 100vw;
  position: relative;

}

.pink-color {
  position: absolute;
  width: 219px;
  height: 204px;
  left: -55px;
  top: 92px;
  background: #d9179d;
  filter: blur(94px);
}

.skyblue-color {
  position: absolute;
  width: 236px;
  height: 245px;
  left: 1px;
  top: 271px;
  background: rgba(119, 243, 251, 0.86);
  filter: blur(94.5px);
}

@media screen and (max-width: 992px) {
  .background-banner-img-style {
    min-height: 300px;
  }

  .skyblue-color {
    position: absolute;
    width: 236px;
    height: 245px;
    left: 200px;
    top: 0;
    background: rgba(119, 243, 251, 0.86);
    filter: blur(94.5px);
  }

  .pink-color {
    position: absolute;
    width: 219px;
    height: 204px;
    left: -55px;
    top: 20px;
    background: #d9179d;
    filter: blur(94px);
  }
}

@media screen and (max-width: 600px) {
  .background-banner-img-style {
    min-height: 150px;
  }

  .pink-color {
    display: none;
  }

  .skyblue-color {
    display: none;
  }
}

.text-on-img {
  font-style: normal;
  font-weight: 700;
  z-index: 100;
  color: #ffffff;
}

.Aplications-on-img {
  display: flex;
  align-items: start;
  justify-content: start;
  position: absolute;
  left: 0;
  top: 30%;
}

.title-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 33px;
  /* identical to box height */
  color: #ffffff;
}

@media screen and (max-width: 960px) {
  .title-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    /* identical to box height */
    color: #ffffff;
    text-align: center;
  }

  .v-chip-center {
    text-align: center;
  }

  .Aplications-on-img {
    display: flex;
    align-items: start;
    justify-content: start;
    position: absolute;
    left: -15px;
    top: 36%;
  }

  .text-on-img {
    font-style: normal;
    font-weight: 700;
    z-index: 100;
    color: #ffffff;
    font-size: 1.8rem !important;
  }
}

@media screen and (max-width: 600px) {
  .text-on-img {
    font-style: normal;
    font-weight: 700;
    z-index: 100;
    color: #ffffff;
    font-size: 1.1rem !important;
  }

  .Aplications-on-img {
    display: flex;
    align-items: start;
    justify-content: start;
    position: absolute;
    left: -37px;
    top: 43%;
  }
}

.v-chip.v-chip--outlined {
  border-width: initial;
  border-style: solid;
}

.title-filter-app {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
}

.subtitle-filter-app {
  font-family: 'Roboto';
  font-size: 10px;
  color: #ffffff;
}

.rate-filter-app {
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  margin-top: 2px;
}

.get-btn-style {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  padding: 8px 24px !important;
  color: #ffffff;
}

.buy-now-btn {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  border-radius: 0px 13.8848px;
}

/*
.select{
-webkit-box-shadow: -4px -4px 30px 0px rgba(133,63,197,1);
-moz-box-shadow: -4px -4px 30px 0px rgba(133,63,197,1);
box-shadow: -4px -4px 30px 0px rgba(133,63,197,1);
} 
*/
.app-of-the-day-img {
  cursor: pointer;
  max-width: 100%;
  background-color: #1B1825 !important;
  border-radius:   35px;
}

.filterSelect {
  background-color: #7400b8 !important;
}
</style>

<style>
.v-select .v-field .v-text-field__prefix,
.v-select .v-field .v-text-field__suffix,
.v-select .v-field .v-field__input,
.v-select .v-field.v-field {
  background-color: #a91fff36 !important;
}

.v-skeleton-loader {
  align-items: center;
  background: none !important;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  vertical-align: top;
}
</style>