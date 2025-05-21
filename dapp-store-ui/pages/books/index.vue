<template>
  <v-container fluid>
    <div v-if="state.skeletonLoader" style="direction: ltr;">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <div style="display: flex; gap: 40px">
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
        </div>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-skeleton-loader style="margin-left: 1rem" width="150px" type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-skeleton-loader style="margin-left: 1rem" width="130px" type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row style="position: relative" v-if="display.mdAndUp">
        <v-col v-for="i in 6" :key="i" cols="2">
          <div style="
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px;
          ">
            <v-skeleton-loader style="width: 100%" type="image"></v-skeleton-loader>
            <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          </div>
        </v-col>
        <v-skeleton-loader dark style="position: absolute; top: 30%; left: 10px; border-radius: 50%"
          type="button"></v-skeleton-loader>
        <v-skeleton-loader dark style="position: absolute; top: 30%; right: 10px; border-radius: 50%"
          type="button"></v-skeleton-loader>
      </v-row>
      <v-row style="position: relative" v-if="!display.mdAndUp">
        <v-col v-for="i in 3" :key="i" cols="4">
          <div style="
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px;
          ">
            <v-skeleton-loader style="width: 100%" type="image"></v-skeleton-loader>
            <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          </div>
        </v-col>
        <v-skeleton-loader dark style="position: absolute; top: 30%; left: 10px; border-radius: 50%"
          type="button"></v-skeleton-loader>
        <v-skeleton-loader dark style="position: absolute; top: 30%; right: 10px; border-radius: 50%"
          type="button"></v-skeleton-loader>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader width="250px" style="margin-left: 20px" type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mt-15">
        <v-col cols="12">
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="display.mdAndUp">
        <v-col cols="12" md="6">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="!display.mdAndUp">
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-skeleton-loader style="width: 80%" type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-skeleton-loader style="width: 80%" type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="text" width="180" class="ml-5"></v-skeleton-loader>
        </v-col>
        <div style="display: flex; gap: 40px" class="ml-5">
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
          <v-skeleton-loader style="border-radius: 16px" type="button"></v-skeleton-loader>
        </div>
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
    <div v-if="!state.skeletonLoader" style="direction: ltr;">
      <v-row class="mt-2" style="position: relative;">
        <v-col class="pa-0">
          <div>
            <!-- <v-img src="../../public/img/bookBanner.png"> </v-img> -->
            <img src="../../public/img/bookBanner.png" width="100%" alt="">
          </div>
        </v-col>
        <v-img class="dune-card1" src="../../public/img/card1.svg"></v-img>
        <v-img class="dune-card2" src="../../public/img/card2.svg"></v-img>
      </v-row>
      <v-row class="mx-6">
        <v-col>
          <div>
            <v-chip class="ma-2" variant="outlined" color="#ffffff" :class="{ filterSelect: filterSelect == 'eBooks' }"
              @click="getRecentlyReducedEbook()">
              Ebooks
            </v-chip>

            <v-chip class="ma-2" color="#ffffff" variant="outlined" :class="{ filterSelect: filterSelect == 'audioBooks' }"
              @click="getAudiobook()">
              Audiobooks
            </v-chip>

            <v-chip class="ma-2" color="#ffffff" variant="outlined" :class="{ filterSelect: filterSelect == 'fictionBooks' }"
              @click="getFictionsbook()">
              Fiction & literature
            </v-chip>
            <v-chip class="ma-2" color="#ffffff" variant="outlined" :class="{ filterSelect: filterSelect == 'kidsBooks' }"
              @click="getKidsbook()">
              Kids
            </v-chip>
          </div>
          <br />
          <br />
          <p class="title-text mb-1">eBooks</p>
          <p class="subtitle-text mb-5">Limited time deals</p>
          <v-row class="mt-4">
            <v-col class="d-flex justify-center gc-5" style="padding: 2px">
              <BookSwiperSingleCard :cardContents="state.recentlyReducedEbooks" :type="'book'" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mx-6">
        <v-col>
          <!-- <p class="title-text">Real-life stories</p> -->


          <!-- <v-row>
          <v-col
            ><BookSwiperSingleCard
              :cardContents="state.realLifeStoriesEbook"
              :type="'book'"
          /></v-col>
        </v-row> -->
        </v-col>
      </v-row>

      <v-row class="mb-2 mx-6"><v-col>
          <br />
          <span class="title-text">Collections</span>
        </v-col></v-row>

      <v-row class="mx-6">
        <v-col cols="12" md="6">
          <v-img src="../../public/img/collection1.png" style="text-align: center; align-items: center">
            <span style="
              font-weight: 700;
              font-size: 40px;
              line-height: 48px;

              color: #ffffff;
            ">
              Best Of 2020
            </span>
          </v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="../../public/img/collection2.png" style="text-align: center; align-items: center">
            <span style="
              font-weight: 700;
              font-size: 40px;
              line-height: 48px;

              color: #ffffff;
            ">
              Kids Books
            </span></v-img>
        </v-col>
      </v-row>

      <!-- <v-row class="mx-6">
      <v-col>
        <br />

        <p class="title-text">Top Charts</p>
        <div>
          <v-chip class="ma-2" color="#ffffff" variant="outlined" @click="topSelling()
           changeSelect('Top selling')">
            Top Selling
          </v-chip>

          <v-chip
            class="ma-2"
            color="#ffffff"
            variant="outlined"
            @click="specialOffer()
             changeSelect('Deals')"
          >
            Deals
          </v-chip>

          <v-chip
            class="ma-2"
            color="#ffffff"
            variant="outlined"
            @click="topNewBooks() 
            changeSelect('New Releases')"
          >
            New Releases
          </v-chip>
        </div>
        <br />
        <v-col>
          <v-row>
            <v-col>
              <BookSwiperMultiCard
                :cardContents="recentlyReducedEbooks"
                :mainCard="topChartEbook"
                :offerCard="offerBooks"
                :type="'book'"
                :select="select"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row> -->

      <v-row class="mx-6">
        <v-col>
          <br />

          <p class="title-text">Top Charts</p>
          <div class="d-flex justify-left">
            <v-chip class="mt-2 mr-2" color="#ffffff" :class="{ filterSelect: filterSelectChip == 'topSelling' }"
              variant="outlined" @click="topSelling(); changeSelect('Top selling')">
              Top Selling
            </v-chip>

            <v-chip class="mt-2 mr-2" color="#ffffff" variant="outlined"
              :class="{ filterSelect: filterSelectChip == 'deals' }" @click="specialOffer(); changeSelect('Deals')">
              Deals
            </v-chip>

            <v-chip class="mt-2 mr-2" color="#ffffff" variant="outlined"
              :class="{ filterSelect: filterSelectChip == 'newRelease' }"
              @click="topNewBooks(); changeSelect('New Releases')">
              New Releases
            </v-chip>
          </div>
          <br />
          <v-col class="pa-0">
            <v-row>
              <v-col class="d-flex justify-center gc-5 pa-0">
                <BookSwiperMultiCard :cardContents="state.recentlyReducedEbooks" :mainCard="state.recentlyReducedEbooks"
                  :offerCard="state.offerBooks" :type="'book'" :select="state.select" />
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>





      <v-row>
        <v-col class="pa-0">
          <v-img src="../../public/img/Group33658.png" cover>
            <div>
              <br v-if="display.lgAndUp" />
              <br />
              <div class="footer-text mt-md-2 mx-auto">
                stay positive, work hard, make it happen
              </div>
              <br />
              <br />
              <div style="display: flex; justify-content: center" class="px-2 px-md-0 d-flex align-center">
                <span class="pr-3 email-font-style ">Email</span>
                <v-text-field class="mt-4 email-input" flat dark solo rounded style="max-width: 400px;" type="email"></v-text-field>
              </div>
              <br />
              <br />
              <div class="text-center">
                <v-btn size="x-large" class="buy-now-btn px-15 ml-15 text-capitalize text-white">Subscribe</v-btn>
              </div>
              <br />
            </div>
          </v-img>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { useMainStore } from "~/store";
import BookSwiperSingleCard from '../../components/BookSwiperSingleCard.vue'
import BookSwiperMultiCard from '../../components/BookSwiperMultiCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useDisplay } from "vuetify";
import axios from "axios";
import { ref, reactive, onMounted, onUnmounted } from "vue";
export default {
  components: {
    BookSwiperMultiCard,
    BookSwiperSingleCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();

    const display = ref(useDisplay());
    const router = useRouter();
    const route = useRoute();
    const filterSelect = ref('eBooks')
    const filterSelectChip = ref('topSelling')
    const state = reactive({
      genre: '',
      snackbar: false,
      snackbarInfo: [],
      skeletonLoader: true,
      recentlyReducedEbooks: [],
      realLifeStoriesEbook: [],
      topChartEbook: [],
      offerBooks: [],
      select: 'Top selling',
    })

    const getRecentlyReducedEbook = async () => {

      try {
        const res = await axios.get(baseURL + '/api/v1/getAllBooks/1/10', {
          header: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          state.recentlyReducedEbooks = []
          try {
            res.data.forEach((item, i) => {
              let img = item.booksVersionsModelRelation[0].versionsFilesModelRelation.find((x) => x.type == 3)
              let price = item.booksAppOrBookDetailsModelRelation.price
              if (img) {
                state.recentlyReducedEbooks.push({
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  name: item.name,
                  price: item.booksAppOrBookDetailsModelRelation.price,
                  id: item.id,
                })
              }
            })
            let topChartFilter = route.query.topChartFilter;
            if (filterSelect.value != 'eBooks') {
              router.push({
                path: "/books",
                query: { filter: "eBooks", topChartFilter: topChartFilter }
              })
              filterSelect.value = 'eBooks'
            }

          } catch (error) {
            state.snackbarInfo.text = error;
            state.snackbarInfo.color = 'error';
            state.snackbar = true;

          }

        })

      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true
      }
    };
    const goToBookDetailsPage = async (id) => {
      await navigateTo({
        path: "/book-details",
        query: {
          bookId: id
        }
      })
    };
    const getFictionsbook = async () => {

      try {
        const res = await axios.get(baseURL + '/api/v1/getAllAppOrBookCategories/1/4/' +
          '9fa73dae-ab54-41be-8d8c-53adb631e4bb', {
          header: {
            'Content-Type': 'application/json',
            // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
        }).then((res) => {
          try {
            state.recentlyReducedEbooks = []
            res.data.forEach((item) => {
              let relation = item.AppOrBookCategoriesBooksModelRelation[0].booksVersionsModelRelation[0]
              let img = relation.versionsFilesModelRelation.find((x) => x.type == 3);
              state.recentlyReducedEbooks.push({
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                name: item.AppOrBookCategoriesBooksModelRelation[0].name,
                price: 0,
                id: item.AppOrBookCategoriesBooksModelRelation[0].id,
              })
            })
          } catch (error) {
            state.snackbarInfo.text = 'not found'
            state.snackbarInfo.color = 'error'
            state.snackbar = true
          }
        });
        let topChartFilter = route.query.topChartFilter;
        if (topChartFilter == null) {
          router.push({
            path: "/books",
            query: { filter: "fictionBooks" }
          })
          filterSelect.value = 'fictionBooks'
        }
        else if (topChartFilter != null) {
          router.push({
            path: "/books",
            query: { filter: "fictionBooks", topChartFilter: topChartFilter }
          })
          filterSelect.value = 'fictionBooks'
        }

      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true
      }
    };
    const getAudiobook = async () => {

      try {
        const res = await axios.get(baseURL + '/api/v1/getAllAppOrBookCategories/1/4/' + 'fa59ac91-03e4-4070-b2ad-66334a2b5d86', {
          header: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          state.recentlyReducedEbooks = []
          try {
            res.data.forEach((item) => {
              let relation = item.AppOrBookCategoriesBooksModelRelation[0].booksVersionsModelRelation[0]
              let img = relation.versionsFilesModelRelation.find((x) => x.type == 3);
              if (img) {
                state.recentlyReducedEbooks.push({
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  name: item.AppOrBookCategoriesBooksModelRelation[0].name,
                  price: 0,
                  id: item.AppOrBookCategoriesBooksModelRelation[0].id,
                })
              }

            })
          } catch (error) {
            // state.snackbarInfo.text = error
            // state.snackbarInfo.color = 'error'
            // state.snackbar = true
          }
        });
        let topChartFilter = route.query.topChartFilter;
        if (topChartFilter == null) {
          router.push({
            path: "/books",
            query: { filter: "audioBooks" }
          })
          filterSelect.value = "audioBooks"
        }
        else if (topChartFilter != null) {
          router.push({
            path: "/books",
            query: { filter: "audioBooks", topChartFilter: topChartFilter }
          })
          filterSelect.value = "audioBooks"
        }

      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true

      }
    };
    const topSelling = async () => {
      state.topChartEbook = []
      try {
        const res1 = await axios.get(baseURL + '/api/v1/getTopSellingBooks/1/5', {
          header: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          try {
            res.data.forEach((item) => {
              const [firstRelation] = item.booksVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type === 3)
              if (img) {
                state.topChartEbook.push({
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  name: item.name,
                  price: 10,
                  rate: 4.8,
                  id: item.id,
                })
              }
            })
          } catch (error) {
            state.snackbarInfo.text = error
            state.snackbarInfo.color = 'error'
            state.snackbar = true
          }

        })
        let filter = route.query.filter

        if (filterSelectChip.value != 'topSelling') {
          router.push({
            path: "/books",
            query: { topChartFilter: 'topSelling', filter: filter }
          })
          filterSelectChip.value = 'topSelling'
        }
        else if (filter != null) {
          router.push({
            path: "/books",
            query: { topChartFilter: 'topSelling', filter: filter }
          })
        }

      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true
      }
    };
    const specialOffer = async () => {

      state.offerBooks = [];
      try {
        const res = await axios.get(baseURL + '/api/v1/getSpecialOfferBooks/1/5', {
          header: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          try {
            res.data.forEach((item) => {
              const [firstRelation] = item.appsVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type = 3)
              if (img)
                state.offerBooks.push({
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  name: item.name,
                  price: 10,
                  rate: 4.8,
                  id: item.id,
                })
            })
          } catch (error) {
            state.snackbarInfo.text = error
            state.snackbarInfo.color = 'error'
            state.snackbar = true
          }

        });
        let filter = route.query.filter;
        if (filter == null) {
          router.push({
            path: "/books",
            query: { topChartFilter: 'deals' }
          })
          filterSelectChip.value = 'deals'
        }
        else if (filter != null) {
          router.push({
            path: "/books",
            query: { topChartFilter: 'deals', filter: filter }
          })
          filterSelectChip.value = 'deals'
        }
      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true
      }
    };
    const getRealLifeStoriesEbook = async () => {

      try {
        const res = await axios.get(baseURL + '/api/v1/getAllAppOrBookCategories/1/4/' + '892b337d-7e92-421a-a258-79ecb818e9dd', {
          header: {
            'Content-Type': 'application/json',
            // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
          },
        }).then((res) => {
          try {
            res.data.forEach((item) => {
              state.realLifeStoriesEbook.push({
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  item.AppOrBookCategoriesBooksModelRelation[0].fileName +
                  '/bookImg/png',
                name: item.AppOrBookCategoriesBooksModelRelation[0].name,
                price: 0,
                id: item.AppOrBookCategoriesBooksModelRelation[0].id,
              })
            })
          } catch (error) {
            state.snackbarInfo.text = error
            state.snackbarInfo.color = 'error'
            state.snackbar = true
          }


        })

      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true
      }
    };
    const getKidsbook = async () => {

      try {
        const res = await axios.get(baseURL + '/api/v1/getAllAppOrBookCategories/1/4/' +
          '8620e6c4-55f1-4e29-b336-feb57d038e08', {
          header: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          state.recentlyReducedEbooks = []
          try {
            res.data.forEach((item) => {
              let relation = item.AppOrBookCategoriesBooksModelRelation[0].booksVersionsModelRelation[0]
              let img = relation.versionsFilesModelRelation.find((x) => x.type == 3);

              state.recentlyReducedEbooks.push({
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                name: item.AppOrBookCategoriesBooksModelRelation[0].name,
                price: 0,
                id: item.AppOrBookCategoriesBooksModelRelation[0].id,
              })
            })
          } catch (error) {
            // state.snackbarInfo.text = error
            // state.snackbarInfo.color = 'error'
            // state.snackbar = true
          }
        });
        let topChartFilter = route.query.topChartFilter;
        if (topChartFilter == null) {
          router.push({
            path: "/books",
            query: { filter: "kidsBooks" }
          })
          filterSelect.value = 'kidsBooks'
        }
        else if (topChartFilter != null) {
          router.push({
            path: "/books",
            query: { filter: "kidsBooks", topChartFilter: topChartFilter }
          })
          filterSelect.value = 'kidsBooks'
        }

      } catch (error) {
        // state.snackbarInfo.text = error
        // state.snackbarInfo.color = 'error'
        // state.snackbar = true
      }
    };
    const topNewBooks = async () => {
      state.topChartEbook = []
      try {
        const res = await axios.get(baseURL + '/api/v1/getTopNewBooks/1/5', {
          header: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          try {
            res.data.forEach((item) => {
              const [firstRelation] = item.booksVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find((x) => x.type === 3)
              if (img)
                state.topChartEbook.push({
                  img:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  name: item.name,
                  price: item.booksAppOrBookDetailsModelRelation.price,
                  rate: 4.8,
                  id: item.id,
                })
            })
            let filter = route.query.filter;
            if (filter == null) {
              router.push({
                path: "/books",
                query: { topChartFilter: 'newRelease' }
              })
              filterSelectChip.value = 'newRelease'
            }
            else if (filter != null) {
              router.push({
                path: "/books",
                query: { topChartFilter: 'newRelease', filter: filter }
              })
              filterSelectChip.value = 'newRelease'
            }

          } catch (error) {
            state.snackbarInfo.text = error
            state.snackbarInfo.color = 'error'
            state.snackbar = true
          }
        });

      } catch (error) {
        state.snackbarInfo.text = error
        state.snackbarInfo.color = 'error'
        state.snackbar = true
      }
    };
    const changeSelect = (optionName) => {
      state.select = optionName;
    };
    const filterWithQuery = async () => {
      let filterQuery = route.query.filter;
      if (filterQuery == 'eBooks') {
        await getRecentlyReducedEbook();
        filterSelect.value = 'eBooks'
      }
      else if (filterQuery == 'audioBooks') {
        await getAudiobook();
        filterSelect.value = 'audioBooks'
      }
      else if (filterQuery == 'fictionBooks') {
        await getFictionsbook();
        filterSelect.value = 'fictionBooks'
      }
      else if (filterQuery == 'kidsBooks') {
        await getKidsbook();
        filterSelect.value = 'kidsBooks'
      }
    }
    const filterChipWithQuery = async () => {
      let topChartQuery = route.query.topChartFilter
      if (topChartQuery == 'topSelling') {
        await topSelling();
        filterSelectChip.value = 'topSelling'

      }
      else if (topChartQuery == 'deals') {
        await specialOffer();
        filterChipWithQuery.value = 'deals'
      }
      else if (topChartQuery == 'newRelease') {
        await topNewBooks();
        filterSelectChip.value = 'newRelease'
      }
    }
    onMounted(async () => {
      await getRealLifeStoriesEbook();
      if (route.query.filter == null) {
        await getRecentlyReducedEbook();

      }
      if (route.query.topChartFilter == null) {
        await topSelling();
      }
      await filterWithQuery();
      await filterChipWithQuery();
      state.skeletonLoader = false;
    });

    return {
      changeSelect,
      filterSelect,
      filterSelectChip,
      topNewBooks,
      getAudiobook,
      getFictionsbook,
      getKidsbook,
      goToBookDetailsPage,
      getRecentlyReducedEbook,
      display,
      state,
      topSelling,
      specialOffer,
    };
  },
};

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister');

.email-input:deep(.v-field__field input) {
  background-color: #e5e2ffA6; 
  border-radius: 48px;
  color: #874fff;
}

.background-banner-img-style {
  width: 100%;
  min-height: 600px;
  background-position: center;
  background-size: cover;
}

.title-text {
  font-family: 'Roboto';

  font-weight: 700;
  font-size: 28px;

  /* identical to box height */

  color: #ffffff;
}

.subtitle-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  color: rgba(255, 255, 255, 0.8);
}

.v-chip.v-chip--outlined {
  border-width: initial;
  border-style: solid;
}

.footer-text {
  font-family: 'Love Ya Like A Sister';
  color: #874fff;
  font-weight: 400;
  font-size: 57px;
  line-height: 71px;
  max-width: 70%;
  text-align: center;
}

@media screen and (max-width: 960px) {
  .footer-text {
    font-size: 34px;
  }
}

.email-font-style {
  font-family: 'Love Ya Like A Sister';

  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  /* identical to box height */

  color: #874fff;
}

@media screen and (max-width: 960px) {
  .email-font-style {
    font-size: 24px;
  }
}

.buy-now-btn {
  background: linear-gradient(180deg, #7E6DFF 0%, #874FFF 100%);
  border-radius: 0px 13.8848px;
  font-family: 'Love Ya Like A Sister';
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
}

.dune-card1 {
  position: absolute;
  width: 300px;
  top: 10%;
  left: 50%;
  z-index: 1;
}

.dune-card2 {
  position: absolute;
  width: 300px;
  top: 40%;
  left: 30%;
}

@media screen and (max-width:992px) {
  .dune-card1 {
    position: absolute;
    width: 260px;
    top: 10%;
    left: 50%;
    z-index: 1;
  }

  .dune-card2 {
    position: absolute;
    width: 260px;
    top: 40%;
    left: 30%;
  }
}

@media screen and (max-width:884px) {
  .dune-card1 {
    position: absolute;
    width: 230px;
    top: 10%;
    left: 50%;
    z-index: 1;
  }

  .dune-card2 {
    position: absolute;
    width: 230px;
    top: 40%;
    left: 30%;
  }
}

@media screen and (max-width:800px) {
  .dune-card1 {
    position: absolute;
    width: 210px;
    top: 10%;
    left: 50%;
    z-index: 1;
  }

  .dune-card2 {
    position: absolute;
    width: 210px;
    top: 40%;
    left: 30%;
  }
}

@media screen and (max-width:710px) {
  .dune-card1 {
    position: absolute;
    width: 210px;
    top: 4%;
    left: 51%;
    z-index: 1;
  }

  .dune-card2 {
    position: absolute;
    width: 210px;
    top: 34%;
    left: 28%;
  }
}

@media screen and (max-width:635px) {
  .footer-text {
    width: 64%;
  }

  .dune-card1 {
    position: absolute;
    width: 200px;
    top: 4%;
    left: 51%;
    z-index: 1;
    object-fit: contain;
  }

  .dune-card2 {
    position: absolute;
    width: 200px;
    top: 30%;
    left: 28%;
    object-fit: contain;
  }
}

@media screen and (max-width:595px) {
  .dune-card1 {
    position: absolute;
    display: none;
    top: 4%;
    right: 0;
    z-index: 1;
    object-fit: contain;
  }

  .dune-card2 {
    position: absolute;
    top: 4%;
    left: 0;
    display: none;
    object-fit: contain;
  }
}

.filterSelect {
  background-color: #7400b8 !important;
}
</style>
