<template>
  <v-container fluid class="container mt-1">
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
    <div v-if="!state.skeletonLoader" class="mt-5">
      <div style="display: inline-grid" v-if="appHasVideo">
        <br />
        <br />
        <div style="position: absolute; top: 15%">
          <div>
            <span class="font-xlarge"> WhatsApp Messenger </span>
            <br />
            <span style="color: #01875f"> WhatsApp LLC </span>

          </div>
          <br />
          <br />
          <div style="display: flex">
            <div style="padding-right: 16px; display: grid">
              <v-icon>mdi-star</v-icon>
              <span style="text-align: center; color: #ffffff">
                {{ state.appdetails.rate }}
                <br />
              </span>
              <span style="color: #ffffff">
                {{ state.appdetails.reviews }} reviews
              </span>
            </div>
            <div style="padding: 0 16px; display: grid">
              <span style="text-align: center; color: #ffff">{{ state.appdetails.downloads }}
              </span>
              <span style="color: #ffffff; text-align: center"> downloads </span>
            </div>
            <div style="padding: 0 16px; display: grid">
              <span style="text-align: center">
                <v-icon start>mdi-cellphone</v-icon>
              </span>
              <span style="color: #ffffff"> Editors' Choice </span>
            </div>
            <div style="padding: 0 16px; display: grid">
              <span style="text-align: center">
                <v-icon start>mdi-cellphone</v-icon>
              </span>
              <span style="color: #ffffff"> PEGI 3 </span>
            </div>
          </div>
          <br />
          <div v-if="hasContractOnThisNetwork">
            <!-- <v-btn
            style="border-radius: 8px; background-color: #01875f; color: white"
          >
            {{ installed ? 'Install on more devices' : 'install' }}
          </v-btn> -->
            <v-btn v-if="userCanDownload" :loading="installAppLoading" @click="installApp()" x-large
              class="buy-now-btn px-15 text-capitalize" elevation="0" dark>
              <!-- {{ installed ? 'Install on more devices' : 'install' }} -->
              download App
            </v-btn>
            <v-btn v-else :loading="buyLoading" @click="buyApp()" x-large class="buy-now-btn px-15 text-capitalize"
              elevation="0" dark>
              Buy App ({{ appPrice }} &nbsp;DAPP)
            </v-btn>

            <br />
            <br />
            <div>
              <span>
                <v-icon start>mdi-cellphone</v-icon>
              </span>
              <span style="color: #ffffff">
                This app is available for your device
              </span>
            </div>
          </div>
          <div v-else>This network does not support this app!</div>
        </div>
      </div>
      <v-row class="mx-md-6" v-if="!appHasVideo">
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

        <v-col>
          <v-row style="" class="d-flex justify-md-left justify-center-sm">
            <v-col class="" cols="10" md="3" sm="5" lg="3">
              <v-img class="mx-auto image-game-details" style="border-radius: 5px; width: 100%;" lazy-src="/empty.jfif"
                :src="state.appdetails.mainBanner">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height" style="background-color:rgb(32, 33, 36);">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-col>
            <v-col cols="10" md="6" sm="7" lg="9">
              <div>
                <span style="
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                align-self: center!important ;
                line-height: 53px;

                color: #ffffff;
              " class="text-h5 d-flex text-md-h3 justify-center-sm">
                  {{ state.appdetails.name }}
                </span>
                <br />
                <span class="d-flex justify-center-sm" style="color: #874fff; font-size: 22px; font-weight: 700">
                  WhatsApp LLC
                </span>
              </div>
              <div style="display: flex; " class=" justify-center-sm mt-10 ml-n2">
                <div>
                  <div class="d-flex">
                    <div>
                      <v-icon color="#874FFF" size="small" class="ml-2">
                        mdi-star
                      </v-icon>
                    </div>
                    <div class="mx-2" style="text-align: center; color: #ffffff"> {{ state.appdetails.rate }}</div>
                  </div>
                  <div class="d-flex">

                    <div class="mx-2" style="color: #ffffff">
                      {{ state.appdetails.reviews }} Reviews
                    </div>
                  </div>
                </div>
                <div style="padding: 0 16px; display: grid">
                  <span style="color: #ffffff; text-align: center">
                    {{ state.appdetails.downloads }}
                  </span>
                  <span style="color: #ffffff"> Downloads </span>
                </div>
                <div style="padding: 0 16px; display: grid; font-weight: bold">
                  <span style="text-align: center; background: green; color: #ffffff" class="mx-3">
                    3
                  </span>
                  <span style="color: #ffffff"> PEGI 3 </span>
                </div>
              </div>
              <br />
              <div v-if="hasContractOnThisNetwork" class="d-flex justify-center-sm text-center mt-3"
                style="display: contents; flex-wrap: wrap;">
                <v-btn v-if="userCanDownload" :loading="installAppLoading" @click="installApp()" x-large
                  class="buy-now-btn px-15 text-capitalize" elevation="0" dark>
                  <!-- {{ installed ? 'Install on more devices' : 'install' }} -->
                  <span style="color: white"> download App </span>
                </v-btn>
                <v-btn v-else :loading="buyLoading" @click="buyApp()" x-large class="buy-now-btn px-15 text-capitalize "
                  elevation="0" dark>
                  <span style="color: white">
                    Buy App ({{ state.appdetails.appPrice }} &nbsp;DAPP)
                  </span>
                </v-btn>

                <div style="align-items: center; justify-content: center; display: inline-block;"
                  class="d-flex mt-3 mt-md-0">
                  <span class="ml-2" style="color: #7400b8" v-if="addedToWishList">
                    Added to wishlist
                  </span>
                  <span v-else style="display: inline-block;">
                    <img src="/wishlistIcon.png" style="cursor: pointer; display: inline-block; vertical-align: middle;"
                      alt="" @click="addGameToWishList()" class="ml-3" />
                    <p class="ml-1"
                      style="display: inline-block; vertical-align: middle; max-width: 130px; color: #874FFF; font-family: Roboto; font-size: 16px; font-weight: 500; line-height: 18.75px; letter-spacing: 0.05em; text-align: left;">
                      Add to wishlist
                    </p>
                  </span>




                </div>
              </div>
              <div class="d-md-flex text-center" style="display: contents; color: white" v-else>
                This network does not support this app!
              </div>
              <br />
              <br />
            </v-col>
          </v-row>



        </v-col>
      </v-row>
      <br class="responsive-br" />
      <br class="responsive-br" />
      <br class="responsive-br" />
      <v-row class="mx-md-6 mt-2">
        <v-col cols="8" v-if="display.mdAndUp">
          <!-- <swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
          <swiper-slide v-for="i in state.appdetails.images" :key="i">
            <img :src="i" v-if="false" style="border-radius: 8px; width: 100px" />
            <v-img
      v-else
    class="mx-auto image-game-details"
    style="border-radius: 8px; width: 100px"
    lazy-src="/empty.jfif"
    :src="i"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    </v-img>
          </swiper-slide>
        </swiper> -->
          <!--      
        <swiper class="mySwiper" :breakpoints="swiperOptions.breakpoints">
          <swiper-slide v-for="(img, i) in appdetails.imgs" :key="i">
            <v-card style="background: #874fff; border-radius: 8px">
              <v-img :src="img" style="border-radius: 8px" class="ma-4">
              </v-img>
            </v-card>
          </swiper-slide>

        </swiper> -->

          <v-row>
            <v-col cols="10">
              <div>
                <span style="color: #ffffff; font-weight: 500; font-size: 22px">
                  About this app
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
          <v-row class="mt-15">
            <v-col class="mt-2">
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
                  <v-btn v-if="isLoggedIn" dark class="buy-now-btn text-capitalize mt-3" @click="openCommentDialog()">
                    {{ installed ? "Install on more devices" : "Write review" }}
                  </v-btn>
                  <div v-if="!isLoggedIn" class="mt-5" style="color: #6c24c0; cursor: pointer;">
                    Please login to write and comment.
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <br />

          <v-row>
            <div style="width: 100%; display: flex; gap: 20px;">
              <v-col class="d-flex flex-column justify-center align-center" cols="3">
                <div class="d-flex">
                  <span style="color: #ffffff; font-weight: 400; font-size: 45px">
                    {{ state.appdetails.rate }}
                  </span>
                  <v-icon color="#874FFF" size=" xx-large" class="ml-1">
                    mdi-star
                  </v-icon>
                </div>

                <span style="color: #ffffff; font-weight: 400; font-size: 12px">
                  {{ state.appdetails.reviews }} reviews
                </span>
              </v-col>
              <v-col cols="9" style="text-align: -webkit-right; " class="reversed-order">
                <v-progress-linear v-for="i in state.chart" :key="i.id" :model-value="i.percent"
                  background-color="#ffffff66" color="#874FFF" height="10" rounded style="margin-top: 1rem">
                </v-progress-linear>

              </v-col>
            </div>
          </v-row>
          <br />

          <v-row>
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
                  <div v-if="isLoggedIn">
                    <span class="ma-2" style="color: #ffffff; font-weight: 400; font-size: 12px">
                      Did you find this helpful?
                    </span>
                    <v-btn :class="{ activeBtnColor: comment.canRate.value == '1' }" @click="
                      postIhelpFul(
                        comment.commentId,
                        comment.canRate.id,
                        comment.canRate.canRateAgain,
                        1,
                        comment.helpfulNumberOfComment
                      )
                      " class="ml-4 px-5 mt-2 comment-btn">Yes</v-btn>
                    <v-btn :class="{ activeBtnColor: comment.canRate.value == '0' }" @click="
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
              <!-- <p style="
                font-weight: 500;
                font-size: 22px;
                line-height: 150%;
                letter-spacing: 0.15px;
                color: #874fff;
              ">
              See all reviews
            </p> -->
              <v-btn @click="newFunction()" v-if="state.seeAllReviews" style="
                font-weight: 500;
                font-size: 22px;
                line-height: 150%;
                letter-spacing: 0.15px;
                color: #874fff;
                background-color: transparent;
              ">
                See all reviews 1
              </v-btn>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="!display.mdAndUp">
          <swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide v-for="i in state.appdetails.images" :key="i">
              <img :src="i" v-if="false" style="border-radius: 8px; width: 100px" />
              <v-img v-else class="mx-auto image-game-details" style="border-radius: 8px; width: 100px" alt=""
                lazy-src="/empty.jfif" :src="i">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </swiper-slide>
          </swiper>
          <br />
          <br />
          <v-row>
            <v-col sm-offset="1">
              <div class="justify-center-sm">
                <div class="mb-4" style="gap: 12px;">
                  <span style="color: #ffffff; font-weight: 500; font-size: 20px">
                    About this app
                  </span>
                  <button class="cyrcle-btn-style">
                    <v-icon style="color: #ffffff; font-size: 15px">
                      mdi-arrow-right
                    </v-icon>
                  </button>
                </div>
                <span class="" style="color: #ffffff; font-weight: 400; font-size: 14px">
                  {{ state.appdetails.description }}
                </span>
              </div>
            </v-col>
          </v-row>
          <br />
          <br />

          <v-row>
            <v-col>
              <div class="justify-center-sm">
                <div class="mb-4">
                  <span style="color: #ffffff; font-weight: 500; font-size: 20px">
                    Data safety
                  </span>
                  <v-icon class="mt-1" style="color: #ffffff"> mdi-arrow-right </v-icon>
                </div>
                <span class="mt-10" style="color: #ffffff; font-weight: 400; font-size: 14px">
                  {{ state.appdetails.DataSafetyDescription }}
                </span>
              </div>
            </v-col>
          </v-row>
          <br />
          <br />
          <br />

          <br />
          <br />
          <v-row>
            <v-col class="justify-center-sm">
              <div class="d-flex align-center justify-center-sm">
                <span style="color: #ffffff; font-weight: 500; font-size: 20px">
                  Rating & reviews
                </span>
                <v-icon style="color: #ffffff"> mdi-arrow-right </v-icon>
              </div>

              <div class="justify-center-sm" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              ">
                <div>
                  <v-btn class="write-review-btn mt-5 mb-2 pa-2" v-if="isLoggedIn" style="
                    border-radius: 8px;
                    background: linear-gradient(
                      233.29deg,
                      #7400b8 -27.18%,
                      #5390d9 173.14%
                    );
                  text-transform: capitalize ;
                    font-size: 12px ;
                   width: 110px ;
                   height: 40px ;
                    border-radius: 0px 13.8848px;
                    color: white;
                  " @click="openCommentDialog()">
                    {{ installed ? "Install on more devices" : "Write review" }}
                  </v-btn>
                  <div v-if="!isLoggedIn" class="mt-5" style="color: #6c24c0; cursor: pointer; ">
                    Please login to write and comment.
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <br />

          <v-row>
            <div style="width: 100%; display: contents" class="justify-center-sm">
              <v-col cols="3" class="px-0 text-center d-flex flex-column align-center justify-center">
                <div style="display: flex;justify-content: center;" class="ml-2 ">
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
              <v-col cols="9" class="reversed-order justify-center-sm" style="text-align: -webkit-right">
                <v-progress-linear v-for="i in state.chart" :key="i.id" :model-value="i.percent"
                  background-color="#ffffff66" color="#874FFF" height="10" rounded style="margin-top: 1rem">
                </v-progress-linear>
              </v-col>
            </div>

            <div class="mt-7" style="width: 100%;" v-for="(comment, i) in state.allComments" :key="i">
              <v-card class="" style="box-shadow: none; background: transparent">
                <v-card-title>
                  <v-avatar>
                    <v-icon color="#ffffff">mdi-account-circle</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-light" style="color: #ffffff">{{ comment.userName }}</span>
                </v-card-title>
                <v-card-subtitle class="ma-2 d-flex" style="align-items: center">
                  <v-rating color="#874FFF" :size="25" :length="5" background-color="#874FFF"
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
                  <div v-if="isLoggedIn">
                    <span class="ma-2" style="color: #ffffff; font-weight: 400; font-size: 12px">
                      Did you find this helpful?
                    </span>
                    <v-btn :class="{ activeBtnColor: comment.canRate.value == '1' }" @click="
                      postIhelpFul(
                        comment.commentId,
                        comment.canRate.id,
                        comment.canRate.canRateAgain,
                        1,
                        comment.helpfulNumberOfComment
                      )
                      " class="ml-1 px-5 mt-2 comment-btn">Yes</v-btn>
                    <v-btn :class="{ activeBtnColor: comment.canRate.value == '0' }" @click="
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

              </v-card>
            </div>
            <div class="d-flex justify-center" style="width: 100%;">
              <br />
              <v-btn @click="newFunction()" v-if="state.seeAllReviews" style="
                font-weight: 500;
                font-size: 22px;
                line-height: 150%;
                letter-spacing: 0.15px;
                color: #874fff;
                background-color: transparent;
              ">
                See all reviews 1
              </v-btn>

              <!-- <p style="
                font-weight: 500;
                font-size: 22px;
                line-height: 150%;
                /* identical to box height, or 33px */

                letter-spacing: 0.15px;

                color: #874fff;
              ">
              See all reviews
            </p> -->
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
                      <v-list-item v-for="(item, ind) in items" :key="ind" :value="item" active-color="primary"
                        style="padding-left: 0px">
                        <!-- <template v-slot:prepend> -->
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center">
                            <v-icon style="color: white">{{ item.icon }}</v-icon>
                            <!-- </template> -->

                            <v-list-item-title style="color: #ffffff;">{{ item.text }}</v-list-item-title>
                          </div>
                          <v-list-item-subtitle style="color: #ffffff">{{ item.description.substr(0, 14)
                            + (item.description.length > 14 ? "..." : " ") }}</v-list-item-subtitle>
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
              <v-list-item-content>
                <v-list-item-title style="color: #ffffff; font-size: 22px; font-weight: 400">
                  Similar apps</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon style="color: white">mdi-arrow-right</v-icon>
              </v-list-item-icon>

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

            <v-card v-for="(card, i) in state.cards" :key="i" style="
              padding: 4px 24px;
              box-shadow: none;
              background: transparent;
              cursor: pointer;
            " @click="goToAppDetailPage(card.id)">
              <div style="display: flex; align-items: center">
                <!-- <div style="padding: 8px;">
                                <span style="font-size: 14px;">
                                    {{(i+1)+(3*index)}}

                                </span>
                            </div> -->

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
                        <div class="d-flex align-center">
                          <span class="mr-1">{{ card.rate }}</span>
                          <v-icon style="color: #874FFf">mdi-star</v-icon>
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
    </div>
  </v-container>
</template>

<script setup>
//------------------------------------------------- imports start -----------------------------------------------------------------
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
//-------------------------------------------------- imports end ------------------------------------------------------------------

//------------------------------------------------------- variables start ---------------------------------------------------------
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
    appId: "",
    appPrice: "",
    downloads: "",
    rate: "",
    reviews: "",
    images: [], //slider images
    mainBanner: "",
    appFileInfo: "",
    version: [],
    commentRelation: [],
    seeAllReviews: false,
    skipReviews: 1,

  },
  chart: [],
  allComments: [],
  cards: [],
  userInfo: {},
  snackbar: {},
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
    icon: "mdi-marker-check",
    description: "http://www.whatsapp.com/legal/#Privacy",
  },
];
const appId = ref("");
const display = ref(useDisplay());
const hasContractOnThisNetwork = ref(true);
const userCanDownload = ref(false);
const installAppLoading = ref(false);
const buyLoading = ref(false);
const updateAgain = ref(true);
const show = ref(false);
const userToken = ref(null);
const addedToWishList = ref(false);
const isBuy = ref(false);
const snackbar = ref(false)
const snackbarInfo = ref({
  text: "",
  color: ""
})
const walletAddress = ref('');
const isLoggedIn = ref(false);
let unsubscribe = null

//--------------------------------------------------------- variables end -----------------------------------------------------------

//---------------------------------------------------------- functions start ----------------------------------------------------------
const getFileByName = (url, name, path, extension) => {

  return url + "/api/v1/downloadFileByName/" + name + "/" + path + "/" + extension;
}

//-------------------------------------------------------------------- Api start --------------------------------------------------------------
const { data: appData, pending, error, refresh } = useAsyncData('appData', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getApp/" + appId.value, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${yourTokenHere}`, // Uncomment and modify according to your auth token handling
      },
    })


    console.log("app data" ,  res.data);
    
    state.appdetails.name = res.data.name;
    state.appdetails.appId = res.data.id;
    state.appdetails.description = res.data.appsAppOrBookDetailsModelRelation.about;
    state.appdetails.appPrice = res.data.appsAppOrBookDetailsModelRelation.price;
    state.appdetails.version = res.data.appsVersionsModelRelation[0];
    state.appdetails.blockchainRM = res.data.appBlockchainRM;
    const fileRelation = state.appdetails.version.versionsFilesModelRelation;
    state.appdetails.images = [];
    state.appdetails.mainBanner = "";
    fileRelation.forEach((item) => {
      if (item.type == 4) {
        state.appdetails.images.push(getFileByName(fileURL, item.name, item.path, item.extension));
      }
      else if (item.type == 1) {
        state.appdetails.mainBanner = getFileByName(fileURL, item.name, item.path, item.extension);

      }
      else if (item.type == 0) {
        state.appdetails.appFileInfo = item
      }
    })
  } catch (error) {
    console.log("Error While Getting app Details", error);
  }
})
const { data: rating, pending: ratingPending, error: ratingError, refresh: ratingRefresh } = useAsyncData('ratingData', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getRatingAppById/" + appId.value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    state.appdetails.rate = res.data
  } catch (error) {
    console.log("error while Get App Rating", error);
  }
})
const { data: similarApps, pending: similarAppsPending, error: similarAppsError, refresh: similarAppsRefresh } = useAsyncData('similarApps', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAllAppsNotGame/1/5", {
      header: {
        "Content-Type": "application/json",
        // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
      },
    })
    state.cards = [];
    res.data.forEach((item, index) => {
      if (index < res.data.length) {
        let rating = item.rating / item.ratingNumber;
        if (!rating || Number.isNaN(rating)) {
          rating = 0;
        }
        rating = rating.toFixed(2);
        if (item.appsVersionsModelRelation[0] != null) {
          let image = item.appsVersionsModelRelation[0].versionsFilesModelRelation.find((x) => x.type == 1);
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
const { data: commentData, pending: commentPendin, error: commentError, refresh: commentRefresh } = useAsyncData('comment', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAppReviews/" + appId.value + "/" + state.skipReviews + "/" + state.take, {
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
    if (state.allComments.length > 4) {
      state.seeAllReviews = true;
    }
  } catch (error) {
    console.log("error while get Comments", error);
  }
})
const { data: countReviews, pending: pendingReviews, error: errorReviews, refresh: refreshCountReviews } = useAsyncData('countReviews', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/countReviews/" + appId.value, {
      header: {
        "Content-Type": "application/json",
      },
    })
    state.appdetails.reviews = parseInt(res.data);
  } catch (error) {
    console.log("error While get count of reviews", error);
  }
})
const { data: ratingForChartData, pending: pendingRatingForChart, error: errorRatingForChart, refresh: refreshRatingForChart } = useAsyncData('ratingForChart', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/getAllRatingsForApp/" + appId.value, {
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
    console.log("error", error);
  }
})
const { data: countDownloads, pending: pendingDownloads, error: errorDownloads, refresh: refreshDownloads } = useAsyncData('countDownloads', async () => {
  try {
    const res = await axios.get(baseURL + "/api/v1/countGameDownloads/" + appId.value, {
      header: {
        "Content-Type": "application/json",
      },
    })
    state.appdetails.downloads = res.data
  } catch (error) {
    console.log("erorr", error);
  }
})
const { data: dataWishList, pending: pendeingWishList, error: errorWishList, refresh: refreshWishList } = useAsyncData('wishListCheck', async () => {
  if (isLoggedIn.value == true) {
    userToken.value = await $auth.token();
    try {
      const res = await axios.get(baseURL + "/api/v1/checkAppIsBelongToUserWishList/" + appId.value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.value,
        },
      })
      addedToWishList.value = res.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  else {
    return null;
  }
})
//-------------------------------------------------------------------- Api end --------------------------------------------------------------
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
const newFunction = async () => {

}
const goToAppDetailPage = async (id) => {
  await navigateTo({
    path: "/app-details",
    query: {
      appId: id,
    },
  });
  appId.value = id;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
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
    console.log("count", res);
    return Number(res.data);
  } catch (error) {
    console.log("eerror ", error);
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
    console.log("error while get rating for eachComment", error);
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
      console.log("check", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
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

      console.log("ress", res);
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
      console.log("errro", error.config.data);
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
      console.log("update", update);
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
      console.log("error update", error);
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
    console.log("fail to Post WishList", error);
    state.snackbar.color = "error";
  }
};
//------------------------------------------------------------functions end -----------------------------------------------------------
//blockChain Functions Start
const buyApp = async () => {
  console.log("Enter Buy App");


  buyLoading.value = true;
  const account = getAccount(wagmiConfig);
  walletAddress.value = account.address;
  let web3 = new Web3(await account.connector.getProvider());

  if (walletAddress.value != undefined) {
    let DappetizeTokenContract = new web3.eth.Contract(
      contractState.dappetizeTokenAbi,
      contractState.dappetizeTokenAddress
    );
    let decimals = await DappetizeTokenContract.methods.decimals().call();
    const pow = Math.pow(10, Number(decimals));
    let price = Number(state.appdetails.appPrice) * (pow)


    let appContract = new web3.eth.Contract(
      contractState.appContractAbi,
      contractState.contractAddress
    );

    let buy = null;


    console.log(contractState.contractAddress, price.toString());

    // try {
    DappetizeTokenContract.methods
      .approve(
        contractState.contractAddress,
        price.toString()
      )
      .send({
        from: walletAddress.value,
      });
    buy = await appContract.methods
      .buy(contractState.contractAddress)
      .send({
        from: walletAddress.value,
      });

    console.log("buy app", buy.events.buyEvent.returnValues);

    buyLoading.value = false;
    userCanDownload.value = true;

    snackbar.value = true;
    snackbarInfo.value.text =
      "Tranasction Complete you can download your App";
    snackbarInfo.value.color = "success";

    // } catch (error) {
    //   snackbar.value = true;
    //   snackbarInfo.value.text =
    //     "Transaction Failed, check your DT balance or network connection";
    //   snackbarInfo.value.color = "error";
    //   buyLoading.value = false;
    //   userCanDownload.value = false;
    // }
  }


};
const checkForApp = async () => {
  const account = getAccount(modal.wagmiConfig);
  walletAddress.value = account.address;

  ;

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

      console.log("account.connector", account.connector);
      console.log("contractState.contractAddress", contractState)
      console.log("contractState.contractAddress", contractState.contractAddress)


      installAppLoading.value = true;
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
        installAppLoading.value = false;

        return true

      } else {
        hasContractOnThisNetwork.value = false;
      }
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
//blockChainFunctions End
//------------------------------------------------------------ events  start ---------------------------------------------------------

watch(() => route.query.appId, (newVal, oldVal) => {

  appId.value = newVal;
  refresh();
  similarAppsRefresh();
  ratingRefresh();
  commentRefresh();
  refreshCountReviews();
  refreshRatingForChart();
  refreshDownloads();
  refreshWishList();

}, {
  immediate: true
})
watch(() => appId.value, (newVal, oldVal) => {

  if (appId.value) {
    refresh();
    similarAppsRefresh();
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
  appId.value = route.query.appId;
  commentRefresh();
  isLoggedIn.value = await $auth.isLoggedIn();

  state.skeletonLoader = false;


  // check app has contract on this network and user buy it or not
  await checkForApp();
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




})
//------------------------------------------------------------- events end ------------------------------------------------------------
</script>

<style scoped>
@media (max-width: 600px) {
  .justify-center-sm {
    justify-content: center !important;
    justify-content: center !important;
    justify-items: center !important;
    align-items: center !important;
    text-align: center !important;
  }
}

.container {
  overflow-x: hidden;
  padding: 12px;
}

#myVideo {
  /* position: fixed; */
  right: 0;
  bottom: 0;
  min-width: 100%;
  max-height: 100%;
  z-index: -1;
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
  height: 52px !important;
  display: inline-block;
}

.cyrcle-btn-style {
  background: linear-gradient(216.64deg, #5390d9 -41.27%, #7400b8 147.09%);
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 202px;
}

.swiper-container {
  height: 450px;
  width: 100%;
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

.activeBtnColor {
  background: linear-gradient(233.29deg,
      #7400b8 -27.18%,
      #5390d9 173.14%) !important;
}

@media screen and (max-width:600px) {
  .container {
    margin-top: 2rem !important;
  }

  .responsive-br {
    display: none;
  }

  .comment-btn {
    width: 60px;
    height: 20px !important;
  }

  ;

  .write-review-btn {}

}
</style>
