<template>
  <!-- <client-only> -->
  <v-dialog v-model="show" width="700">
    <CommentsDialog :app="state.appdetails" :userInfo="state.userInfo" @close="closeModal($event)"
      @addComment="addNewComment($event)" />
  </v-dialog>
  <v-snackbar v-model="snackbar" :color="snackbarInfo.color">
    {{ snackbarInfo.text }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <div class="d-flex  justify-center banner"
    style="min-height: 50vh;max-height: 83vh;width: 100%; flex-direction: row-reverse;background-color: #202124; ">
    <div class="d-flex justify-start banner-of-game" style="width: calc(100% - 144px);position: relative;  ">
      <div class="container-image" style="position: relative;left:30%; width: 70%;">
        <img class="image-game-details " v-if="false" :src="state.appdetails.mainBanner"
          style=" width: 100%;height: 100%" alt="" />
        <v-img v-else class="mx-auto banner-of-game-details" style="width: 100%;height: 100%" alt=""
          lazy-src="/emty.png" :src="state.appdetails.mainBanner">
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>
      <div id="overlay" style=""></div>
      <div style="position: absolute; width: 98%; bottom: 4%;height: 63%;"
        class="container-about-detail-games-responsive-first">
        <div style="display: inline-grid;height: 100%;" class="mx-2  container-detail-games">
          <div class="container-about" style="height: 100%; display: flex; flex-direction:column; gap: 10px;">
            <span class="header-app-name-style text-h5 text-md-h3" style="display: inline-block;width: 75%;">
              {{ state.appdetails.name }}
            </span>
            <br class="br-responsive" />
            <br class="br-responsive" />
            <div class="d-flex" v-if="hasContractOnThisNetwork">
              <div v-if="isLoggedIn">
                <v-btn v-if="userCanDownload" :loading="installAppLoading" @click="installApp()" x-large
                  class="buy-now-btn px-15 text-capitalize" elevation="0" dark>
                  <!-- {{ installed ? 'Install on more devices' : 'install' }} -->
                  download Game
                </v-btn>
                <v-btn v-else :loading="buyLoading" @click="buyApp()" x-large class="buy-now-btn text-capitalize"
                  elevation="0" dark>
                  Buy Game ({{ state.appdetails.appPrice }} &nbsp;DAPP)
                </v-btn>
              </div>
              <div v-if="!isLoggedIn" style="color: #6c24c0; cursor: pointer" @click="partialLogin()">
                Please login to write and comment.
              </div>
              <div style="align-items: center; display: flex">
                <span class="ml-5">
                  <span class="ml-2 wishlist-style " v-if="addedToWishList">
                    Added to wishlist
                  </span>
                  <img src="/wishlistIcon.png" v-else style="cursor: pointer" alt="" @click="addGameToWishList()" />
                </span>
              </div>
            </div>
            <div class="d-flex" v-else>
              <div class="container-wishlist" style="align-items:center ;display: flex; ">
                <span class="ml-2 wishlist-style" v-if="addedToWishList">
                  Added to wishlist
                </span>
                <img class="img-wishlist" src="/wishlistIcon.png" v-else style="cursor: pointer" alt=""
                  @click="addGameToWishList()" />
              </div>
              <v-btn
                v-show="!(appPurchase.verify) && !(appPurchase.differentNetwork) && !(appPurchase.notSuportedNetwork)"
                :disabled="!installAppLoading" :loading="!installAppLoading" x-large
                class="buy-now-btn px-15 text-capitalize mx-4" elevation="0" dark @click="buyApp()">
                Pay {{ state.appdetails.appPrice }} &nbsp;DAPP
              </v-btn>
              <v-btn v-show="appPurchase.verify" x-large class="buy-now-btn px-15 text-capitalize mx-4" elevation="0"
                dark @click="installApp()">
                Download
              </v-btn>
              <v-btn v-show="appPurchase.differentNetwork" x-large class="buy-now-btn px-15 text-capitalize mx-4"
                elevation="0" dark @click="buyByLayerZero()">
                Pay {{ state.appdetails.appPrice }} &nbsp;DAPP by LayerZero
              </v-btn>

              <v-btn v-show="appPurchase.notSuportedNetwork" x-large class="buy-now-btn px-15 text-capitalize mx-4"
                elevation="0" dark @click="switchNetwork()">
                Network not supported
              </v-btn>
              <div>
                <!--   :loading="installAppLoading"
                    @click="installApp()" -->
              </div>
            </div>

            <span class="text-app-name-style d-flex" style="width: 42%; "> {{ companyName }} </span>

            <br />
          </div>

          <div class="container-result d-flex align-center justify-space-between"
            style="width:100% ;position:absolute;bottom: 2%">
            <div class="report-game" style="display: flex;height: 59%; width: 80%;align-self: center">
              <div
                style="padding-right: 16px;display: flex;flex-direction: column;align-items: ceter; justify-content: center;">
                <div class="text-center d-flex align-center">
                  <v-icon color="#874FFF" icon="mdi-star"></v-icon>
                  <span style="text-align: center; color: #ffffff">{{ state.appdetails.rate }}
                  </span>
                </div>
                <span style="color: #ffffff; text-align: center">
                  {{ state.appdetails.reviews }} reviews
                </span>
              </div>
              <div
                style="padding: 0 16px; display: flex;flex-direction: column;align-items: center; justify-content: center;">
                <span style="color: #ffffff; text-align: center">{{ state.appdetails.downloads }}
                </span>
                <span style="color: #ffffff"> Downloads </span>
              </div>

              <div
                style="padding: 0 16px; display: flex;flex-direction: column; justify-content: center;gap:2px;font-weight: bold ; align-items: center;">
                <span
                  style="text-align: center; background: green; color: #ffffff; height: 24px; width: 24px;display: flex; align-items:center;justify-content: center">
                  3
                </span>
                <span style="color: #ffffff"> PEGI 3 </span>
              </div>
            </div>
            <div style=" text-align: right; ">
              <v-btn rounded elevation="0" class="btn-trailer-bg">Trailer</v-btn>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div class="container-btn-trailer-sm" style="position: absolute; top:30vw; text-align: right; ">
      <v-btn class="btn-trailer-sm" style="width: 110px; height: 40px" rounded elevation="0">Trailer</v-btn>
    </div>
  </div>

  <div>
    <div class="container-about-detail-games-second">
      <div style="display: inline-grid;height: 100%;" class="mx-2  container-detail-games">
        <div style="height: 100%; display: flex; flex-direction:column; gap: 10px;">
          <span class="header-app-name-style text-h5 text-md-h3" style="display: inline-block;width: 75%;">
            {{ state.appdetails.name }}
          </span>

          <div class="d-flex  flex-column" v-if="hasContractOnThisNetwork">
            <div v-if="isLoggedIn">
              <v-btn v-if="userCanDownload" :loading="installAppLoading" @click="installApp()" x-large
                class="buy-now-btn px-15 text-capitalize" elevation="0" dark>
                <!-- {{ installed ? 'Install on more devices' : 'install' }} -->
                download Game
              </v-btn>
              <v-btn v-else :loading="buyLoading" @click="buyApp()" x-large class="buy-now-btn text-capitalize"
                elevation="0" dark>
                Buy Game ({{ state.appdetails.appPrice }} &nbsp;DAPP)
              </v-btn>
            </div>
            <div v-if="!isLoggedIn" style="color: #6c24c0; cursor: pointer" @click="partialLogin()">
              Please login to write and comment.
            </div>
            <div style="align-items: center; display: flex">
              <span class="ml-5">
                <span class="ml-2 wishlist-style" v-if="addedToWishList">
                  Added to wishlist
                </span>
                <img src="/wishlistIcon.png" v-else style="cursor: pointer" alt="" @click="addGameToWishList()" />
              </span>
            </div>
          </div>
          <div class="d-flex align-center flex-wrap " style="gap:10px;" v-else>
            <div class="container-wishlist" style="align-items:center ;display: flex; ">
              <span class=" wishlist-style">
                This network does not support this game!
              </span>
              <span class="ml-2 wishlist-style" v-if="addedToWishList">
                Added to wishlist
              </span>
              <img src="/wishlistIcon.png" v-else style="cursor: pointer" alt="" @click="addGameToWishList()" />
            </div>
            <v-btn x-large class="buy-now-btn px-15 text-capitalize " elevation="0" dark @click="buyApp()">
              Pay DT by LayerZero ({{ state.appdetails.appPrice }} &nbsp;DAPP)
            </v-btn>
            <div>
              <!--   :loading="installAppLoading"
                    @click="installApp()" -->
            </div>
          </div>
          <div class="d-flex justify-space-between align-center" style="gap: 10px;">
            <span class="text-app-name-style d-flex" style="width: 42%; "> {{ companyName }} </span>


            <span style="color: #ffffff; font-size: 16px;width: 42%;" class="mt-2 d-flex purchase">
              in app purchase
            </span>
          </div>
          <br />
        </div>

        <div class="container-result" style="display: flex;height: 59%; width: 80%;align-self: center">

          <div
            style="padding-right: 16px; display: flex;flex-direction: column; justify-content: center;align-items: center;">
            <div class="text-center d-flex align-center justify-center " style="gap: 2px;">
              <v-icon color="#874FFF" icon="mdi-star"></v-icon>
              <span style="text-align: center; color: #ffffff">{{ state.appdetails.rate }}
              </span>
            </div>
            <span style="color: #ffffff; text-align: center">
              {{ state.appdetails.reviews }} reviews
            </span>
          </div>
          <div
            style="padding: 0 16px; display: flex;flex-direction: column; justify-content: center;align-items: center;gap:2px;">
            <span style="color: #ffffff; text-align: center">{{ state.appdetails.downloads }}
            </span>
            <span style="color: #ffffff"> Downloads </span>
          </div>

          <div
            style="padding: 0 16px;display: flex;flex-direction: column; justify-content: center;gap:2px; font-weight: bold;align-items: center">
            <span
              style="text-align: center; background: green; color: #ffffff; height: 16px;width:16px; display: flex;justify-content: center;align-items: center;">
              3
            </span>
            <span style="color: #ffffff"> PEGI 3 </span>
          </div>
        </div>
      </div>

      <div style="position: absolute; bottom: 7%; width: 95%; text-align: right;">
        <!-- <v-btn rounded elevation="0">Trailer</v-btn> -->
      </div>
    </div>
  </div>

  <br v-if="display.mdAndUp" />
  <br v-if="display.mdAndUp" />
  <br v-if="display.mdAndUp" />
  <v-row class="mx-md-6 mx-2 mt-2">
    <v-col cols="8" v-if="display.mdAndUp">
      <swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="i in state.appdetails.images" :key="i">
          <img :src="i" v-if="false" style="border-radius: 8px; width: 100px" />
          <v-img v-else class="mx-auto image-game-details" style="width: 100%;height: 100%" alt="" lazy-src="/emty.png"
            :src="i">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height" style="background-color:rgb(32, 33, 36);">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </swiper-slide>
      </swiper>
      <br />
      <br />
      <v-row>
        <v-col>
          <div>
            <span style="color: #ffffff; font-weight: 500; font-size: 22px">
              About this game
            </span>
            <button class="cyrcle-btn-style">
              <v-icon style="color: #ffffff; font-size: 15px">
                mdi-arrow-right
              </v-icon>
            </button>
            <br />
            <br />
            <span style="color: #ffffff; font-weight: 400; font-size: 14px">
              {{ state.appdetails.description }}
            </span>
          </div>
        </v-col>
      </v-row>
      <br />
      <br />
      <v-row>
        <v-col>
          <div>
            <span style="color: #ffffff; font-weight: 500; font-size: 22px">
              Data safety
            </span>
            <v-icon style="color: #ffffff"> mdi-arrow-right </v-icon>
            <br />
            <br />
            <span style="color: #ffffff; font-weight: 400; font-size: 14px">
              {{ state.appdetails.DataSafetyDescription }}
            </span>
          </div>
        </v-col>
      </v-row>
      <br />
      <br />
      <br />
      <v-row class="mr-2">
        <div style="width: 100%">
          <v-card class="mx-auto" style="
                border-radius: 8px;
                border: #ffffff 1px solid;
                box-shadow: none;
                background: transparent;
              ">
            <v-list density="compact" style="background: transparent">
              <v-list-item v-for="(item, itemIndex) in DataSafetyDetails" :key="itemIndex">
                <div class="d-flex">
                  <v-icon style="color: #ffffff">
                    {{ item.icon }}
                  </v-icon>
                  <v-list-item-title style="color: #ffffff" class="ml-2">
                    {{ item.description }}
                  </v-list-item-title>
                </div>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-row>
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

          <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                margin-bottom: 8px;
              ">
            <div>
              <v-btn v-if="isLoggedIn" dark class="buy-now-btn text-capitalize" @click="openCommentDialog()">
                {{ installed ? "Install on more devices" : "Write review" }}
              </v-btn>
              <div v-if="!isLoggedIn" style="color: #6c24c0; cursor: pointer">
                Please login to write and comment.
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <div style="width: 100%; display: flex;">
          <v-col cols="2" class="mr-9">
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
          <v-col cols="10" style="text-align: -webkit-right">
            <v-progress-linear v-for="i in state.chart" :model-value="i.percent" background-color="#ffffff66"
              color="#874FFF" height="10" rounded style="margin-top: 1rem">
            </v-progress-linear>
          </v-col>
        </div>

        <div style="width: 100%" v-for="(comment, i) in state.allComments" :key="i">
          <v-card style="box-shadow: none; background: transparent">
            <v-card-title>
              <v-avatar>
                <v-icon color="#ffffff">mdi-account-circle</v-icon>
              </v-avatar>
              <span class="text-subtitle-2 font-weight-light" style="color: #ffffff">{{ comment.userName }}</span>
            </v-card-title>
            <v-card-subtitle class="ma-2 d-flex" style="align-items: center">
              <v-rating color="#874FFF" dense :size="25" :length="5" background-color="#874FFF"
                :model-value="comment.rating" readonly></v-rating>
              <span style="
                    padding-left: 5px;
                    color: #ffffff;
                    font-weight: 500;
                    font-size: 14px;
                  ">{{ formatDate(comment.dateOfComment) }}</span>
              <!-- <span>{{ momentFormat(content.date, "DD MMM") }}</span>  -->
            </v-card-subtitle>
            <v-card-text class="ma-2" style="color: #ffffff">
              {{ comment.commentText }}
            </v-card-text>
            <v-card-subtitle class="pt-0">
              <span class="ma-2" style="color: #ffffff; font-weight: 400; font-size: 12px">
                {{ comment.helpfulNumberOfComment }} people found this review
                helpful
              </span>
              <br />
              <div>
                <span v-if="isLoggedIn" class="ma-2" style="color: #ffffff; font-weight: 400; font-size: 12px">
                  Did you find this helpful?
                </span>
                <v-btn v-if="isLoggedIn" :class="{ activeBtnColor: comment.canRate.value == '1' }" @click="
                  postIhelpFul(
                    comment.commentId,
                    comment.canRate.id,
                    comment.canRate.canRateAgain,
                    1,
                    comment.helpfulNumberOfComment
                  )
                  " class="ml-4 px-5 mt-2 comment-btn">Yes </v-btn>
                <v-btn v-if="isLoggedIn" :class="{ activeBtnColor: comment.canRate.value == '0' }" @click="
                  postIhelpFul(
                    comment.commentId,
                    comment.canRate.id,
                    comment.canRate.canRateAgain,
                    0,
                    comment.helpfulNumberOfComment
                  )
                  " class="ml-2 px-5 mt-2 comment-btn">No</v-btn>
              </div>
            </v-card-subtitle>
            <br>
            <br>
            <br>
          </v-card>
        </div>
        <div class="ml-6">
          <br />
          <br />

          <p style="
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
      </v-row>
      <v-row>
        <div class="ml-6">
          <br />
          <br />

          <span style="
                color: #ffffff;
                font-weight: 500;
                font-size: 22px;
                line-height: 150%;
                letter-spacing: 0.15px;
                text-transform: capitalize;
              ">
            What's new
          </span>
          <br />
          <br />
          <span style="
                font-weight: 400;
                font-size: 14px;
                line-height: 150%;

                letter-spacing: 0.15px;
                text-transform: capitalize;

                color: #ffffff;
              ">
            {{ state.appdetails.description }}
          </span>
        </div>
      </v-row>
    </v-col>
    <v-col cols="12" v-if="!display.mdAndUp">
      <swiper :slides-per-view="1" :space-between="5" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="i in state.appdetails.images" :key="i">
          <img :src="i" v-if="false" style="border-radius: 8px; width: 100px" />
          <v-img v-else class="mx-auto image-game-details" style="width: 100%;height: 100%" alt="" lazy-src="/emty.png"
            :src="i">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </swiper-slide>
      </swiper>
      <!-- <v-carousel hide-delimiters show-arrows-on-hover>
                <v-carousel-item
                  v-for="(img, appdetailsIndex) in appdetails.imgs"
                  :key="appdetailsIndex"
                  :src="img"
                  cover
                ></v-carousel-item>
              </v-carousel> -->
      <br />
      <br />
      <v-row>
        <v-col>
          <div>
            <span style="color: #ffffff; font-weight: 500; font-size: 22px">
              About this game
            </span>
            <button class="cyrcle-btn-style">
              <v-icon style="color: #ffffff; font-size: 15px">
                mdi-arrow-right
              </v-icon>
            </button>
            <br />
            <br />
            <span style="color: #ffffff; font-weight: 400; font-size: 14px">
              {{ state.appdetails.description }}
            </span>
          </div>
        </v-col>
      </v-row>
      <br />
      <br />
      <v-row>
        <v-col>
          <div>
            <span style="color: #ffffff; font-weight: 500; font-size: 22px">
              Data safety
            </span>
            <v-icon style="color: #ffffff"> mdi-arrow-right </v-icon>
            <br />
            <br />
            <span style="color: #ffffff; font-weight: 400; font-size: 14px">
              {{ state.appdetails.DataSafetyDescription }}
            </span>
          </div>
        </v-col>
      </v-row>
      <br />
      <br />
      <br />
      <v-row class="mr-2">
        <div style="width: 100%">
          <v-card class="mx-auto" style="
                border-radius: 8px;
                border: #ffffff 1px solid;
                box-shadow: none;
                background: transparent;
              ">
            <v-list density="compact" style="background: transparent">
              <v-list-item v-for="(item, itemIndex) in DataSafetyDetails" :key="itemIndex">
                <div class="d-flex">
                  <v-icon style="color: #ffffff">
                    {{ item.icon }}
                  </v-icon>

                  <v-list-item-title style="color: #ffffff" class="ml-2">
                    {{ item.description }}
                  </v-list-item-title>
                </div>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-row>
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

          <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              ">
            <div>
              <v-btn dark class="buy-now-btn text-capitalize mt-5 mb-2" @click="openCommentDialog()">
                {{ installed ? "Install on more devices" : "Write review" }}
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <div style="width: 100%; display: contents">
          <v-col cols="3" class="px-0 text-center d-flex flex-column justify-center">
            <div class="d-flex justify-center ml-2">
              <span style="color: #ffffff; font-weight: 400; font-size: 45px" class="text-h5 text-md-h3">
                {{ state.appdetails.rate }}
              </span>
              <v-icon color="#874FFF" class="ml-2" size=" x-large">
                mdi-star
              </v-icon>
            </div>
            <span style="color: #ffffff; font-weight: 400; font-size: 12px">
              {{ state.appdetails.reviews }} reviews
            </span>
          </v-col>
          <v-col cols="9" style="text-align: -webkit-right">
            <v-progress-linear class="ml-2" v-for="i in state.chart" :model-value="i.percent"
              background-color="#ffffff66" color="#874FFF" height="10" rounded style="margin-top: 1rem">
            </v-progress-linear>

          </v-col>
        </div>

        <div style="width: 100%" v-for="(comment, i) in state.allComments" :key="i">
          <v-card style="box-shadow: none; background: transparent">
            <v-card-title>
              <v-avatar>
                <v-icon color="#ffffff">mdi-account-circle</v-icon>
              </v-avatar>
              <span class="text-subtitle-2 font-weight-light" style="color: #ffffff">{{ comment.userName }}</span>
            </v-card-title>
            <v-card-subtitle class="ma-2 d-flex" style="align-items: center">
              <v-rating color="#874FFF" :size="25" :length="5" background-color="#874FFF" :model-value="comment.rating"
                readonly></v-rating>
              <span style="
                    padding-left: 5px;
                    color: #ffffff;
                    font-weight: 500;
                    font-size: 14px;
                  ">
                {{ formatDate(comment.dateOfComment) }}</span>
              <!-- <span>{{ momentFormat(content.date, "DD MMM") }}</span>  -->
            </v-card-subtitle>
            <v-card-text class="ma-1" style="color: #ffffff">
              {{ comment.commentText }}
            </v-card-text>
            <v-card-subtitle class="pt-0">
              <span class="ma-1" style="color: #ffffff; font-weight: 400; font-size: 12px">
                {{ comment.helpfulNumberOfComment }} people found this review
                helpful
              </span>
              <br />
              <div>
                <span v-if="isLoggedIn" class="ma-1" style="color: #ffffff; font-weight: 400; font-size: 12px">
                  Did you find this helpful?
                </span>

                <v-btn v-if="isLoggedIn" :class="{ activeBtnColor: comment.canRate.value == '1' }" @click="
                  postIhelpFul(
                    comment.commentId,
                    comment.canRate.id,
                    comment.canRate.canRateAgain,
                    1,
                    comment.helpfulNumberOfComment
                  )
                  " class="ml-1 px-5 mt-2 comment-btn">Yes</v-btn>
                <v-btn v-if="isLoggedIn" :class="{ activeBtnColor: comment.canRate.value == '0' }" @click="
                  postIhelpFul(
                    comment.commentId,
                    comment.canRate.id,
                    comment.canRate.canRateAgain,
                    0,
                    comment.helpfulNumberOfComment
                  )
                  " class="ml-1 px-5 mt-2 comment-btn">No</v-btn>

              </div>
            </v-card-subtitle>
            <br>
            <br>
          </v-card>

        </div>
        <div class="ml-6">
          <br />
          <br />

          <p style="
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
      </v-row>
      <v-row>
        <div class="ml-6">
          <br />
          <br />

          <span style="
                color: #ffffff;
                font-weight: 500;
                font-size: 22px;
                line-height: 150%;
                letter-spacing: 0.15px;
                text-transform: capitalize;
              ">
            What's new
          </span>
          <br />
          <br />
          <span style="
                font-weight: 400;
                font-size: 14px;
                line-height: 150%;

                letter-spacing: 0.15px;
                text-transform: capitalize;

                color: #ffffff;
              ">
            {{ state.appdetails.description }}
          </span>
        </div>
      </v-row>
    </v-col>
    <v-col cols="4" v-if="display.mdAndUp">
      <v-row>
        <v-expansion-panels style="width: 80%" flat>
          <v-expansion-panel style="background: transparent">
            <v-expansion-panel-title style="color: #ffffff; font-size: 22px; font-weight: 400">
              Developer contact
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card style="box-shadow: none; background: transparent; width: 100%">
                <v-list density="compact" style="background: transparent">
                  <v-list-item v-for="(item, ind) in items" :key="ind" :value="item" style="padding-left: 0px">
                    <!-- <template v-slot:prepend> -->
                    <div class="d-flex justify-space-between">
                      <div class="d-flex">
                        <v-icon style="color: white">{{ item.icon }}</v-icon>
                        <!-- </template> -->

                        <v-list-item-title style="color: #ffffff">{{
                          item.text
                        }}</v-list-item-title>
                      </div>
                      <v-list-item-subtitle v-if="item.text === 'Email'" style="color: #ffffff;">
                        <a :href="'mailto:' + item.description" style="text-decoration: none; color: #ffffff;">
                          {{
                            item.description.substr(0, 14) +
                            (item.description.length > 14 ? "..." : " ")
                          }}
                        </a>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-else style="color: #ffffff;">
                        <a :href="item.description" :target="item.description"
                          style="text-decoration: none; color: #ffffff;">
                          {{
                            item.description.substr(0, 14) +
                            (item.description.length > 14 ? "..." : " ")
                          }}
                        </a>
                      </v-list-item-subtitle>
                    </div>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <br />
      <br />
      <v-row style="display: block">
        <v-list style="display: inline-flex; background: transparent" class="pl-6">
          <v-list-item-title style="color: #ffffff; font-size: 22px; font-weight: 400">
            Similar games</v-list-item-title>

          <template v-slot:prepend>
            <v-icon style="color: white">mdi-arrow-right</v-icon>
          </template>

          <!-- <v-list-item
                title="You might also like"
                style="max-width: 70%; font-size: 18px"
              > -->

          <!-- <template v-slot:append>
                  <v-btn size="small" variant="text">
                    <v-icon> mdi-arrow-right </v-icon>
                  </v-btn>
                </template> -->
          <!-- </v-list-item> -->
        </v-list>

        <v-card v-for="(card, cardIndex) in state.cards" :key="cardIndex"
          style="padding: 4px 24px; box-shadow: none; background: transparent" @click="goToGameDetailPage(card.id)">
          <div style="display: flex; align-items: center">
            <!-- <div style="padding: 8px;">
                                  <span style="font-size: 14px;">
                                      {{(i+1)+(3*index)}}
  
                                  </span>
                              </div> -->

            <div style="max-width: 60px; max-width: 60px">
              <img :src="card.img"
                style="max-width: 60px; max-width: 60px;width:60px; height: 60px; border-radius: 20%" />
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
                    <div class="d-flex align-center">
                      <span>{{ card.rate }}</span>
                      <v-icon color="#874FFF">mdi-star</v-icon>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-card>
        <v-list style="display: inline-flex; background: transparent" class="pl-6">
          <p style="
                color: #ffffff;
                font-weight: 400;
                font-size: 22px;
                line-height: 26px;
              ">
            More by {{ companyName }}
          </p>
          <template v-slot:prepend>
            <v-icon dark icon="mdi-arrow-right"></v-icon>
          </template>
        </v-list>
        <v-card v-for="(card, cardsIndex) in state.cards" :key="cardsIndex"
          style="padding: 4px 24px; box-shadow: none; background: transparent" @click="goToGameDetailPage(card.id)">
          <div style="display: flex; align-items: center">
            <!-- <div style="padding: 8px;">
                                  <span style="font-size: 14px;">
                                      {{(i+1)+(3*index)}}
  
                                  </span>
                              </div> -->

            <div style="max-width: 60px; max-width: 60px">
              <img :src="card.img"
                style="max-width: 60px; max-width: 60px;width: 60px;height: 60px; border-radius: 20%" />
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
                    <div>
                      <span>{{ card.rate }}</span>
                      <v-icon dark color="#874FFF">mdi-star</v-icon>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
  <!-- </client-only> -->

</template>

<script setup>
//--------------------------------------------------------- imports start ------------------------------------------
import { useMainStore } from "../../store";
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
//import { EventBus } from '~/plugins/event-bus'


//------------------------------------------------------ imports end ---------------------------------------------------

//-------------------------------------------------------- varaibels start -------------------------------------------

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

const display = ref(useDisplay());
const gameId = ref("");
const route = useRoute();
let unsubscribe = null

//const appData = reactive({data:null,pending:true,error:null,mainBanner:null,version:null})
// ------------------------------------------------------- varaibels end --------------------------------------------

const appPurchase = reactive({
  verify: false,
  differentNetwork: false,
  notSuportedNetwork: false,
});

const state = reactive({
  appdetails: {
    description: "",
    DataSafetyDescription: `Safety starts with understanding
                 how developers collect and share your data. Data privacy
                 and security practices may vary based on your use, region,
                 and age. The developer provided this information and may update it over time.`,
    name: "",
    appId: "",
    versionId: "",
    appPrice: "",
    downlaods: "",
    rate: "",
    reviews: "",
    images: [], //slider images
    mainBanner: "/emty.png",
    appFileInfo: "",
    version: [],
    blockchainRM: {},
  },
  chart: [],
  allComments: [],
  cards: [],
  userInfo: {},
  suportedNetwork: [],
  addNetwork: false
});
const isLoggedIn = ref(false);
const companyName = ref("WhatsApp LLC");
const installed = ref(false);
const hasContractOnThisNetwork = ref(false);
const userCanDownload = ref(false);
const installAppLoading = ref(false);
const buyLoading = ref(false);
const show = ref(false);
const updateAgain = ref(true);
const addedToWishList = ref(false);
const userToken = ref(null);
const snackbar = ref(false)
const snackbarInfo = ref({
  text: "",
  color: ""
})
const walletAddress = ref('');

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
    icon: "mdi-marker-check",
    description: "http://www.whatsapp.com/legal/#Privacy",
  },
];
// -------------------------------------------------------- functions start ------------------------------------------

const getFileByName = (url, name, path, extension) => {
  return url + "/api/v1/downloadFileByName/" + name + "/" + path + "/" + extension;
}

//----------------------------------Api Calls start --------------------------------------------------------------------------
const { data: appData, pending, error, refresh } = useAsyncData('gameData', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getApp/" + gameId.value, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${yourTokenHere}`, // Uncomment and modify according to your auth token handling
      },
    })
    state.appdetails.name = res.data.name;
    state.appdetails.appId = res.data.id;
    state.appdetails.description = res.data.appsAppOrBookDetailsModelRelation.about;
    state.appdetails.appPrice = BigInt(res.data.appsAppOrBookDetailsModelRelation.price)
    state.appdetails.version = res.data.appsVersionsModelRelation[0];
    state.appdetails.blockchainRM = res.data.appBlockchainRM;
    const fileRelation = state.appdetails.version.versionsFilesModelRelation;
    state.appdetails.images = [];
    state.appdetails.mainBanner = "";
    fileRelation.forEach((item) => {
      if (item.type == 4) {
        state.appdetails.images.push(getFileByName(fileURL, item.name, item.path, item.extension));

      }
      else if (item.type == 3) {
        state.appdetails.mainBanner = getFileByName(fileURL, item.name, item.path, item.extension)

      }
      else if (item.type == 0) {
        state.appdetails.appFileInfo = item
      }
    })

  } catch (error) {
  }
})
const { data: rating, pending: ratingPending, error: ratingError, refresh: ratingRefresh } = useAsyncData('ratingData', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getRatingAppById/" + gameId.value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    state.appdetails.rate = res.data;
  } catch (error) {
  }
})
const { data: similarGames, pending: similarGamesPending, error: similarGamesError, refresh: similarGamesRefresh } = useAsyncData('similarGames', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAllApps/1/5/1000", {

      header: {
        "Content-Type": "application/json",
        // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
      },
    })
    res.data.forEach((item, index) => {
      if (index < res.data.length) {
        let rating = item.rating / item.ratingNumber;
        if (!rating || Number.isNaN(rating)) {
          rating = 0;
        }
        rating = rating.toFixed(2);
        if (item.appsVersionsModelRelation[0] != null) {
          let image = item.appsVersionsModelRelation[0].versionsFilesModelRelation.find((x) => x.type == 3);
          if (image) {
            state.cards.push({
              img: getFileByName(fileURL, image.name, image.path, image.extension),
              appName: item.name,
              rate: rating,
              id: item.id
            })
          }
        }
      }
    })
  } catch (error) {
  }
})
const { data: commentData, pending: commentPending, error: commentError, refresh: commentRefresh } = useAsyncData('comment', async () => {
  try {
    ///api/v1/getAppReviews/:appId/:skip/:take
    const res = await axios.get(baseURL + "/api/v1/getAppReviews/" + gameId.value + "/1/100", {
      header: {
        "Content-Type": "application/json",
        // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
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
const { data: countReviews, pending: pendingCountReviews, error: errorCountReviews, refresh: refreshCountReviews } = useAsyncData('countReviews', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/countReviews/" + gameId.value, {
      header: {
        "Content-Type": "application/json",
      },
    })
    state.appdetails.reviews = parseInt(res.data);
  } catch (error) {
  }
})
const { data: ratingForChartData, pending: pendingRatingForChart, error: errorRatingForChart, refresh: refreshRatingForChart } = useAsyncData('ratingForChart', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAllRatingsForApp/" + gameId.value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    state.chart = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i] == null) {
        res.data[i] = 0;
      }
      state.chart[i] = res.data[i];
    }
  } catch (error) {
  }
})
const { data: downlaodsData, pending: pendingDownloads, error: errorDownloads, refresh: refreshDownloads } = useAsyncData('countDownloads', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/countGameDownloads/" + gameId.value, {
      header: {
        "Content-Type": "application/json",
      },
    })
    state.appdetails.downloads = res.data;
  } catch (error) {
  }
})
const { data: dataWishList, pending: pendeingWishList, error: errorWishList, refresh: refreshWishList } = useAsyncData('wishListCheck', async () => {
  if (isLoggedIn.value == true) {
    userToken.value = await $auth.token();
    try {
      const res = await axios.get(baseURL + "/api/v1/checkAppIsBelongToUserWishList/" + gameId.value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.value,
        },
      })
      addedToWishList.value = res.data;
    } catch (error) {
    }
  }
  else {
    return null;
  }
})
//------------------------------------ Api Calls end--------------------------------------------------------------
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

const goToGameDetailPage = async (id) => {
  await navigateTo({
    path: "/game-details",
    query: {
      gameId: id,
    },
  });
  gameId.value = id;
}
const getCountOfIsHelpFullForEachComment = async (id) => {
  userToken.value = await $auth.token();
  try {
    const res = await axios.get(
      baseURL + "/api/v1/getCountOfIsHelpFullforeachComment/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.value,
        },
      }
    );
    return Number(res.data);
  } catch (error) {
  }
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
const checkUserIsHelpFull = async (commentId) => {
  if (isLoggedIn.value == true) {
    userToken.value = await $auth.token();
    try {
      const res = await axios.get(
        baseURL +
        "/api/v1/checkUserIsHelpfullRate/" + commentId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken.value,
          },
        }
      );
      return res.data;
    } catch (error) {
    }
  }
  else {
    return null;
  }

};
const formatDate = (date) => {
  return moment(date).format("DD MMM");
};
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
const postIhelpFul = async (
  id,
  helpFullId,
  canRate,
  helpfullValue,
  count
) => {
  //id is commentid
  //helpfullid is helpfullid in database for check this use was rate the helpfull or not
  // canrate is for true or false if false the user helpful will update if true the the new record of helpfull will be post
  //helpfulvalue is value of rate 1 for yes and 0 for no

  // return;
  userToken.value = await $auth.token();
  if (canRate == true) {
    try {
      const res = await axios.post(
        baseURL + "/api/v1/postIsHelpFull",
        {
          value: helpfullValue,
          review_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken.value,
          },
        }
      );

      if (helpfullValue == 1) {
        var comment = state.allComments.find(
          (item) => item.commentId == id
        );
        comment.helpfulNumberOfComment += 1;
        comment.canRate.value = helpfullValue;
        comment.canRate.canRateAgain = false;
        comment.canRate.id = res.data.id;
      } else if (helpfullValue == 0) {
        var comment = state.allComments.find(
          (item) => item.commentId == id
        );
        comment.canRate.value = helpfullValue;
        comment.canRateAgain = false;
        comment.canRate.id = res.data.id;
      }
    } catch (error) {
    }
  } else {
    try {
      const update = await axios.put(
        baseURL + "/api/v1/updateIsHelpFull/" + helpFullId,
        {
          value: helpfullValue,
          review_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken.value,
          },
        }
      );
      if (helpfullValue == 1) {
        var comment = state.allComments.find(
          (item) => item.commentId == id
        );
        updateAgain.value = true;
        if (updateAgain.value == true && comment.canRate.value != 1) {
          comment.helpfulNumberOfComment += 1;
        }
        comment.canRate.value = helpfullValue;
        comment.canRate.canRateAgain = false;
        updateAgain.value = false;
      } else if (helpfullValue == 0) {
        updateAgain.value == true;

        var comment = state.allComments.find(
          (item) => item.commentId == id
        );
        if (
          (updateAgain.value =
            true && count > 0 && comment.canRate.value != 0)
        ) {
          comment.helpfulNumberOfComment -= 1;
        }
        comment.canRate.value = helpfullValue;
        comment.canRate.canRateAgain = false;
        updateAgain.value = false;
      }
    } catch (error) {
    }
  }
};
const addGameToWishList = async () => {
  try {
    userToken.value = await $auth.token();
    const res = await axios.post(
      baseURL + "/api/v1/postWishList",
      {
        app_id: state.appdetails.appId,
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
  }
};
// ---------------------------------------------------------- functions end ------------------------------------------
//blockChain Functions start
const buyApp = async () => {

  buyLoading.value = true;  //state.appdetails.version.versionsFilesModelRelation
  const account = getAccount(wagmiConfig);
  walletAddress.value = account.address;
  let web3 = new Web3(await account.connector.getProvider());

  if (walletAddress.value != undefined) {

    let DappetizeTokenContract = new web3.eth.Contract(
      contractState.dappetizeTokenAbi,
      contractState.dappetizeTokenAddress
    );

    let decimals = await DappetizeTokenContract.methods.decimals().call();
    let appContract = new web3.eth.Contract(
      contractState.appContractAbi,
      contractState.contractAddress
    );
    //this.$store.state.contractAddress
    const pow = Math.pow(10, Number(decimals));
    let price = Number(state.appdetails.appPrice) * (pow)

    const price2 = price.toString();
    try {
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
      let buy = await appContract.methods
        .buy(String(contractState.contractAddress))
        .send({
          from: walletAddress.value,
        });

      console.log(buy.events);


      buyLoading.value = false;
      userCanDownload.value = true;

      snackbar.value = true;
      snackbarInfo.value.text =
        "Tranasction Complete you can download your App";
      snackbarInfo.value.color = "success";
      // this.isBuy = true;
    } catch (error) {
      snackbar.value = true;
      snackbarInfo.value.text =
        "Transaction Failed, check your DT balance or network connection";
      snackbarInfo.value.color = "error";
      buyLoading.value = false;
      userCanDownload.value = false;
    }
  }

};
const checkForApp = async () => {
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

      installAppLoading.value = true;
      buyLoading.value = true;

      if (contractState.contractAddress) {

        hasContractOnThisNetwork.value = true;
        let DownloadNFTContract = new web3.eth.Contract(
          contractState.downloadNFTAbi,
          contractState.downloadNFTAddress
        );


        // console.log("DownloadNFTContract.  events ", await DownloadNFTContract.events)
        // console.log("DownloadNFTContract.  events.NFTminting()", await DownloadNFTContract.events.NFTminting({  fromBlock: 0}))
        // console.log("DownloadNFTContract", web3.eth)
        // console.log("const events = await DownloadNFTContract.getPastEvents('allEvents', {");



        // algorithm 
        // check blockchain blocks from end to start
        // get sells token by finding transferred
        // get buying token and remove if sold
        // let tokenIds = []
        // const MAX_BLOCK_RANGE = 50000n;  // Maximum block range
        // async function getAllContractEventsForWallet(fromBlock, toBlock, walletAddress) {
        //   try {
        //     // Get the latest block number if 'latest' is provided
        //     if (toBlock === 'latest') {
        //       toBlock = BigInt(await web3.eth.getBlockNumber());
        //     } else {
        //       toBlock = BigInt(toBlock);
        //     }

        //     let currentFromBlock = BigInt(fromBlock);  // Ensure BigInt for fromBlock
        //     let currentToBlock = currentFromBlock + MAX_BLOCK_RANGE - 1n;

        //     while (currentFromBlock <= toBlock) {
        //       currentToBlock = currentToBlock > toBlock ? toBlock : currentToBlock;  // Ensure we don't exceed toBlock

        //       // console.log(`Fetching events from block ${currentFromBlock} to ${currentToBlock} for wallet ${walletAddress}...`);

        //       snackbar.value = true;
        //       snackbarInfo.value.text =
        //         "Please Wait Searching Blockchain for This Game for You.";
        //       snackbarInfo.value.color = "success";


        //       // Fetch all Transfer and Mint (as Transfer from zero address) events
        //       let events = await DownloadNFTContract.getPastEvents('Transfer', {
        //         filter: {
        //           to: walletAddress
        //         },
        //         fromBlock: Number(currentFromBlock),  // Convert BigInt to Number for Web3.js
        //         toBlock: Number(currentToBlock)       // Convert BigInt to Number for Web3.js
        //       });
        //       for (const event of events) {
        //         const { event: eventName, returnValues, transactionHash, blockNumber } = event;

        //         console.log(`Mint or Buy Transfer Event - Block: ${blockNumber}, Transaction Hash: ${transactionHash}`);
        //         console.log(`From: ${returnValues.from}, To: ${returnValues.to}, Token ID: ${returnValues.tokenId}`);

        //         tokenIds.push({
        //           from: returnValues.from,
        //           to: returnValues.to,
        //           tokenId: returnValues.tokenId,
        //         })
        //       }

        //       // All sold tokens
        //       events = await DownloadNFTContract.getPastEvents('Transfer', {
        //         filter: {
        //           from: walletAddress
        //         },
        //         fromBlock: Number(currentFromBlock),  // Convert BigInt to Number for Web3.js
        //         toBlock: Number(currentToBlock)       // Convert BigInt to Number for Web3.js
        //       });
        //       for (const event of events) {
        //         const { event: eventName, returnValues, transactionHash, blockNumber } = event;

        //         console.log(`Sell Transfer Event - Block: ${blockNumber}, Transaction Hash: ${transactionHash}`);
        //         console.log(`From: ${returnValues.from}, To: ${returnValues.to}, Token ID: ${returnValues.tokenId}`);

        //         // remove if transfered
        //         // this filter removed all sold token and return all existing and update tokenIds
        //         tokenIds = tokenIds.filter(obj => obj.tokenId !== returnValues.tokenId);
        //       }


        //       // Update the block range for the next batch
        //       currentFromBlock = currentToBlock + 1n;
        //       currentToBlock = currentFromBlock + MAX_BLOCK_RANGE - 1n;
        //     }

        //   } catch (error) {
        //     console.error('Error fetching past events:', error);
        //   }
        // }

        // // Call the function to get the Transfer and Mint events
        // const fromBlock = 0;  // Starting block
        // const toBlock = 'latest';  // Fetch up to the latest block
        // await getAllContractEventsForWallet(fromBlock, toBlock, walletAddress.value);




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
        installAppLoading.value = false;
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

};
const installApp = async () => {
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

const buyByLayerZero = async () => {

  const account = getAccount(wagmiConfig);
  walletAddress.value = account.address;
  let web3 = new Web3(await account.connector.getProvider());
  setNetWork(network_id[0][account.chainId]);


  const remoteChainId = CHAIN_ID[0][network_id[0][state.appdetails.blockchainRM.blockchainRM.network_id]];
  ///// hint to change  high  CHAIN_ID[0][network_id[0][account.chainId]]  


  // const endpoint = await ethers.getContractAt(
  //   'ILayerZeroEndpoint',
  //   ENDPOINTS[this.$store.state.blockchainNetwork]
  // )

  // Your values
  const uint16Value = 1;
  const uint256Value = 200000;

  // Encoding uint16 without padding to 32 bytes
  const uint16Hex = web3.utils.toHex(uint16Value).slice(2).padStart(4, "0");

  // Encoding uint256 with standard padding
  const uint256Hex = web3.eth.abi
    .encodeParameter("uint256", uint256Value)
    .slice(2);

  // Concatenate the hex strings
  const adapterParams = "0x" + uint16Hex + uint256Hex;

  // let adapterParams = web3.eth.abi.encodeParameters(
  //   ['uint16', 'uint256'],
  //   [1, 200000]
  // ) // default adapterParams example
  // let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example


  const endpoint = new web3.eth.Contract(
    endpoint_abi,
    ENDPOINTS[0][network_id[0][account.chainId]]
  );
  let DappetizeTokenContract = new web3.eth.Contract(
    contractState.dappetizeTokenAbi,
    contractState.dappetizeTokenAddress
  );


  let decimals = await DappetizeTokenContract.methods.decimals().call();

  // Your data state.appdetails.blockchainRM.contract_address
  let pow = Math.pow(10, Number(decimals));
  let price = state.appdetails.appPrice * (BigInt(pow))
  const tokenValue = price.toString();// Replace with your actual value this.appPrice; 
  setNetWork(network_id[0][state.appdetails.blockchainRM.blockchainRM.network_id]);
  const desTokenContractAddress = contractState.dappetizeTokenAddress// Replace with the actual address this.appBlockchainRM.token_contract_address;
  const desContractAddress = state.appdetails.blockchainRM.contract_address  // Replace with the actual address this.appBlockchainRM.contract_address;
  ///// hint to change

  // Encoding
  const payload = web3.eth.abi.encodeParameters(
    ["uint256", "address", "address"],
    [tokenValue, desTokenContractAddress, desContractAddress]
  );

  let fees = await endpoint.methods
    .estimateFees(
      remoteChainId,
      contractState.dtlzTransferAddress, //  this.$store.state.dtlzTransferAddress,
      payload,
      false,
      adapterParams
    )
    .call();


  setNetWork(network_id[0][account.chainId]);

  const dtlzContract = new web3.eth.Contract(
    contractState.dtlzTransferAbi, // this.$store.state.dtlzTransferAbi,
    contractState.dtlzTransferAddress // this.$store.state.dtlzTransferAddress
  );
  ////  


  pow = Math.pow(10, Number(decimals));
  let feesprice = fees[0] + (BigInt(pow)) + BigInt(1);
  const main_fee = feesprice.toString();




  let sendTokenToAnotherNetwork = await dtlzContract.methods
    .sendToken(
      remoteChainId,
      tokenValue,
      contractState.dappetizeTokenAddress, //  this.$store.state.dappetizeTokenAddress, or token contract address of app
      desTokenContractAddress,
      desContractAddress
    )
    .send({
      from: walletAddress.value,
      value: main_fee,
    });

}


const switchNetwork = async () => {
  // await switchChain(wagmiConfig, { chainId: state.appdetails.blockchainRM.blockchainRM.network_id })
}
const checkVerifyPurchase = async () => {

  try {
    //  await modal.open();
    const account = getAccount(wagmiConfig);
    walletAddress.value = account.address;
    let web3 = new Web3(await account.connector.getProvider());


    // account.connector
    setNetWork(network_id[0][account.chainId]);
    let verify = false;
    let AppContract = new web3.eth.Contract(
      contractState.appContractAbi,
      state.appdetails.blockchainRM.contract_address
    );
    verify = await AppContract.methods.verifyPurchase(walletAddress.value).call({
      from: walletAddress.value,
    })
    appPurchase.verify = verify;
  } catch (error) {
    appPurchase.verify = false;
  }


}
const checkSyncNetwork = async () => {
  try {
    const account = getAccount(wagmiConfig);
    appPurchase.notSuportedNetwork = false;
    if (network_id[0][account.chainId] == undefined) { appPurchase.notSuportedNetwork = true }

    if (appPurchase.notSuportedNetwork == false && (account.chainId != state.appdetails.blockchainRM.blockchainRM.network_id)) {
      appPurchase.differentNetwork = true
    }
    if (appPurchase.notSuportedNetwork == false && (account.chainId == state.appdetails.blockchainRM.blockchainRM.network_id)) {
      appPurchase.differentNetwork = false
    }
    if (appPurchase.verify == true) {
      appPurchase.notSuportedNetwork = false;
      appPurchase.differentNetwork = false;
    }
    if (appPurchase.notSuportedNetwork == true) {
      appPurchase.differentNetwork = false;
      appPurchase.verify = false
    }
    if (appPurchase.differentNetwork == true) {
      appPurchase.notSuportedNetwork = false;
      appPurchase.verify = false
    }


  } catch (error) {

    appPurchase.notSuportedNetwork = true
    appPurchase.differentNetwork = false;
    appPurchase.verify = false
  }

}
const checkBuyAppByUser = async (appId, userId) => {
  try {

    const res = await axios.get(
      baseURL +
      "/api/v1/checkBuyAppByUser/" + appId +
      '/' +
      userId,
      {
        headers: {
          "Content-Type": "application/json",

        },
      }
    );

    if (res.data == 0) {
      this.isBuy = false
    } else {
      this.isBuy = true
    }
  } catch (error) { }
}
const checkAppOfUser = async (appId, userId) => {
  try {

    const res = await axios.get(
      baseURL +
      "/api/v1/checkAppOfUser/" +
      appId +
      '/' +
      userId,
      {
        headers: {
          "Content-Type": "application/json",

        },
      }
    )
    if (res.data == 0) {
      this.isBuy = false
    } else {
      this.isAppForUser = true
      this.isBuy = true
    }
  } catch (error) {
  }
}

//blockChain Functions End

//------------------------------------------------------------ events start --------------------------------------------
watch(() => route.query.gameId, (newVal, oldVal) => {

  gameId.value = newVal;
  refresh();
  ratingRefresh();
  commentRefresh();
  refreshCountReviews();
  refreshRatingForChart();
  refreshDownloads();
  refreshWishList();

}, {
  immediate: true
})
watch(() => gameId.value, (newVal, oldVal) => {
  if (gameId.value) {
    refresh();
    ratingRefresh();
    commentRefresh();
    refreshCountReviews();
    refreshRatingForChart();
    refreshDownloads();
    refreshWishList();
  }
  else {
    return null;
  }

}, {
  immediate: true
})

onMounted(async () => {
  commentRefresh();
  gameId.value = route.query.gameId;
  isLoggedIn.value = await $auth.isLoggedIn();

  // check app has contract on this network and user buy it or not
  await checkForApp();

  // i don't know waht this do. hamid make it 
  await checkSyncNetwork();


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
      await checkForApp();
      await checkSyncNetwork();

    }
  }
  unsubscribe = watchAccount(wagmiConfig, {
    onChange: handleAccountChange,
  });
  ////


  // checkVerifyPurchase();
  // setInterval(() => {
  // checkSyncNetwork();
  // }, 8000);
  // let checkAppInterval = setInterval(async () => {
  //   let checkapp = await checkForApp()
  //   if (checkapp)
  //     clearInterval(checkAppInterval);
  // }, 3000);



})
// beforeDestroy(async () => {
//   unsubscribe()
// })
//------------------------------------------------------------- events end -------------------------------------------
</script>

<style scoped>
.container {
  padding: 0px;
}

.container-about-detail-games-second {
  display: none;
}

/* .container-about-detail-games-responsive-scond{
  display: none !important;
} */
/* .container-about-detail-games-responsive-first{
  display: none;
} */
/* @media screen and (max-width:1200px) {
 .container-detail-games{
  margin-left: 16px !important;
  margin-bottom: 24px;
 } 
} */
@media screen and (min-width:1280px) {
  .img-wishlist {
    margin-left: 4px !important;
  }

  .container-about {
    justify-content: center;
  }
}

@media screen and (min-width:960px) {
  /* .container-about-detail-games-responsive-first{
    display: block !important;
  } */
  /* .container-about-detail-games-responsive-scond{
    display: none !important;
  } */
}

@media screen and (max-width:1280px) and (min-width:960px) {
  .container-about-detail-games-responsive-first {
    height: 69% !important;
  }

  .container-result {
    /* height: 86% !important; */
  }

  .container-wishlist {
    /* flex-direction: column !important; */
    align-items: self-start !important;

  }

}

@media screen and (max-width:960px) {

  /* .container-about-detail-games-responsive-first{
    display: none !important;
  } */
  /* .container-about-detail-games-responsive-scond{
    display: block !important;
  } */
  /* .container-about-detail-games-responsive-first{
    height: 50% !important;
  } */
  .container-about-detail-games-responsive-first {
    height: 49% !important;
    min-height: 248px;
  }

  .buy-now-btn {
    padding: 0px 4px !important;
    font-size: 1.5vw !important;
    height: 5.5vw !important;
  }

  .banner-of-game {
    width: calc(100% - 100px) !important;
  }

  .container-wishlist {
    /* flex-direction: column; */
    align-items: center !important;
    gap: 10px;

  }

  .wishlist-style {
    font-size: 1.7vw !important;
  }

  .text-app-name-style {
    font-size: 2.5vw !important;
  }

  .purchase {
    font-size: 1.7vw !important;
  }

  .report-card-game {
    height: 16% !important;
  }

  .container-image {
    width: 84% !important;
    left: 16% !important;
  }

  #overlay {
    width: 84% !important;
    left: 16% !important;
  }

  .show-trailer {
    top: 12% !important;
    width: 56% !important;
    display: block !important;
  }

  .header-app-name-style {
    font-size: 3.5vw;
    line-height: 2rem;
  }

  .br-responsive {
    display: none;
  }

  .report-game {
    font-size: 1.7vw
  }

  .btn-trailer-bg {
    font-size: 1.5vw;
  }
}

@media screen and (max-width: 600px) {
  .container-about-detail-games-responsive-first {
    display: none !important;
  }

  .btn-trailer-sm {
    display: initial !important;
    background-color: rgba(0, 0, 0, .54) !important;
    color: white !important;
    font-size: 12px !important;
  }

  .banner-of-game-details {
    max-height: 58% !important;
  }

  .container-result {
    font-size: 12px !important;
    width: 100% !important;
    height: 100% !important;
  }

  .container-wishlist {
    gap: 10px;
    flex-direction: row !important;
    align-items: center !important;
  }

  .container-about-detail-games-second {
    background-color: rgb(32 33 36);
    display: flex;
  }

  .container-image {
    left: 0% !important;
    width: 100% !important;
    height: 77vw !important;
  }

  /* .container-about-detail-games-responsive-second{
    display: block !important;
  } */
  /* .about-detail-games {
    position: absolute !important;
    top: 9% !important;
  }
   */
  /* .about-game{
    height: 25% !important;
  } */
  .header-app-name-style {
    font-size: 16px !important;
  }

  .wishlist-style {
    font-size: 12px !important;
  }

  .text-app-name-style {
    font-size: 16px !important;
  }

  .purchase {
    font-size: 12px !important;
  }

  .image-game-details {
    height: 80% !important;
  }

  .buy-now-btn {
    font-size: 12px !important;
    width: auto !important;
    height: 40px !important;
  }

  .report-card-game {
    height: 15% !important;
    width: auto !important;
    align-items: center !important;
  }

  .banner-of-game {
    flex-direction: column;
    height: 50vw !important;
  }

  .container-about-detail-games {
    background-color: rgb(32, 33, 36);
  }

  #overlay {
    left: 0% !important;
    width: 100% !important;
  }

  .show-trailer {
    top: 12% !important;
    width: 56% !important;
    display: block !important;
  }

  .btn-trailer {
    background-color: rgba(0, 0, 0, .54);
    color: white;
  }

  .container-about-detail-games {
    height: 80% !important;
  }

  .show-trailer {
    top: 9% !important;


  }

  .comment-btn {
    width: 60px !important;
    height: 20px !important;
  }

  .res-min {
    display: none;
  }

  .add-wishlist {
    margin-bottom: 0px !important;
  }

  .banner {
    max-height: 86vw !important;
  }

  /* .container-about-detail-games-responsive{
    display: block;
  } */
}

/* @media screen and (max-width:576px) {
 
} */
.banner-of-game {
  /* -webkit-box-shadow: inset 25px 3px 31px 39px rgba(0,0,0,0.95); 
box-shadow: inset 25px 3px 31px 39px rgba(0,0,0,0.95); */
}

.activeBtnColor {
  background: linear-gradient(233.29deg,
      #7400b8 -27.18%,
      #5390d9 173.14%) !important;
}

.show-trailer {
  display: none;
}

.container-about-detail-games-responsive {
  display: none;
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
  left: 30%;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0,0,0,0.3);
   */
  /* background-image: radial-gradient(
    circle,
    transparent,
    rgba(0, 0, 0, 0.7) 80%
  );  */
  /* background: linear-gradient(to right,rgb(32,33,36) 0,rgba(0,0,0,0) 56%),linear-gradient(to top,rgb(32,33,36) 0,rgba(0,0,0,0) 56%),linear-gradient(to left,rgb(32,33,36) 0,rgba(0,0,0,0) 56%); */
  /* z-index: 2; */
  cursor: pointer;
  width: 70%;
  background: linear-gradient(to right, rgb(32, 33, 36) 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to top, rgb(32, 33, 36) 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to left, rgb(32, 33, 36) 0, rgba(0, 0, 0, 0) 98%);
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
  height: 52px;
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
  height: 30px;
  outline: none;
  border: 1px solid white;
  border-radius: 28px;
  background: transparent;
  color: white;
  font-size: 0.75rem;
  padding-right: 20px !important;
  padding-left: 20px !important;
}

.btn-trailer-sm {
  display: none
}
</style>
<style></style>
