<template>
  <v-container fluid class="mt-1">
    <div v-if="state.skeletonLoader">
      <v-row class="d-flex justify-left mx-5 mb-15">
        <v-col cols="12" md="3" sm="3" lg="3" class="mt-15">
          <v-skeleton-loader class="mx-auto" elevation="12" type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="8" sm="8" lg="8" class="mt-15">
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mx-5 mt-15 pt-15">
        <v-col cols="12" md="7" sm="12" lg="7" class="mt-10">
          <v-skeleton-loader type="table-heading"></v-skeleton-loader>

          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader class="mt-5" type="table-heading"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>

        </v-col>
        <v-col cols="3" offset="1" class="mt-10" v-if="display.mdAndUp">
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>

        </v-col>

      </v-row>
    </div>
    <div v-if="!state.skeletonLoader">
      <v-dialog v-model="show" width="700">
        <BookCommentsDialog :app="state.appdetails" @close="closeModal($event)" @addComment="addNewComment($event)" />
      </v-dialog>
      <v-snackbar v-model="snackbar" :color="state.snackbar.color">
        {{ state.snackbar.text }}

        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-row class="mx-md-8 d-flex mx-0 justify-center justify-md-start" style="width: 100%;">
        <v-col cols="10" md="3" sm="4" lg="3" class="">
          <v-img class="mx-auto image-game-details  main-banner" lazy-src="/empty.jfif"
            :src="state.appdetails.mainBanner">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height" style="background-color:rgb(32, 33, 36);">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-col>
        <v-col class="justify-center-sm" cols="10" md="6" sm="8" lg="9">
          <div>
            <span style="
                font-family: 'Roboto';
                font-style: normal;
                align-self: center!important ;

                color: #ffffff;
              " class="text-h5 d-flex text-md-h3">
              {{ state.appdetails.name }}
            </span>
            <span style="
                font-family: 'Roboto';
                font-style: normal;
                align-self: center!important ;

                color: #ffffff;
              " class="text-h5 d-flex mt-5">
              Author : {{ state.appdetails.author }}
            </span>
            <span class=" d-flex justify-center-sm mt-4" style="color: #874fff; font-size: 22px; font-weight: 700">
              WhatsApp LLC
            </span>
            <!-- <span class="d-flex justify-center-sm" style="color: #ffffff; font-size: 18px;">
              in app purchase
            </span> -->
          </div>
          <div style="display: flex; " class=" mt-6 mt-lg-5 justify-center-sm">
            <div>
              <div class="d-flex">
                <div>
                  <v-icon color="#874FFF" size="small" class="ml-2">
                    mdi-star
                  </v-icon>
                </div>
                <div class="d-flex">

                  <div class="mx-2" style="color: #ffffff">
                    {{ state.appdetails.reviews }} Reviews
                  </div>
                </div>
              </div>
              <!-- <div style="padding: 0 16px; display: grid">
              <span style="color: #ffffff; text-align: center">
                {{ state.appdetails.downloads }}
              </span>
              <span style="color: #ffffff"> Downloads </span>
            </div> -->
              <!-- <div style="padding: 0 16px; display: grid; font-weight: bold">
              <span style="text-align: center; background: green; color: #ffffff" class="mx-3">
                3
              </span>
              <span style="color: #ffffff"> PEGI 3 </span>
            </div> -->
            </div>

            <div class="d-flex container-btn-responsive mt-6 mt-lg-15 justify-center-sm" style="flex-wrap: wrap;"
              v-if="hasContractOnThisNetwork">
              <div class="d-flex container-btn-book-detail justify-center-sm mb-4">
                <v-btn v-if="userCanDownload" :loading="downloadBookLoading" @click="downloadBook()" x-large
                  class="buy-now-btn px-15 text-capitalize" elevation="0" dark>
                  <!-- {{ installed ? 'Install on more devices' : 'install' }} -->
                  Download Book
                </v-btn>
                <v-btn v-else :loading="buyLoading" @click="buyBook()" x-large class="buy-now-btn px-15 text-capitalize"
                  elevation="0" dark>
                  Buy Book ({{ state.appdetails.bookPrice }} &nbsp;DAPP)
                </v-btn>
                <v-btn class="sample-btn"><span class="text-sample-btn">sample</span></v-btn>
              </div>
              <div class="d-flex svg-btn-book-detail " style="grid-area: 12px; display: inline-flex;">

                <div class="d-flex align-center">
                  <span class="ml-2 wishlist-style" style="color: #7400b8;" v-if="addedToWishList"> Added to wishlist
                  </span>

                  <span v-else style="display: inline-block;">
                    <img src="/wishlistIcon.png" style="cursor: pointer; display: inline-block; vertical-align: middle;"
                      alt="" @click="addBookToWishList()" class="ml-3" />
                    <p class="ml-1"
                      style="display: inline-block; vertical-align: middle; max-width: 130px; color: #874FFF; font-family: Roboto; font-size: 16px; font-weight: 500; line-height: 18.75px; letter-spacing: 0.05em; text-align: left;">
                      Add to wishlist
                    </p>
                  </span>
                  <!-- <img src="/wishlistIcon.png" v-else style="cursor: pointer;" alt="" @click="addBookToWishList()" class="ml-3" /> -->
                  <!-- <p class="ml-1" style="max-width: 130px; color: #874FFF; font-family: Roboto;font-size: 16px;font-weight: 500;line-height: 18.75px;letter-spacing: 0.05em;text-align: left;">
            Add to wishlist
          </p> -->
                </div>
                <div class="d-flex align-center ">
                  <img src="/svgs/gift.icon.svg" style="cursor: pointer;" alt="" class="ml-3 ml-md-8" />
                  <!-- <span class="ml-1"
                    style="max-width: 130px; color: #874FFF; font-family: Roboto;font-size: 16px;font-weight: 500;line-height: 18.75px;letter-spacing: 0.05em;text-align: left;">
                    Buy as gift
                  </span> -->
                </div>

              </div>
            </div>

            <div class="d-flex justify-center-sm" v-else>
              This network does not support this book!
            </div>
          </div>

        </v-col>
      </v-row>
      <br />
      <br />

      <v-row v-if="state.appdetails.images.length > 0">
        <v-col>
          <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide v-for="i in state.appdetails.images" :key="i">
              <img :src="i" style="border-radius: 8px; width: 100px" />
            </swiper-slide>
          </swiper>
        </v-col>
      </v-row>
      <br />
      <br />

      <br />
      <br />
      <v-row>
        <v-col>
          <div>
            <span style="color: #ffffff; font-weight: 500; font-size: 22px">
              Rating & reviews
            </span>
            <v-icon style="color: #ffffff"> mdi-arrow-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <br />

      <v-row>
        <div style="width: 100%; display: contents">
          <v-col cols="4" md="2" lg="2" sm="4"
            style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <div class="d-flex">
              <span style="color: #ffffff; font-weight: 400; font-size: 45px">
                {{ state.appdetails.rate }}
              </span>
              <v-icon color="#874FFF" size=" xx-large" class="ml-2">
                mdi-star
              </v-icon>
            </div>

            <span style="color: #ffffff; font-weight: 400; font-size: 12px">
              {{ state.appdetails.reviews }} reviews
            </span>
          </v-col>
          <v-col cols="8" md="10" lg="10" sm="8" style="text-align: -webkit-center" class="reversed-order">
            <v-progress-linear v-for="i in state.chart" :key="i" :model-value="i.percent" background-color="#ffffff66"
              color="#874FFF" height="10" rounded style="margin-top: 1rem">
            </v-progress-linear>
          </v-col>
        </div>



        <div class="ml-6">
          <br />
          <br />

          <p v-if="state.allComments.length > 4">
            style="
            font-weight: 500;
            font-size: 22px;
            line-height: 150%;
            /* identical to box height, or 33px */

            letter-spacing: 0.15px;

            color: #874fff;
            "
            >
            See all reviews
          </p>
        </div>
      </v-row>




    </div>

    <div style="width: 100%" v-for="(comment, i) in state.allComments" :key="i + 'comment'">
      <v-card class="mt-10" style="box-shadow: none; background: transparent">
        <v-card-title>
          <v-avatar>
            <v-icon color="#ffffff">mdi-account-circle</v-icon>
          </v-avatar>
          <span class="text-subtitle-2 font-weight-light" style="color: #ffffff">{{ comment.userName }}</span>
        </v-card-title>
        <v-card-subtitle class="ma-2 d-flex" style="align-items: center">
          <v-rating class="" style=" width: 100%;" color="#874FFF" dense :size="25" :length="5"
            :model-value="comment.rating" readonly></v-rating>
          <span style="
                padding-left: 5px;
                color: #ffffff;
                font-weight: 500;
                font-size: 14px;
              ">{{ comment.dateOfComment }}</span>
          <!-- <span>{{ momentFormat(content.date, "DD MMM") }}</span>  -->
        </v-card-subtitle>
        <v-card-text class="ma-2" style="color: #ffffff">
          {{ comment.commentText }}
        </v-card-text>
        <v-card-subtitle class="pt-0">
          <span class="ma-2" style="color: #ffffff; font-weight: 400; font-size: 12px">
            {{ comment.helpfulNumberOfComment }} people found this
            review helpful
          </span>
          <br />
          <div v-if="isLoggedIn">
            <span class="ma-2" style="color: #ffffff; font-weight: 400; font-size: 12px">
              Did you find this helpful?
            </span>
            <v-btn :class="{ activeBtnColor: comment.canRate.value == '1' }"
              @click="postIhelpFul(comment.commentId, comment.canRate.id, comment.canRate.canRateAgain, 1, comment.helpfulNumberOfComment)"
              class="ml-4 px-5 mt-2 comment-btn">Yes</v-btn>
            <v-btn :class="{ activeBtnColor: comment.canRate.value == '0' }"
              @click="postIhelpFul(comment.commentId, comment.canRate.id, comment.canRate.canRateAgain, 0, comment.helpfulNumberOfComment)"
              class="ml-2 px-5 mt-2 comment-btn">No</v-btn>
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
    <div class="ml-6">
      <br />
      <br />

      <p v-if="state.allComments.length > 4" style="
            font-weight: 500;
            font-size: 22px;
            line-height: 150%;
            /* identical to box height, or 33px */

            letter-spacing: 0.15px;

            color: #874fff;
          ">
        See all reviews
      </p>
    </div>

    <v-row class="justify-center-sm">
      <v-col class="">
        <div style="width: 100%">
          <div style="display: grid">
            <span style="
                color: #ffffff;
                font-weight: 600;
                font-size: 22px;
                line-height: 150%;
                letter-spacing: 0.15px;
              ">Rate this book</span>
            <span style="
                color: #ffffff;
                font-weight: 400;
                font-size: 16px;
                line-height: 150%;
                letter-spacing: 0.15px;
              ">Tell us what you think</span>
            <br />
            <div>
              <v-rating color="#874FFF" md-x-large dense background-color="#874FFF"></v-rating>
            </div>
          </div>

        </div>
        <div v-if="isLoggedIn" class="justify-center-sm" style="text-align: center">
          <v-btn class="write-review-btn" dark md-large @click="openCommentDialog()">
            Write review
          </v-btn>
        </div>
        <div v-if="!isLoggedIn" style="color: #6c24c0; cursor: pointer">
          Please login to write and comment
        </div>
      </v-col>
    </v-row>
    <v-col cols="4" v-if="display.mdAndUp" class="n">
      <v-row style="display: block">
        <v-list style="display: inline-flex; background: transparent" class="pl-6">

          <v-list-item-title class="mb-8" style="color: #ffffff; font-size: 22px; font-weight: 400">More by {{
            state.appdetails.author }} </v-list-item-title>
          <v-icon style="color: white">mdi-arrow-right</v-icon>
        </v-list>

        <v-card v-for="(card, i) in state.cards" :key="i + 'card1'" style="
          padding: 4px 24px;
          box-shadow: none;
          background: transparent;
        ">
          <div @click="goToBookDetailPage(card.id)" style="display: flex; align-items: center;cursor: pointer;">
            <div style="max-width: 60px; max-width: 60px">
              <img :src="card.img" style="max-width: 60px; max-width: 60px; border-radius: 20%" />
            </div>

            <div style="text-align: left">
              <v-list three-line style="
                text-align: left;
                padding-left: 10px;
                background: transparent;
              ">
                <v-list-item style="display: contents">
                  <div style="color: #ffffff">
                    {{ card.appName }}
                  </div>
                  <v-list-item-title class="font-small" style="color: #ffffff">
                    {{ card.category }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-small" style="color: #ffffff">
                    {{ card.rate }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-card>

        <!-- <v-list
        style="display: inline-flex; background: transparent"
        class="pl-6"
      >
      <v-list-item-title style="color: #ffffff; font-size: 22px; font-weight: 400">More by Borenstein</v-list-item-title>
         
        <v-icon style="color: white">mdi-arrow-right</v-icon>
     
      </v-list>

      <v-card
        v-for="(card, i) in state.cards"
        :key="i + 'card2'"
        style="
          padding: 4px 24px;
          box-shadow: none;
          background: transparent;
        "
      >
        <div style="display: flex; align-items: center">
          <div style="max-width: 60px; max-width: 60px">
            <img
              :src="card.img"
              style="max-width: 60px; max-width: 60px; border-radius: 20%"
            />
          </div>

          <div style="text-align: left">
            <v-list
              three-line
              style="
                text-align: left;
                padding-left: 10px;
                background: transparent;
              "
            >
              <v-list-item style="display: contents">
                <div style="color: #ffffff">
                  {{ card.appName }}
                </div>
                <v-list-item-title
                  class="font-small"
                  style="color: #ffffff"
                >
                  {{ card.category }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="font-small"
                  style="color: #ffffff"
                >
                  {{ card.rate }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-card> -->
      </v-row>
    </v-col>


  </v-container>
</template>

<script setup>
//------------------------------------------------------- start imports -----------------------------------------------------------------
import { useMainStore } from "~/store";
import {
  getAccount,
  getChainId,
  signMessage,
  reconnect,
  switchChain,
  watchAccount
} from "@wagmi/core";
import Web3 from "web3";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import CommentsDialog from "../../components/CommentsDialog";
import { Swiper, SwiperSlide } from "swiper/vue";
import moment from "moment";
import "swiper/css";
import axios from "axios";
import { ref, reactive, onMounted, watch } from "vue";


import { network_id } from "../../web3/constants/network_id";
import { CHAIN_ID } from "../../web3/constants/chainIds";
import { endpoint_abi } from "../../web3/constants/endpoint_abi";
import { ENDPOINTS } from "../../web3/constants/layerzeroEndpoints";

//-------------------------------------------------------- end imports -----------------------------------------------------------------

//---------------------------------------------------------variables start ------------------------------------------------------------


const {
  baseURL,
  fileURL,
  setNetWork,
  setAllContractAddress,
  getAllContractAddress,
  setContractAddress,
  gatewayWS,
  wsPort,
  setWebsocketClient,
  getWebsocketClient,
  contractState
} = useMainStore();
const { $auth, $walletConnect } = useNuxtApp();
const { modal, wagmiConfig } = $walletConnect();



const route = useRoute();
const state = reactive({
  skeletonLoader: true,
  appdetails: {
    description: "",
    DataSafetyDescription: `Safety starts with understanding 
           how developers collect and share your data. Data privacy 
           and security practices may vary based on your use, region, 
           and age. The developer provided this information and may update it over time.`,
    name: "",
    BookId: "",
    bookPrice: "",
    downloads: "",
    rate: "",
    reviews: "",
    images: [],//slider images
    mainBanner: "",
    bookFileInfo: "",
    version: [],
  },
  chart: [],
  allComments: [],
  cards: [],
  userInfo: {},
  snackbar: {}
});
const DataSafetyDetails = [
  {
    icon: "mdi-share-variant-outline",
    description: "http://www.whatsapp.com/",
  },
  {
    icon: "mdi-email-outline",
    description: "android@support.whatsapp.com",
  },
  {
    icon: "mdi-lock-outline",
    description: "1601 Willow RoadMenlo Park, CA 94025",
  },
  {
    icon: "mdi-trash-can-outline",
    description: "http://www.whatsapp.com/legal/#Privacy",
  },
];
const items = [
  {
    text: "Website",
    icon: "mdi-web",
    description: "http://www.whatsapp.com/",
  },
  {
    text: "Email",
    icon: "mdi-email-outline",
    description: "android@support.whatsapp.com",
  },
  {
    text: "Adress",
    icon: "mdi-map-marker-outline",
    description: "1601 Willow RoadMenlo Park, CA 94025",
  },
  {
    text: "Privacy Policy",
    icon: "mdi-verified",
    description: "http://www.whatsapp.com/legal/#Privacy",
  },
];
const bookId = ref('')
const display = ref(useDisplay());
const hasContractOnThisNetwork = ref(true);
const userCanDownload = ref(false);
const downloadBookLoading = ref(false);
const buyLoading = ref(false);
const userToken = ref(null);
const show = ref(false);
const addedToWishList = ref(false)
const screenSize = ref('laptop')
const isLoggedIn = ref(false);
const updateAgain = ref(true);

const snackbar = ref(false)
const snackbarInfo = ref({
  text: "",
  color: ""
})
const walletAddress = ref('');
//----------------------------------------------------------variables end -------------------------------------------------------------

//----------------------------------------------------------functions start ----------------------------------------------------------
const addNewComment = async (event) => {
  state.allComments.unshift({
    commentText: event.comment,
    dataOfComment: event.createdAt,
    userName: event.author,
    helpfulNumberOfComment: await getCountOfIsHelpFullForEachComment(event.id),
    canRate: await checkUserIsHelpFull(event.id),
    rating: await getRatingForComment(event.rating_id),
  })
  state.appdetails.reviews++;
}
const getFileByName = (url, name, path, extension) => {

  return url + "/api/v1/downloadFileByName/" + name + "/" + path + "/" + extension;
}
const { data: bookData, pending, error, refresh } = useAsyncData('bookData', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getBook/" + bookId.value, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
      },
    })

    state.appdetails.name = res.data.name;
    state.appdetails.BookId = res.data.id;
    state.appdetails.author = res.data.author;
    state.appdetails.description = res.data.booksAppOrBookDetailsModelRelation.about;
    state.appdetails.bookPrice = res.data.booksAppOrBookDetailsModelRelation.price
    state.appdetails.version = res.data.booksVersionsModelRelation[0];
    state.appdetails.blockchainRM = res.data.bookBlockchainRM;

    const fileRelation = state.appdetails.version.versionsFilesModelRelation;
    fileRelation.forEach((item) => {
      if (item.type == 4) {
        state.appdetails.images.push(getFileByName(fileURL, item.name, item.path, item.extension));
      }
      else if (item.type == 3) {
        state.appdetails.mainBanner = getFileByName(fileURL, item.name, item.path, item.extension);
      }
      else if (item.type == 0) {
        state.appdetails.bookFileInfo = item;
      }
    })
  } catch (error) {
  }
})
const { data: rating, pending: ratingPending, error: ratingError, refresh: ratingRefresh } = useAsyncData('ratingData', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getRatingBookById/" + bookId.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    state.appdetails.rate = res.data
  } catch (error) {
  }
})
const { data: similarBooksData, pending: similarBooksPending, error: similarBooksError, refresh: similarBooksrefresh } = useAsyncData('similarBooks', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAllBooks/1/6", {
      header: {
        'Content-Type': 'application/json',

      },
    })
    state.cards = [];
    res.data.forEach((item, index) => {
      if (state.appdetails.author == item.author && state.appdetails.name != item.name) {
        let rating = item.rating / item.ratingNumber
        if (!rating || Number.isNaN(rating)) {
          rating = 0;
        }
        rating = rating.toFixed(2)
        if (item.booksVersionsModelRelation[0] != null) {
          let image = item.booksVersionsModelRelation[0].versionsFilesModelRelation.find((x) => x.type == 3)
          if (image) {
            state.cards.push(
              {
                img: fileURL + "/api/v1/downloadFileByName/" + image.name + "/" + image.path + "/" + image.extension,
                appName: item.name,
                rate: rating,
                id: item.id
              }
            )
          }
        }
      }
    })
  } catch (error) {
  }
})
const { data: commentData, pending: commentPending, error: commentError, refresh: commentRefresh } = useAsyncData('comment', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getBookReviews/" + bookId.value + "/1/100", {
      header: {
        "Content-Type": "application/json",

      },
    })
    state.allComments = [];
    res.data.forEach(async (item) => {
      state.allComments.push({
        commentId: item.id,
        userName: item.author,
        commentText: item.comment,
        dataOfComment: item.createdAt,
        helpfulNumberOfComment: await getCountOfIsHelpFullForEachComment(item.id),
        canRate: await checkUserIsHelpFull(item.id),
        rating: await getRatingForComment(item.rating_id),
      })
    })
  } catch (error) {
  }
})
const { data: bookDownloads, pending: downloadPending, error: downloadError, refresh: refreshDownloads } = useAsyncData('countDownloads', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/countBookDownloads/" + bookId.value, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    state.appdetails.downloads = parseInt(res.data);
  } catch (error) {
  }
})
const { data: bookCountReviews, pending: bookCountReviewsPending, error: bookCountReviewsError, refresh: bookCountReviewsRefresh } = useAsyncData('countReviews', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/countBookReviews/" + bookId.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    state.appdetails.reviews = parseInt(res.data);
  } catch (error) {
  }
})
const { data: bookRatingChart, pending: bookRatingChartPending, error: bookRatingChartError, refresh: bookRatingChartRefresh } = useAsyncData('bookChartRating', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAllRatingsForBook/" + bookId.value, {
      headers: {
        'Content-Type': 'application/json',

      },
    })
    state.chart = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i] == null) {
        res.data[i] = 0
      }
      state.chart[i] = res.data[i];
    }
  } catch (error) {
  }
})
const { data: wishList, pending: wishListPending, error: wishListError, refresh: wishListRefresh } = useAsyncData('checkWishList', async () => {
  userToken.value = await $auth.token();
  try {
    const res = await axios.get(baseURL + "/api/v1/checkBookIsBelongToUserWishList/" + bookId.value, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + userToken.value
      }
    })
    addedToWishList.value = res.data;
  } catch (error) {
  }
})
//----------------------------------------------------------functions end --------------------------------------------------------------
const getCountOfIsHelpFullForEachComment = async (id) => {

  userToken.value = await $auth.token();
  try {
    const res = await axios.get(baseURL + "/api/v1/getCountOfIsHelpFullforeachComment/" + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + userToken.value
      },
    })
    return Number(res.data)
  } catch (error) {
  }
}
const checkUserIsHelpFull = async (commentId) => {
  userToken.value = await $auth.token();
  try {
    const res = await axios.get(baseURL + "/api/v1/checkUserIsHelpfullRate/" + commentId, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + userToken.value
      },
    })
    return res.data
  } catch (error) {
  }
}
const postIhelpFul = async (id, helpFullId, canRate, helpfullValue, count) => {
  //id is commentid
  //helpfullid is helpfullid in database for check this use was rate the helpfull or not
  // canrate is for true or false if false the user helpful will update if true the the new record of helpfull will be post
  //helpfulvalue is value of rate 1 for yes and 0 for no 

  // return;
  userToken.value = await $auth.token();
  if (canRate == true) {
    try {
      const res = await axios.post(baseURL + "/api/v1/postIsHelpFull", {
        value: helpfullValue,
        review_id: id,
        user_id: state.userInfo.id,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userToken.value,
        },
      })

      if (helpfullValue == 1) {
        var comment = state.allComments.find((item) => item.commentId == id)
        comment.helpfulNumberOfComment += 1;
        comment.canRate.value = helpfullValue;
        comment.canRate.canRateAgain = false
        comment.canRate.id = res.data.id;
      }
      else if (helpfullValue == 0) {
        var comment = state.allComments.find((item) => item.commentId == id)
        comment.canRate.value = helpfullValue;
        comment.canRateAgain = false;
        comment.canRate.id = res.data.id

      }
    } catch (error) {
    }
  }
  else {
    try {
      const update = await axios.put(baseURL + "/api/v1/updateIsHelpFull/" + helpFullId, {
        value: helpfullValue,
        review_id: id,
        user_id: state.userInfo.id
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userToken.value,
        },
      })
      if (helpfullValue == 1) {
        var comment = state.allComments.find((item) => item.commentId == id)
        updateAgain.value = true
        if (updateAgain.value == true && comment.canRate.value != 1) {
          comment.helpfulNumberOfComment += 1;
        }
        comment.canRate.value = helpfullValue;
        comment.canRate.canRateAgain = false;
        updateAgain.value = false

      }
      else if (helpfullValue == 0) {
        updateAgain.value == true;

        var comment = state.allComments.find((item) => item.commentId == id)
        if (updateAgain.value = true && count > 0 && comment.canRate.value != 0) {
          comment.helpfulNumberOfComment -= 1;
        }
        comment.canRate.value = helpfullValue;
        comment.canRate.canRateAgain = false;
        updateAgain.value = false
      }

    } catch (error) {
    }
  }

}
const openCommentDialog = () => {
  show.value = !show.value;
};
const closeModal = (value) => {
  show.value = value;
};
const onSwiper = (swiper) => {
};
const onSlideChange = () => {
};
const formatDate = (date) => {
  return moment(date).format("DD MMM");
};
const getRatingForComment = async (id) => {
  userToken.value = await $auth.token();
  try {
    const res = await axios.get(baseURL + "/api/v1/getRating/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken.value,
      },
    });
    return res.data.value;
  } catch (error) {
  }
};
const addBookToWishList = async () => {
  try {
    userToken.value = await $auth.token();
    const res = await axios.post(
      baseURL + "/api/v1/postWishList",
      {
        book_id: state.appdetails.BookId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.value,
        },
      }
    );

    if (res.status == 200) {
      snackbar.value = true;
      addedToWishList.value = true;
      state.snackbar.text = state.appdetails.name + " Added To WishList";
      state.snackbar.color = "success";
    }
  } catch (error) {
    state.snackbar.color = "error";
  }
};
const goToBookDetailPage = async (id) => {
  await navigateTo({
    path: "/book-details",
    query: {
      bookId: id,
    },
  });
  bookId.value = id;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
//------------------------------------------------------------- events start -----------------------------------------------------------
//blockChain fucntions start
const buyBook = async () => {

  buyLoading.value = true;
  const account = getAccount(wagmiConfig);
  walletAddress.value = account.address;
  let web3 = new Web3(await account.connector.getProvider());

  if (walletAddress.value != undefined) {

    let DappetizeTokenContract = new web3.eth.Contract(
      contractState.dappetizeTokenAbi,
      contractState.dappetizeTokenAddress
    );

    let appContract = new web3.eth.Contract(
      contractState.appContractAbi,
      contractState.contractAddress
    );
    //this.$store.state.contractAddress
    let decimals = await DappetizeTokenContract.methods.decimals().call();
    const pow = Math.pow(10, Number(decimals));
    let price = Number(state.appdetails.bookPrice  ) * (pow)


    const price2 = price.toString();

    // try {
      snackbar.value = true;
      snackbarInfo.value.text =
        "Verify Tranasction in Wallet!";
      snackbarInfo.value.color = "success";

      let approve = await DappetizeTokenContract.methods
        .approve(
          contractState.contractAddress,
          price2
        )
        .send({
          from: walletAddress.value,
        });
      let  buy = await appContract.methods
        .buy(String(contractState.contractAddress))
        .send({
          from: walletAddress.value,
        });

      // console.log(buy.events);

      buyLoading.value = false;
      userCanDownload.value = true;

      snackbar.value = true;
      snackbarInfo.value.text =
        "Tranasction Complete you can download your App";
      snackbarInfo.value.color = "success";
      // this.isBuy = true;
    // } catch (error) {
    //   snackbar.value = true;
    //   snackbarInfo.value.text =
    //     "Transaction Failed, check your DT balance or network connection";
    //   snackbarInfo.value.color = "error";
    //   buyLoading.value = false;
    //   userCanDownload.value = false;
    // }
  }


}
const checkForbook = async () => {

  const account = getAccount(wagmiConfig);
  walletAddress.value = account.address;

  if (account.connector) {
    try {
      let web3 = new Web3(await account.connector.getProvider());

      // this need for every loading
      // set network by network key
      // get all contract of this app in all network
      // set this network contract
      await setNetWork(network_id[0][account.chainId]);
      await setAllContractAddress(state.appdetails.blockchainRM)
      await setContractAddress()
      ////

      downloadBookLoading.value = true;
      buyLoading.value = true;

      if (contractState.contractAddress) {

        hasContractOnThisNetwork.value = true;
        let DownloadNFTContract = new web3.eth.Contract(
          contractState.downloadNFTAbi,
          contractState.downloadNFTAddress
        );

        // algorithm 
        // check blockchain blocks from end to start
        // get sells token by finding transferred
        // get buying token and remove if sold
        let tokenIds = [];
        const MAX_BLOCK_RANGE = 50000n; // Maximum block range

        async function getAllContractEventsForWallet(fromBlock, toBlock, walletAddress) {
          try {
            if (toBlock === 'latest') {
              toBlock = BigInt(await web3.eth.getBlockNumber());
            } else {
              toBlock = BigInt(toBlock);
            }

            let currentFromBlock = BigInt(fromBlock);
            const allEvents = [];

            // Create batch requests within range and add to `allEvents`
            while (currentFromBlock <= toBlock) {
              let currentToBlock = currentFromBlock + MAX_BLOCK_RANGE - 1n;
              currentToBlock = currentToBlock > toBlock ? toBlock : currentToBlock;

              allEvents.push(
                // Promise for "Mint or Buy" events
                DownloadNFTContract.getPastEvents('Transfer', {
                  filter: { to: walletAddress },
                  fromBlock: Number(currentFromBlock),
                  toBlock: Number(currentToBlock),
                }).then(events => {
                  events.forEach(event => {
                    const { returnValues } = event;
                    console.log(`Mint or Buy Event - Token ID: ${returnValues.tokenId}`);
                    tokenIds.push({
                      from: returnValues.from,
                      to: returnValues.to,
                      tokenId: returnValues.tokenId,
                    });
                  });
                }),

                // Promise for "Sell" events
                DownloadNFTContract.getPastEvents('Transfer', {
                  filter: { from: walletAddress },
                  fromBlock: Number(currentFromBlock),
                  toBlock: Number(currentToBlock),
                }).then(events => {
                  events.forEach(event => {
                    const { returnValues } = event;
                    console.log(`Sell Event - Token ID: ${returnValues.tokenId}`);
                    // Remove sold token from tokenIds
                    tokenIds = tokenIds.filter(obj => obj.tokenId !== returnValues.tokenId);
                  });
                })
              );

              // Update block range for the next batch
              currentFromBlock = currentToBlock + 1n;
            }

            // Await all promises to resolve and collect results
            await Promise.all(allEvents);

            console.log("Final Token IDs:", tokenIds);
          } catch (error) {
            console.error('Error fetching past events:', error);
          }
        }

        // Example usage
        const fromBlock = 0;
        const toBlock = 'latest';
        await getAllContractEventsForWallet(fromBlock, toBlock, walletAddress.value);



        console.log("tokenIds", tokenIds);
        tokenIds.forEach(async (tokenObj) => {
          let tokenIdString = tokenObj.tokenId.toString(); // Convert tokenId to string

          try {
            let tokenURI = await DownloadNFTContract.methods.tokenURI(tokenIdString).call();

            console.log("tokenURI", tokenURI);

            if (contractState.contractAddress == tokenURI) {
              userCanDownload.value = true;
            }
          } catch (error) {
            console.error("Error fetching token URI:", error);
          }
        });

        buyLoading.value = false;
        downloadBookLoading.value = false;

        return true


      } else {
        hasContractOnThisNetwork.value = false;
      }


      return true

    } catch (error) {
      console.log("error", error);

      return false

    }


  } else {
    await modal.open()
  }







  // if (this.$store.state.contractAddress) {
  //   this.hasContractOnThisNetwork = true

  //   let DownloadNFTContract = new web3.eth.Contract(
  //     this.$store.state.downloadNFTAbi,
  //     this.$store.state.downloadNFTAddress
  //   )

  //   let i = 0
  //   let inLoop = true
  //   let allowOrNot = false
  //   while (inLoop) {
  //     try {
  //       let tokenId = await DownloadNFTContract.methods
  //         .tokenOfOwnerByIndex(address[0], i)
  //         .call()
  //       i++

  //       let tokenURI = await DownloadNFTContract.methods
  //         .tokenURI(tokenId)
  //         .call()

  //       if (this.$store.state.contractAddress == tokenURI) {
  //         allowOrNot = true
  //         this.isBuy = true;
  //         this.userCanDownload = true
  //       }
  //     } catch (error) {
  //       inLoop = false
  //     }
  //     if (!allowOrNot) {
  //       console.log('you have not permission?')
  //     }
  //   }
  // } else {
  //   this.hasContractOnThisNetwork = false
  // }

  // this.downloadBookLoading = false
  // this.buyLoading = false

}
const downloadBook = async () => {
  const account = getAccount(wagmiConfig);
  let web3 = new Web3(await account.connector.getProvider());

  const message = web3.utils.utf8ToHex("This is Message");
  var hash = web3.utils.sha3(message);
  var signature = await web3.eth.personal.sign(hash, walletAddress.value, "");

  userToken.value = await $auth.token();

  console.log("state.appdetails.version", state.appdetails.version);
  console.log("network_id[0][account.chainId]", network_id[0][account.chainId]);


  let file = state.appdetails.version.versionsFilesModelRelation.filter(x => x.path == "source")[0]


  const res = await axios.get(
    fileURL + "/api/v1/downloadAppWithAuth/" +
    file.name +
    "/" +
    file.path +
    "/" +
    file.extension +
    "/" +
    signature +
    "/" +
    contractState.contractAddress + "/" +
    contractState.downloadNFTAddress + "/" +
    network_id[0][account.chainId],
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken.value,
      },
      responseType: 'blob'
    }
  );

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', file.name); // Set the filename
  document.body.appendChild(link);
  link.click();
  link.remove();


};

//blockChain fucntions end
watch(() => route.query.bookId, (newVal, oldVal) => {

  bookId.value = newVal;
  refresh();
  ratingRefresh();
  similarBooksrefresh();
  commentRefresh();
  bookCountReviewsRefresh();
  bookRatingChartRefresh();
  refreshDownloads();
  wishListRefresh();

}, {
  immediate: true
})
watch(() => bookId.value, (newVal, oldVal) => {
  if (bookId.value) {
    refresh();
    ratingRefresh();
    similarBooksrefresh();
    commentRefresh();
    bookCountReviewsRefresh();
    bookRatingChartRefresh();
    refreshDownloads();
    wishListRefresh();
  }
  else {
    return null;
  }

}, {
  immediate: true
})

onMounted(async () => {
  commentRefresh();
  bookId.value = route.query.bookId;

  isLoggedIn.value = await $auth.isLoggedIn();
  state.skeletonLoader = false;


  // check app has contract on this network and user buy it or not
  await checkForbook();

  // event handler of change wallet 
  async function handleAccountChange(
    newAccount,
    prevAccount
  ) {
    console.log('Account changed in Game Detail');
    console.log('New account:', newAccount);
    console.log('Previous account:', prevAccount);

    // Handle the account change logic here
    if (newAccount) {
      console.log('User connected with account:', newAccount.address);
    } else {
      console.log('User disconnected');
    }

    if (newAccount.isConnected) {
      await checkForbook();

    }
  }
  let unsubscribe = watchAccount(wagmiConfig, {
    onChange: handleAccountChange,
  });



})
//----------------------------------------------------------------------------------events end -----------------------------------------------------
</script>

<style scoped>
@media (max-width: 600px) {
  .justify-center-sm {
    justify-content: center !important;
    justify-items: center !important;
    align-items: center !important;
    text-align: center !important;
  }
}

.container-btn-book-detail {
  gap: 12px;
  align-items: center;
}

.sample-btn {
  width: 200px;
  height: 48px;
  background-color: transparent;
  padding: 12px 64px 12px 64px;
  border-radius: 8px;
  border: 1px solid #FFFFFF;
}

.text-sample-btn {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: 23.44px;
  letter-spacing: 0.05em;
  text-align: center;
  color: white;
}

#myVideo {
  /* position: fixed; */
  right: 0;
  bottom: 0;
  min-width: 100%;
  max-height: 100%;
  z-index: -1;
}

#overlay {
  position: absolute;
  display: block;
  max-height: 100%;
  /* width: 100%;
height: 100%; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0,0,0,0.3);
*/
  background-image: radial-gradient(circle,
      transparent,
      rgba(0, 0, 0, 0.7) 80%);
  /* z-index: 2; */
  cursor: pointer;
}

.swiper {
  width: 100%;
  height: 400px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  width: 300px !important;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100% !important;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev,
.swiper-button-next {
  top: 45%;
  width: 300px;
  /* height: 40px; */
  background: #fff !important;
  /* border: 1px solid gray; */
  border-radius: 50% !important;
  color: black;
  font-weight: 700;
  outline: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-family: swiper-icons;
  /* font-size: var(--swiper-navigation-size); */
  font-size: 14px;
  text-transform: none !important;
  letter-spacing: 0;
  font-variant: initial;
  line-height: 1;
}

.rating.v-icon {
  padding: 2px;
}

.v-icon.v-icon.v-icon--link {
  cursor: pointer;
  outline: none;
  padding: 2px !important;
}

.progress-linear {
  background-color: rgba(255, 255, 255, 0.4);
  color: #874fff;
  width: 95%;
}

.buy-now-btn {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  border-radius: 0px 13.8848px;
  color: white;
  padding: 5px 50px;
  height: 52px !important
}

.header-app-name-style {
  /* font-size: 45px; */
  font-weight: 700;
  color: #ffffff;
  /* line-height: 53px; */
}

.text-app-name-style {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  color: #7400b8;
}

.wishlist-style {
  color: #874fff;

  font-weight: 500;
  font-size: 16px;
}

.cyrcle-btn-style {
  background: linear-gradient(216.64deg, #5390d9 -41.27%, #7400b8 147.09%);
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

.comment-btn {
  width: 80px;
  height: 30px !important;
  outline: none;
  border: 1px solid white;
  border-radius: 28px;
  background: transparent;
  color: white;
  font-size: 0.75rem;
  padding-right: 20px !important;
  padding-left: 20px !important;

}

.reversed-order {
  display: flex;
  flex-direction: column-reverse;
}

.main-banner {
  max-width: 320px;
  justify-content: start;
  width: 70%;
  border-radius: 20px;
}

@media screen and (max-width:955px) {
  .main-banner {
    width: 80% !important;
  }
}

.write-review-btn {
  padding: 12px 64px;
  align-content: center;
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  border-radius: 0px 15px;
  color: white;
}

.activeBtnColor {
  background: linear-gradient(233.29deg,
      #7400b8 -27.18%,
      #5390d9 173.14%) !important;
}

@media screen and (max-width:600px) {
  .container-btn-responsive {
    display: flex;
    flex-direction: column;
  }

  .container-btn-book-detail {
    flex-direction: column !important;
    align-items: start !important;
    margin-left: 12px;

  }

  .buy-now-btn {
    width: 200px;
  }

  .svg-btn-book-detail {
    margin-top: 12px;
  }
}
</style>
