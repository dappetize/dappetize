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
        <div
          style="display: flex; gap: 30px; margin-left: 1rem"
          v-if="display.mdAndUp"
        >
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
        <v-col
          cols="12"
          v-if="!display.mdAndUp"
          style="display: flex; justify-content: center"
        >
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div
          style="
            display: flex;
            gap: 30px;
            margin-left: 1rem;
            justify-content: center;
          "
          v-if="!display.mdAndUp"
        >
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
      </v-row>
      <v-row class="mt-10" v-if="display.mdAndUp">
        <v-col cols="12" v-if="display.mdAndUp">
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div
          style="display: flex; gap: 30px; margin-left: 1rem"
          v-if="display.mdAndUp"
        >
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
        <v-col
          cols="12"
          v-if="!display.mdAndUp"
          style="display: flex; justify-content: center"
        >
          <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
        </v-col>
        <div
          style="
            display: flex;
            gap: 30px;
            margin-left: 1rem;
            justify-content: center;
          "
          v-if="!display.mdAndUp"
        >
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </div>
      </v-row>
      <v-row class="mt-15">
        <v-col
          v-for="(game, i) in state.topChartGames"
          :key="i"
          cols="6"
          md="3"
          sm="6"
          lg="3"
        >
          <div class="d-flex align-center" style="gap: 5px">
            <v-skeleton-loader
              style="width: 100px; height: 100px; border-radius: 15px"
              type="image"
            ></v-skeleton-loader>
            <div>
              <v-skeleton-loader width="150" type="text"></v-skeleton-loader>
              <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              <div class="d-flex align-center" style="gap: 8px">
                <v-skeleton-loader
                  style="border-radius: 28px"
                  type="button"
                ></v-skeleton-loader>
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
        <v-col
          v-for="(app, i) in state.appsOfTheDay"
          :key="i"
          style="position: relative"
          cols="12"
          md="3"
          sm="6"
        >
          <v-skeleton-loader type="image"></v-skeleton-loader>
          <v-skeleton-loader
            style="
              position: absolute;
              top: 70%;
              right: 30px;
              border-radius: 28px;
            "
            dark
            type="button"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row style="display: flex; align-items: center">
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-skeleton-loader
            style="width: 100%; height: 60px"
            type="image"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-skeleton-loader
            style="width: 100%; height: 60px"
            type="image"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-skeleton-loader
            style="width: 100%; height: 60px"
            type="image"
          ></v-skeleton-loader>
        </v-col>
        <v-col class="d-flex justify-center" cols="12" sm="12" md="3" lg="3">
          <v-skeleton-loader width="150px" type="text"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="3" lg="3">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(app, i) in state.suggestedAppsByFilter"
          :key="i"
          align="center"
          cols="6"
          sm="6"
          md="3"
          lg="3"
        >
          <div style="max-width: 264px">
            <div>
              <v-skeleton-loader type="image"></v-skeleton-loader>
            </div>
            <div class="d-flex justify-space-between mt-4">
              <div>
                <v-skeleton-loader
                  width="150"
                  type="sentences"
                ></v-skeleton-loader>
                <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              </div>
              <div>
                <v-skeleton-loader
                  style="border-radius: 28px"
                  type="button"
                ></v-skeleton-loader>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-15">
        <v-col class="d-flex justify-center">
          <v-skeleton-loader
            style="width: 25%; height: 50px; border-radius: 0px 13.8848px"
            type="image"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-if="!state.skeletonLoader">
      <section>
        <v-row>
          <v-col cols="12" style="position: relative">
            <div class="overlay"></div>
            <img
              class="img-suggested-game"
              :class="{ 'banner-of-subway': state.suggestedGamesIndex == 0 }"
              style=""
              :src="
                state.suggestedGames[state.suggestedGamesIndex]?.bannerImgSrc
              "
              alt=""
            />
            <div class="first-section">
              <div class="d-flex align-start justify-center flex-column">
                <div class="d-flex align-center gap-between">
                  <div class="suggesteGameText">
                    {{
                      state.suggestedGames[
                        state.suggestedGamesIndex
                      ]?.name.substr(0, 18) +
                      (state.suggestedGames[state.suggestedGamesIndex]?.name
                        .length > 14
                        ? '...'
                        : '')
                    }}
                  </div>
                  <div class="go-next-btn" @click="goToNextSuggestedGame()">
                    <v-icon class="in-btn">mdi-chevron-right</v-icon>
                  </div>
                </div>
                <div class="d-flex align-center">
                  <v-icon class="rate-btn" color="rgba(255, 200, 58, 1)"
                    >mdi-star</v-icon
                  >
                  <div class="rate-text">
                    {{ state.suggestedGames[state.suggestedGamesIndex]?.rate }}
                  </div>
                </div>
              </div>

              <div>
                <v-btn
                  class="buy-now-btn"
                  @click="
                    goToGameDetialPage(
                      state.suggestedGames[state.suggestedGamesIndex]?.id
                    )
                  "
                >
                  buy now
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>
      <section>
        <v-container style="margin: auto !important; cursor: pointer">
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(game, i) in state.suggestedGames"
              @click="changeGameForSuggestedGame(i)"
              :key="i"
              cols="12"
              md="3"
              lg="3"
              sm="6"
              class="d-flex justify-center"
              style="margin-top: 1rem !important"
            >
              <div class="d-flex align-center" style="gap: 15px">
                <div>
                  <img
                    :src="game.imgSrc"
                    style="width: 60px; height: 80px; border-radius: 10px"
                    alt=""
                  />
                </div>
                <div class="text-for-select">
                  {{ game.text }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section
        style="margin-bottom: 2rem !important; margin-top: 2rem !important"
      >
        <v-container style="margin: auto !important">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-sm-center justify-md-start justify-center"
            >
              <div
                style="
                  color: white;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: 2px;
                "
              >
                Play To Earn
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <br />
      <section>
        <div>
          <v-row>
            <v-col cols="12" style="position: relative">
              <div class="overlay1"></div>
              <img
                :src="
                  state.suggestedPlayToEarnGames[
                    state.selectedsuggestedPlayToEarnGamesIndex
                  ]?.bannerImgSrc
                "
                style="object-fit: cover"
                class="main-polygan"
              />
              <div class="first-div-in-polygan">
                <div
                  class="d-flex justify-space-between align-center inner-main-polygan"
                >
                  <div class="pegax-img">
                    <img
                      src="/img/logo.png"
                      style="width: 190px; height: 40px"
                    />
                  </div>
                  <v-btn
                    class="play-now-btn"
                    @click="
                      goToGameDetialPage(
                        state.suggestedPlayToEarnGames[
                          state.selectedsuggestedPlayToEarnGamesIndex
                        ]?.id
                      )
                    "
                  >
                    play now
                  </v-btn>
                </div>
                <br />
                <div
                  class="d-flex align-center free-best-game-box"
                  style="gap: 15px"
                >
                  <div class="game-name-polygan">
                    BEST Game
                    {{
                      state.suggestedPlayToEarnGames[
                        state.selectedsuggestedPlayToEarnGamesIndex
                      ]?.text
                    }}
                  </div>
                  <div class="type-game">FREE TO PLAY</div>
                </div>
                <br />
                <div class="d-flex align-center game-detail-with-rate">
                  <div class="p-game">
                    {{
                      state.suggestedPlayToEarnGames[
                        state.selectedsuggestedPlayToEarnGamesIndex
                      ]?.name
                    }}
                  </div>
                  <div>
                    <v-rating
                      background-color="#874FFF"
                      readonly
                      color="#874FFF"
                      size="25"
                      half-increments
                      :model-value="
                        state.suggestedPlayToEarnGames[
                          state.selectedsuggestedPlayToEarnGamesIndex
                        ]?.rate
                      "
                    ></v-rating>
                  </div>
                  <div class="d-flex align-center" style="gap: 5px">
                    <div style="" class="game-rate-in-polygan">
                      {{
                        state.suggestedPlayToEarnGames[
                          state.selectedsuggestedPlayToEarnGamesIndex
                        ]?.rate
                      }}
                    </div>
                    <v-icon color="#874FFF">mdi-information-outline</v-icon>
                  </div>
                </div>
                <div class="d-flex align-center div-wave" style="">
                  <div>
                    <img src="/img/wave.png" class="wave" />
                  </div>
                  <div class="go-next-btn" @click="getNextSuggestedEarnGame()">
                    <v-icon class="in-btn">mdi-chevron-right</v-icon>
                  </div>
                </div>
                <div>
                  <div class="about-game-text">
                    About
                    {{
                      state.suggestedPlayToEarnGames[
                        state.selectedsuggestedPlayToEarnGamesIndex
                      ]?.name
                    }}
                  </div>
                  <div>
                    <div class="gameTextForPolygan">
                      {{
                        state.suggestedPlayToEarnGames[
                          state.selectedsuggestedPlayToEarnGamesIndex
                        ]?.about
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="polygan-div">
                <v-row>
                  <v-col
                    v-for="(gameInfo, i) in state.suggestedPlayToEarnGames[
                      state.selectedsuggestedPlayToEarnGamesIndex
                    ]?.info"
                    :key="i"
                    cols="12"
                    md="3"
                    sm="6"
                    lg="3"
                    class="d-flex justify-center"
                    style="margin-top: 1rem !important"
                  >
                    <div>
                      <div class="polygan-text">
                        {{ gameInfo.categoryName }}
                      </div>
                      <div class="inder-polygan-text">{{ gameInfo.text }}</div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </div>
      </section>
      <section>
        <v-container style="margin: auto !important">
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(game, i) in state.suggestedPlayToEarnGames"
              @click="changeGameForSuggestedGameToEarn(i)"
              :key="i"
              cols="12"
              md="3"
              lg="3"
              sm="6"
              class="d-flex justify-center"
              style="margin-top: 1rem !important; cursor: pointer"
            >
              <div class="d-flex align-center" style="gap: 15px">
                <div>
                  <img
                    :src="game.imgSrc"
                    style="width: 60px; height: 80px; border-radius: 10px"
                    alt=""
                  />
                </div>
                <div class="text-for-select">
                  {{ game.text }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section>
        <SwiperSingleCard :card-contents="state.browseByGenreGames" />
      </section>
      <br />
      <br />
      <section class="section-top" v-if="display.mdAndUp">
        <v-container style="margin: auto !important">
          <v-row>
            <v-col cols="12">
              <div style="color: white; font-size: 28px; font-weight: 700">
                Spacial offers
              </div>
            </v-col>
          </v-row>
          <v-row
            style="margin-top: 2rem !important"
            class="d-flex justify-center"
          >
            <v-col cols="5">
              <img
                :src="state.specialOffersGames[0]?.img"
                style="width: 100%; height: 100%; border-radius: 8px"
                alt=""
              />
            </v-col>
            <v-col
              cols="12"
              md="2"
              style="display: flex; justify-content: center; align-items: end"
            >
              <div class="offer-card">
                <div class="header-in-v-card">
                  <p style="font-size: 20px; font-weight: 700; color: #fff">
                    GAMES
                    <br />
                    UNDER
                  </p>
                </div>
                <span
                  style="
                    font-size: 31px;
                    font-weight: 700;
                    color: #7d30d5;
                    position: relative;
                    top: -10px;
                    right: 4px;
                    text-align: center;
                  "
                  >$20</span
                >
                <div class="polyg"></div>
                <div class="footer-in-v-card">
                  <p style="color: #ffffff; font-size: 18px; font-weight: 700">
                    ENDS
                    <br />
                    12/02
                  </p>
                </div>
              </div>
            </v-col>
            <v-col cols="5">
              <img
                :src="state.specialOffersGames[1]?.img"
                style="width: 100%; height: 100%; border-radius: 8px"
                alt=""
              />
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-top">
        <v-container style="margin: auto !important">
          <v-row
            style="
              background: #39276f;
              width: 100%;
              border-radius: 5px;
              padding: 5px !important;
            "
          >
            <v-col
              md="2"
              lg="2"
              cols="12"
              class="d-flex justify-center"
              style="padding: 12px !important"
            >
              <v-btn class="remove-filter" @click="removeQueryFilter()">
                Remove Filter
              </v-btn>
            </v-col>
            <v-col
              class="d-flex justify-center align-center"
              md="2"
              lg="2"
              cols="12"
              style="padding: 5px !important"
            >
              <v-select
                style="color: white; width: 150px"
                :items="state.genreItems"
                label="Genre"
                elevation="5"
                dark
                density="comfortable"
                outlined
                v-model="genre"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex justify-center"
              md="2"
              lg="2"
              cols="12"
              style="padding: 5px !important"
            >
              <v-select
                density="comfortable"
                :items="state.systemItems"
                v-model="system"
                dense
                label="System"
                style="color: white"
                outlined
              ></v-select>
            </v-col>
            <v-col
              class="d-flex justify-center align-center"
              md="2"
              lg="2"
              cols="12"
              style="padding: 5px !important"
            >
              <v-select
                density="comfortable"
                :items="state.languageItems"
                v-model="language"
                dense
                style="color: white"
                label="Language"
                outlined
              ></v-select>
            </v-col>
            <v-col
              class="d-flex justify-center"
              style="padding: 12px !important"
              md="2"
              lg="2"
              cols="12"
            >
              <div style="color: white; font-size: 20px">
                price <v-icon style="font-size: 20px">mdi-less-than</v-icon>
                {{ ' ' + parseInt(price) }}
              </div>
            </v-col>
            <v-col md="2" lg="2" cols="12" style="padding: 12px !important">
              <v-slider
                class="chart-of-price"
                @click="filterWithPrice()"
                style="width: 100% !important"
                min="0"
                v-model="price"
                max="100"
                color="#6740E1"
                track-color="#9F84F3"
                thumb-color="#853FC5"
              ></v-slider>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-top">
        <v-container style="margin: auto !important">
          <v-row>
            <v-col
              v-for="(game, i) in state.suggestedGamesByFilter"
              :key="i"
              cols="12"
              sm="6"
              lg="4"
              md="6"
              class="d-flex justify-center"
              style="margin-top: 2rem !important"
            >
              <SwiperGameAppCard :gamecardContents="game" />
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-top">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              class="show-more-btn"
              @click="showMore()"
              v-if="state.showMoreStatus"
            >
              Show More
            </v-btn>
          </v-col>
        </v-row>
      </section>
      <section class="section-top">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              class="show-more-btn"
              @click="showLess()"
              v-if="state.showLessStatus"
            >
              Show less
            </v-btn>
          </v-col>
        </v-row>
      </section>
      <section>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <div
              style="color: white; font-size: 40px; text-align: center"
              v-if="state.noDataForShow"
            >
              There Is No Game That We Can Show You Base On You'r Filter
            </div>
          </v-col>
        </v-row>
      </section>
      <section class="section-top">
        <v-container style="margin: auto !important">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-lg-start justify-md-start justify-center align-center"
            >
              <div style="font-size: 28px; color: white">Review</div>
              <v-icon style="font-size: 30px; color: white"
                >mdi-chevron-right</v-icon
              >
            </v-col>
          </v-row>
          <v-row
            style="margin-top: 3rem !important"
            class="gc-md-16 gr-11 justify-space-between"
          >
            <v-col
              cols="12"
              md="6"
              sm="6"
              lg="6"
              class="d-flex justify-center"
              v-if="true"
            >
              <div
                style="
                  width: 100%;
                  position: relative;
                  display: flex;
                  justify-content: center;
                "
              >
                <img
                  src="/img/widget.png"
                  class="rotate ml-15 main-anime"
                  style="width: 90%; position: absolute; left: 30%; z-index: 1"
                  cover
                  v-if="true"
                />
                <img
                  src="/img/ReviewGame.png"
                  style=""
                  cover
                  class="valorant-img"
                />
              </div>
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="5"
              lg="5"
              style="
                margin-top: 1rem !important;
                display: flex;
                justify-content: center;
              "
            >
              <div
                style="
                  width: 90%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                "
              >
                <div class="d-flex align-center" style="gap: 10px">
                  <div
                    style="
                      font-size: 58px;
                      color: white;
                      align-self: flex-start;
                    "
                  >
                    Valorant
                  </div>
                  <v-rating
                    dense
                    background-color="white"
                    active-color="#2DC820"
                    empty-icon="mdi-star"
                    length="5"
                    size="25"
                    class="ml-5 valorant-rating"
                  ></v-rating>
                </div>
                <div class="valorant-text">
                  Valorant is a free-to-play first-person hero shooter developed
                  and published by Riot Games, for Microsoft Windows. First
                  teased under the codename Project A in October 2019, the game
                  began a closed beta period with limited access on April 7,
                  2020, followed by an official release on June 2, 2020.
                </div>
                <div>
                  <v-btn
                    style="
                      width: 247px;
                      height: 51px;
                      border-radius: 0px 13.88px 0px 13.88px;
                      background: linear-gradient(
                        233.29deg,
                        #00b828 -27.18%,
                        #ccff00 173.14%
                      );
                      margin-top: 1rem !important;
                      color: white;
                    "
                  >
                    Show More
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-top">
        <v-container
          v-if="state.commingsoonGames.length > 0"
          style="margin: auto !important"
        >
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-md-start justify-lg-start justify-center"
            >
              <div style="font-size: 28px; color: white">Coming Soon</div>
            </v-col>
          </v-row>
          <v-row style="margin-top: 3rem !important">
            <v-col
              cols="12"
              md="4"
              lg="4"
              sm="12"
              class="d-flex justify-center"
              v-if="display.mdAndUp"
            >
              <div style="width: 90%">
                <img
                  :src="state.commingsoonGames[0]?.img"
                  style="width: 100%; height: 480px; border-radius: 8px"
                />
                <div class="commingSoonTextGame">
                  {{ state.commingsoonGames[0]?.name }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="8" lg="8">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="4"
                  v-for="(game, i) in state.commingsoonGames"
                  style="margin-top: 1rem !important"
                  class="d-flex justify-center"
                >
                  <div style="width: 90%">
                    <img
                      :src="game.img"
                      style="width: 100%; height: 183px; border-radius: 8px"
                    />
                    <div class="commingSoonTextGame">{{ game.name }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-top">
        <div class="layer layer1"></div>
        <div class="layer layer2"></div>
        <div class="layer layer3"></div>
        <v-row class="wizard-card-style d-flex justify-space-evenly">
          <v-col
            cols="12"
            md="5"
            lg="5"
            sm="5"
            class="d-flex justify-center align-center wiz"
          >
            <img src="/public/wizard.svg" style="width: 100%; height: 80%" />
          </v-col>
          <v-col cols="12" md="5" lg="5" sm="5">
            <div style="width: 100%; height: 100%" class="wizard-box">
              <div
                class="d-flex flex-column justify-space-evenly"
                style="width: 100%; height: 100%"
              >
                <div>
                  <div
                    class="d-flex align-center justify-center justify-sm-start"
                  >
                    <img src="/img/subscriptionIcon.png" class="sub-img" />
                    <div
                      style="color: white; font-size: 45px"
                      class="sub-header"
                    >
                      Subscription
                    </div>
                  </div>
                  <div
                    style="font-size: 28px; color: white; text-align: left"
                    class="ssub-main"
                  >
                    subscribe and be the first to know about all the news,
                    promotions ,novelties
                  </div>
                </div>
                <div class="blur-box-email"></div>
                <div class="box-email">
                  <div style="padding: 15px !important; position: relative; z-index: 2;">
                    <div class="d-flex align-center" style="gap: 10px">
                      <img
                        src="/img/dontMissLogo.png"
                        style="width: 38px; height: 38px"
                      />
                      <div class="miss-text ssub-main">Dont Miss It</div>
                    </div>
                    <div>
                      <div class="email ssub-main">Email</div>
                      <div>
                        <input class="email-input" />
                      </div>
                    </div>
                  </div>
                  <div style="border-top: 4px solid rgba(77, 39, 136, 0.4)">
                    <div style="padding: 0 10px !important">
                      <div>
                        <v-checkbox
                          label="I agree to personal data processing"
                          class="ssub-main"
                          style="color: white"
                        ></v-checkbox>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-center"
                      style="padding: 0 20px 20px 20px !important"
                    >
                      <v-btn class="subscribe-btn ssub-main"> Subscribe </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>
      <section class="section-top">
        <v-container style="margin: auto !important">
          <v-row class="d-flex justify-center">
            <v-col cols="12" sm="6" md="6" lg="6" class="d-flex justify-center">
              <img
                src="/img/phone.png"
                style="width: 70%; height: 100%"
                class="phone-img"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" class="d-flex flex-column">
              <v-row>
                <v-col cols="12">
                  <img
                    src="/img/titleee.png"
                    style="width: 100%; height: 100%"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="above-footer-text">
                    Ready to get started? Download our app and sign up now
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="section-top">
                  <v-row>
                    <v-col
                      cols="6"
                      class="d-flex align-center justify-start align-center"
                    >
                      <img
                        src="/img/MobileApp.png"
                        style="width: 80%; height: 80%"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </v-container>
</template>

<script setup>
//------------------------------------imports start -------------------------------------------------------
import SwiperSingleCard from '../../components/SwiperSingleCard.vue';
import SwiperGameAppCard from '../../components/SwiperGameAppCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useDisplay } from 'vuetify';
import axios from 'axios';
import { useMainStore } from '~/store';
import auth from '~/plugins/auth';
//------------------------------------imports end --------------------------------------------------------
//------------------------------------ varaibles start ---------------------------------------------------
const { baseURL, fileURL } = useMainStore();
const display = ref(useDisplay());
const genre = ref(null);
const system = ref(null);
const language = ref(null);
const price = ref(1);
const route = useRoute();
const { $auth, $walletConnect } = useNuxtApp();
const router = useRouter();
const state = reactive({
  skeletonLoader: true,
  suggestedGames: [],
  suggestedPlayToEarnGames: [],
  browseByGenreGames: [],
  specialOffersGames: [],
  genreItems: [],
  systemItems: ['Android', 'Pc'],
  languageItems: ['English', 'Persian', 'Spanish', 'Deutch'],
  genreNameAndId: {},
  suggestedGamesByFilter: [],
  commingsoonGames: [],
  skip: 1,
  take: 2,
  takeGenre: 2,
  takeSystem: 2,
  takeGenreAndSystem: 2,
  allGameCount: 0,
  allGameCountWithGenreFilter: 0,
  allGameCountWithOsFilter: 0,
  allGameCountWithOsAndGenreFilter: 0,
  suggestedGamesIndex: 0,
  selectedsuggestedPlayToEarnGamesIndex: 0,
  showMoreStatus: true,
  showLessStatus: false,
  noDataForShow: false,
});
//------------------------------------ varables end ------------------------------------------------------

//--------------------------------------- fucntion start --------------------------------------------------

const goToNextSuggestedGame = () => {
  if (state.suggestedGamesIndex < 3) {
    state.suggestedGamesIndex++;
  } else if (state.suggestedGamesIndex >= 3) {
    state.suggestedGamesIndex = 0;
  }
};
const getNextSuggestedEarnGame = () => {
  if (state.selectedsuggestedPlayToEarnGamesIndex < 3) {
    state.selectedsuggestedPlayToEarnGamesIndex += 1;
  } else if (state.selectedsuggestedPlayToEarnGamesIndex >= 3) {
    state.selectedsuggestedPlayToEarnGamesIndex = 0;
  }
};
const changeGameForSuggestedGame = (index) => {
  state.suggestedGamesIndex = index;
};
const changeGameForSuggestedGameToEarn = (index) => {
  state.selectedsuggestedPlayToEarnGamesIndex = index;
};
const goToGameDetialPage = async (id) => {
  navigateTo({
    path: '/game-details',
    query: { gameId: id },
  });
};
const showMore = async () => {
  let genreQuery = route.query.genre;
  let systemQuery = route.query.system;
  if (genreQuery == null && systemQuery == null) {
    state.take += 2;
    await filter();
    return;
  }
  if (genreQuery != null && systemQuery == null) {
    state.takeGenre += 2;
    await filter();
    return;
  }
  if (genreQuery == null && systemQuery != null) {
    state.takeSystem += 2;
    await filter();
    return;
  }
  if (genreQuery != null && systemQuery != null) {
    state.takeGenreAndSystem += 2;
    await filter();
    return;
  }
};
const showLess = async () => {
  let genreQuery = route.query.genre;
  let systemQuery = route.query.system;
  if (genreQuery == null && systemQuery == null) {
    state.take -= 2;
    await filter();
    return;
  }
  if (genreQuery != null && systemQuery == null) {
    state.takeGenre -= 2;
    await filter();
    return;
  }
  if (genreQuery == null && systemQuery != null) {
    state.takeSystem -= 2;
    await filter();
    return;
  }
  if (genreQuery != null && systemQuery != null) {
    state.takeGenreAndSystem -= 2;
    await filter();
    return;
  }
};
//--------------------------------------- function end ----------------------------------------
//--------------------------------------Api start --------------------
const getSuggestedGames = async () => {
  try {
    const res = await axios
      .get(baseURL + '/api/v1/getMostDownloadedApps/1/50', {
        headers: {
          'Content-Type': 'application/json', // Set the content type if needed
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          const [firstRelation] = item.appsVersionsModelRelation;
          let img = firstRelation.versionsFilesModelRelation.find(
            (x) => x.type === 3
          );

          let rating = item.rating / item.ratingNumber;

          if (!rating || Number.isNaN(rating)) {
            rating = 0;
          }
          rating = rating.toFixed(2);
          try {
            if (img)
              state.suggestedGames.push({
                id: item.id,
                name: item.name,
                text: item.name,
                rate: rating,
                imgSrc:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                bannerImgSrc:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
              });
          } catch (error) {}
        });
      });
  } catch (error) {
    // this.snackbar = true
    // this.snackbarInfo.text = error
    // this.snackbarInfo.color = 'error'
  }
};
const getSuggestedPlayToEarnGames = async () => {
  try {
    const res = await axios
      .get(baseURL + '/api/v1/getPlayToEarnApps/1/8', {
        header: {
          'Content-Type': 'application/json',
          // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          const [firstRelation] = item.appsVersionsModelRelation;
          let img = firstRelation.versionsFilesModelRelation.find(
            (x) => x.type === 3
          );
          let rating = item.rating / item.ratingNumber;
          // (item.fileName)
          if (!rating || Number.isNaN(rating)) {
            rating = 0;
          }
          rating = rating.toFixed(2);
          try {
            if (img)
              state.suggestedPlayToEarnGames.push({
                id: item.id,
                name: item.name,
                text: item.name,
                about: item.about,
                info: [
                  { categoryName: 'GENRE', text: item.name },

                  { categoryName: 'PLATFORM', text: 'PC/ Mac/ Mobile' },
                  { categoryName: 'BLOCKCHAIN', text: 'Polygon' },
                  { categoryName: 'TOKENS', text: 'VIS / PGX' },
                ],
                rate: rating,
                imgSrc:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                bannerImgSrc:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
              });
          } catch (error) {
            // snackbar = true
            // snackbarInfo.text = error
            // snackbarInfo.color = 'error'
          }
        });
      });
  } catch (error) {
    // snackbar = true;
    // snackbarInfo.text = error;
    // snackbarInfo.color = 'error'
  }
};
const getBrowseByGenreGames = async () => {
  try {
    const res = await axios
      .get(baseURL + '/api/v1/getAllGenresOfGame/1/5', {
        header: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          let img = item.genresFilesModelRelation;
          state.browseByGenreGames.push({
            img:
              fileURL +
              '/api/v1/downloadFileByName/' +
              img.name +
              '/' +
              img.path +
              '/' +
              img.extension,
            categoryName: item.name,
            id: item.id,
          });
        });
      });
  } catch (error) {
    // state.snackbar = true
    // state.snackbarInfo.text = error
  }
};
const getSpecialOffersGames = async () => {
  try {
    const res = await axios
      .get(baseURL + '/api/v1/getSpecialOfferApps/1/20', {
        header: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        try {
          res.data.forEach((item) => {
            const [firstRelation] = item.appsVersionsModelRelation;
            let img = firstRelation.versionsFilesModelRelation.find(
              (x) => x.type === 1
            );
            if (img)
              state.specialOffersGames.push({
                id: item.id,
                img:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                text: item.name,
                off: item.offer,
              });
          });
        } catch (error) {
          // state.snackbar = true
          // state.snackbarInfo.text = error
          // state.snackbarInfo.color = 'error'
        }
      });
  } catch (error) {
    //   state.snackbar = true
    //   state.snackbarInfo.text = error
    //   state.snackbarInfo.color = 'error'
  }
};
const getAllGenres = async () => {
  // '/api/v1/getAllGenres/1/10'
  try {
    const res = await axios
      .get(baseURL + '/api/v1/getAllGenres/1/1000', {
        header: {
          'Content-Type': 'application/json',
          // Authorization: this.$auth.getToken('local'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        try {
          res.data.forEach((item) => {
            state.genreItems.push(item.name);
            state.genreNameAndId[item.name] = item.id;
          });
        } catch (error) {}
      });
  } catch (error) {
    // state.snackbar = true
    // state.snackbarInfo.text = error
    // state.snackbarInfo.color = 'error'
  }
};
const gamesByGenre = async () => {
  try {
    await getCountOfGamesWithGenreFilter();
    const res = await axios
      .get(
        baseURL +
          '/api/v1/getGameForGenre/' +
          state.skip +
          '/' +
          state.takeGenre +
          '/' +
          state.genreNameAndId[genre.value] +
          '/' +
          parseInt(price.value),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        state.suggestedGamesByFilter = [];
        if (state.allGameCountWithGenreFilter > 0) {
          state.noDataForShow = false;
          res.data.forEach((item) => {
            let rating = item.rating / item.ratingNumber;
            if (!rating || Number.isNaN(rating)) {
              rating = 0;
            }
            rating = rating.toFixed(2);
            const [firstRelation] = item.appsVersionsModelRelation;
            let img = firstRelation.versionsFilesModelRelation.find(
              (x) => x.type == 1
            );

            if (img)
              state.suggestedGamesByFilter.push({
                id: item.id,
                name: item.name,
                text: item.header,
                contract_address: item.contract_address,
                // appsFilesModelRelation: item.appsFilesModelRelation,
                imgThumbnail:
                  fileURL +
                  '/api/v1/downloadFileByName/' +
                  img.name +
                  '/' +
                  img.path +
                  '/' +
                  img.extension,
                videoSrc: '',
                rate: rating,
                genre: '',
                system: '',
                language: '',
              });
            if (state.allGameCountWithGenreFilter < 3) {
              state.showLessStatus = false;
              state.showMoreStatus = false;
              return;
            }
            if (
              state.allGameCountWithGenreFilter >
              state.suggestedGamesByFilter.length
            ) {
              state.showLessStatus = false;
              state.showMoreStatus = true;
              return;
            }
            if (
              state.allGameCountWithGenreFilter ==
              state.suggestedGamesByFilter.length
            ) {
              state.showLessStatus = true;
              state.showMoreStatus = false;
              return;
            }
          });
        } else {
          state.showLessStatus = false;
          state.showMoreStatus = false;
          state.noDataForShow = true;
        }
      });
  } catch (error) {
    state.snackbar = true;
    state.snackbarInfo.text = error;
    state.snackbarInfo.color = 'error';
  }
};
const getSuggestedGamesByFilter = async () => {
  try {
    await getCountOfAllGames();
    const res = await axios.get(
      baseURL +
        '/api/v1/getAllApps/' +
        state.skip +
        '/' +
        state.take +
        '/' +
        parseInt(price.value),
      {
        header: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (state.allGameCount > 0) {
      state.noDataForShow = false;
      state.suggestedGamesByFilter = [];
      res.data.forEach((item) => {
        let rating = item.rating / item.ratingNumber;
        if (!rating || Number.isNaN(rating)) {
          rating = 0;
        }
        rating = rating.toFixed(2);

        try {
          const [firstRelation] = item.appsVersionsModelRelation;
          let img = firstRelation.versionsFilesModelRelation.find(
            (x) => x.type == 3
          );
          if (img)
            state.suggestedGamesByFilter.push({
              id: item.id,
              name: item.name,
              text: item.header,
              contract_address: item.contract_address,
              imgThumbnail:
                fileURL +
                '/api/v1/downloadFileByName/' +
                img.name +
                '/' +
                img.path +
                '/' +
                img.extension,
              videoSrc: '',
              rate: rating,
              genre: '',
              system: '',
              language: '',
            });
        } catch (error) {}
      });
      if (state.allGameCount < 3) {
        state.showLessStatus = false;
        state.showMoreStatus = false;
        return;
      }
      if (state.allGameCount > state.suggestedGamesByFilter.length) {
        state.showLessStatus = false;
        state.showMoreStatus = true;
        return;
      }
      if (state.allGameCount == state.suggestedGamesByFilter.length) {
        state.showLessStatus = true;
        state.showMoreStatus = false;
        return;
      }
    } else {
      state.showLessStatus = false;
      state.showMoreStatus = false;
      state.noDataForShow = true;
    }
  } catch (error) {
    // state.snackbar = true
    // state.snackbarInfo.text = error
    // state.snackbarInfo.color = 'error'
  }
};
const gamesBySystemAndGenre = async () => {
  try {
    await getCountOfGamesWithOsAndGenre();
    state.suggestedGamesByFilter = [];
    if (state.allGameCountWithOsAndGenreFilter > 0) {
      const res = await axios.get(
        baseURL +
          '/api/v1/getGameForSystemAndGenre/' +
          state.skip +
          '/' +
          state.takeGenreAndSystem +
          '/' +
          system.value +
          '/' +
          state.genreNameAndId[genre.value] +
          '/' +
          parseInt(price.value),
        {
          header: {
            'Content-Type': 'application/json',
          },
        }
      );
      res.data.forEach((item) => {
        state.suggestedGamesByFilter = [];
        let rating = item.rating / item.ratingNumber;
        if (!rating || Number.isNaN(rating)) {
          rating = 0;
        }
        rating = rating.toFixed(2);
        const [firstRelation] = item.appsVersionsModelRelation;
        let img = firstRelation.versionsFilesModelRelation.find(
          (x) => x.type == 1
        );
        state.suggestedGamesByFilter.push({
          id: item.id,
          name: item.name,
          text: item.header,
          contract_address: item.contract_address,
          imgThumbnail:
            fileURL +
            '/api/v1/downloadFileByName/' +
            img.name +
            '/' +
            img.path +
            '/' +
            img.extension,
          rate: rating,
        });
        if (state.allGameCountWithGenreFilter < 3) {
          state.showLessStatus = false;
          state.showMoreStatus = false;
          return;
        }
        if (
          state.allGameCountWithOsAndGenreFilter >
          state.suggestedGamesByFilter.length
        ) {
          state.showLessStatus = false;
          state.showMoreStatus = true;
          return;
        }
        if (
          state.allGameCountWithOsAndGenreFilter ==
          state.suggestedGamesByFilter.length
        ) {
          state.showLessStatus = true;
          state.showMoreStatus = false;
          return;
        }
      });
    } else {
      state.showLessStatus = false;
      state.showMoreStatus = false;
      state.noDataForShow = true;
    }
  } catch (error) {}
};
const filter = async () => {
  if (genre.value == null) {
    await getSuggestedGamesByFilter();
  }
  if (genre.value != null) {
    if (system.value != null) {
      await gamesBySystemAndGenre();
    } else {
      await gamesByGenre();
    }
  } else {
    if (system.value != null) {
      gamesBySystem();
    }
  }
};
const gamesBySystem = async () => {
  try {
    if (system.value != null) {
      await getCountOfGamesWithOsFilter();
      if (state.allGameCountWithOsFilter > 0) {
        const res = await axios
          .get(
            baseURL +
              '/api/v1/getGameForOs/' +
              state.skip +
              '/' +
              state.takeSystem +
              '/' +
              system.value +
              '/' +
              parseInt(price.value),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            state.suggestedGamesByFilter = [];
            res.data.forEach((item) => {
              let rating = item.rating / item.ratingNumber;
              if (!rating || Number.isNaN(rating)) {
                rating = 0;
              }
              rating = rating.toFixed(2);
              let versionsFilesModelRelation =
                item.appsVersionsModelRelation[0].versionsFilesModelRelation;

              let img = versionsFilesModelRelation.find((x) => x.type == 1);
              if (img)
                state.suggestedGamesByFilter.push({
                  id: item.id,
                  name: item.name,
                  text: item.header,
                  contract_address: item.contract_address,
                  // appsFilesModelRelation: item.appsFilesModelRelation,
                  imgThumbnail:
                    fileURL +
                    '/api/v1/downloadFileByName/' +
                    img.name +
                    '/' +
                    img.path +
                    '/' +
                    img.extension,
                  videoSrc: '',
                  rate: rating,
                  genre: '',
                  system: '',
                  language: '',
                });
              if (state.allGameCountWithOsFilter < 3) {
                state.showLessStatus = false;
                state.showMoreStatus = false;
                return;
              }
              if (
                state.allGameCountWithOsFilter >
                state.suggestedGamesByFilter.length
              ) {
                state.showLessStatus = false;
                state.showMoreStatus = true;
                return;
              }
              if (
                state.allGameCountWithOsFilter ==
                state.suggestedGamesByFilter.length
              ) {
                state.showLessStatus = true;
                state.showMoreStatus = false;
                return;
              }
            });
          });
      }
    }
  } catch (error) {}
};
const getCommingsoonApps = async () => {
  try {
    const res = await axios.get(baseURL + '/api/v1/getCommingsoonApps/1/6', {
      header: {
        'Content-Type': 'application/json',
      },
    });

    res.data.forEach((item) => {
      const [firstRelation] = item.appsVersionsModelRelation;
      let img = firstRelation.versionsFilesModelRelation.find(
        (x) => x.type === 1
      );
      if (img)
        state.commingsoonGames.push({
          img:
            fileURL +
            '/api/v1/downloadFileByName/' +
            img.name +
            '/' +
            img.path +
            '/' +
            img.extension,
          name: item.name,
        });
    });
  } catch (error) {}
};

const getCountOfAllGames = async () => {
  try {
    const res = await axios.get(
      baseURL + '/api/v1/getCountOfAllGamesWithoutFilter',
      {
        header: {
          'Content-Type': 'application/json',
        },
      }
    );
    state.allGameCount = res.data.countOfAllGame;
  } catch (error) {}
};
const getCountOfGamesWithGenreFilter = async () => {
  //  /api/countOfGameWithGenreFilter/:id/:price

  try {
    const res = await axios.get(
      baseURL +
        '/api/v1/countOfGameWithGenreFilter/' +
        state.genreNameAndId[genre.value] +
        '/' +
        parseInt(price.value),
      {
        header: {
          'Content-Type': 'application/json',
        },
      }
    );
    state.allGameCountWithGenreFilter = res.data;
  } catch (error) {}
};
const getCountOfGamesWithOsFilter = async () => {
  try {
    const res = await axios.get(
      baseURL +
        '/api/v1/getCounOfGameForOs/' +
        system.value +
        '/' +
        parseInt(price.value),
      {
        header: {
          'Content-Type': 'application/json',
        },
      }
    );
    state.allGameCountWithOsFilter = res.data;
  } catch (error) {}
};
const getCountOfGamesWithOsAndGenre = async () => {
  try {
    const res = await axios.get(
      baseURL +
        '/api/v1/getCountOfAllGameWithSystemAndGenreFilter/' +
        state.genreNameAndId[genre.value] +
        '/' +
        system.value +
        '/' +
        parseInt(price.value),
      {
        header: {
          'Content-Type': 'application/json',
        },
      }
    );
    state.allGameCountWithOsAndGenreFilter = res.data;
  } catch (error) {}
};
//--------------------------------------------Api end --------------------------------

//-------------------------------event start ----------------------------------------------
watch(genre, async (newValue, oldValue) => {
  let querySystem = route.query.system;
  let queryPrice = route.query.price;
  if (querySystem == null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { genre: genre.value },
    });
    await filter();
    return;
  }
  if (querySystem == null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { genre: genre.value, take: take },
    });
    await filter();
    return;
  }
  if (querySystem != null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { genre: genre.value, system: querySystem },
    });
    await filter();
    return;
  }
  if (querySystem != null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { genre: genre.value, system: querySystem, take: take },
    });
    await filter();
    return;
  }
  if (queryPrice != null && querySystem == null) {
    router.push({
      path: '/games',
      query: { genre: genre.value, price: queryPrice },
    });
    await filter();
    return;
  }
  if (querySystem != null && queryPrice != null) {
    router.push({
      path: '/games',
      query: { genre: genre.value, system: querySystem, price: queryPrice },
    });
    await filter();
    return;
  }
  if (queryPrice != null && querySystem != null) {
    router.push({
      path: '/games',
      query: {
        genre: genre.value,
        system: querySystem,
        price: queryPrice,
        take: take,
      },
    });
    await filter();
    return;
  }
  if (queryPrice != null && querySystem == null) {
    router.push({
      path: '/games',
      query: { genre: genre.value, price: queryPrice, take: take },
    });
    await filter();
    return;
  }
});
watch(system, async (newValue, oldValue) => {
  let queryGenre = route.query.genre;
  let queryPrice = route.query.price;
  if (queryGenre == null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { system: system.value },
    });
    await filter();
    return;
  }
  if (queryGenre != null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { system: system.value, genre: queryGenre },
    });
    await filter();
    return;
  }
  if (queryGenre == null && queryPrice != null) {
    router.push({
      path: '/games',
      query: { system: system.value, price: queryPrice },
    });
    await filter();
    return;
  }
  if (queryGenre == null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { system: system.value, take: take },
    });
    await filter();
    return;
  }
  if (queryGenre == null && queryPrice != null) {
    router.push({
      path: '/games',
      query: { system: system.value, price: queryPrice, take: take },
    });
    await filter();
    return;
  }
  if (queryGenre != null && queryPrice != null) {
    router.push({
      path: '/games',
      query: { system: system.value, prcie: queryPrice, take: take },
    });
    await filter();
    return;
  }
  if (queryGenre != null && queryPrice == null) {
    router.push({
      path: '/games',
      query: { system: system.value, genre: queryGenre, take: take },
    });
    await filter();
    return;
  }
});
const filterWithPrice = async () => {
  let genreQuery = route.query.genre;
  let querySystem = route.query.system;
  if (querySystem == null && genreQuery == null) {
    router.push({
      path: '/games',
      query: { price: parseInt(price.value) },
    });
    await filter();
    return;
  }
  if (genreQuery != null && querySystem == null) {
    router.push({
      path: '/games',
      query: { genre: genreQuery, price: parseInt(price.value) },
    });
    await filter();
    return;
  }
  if (querySystem != null && genreQuery == null) {
    router.push({
      path: '/games',
      query: { price: parseInt(price.value), system: querySystem },
    });
    await filter();
    return;
  }
  if (querySystem != null && genreQuery != null) {
    router.push({
      path: '/games',
      query: {
        price: parseInt(price.value),
        genre: genreQuery,
        system: querySystem,
      },
    });
    await filter();
    return;
  }
};
const filterWithQuery = async () => {
  let take = parseInt(route.query.take);
  let priceQuery = route.query.price;
  let genreQuery = route.query.genre;
  let systemQuery = route.query.system;
  price.value = priceQuery ? priceQuery : 1;
  genre.value = genreQuery ? genreQuery : null;
  system.value = systemQuery ? systemQuery : null;

  if (take != null && genre.value == null && system.value == null) {
    state.take = take ? take : 2;
    await getSuggestedGamesByFilter();
    return;
  }
  if (take != null && genre.value != null && system.value == null) {
    state.takeGenre = take ? take : 2;
    state.takeSystem = take ? take : 2;
    state.takeGenreAndSystem = take ? take : 2;
    await filter();
    return;
  }
  if (take != null && system.value != null && genre.value == null) {
    state.takeGenre = take ? take : 2;
    state.takeSystem = take ? take : 2;
    state.takeGenreAndSystem = take ? take : 2;
    await filter();
    return;
  }
  if (take != null && genre.value != null && system.value != null) {
    state.takeGenre = take ? take : 2;
    state.takeSystem = take ? take : 2;
    state.takeGenreAndSystem = take ? take : 2;
    await filter();
    return;
  }
  if (take == null && genre.value == null && system.value == null) {
    state.takeGenre = take ? take : 2;
    state.takeSystem = take ? take : 2;
    state.takeGenreAndSystem = take ? take : 2;
    await getSuggestedGamesByFilter();
    return;
  }
};
const removeQueryFilter = async () => {
  try {
    genre.value = null;
    system.value = null;
    price.value = 1;
    state.take = 2;
    state.takeGenre = 2;
    state.takeSystem = 2;
    state.takeGenreAndSystem = 2;
    await filter();
    return await navigateTo({ path: '/games', query: {}, replace: true });
  } catch (error) {}
};

onMounted(async () => {
  await getSuggestedGames();
  await getSuggestedPlayToEarnGames();
  await getBrowseByGenreGames();
  await getSpecialOffersGames();
  await getAllGenres();
  //  await filter();
  await getCommingsoonApps();
  await filterWithQuery();
  state.skeletonLoader = false;
});
//--------------------------------------event end --------------------------------------------
</script>

<style scoped>
* {
  padding: 0 !important;
  margin: 0 !important;
}

.banner-of-subway {
  object-fit: cover;
}

.above-footer-text {
  font-size: 36px;
  color: white;
}

.section-top {
  margin-top: 3rem !important;
}

.email-input {
  background-color: rgba(136, 91, 214, 1);
  width: 100%;
  height: 48px;
  border-radius: 8px;
  outline: none;
  color: #fff;
  padding: 10px !important;
}

.chart-of-price :deep(.v-input__control) {
  margin-left: 10px !important;
}

@media screen and (max-width: 599px) {
  .wiz {
    display: none !important;
  }

  .main-anime {
    left: 10% !important;
    width: 80% !important;
  }

  .phone-img {
    width: 40% !important;
  }

  .above-footer-text {
    font-size: 20px;
    color: white;
    text-align: center;
    padding: 0px 4px !important;
  }
}

.valorant-text {
  font-size: 28px;
  font-weight: 400;
  color: white;
  text-align: left;
}

.subscribe-btn {
  width: 183px;
  height: 51px;
  border-radius: 0px 13.88px 0px 13.88px;
  color: white;
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
}

.miss-text {
  font-size: 24px;
  font-weight: 500;
  line-height: 56px;
  color: white;
}

.box-email {
  background-color: rgba(90, 47, 164, 1);
  border-radius: 20px;
  width: 100%;
  position: relative;
  box-shadow: 0px 9.15926px 100.752px rgba(0, 0, 0, 0.55);
}

.blur-box-email {
  position: absolute;
  height: 9%;
  width: 100%;
  background: radial-gradient(
    64.67% 78.25% at 16.3% 83.33%,
    rgba(218, 191, 255, 0.8) 0%,
    rgba(135, 79, 255, 0.8) 100%
  );
  opacity: 0.5;
  box-shadow: 0px 0px 271.068px #9764ff;
  filter: blur(156.45px);
  z-index: 1;
}

.aggrement {
  color: rgba(83, 49, 131, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
}

.email {
  color: rgba(83, 49, 131, 1);
  font-size: 28px;
  font-weight: 700;
  z-index: 1;
  position: relative;
  margin-bottom: 8px !important;
}

.layer {
  position: absolute;
  height: clamp(410px, 38vw, 865px);
  background-size: cover !important; /* Ensure images cover the entire section */
  background-position: center !important;
}

.layer1 {
  width: 137.5%;
  left: -42px;
  background: url('/img/black-background-with-smoke-spotlight.jpg');
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

.layer2 {
  width: 100%;
  background: url('texture.svg');
  mix-blend-mode: overlay;
  opacity: 1;
}
.layer3 {
  right: 0;
  width: 50%;
  background: radial-gradient(
      64.67% 78.25% at 16.3% 83.33%,
      rgba(218, 191, 255, 1) 0%,
      rgba(135, 79, 255, 1) 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  opacity: 0.5;
  box-shadow: 0px 0px 435.876px #9764ff;
  filter: blur(251.571px);
}

.valorant-img {
  width: 80%;
  position: relative;
  z-index: 2;
}

.commingSoonTextGame {
  font-size: 18px;
  color: white;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

.rotate {
  animation: rotation 6s infinite linear;
}

.show-more-btn {
  width: 247px;
  height: 51px;

  padding: 14px 70px 14px 70px;

  border-radius: 0px 13.88px 0px 13.88px;
  opacity: 0px;
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  color: white;
  font-size: 18px;
  font-weight: 500 !important;
  font-family: 'roboto';
}

.div-wave {
  gap: 100px;
}

.game-detail-with-rate {
  gap: 25px;
}

.about-game-text {
  font-size: 28px;
  font-weight: 400;
  color: white;
}

.gameTextForPolygan {
  font-size: 24px;
  color: white;
  font-weight: 400;
}

.game-rate-in-polygan {
  color: white;
  font-size: 24px;
}

.pegax-img {
  padding: 16px;
  border-radius: 8px;
  width: 224px;
  height: 61px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-game {
  font-size: 28px;
  font-weight: 800;
  color: white;
}

.game-name-polygan {
  font-size: 28px;
  font-family: roboto;
  color: white;
}

.type-game {
  font-size: 24px;
  font-weight: 600;
  color: rgba(135, 79, 255, 1);
  font-family: roboto;
}

.polygan-div {
  position: absolute;
  bottom: 20%;
  width: 90%;
  left: 5%;
}

.overlay {
  position: absolute;
  display: block;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  cursor: pointer;
}

.polygan-text {
  font-size: 24px;
  font-weight: 500;
  color: white;
  text-align: center;
}

.inder-polygan-text {
  color: #ffffff;
  border-top: 3px solid rgba(135, 79, 255, 1);
  font-size: 24px;
  font-weight: 400;
  text-align: center;
}

.first-div-in-polygan {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 80%;
}

.overlay1 {
  position: absolute;
  display: block;
  height: 99.3%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);

  cursor: pointer;
}

.gap-between {
  gap: 20px;
}

.img-suggested-game {
  width: 100%;
  height: 468px;
}

.first-section {
  position: absolute;
  top: 29%;
  left: 15%;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.suggesteGameText {
  font-family: 'goldmanR';
  font-weight: 400;
  font-size: 39px;
  color: white;
}

.rate-text {
  font-weight: 700;
  color: white;
  font-size: 24px;
}

.rate-btn {
  font-size: 30px;
}

.buy-now-btn {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  width: 250px;
  height: 52px;
  border-radius: 0px 13.88px 0px 13.88px;

  color: white;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.05em;
  font-family: 'goldmanR';
}

.remove-filter {
  color: white;
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  border-radius: 0px 13.88px 0px 13.88px;
  font-size: 13px;
  width: 143px;
}

.play-now-btn {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  width: 250px;
  height: 52px;
  border-radius: 0px 13.88px 0px 13.88px;
  opacity: 0px;
  color: white;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.05em;
  font-family: 'goldmanR';
}

.go-next-btn {
  width: 36px;
  height: 36px;
  background-color: rgba(97, 91, 241, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 80px;
  cursor: pointer;
}

.text-for-select {
  width: 148px;
  font-size: 16px;
  font-family: inriaSans;
  color: white;
}

.main-polygan {
  width: 100%;
  height: 773px;
}

@media screen and (max-width: 571px) {
  .suggesteGameText {
    font-size: 20px !important;
    font-family: 'goldmanR';
    font-weight: 400;
  }

  .go-next-btn {
    width: 26px;
    height: 26px;
    background-color: rgba(97, 91, 241, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 80px;
    cursor: pointer;
  }

  .in-btn {
    font-size: 20px;
  }

  .rate-text {
    font-weight: 700;
    color: white;
    font-size: 18px;
    font-family: 'inriaSans';
  }

  .rate-btn {
    font-size: 30px;
  }

  .buy-now-btn {
    background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
    width: 150px;
    height: 52px;
    border-radius: 0px 13.88px 0px 13.88px;
    color: white;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.05em;
    font-family: 'goldman';
  }

  .img-suggested-game {
    width: 100%;
    height: 320px;
  }

  .gap-between {
    gap: 13px;
  }
}

.offer-card {
  background: linear-gradient(180deg, #7400b8 0.99%, #615bf1 100%);
  height: 100%;
  width: 80%;
  border-radius: 5px;
  text-align: center;
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 28vw;
}

.polyg::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  height: 95px;
  background: #fff;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: rotate(180deg);
  z-index: -1;
}

@media screen and (max-width: 1280px) and (min-width: 959px) {
  .offer-card {
    min-height: 28vw !important;
  }
  .ssub-main {
    font-size: 24px !important;
  }
  .ssub-main {
    font-size: 14px !important;
  }
  .sub-header {
    font-size: 30px !important;
  }
  .sub-img {
    width: 50px;
    height: 30px;
  }
}

@media screen and (min-width: 1920px) {
  .sub-header {
    font-size: 45px !important;
  }
}

@media screen and (max-width: 959px) {
  .polygan-div {
    position: absolute;
    bottom: 10%;
    width: 90%;
    left: 5%;
  }

  .game-name-polygan {
    font-size: 20px;
    font-family: roboto;
    color: white;
  }

  .type-game {
    font-size: 19px;
    font-weight: 600;
    color: rgba(135, 79, 255, 1);
    font-family: roboto;
  }

  .p-game {
    font-size: 23px;
    font-weight: 800;
    color: white;
  }

  .game-rate-in-polygan {
    color: white;
    font-size: 20px;
  }
  .ssub-main {
    font-size: 14px !important;
  }
  .sub-header {
    font-size: 25px !important;
  }
  .sub-img {
    width: 30px;
    height: 20px;
  }
}

@media screen and (max-width: 744px) {
  .main-polygan {
    width: 100%;
    height: 673px;
  }

  .game-detail-with-rate {
    gap: 15px;
  }

  .ssub-main {
    font-size: 14px !important;
  }
  .sub-header {
    font-size: 25px !important;
  }

  .wave {
    width: 300px;
  }

  .sub-img {
    width: 24px !important;
    height: 24px !important;
  }

  .play-now-btn {
    background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
    width: 250px;
    height: 52px;
    border-radius: 0px 13.88px 0px 13.88px;
    opacity: 0px;
    color: white;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.05em;
    font-family: 'goldmanR';
  }

  .first-div-in-polygan {
    position: absolute;
    top: 3%;
    left: 10%;
    width: 80%;
  }

  .game-name-polygan {
    font-size: 20px;
    font-family: roboto;
    color: white;
  }

  .type-game {
    font-size: 19px;
    font-weight: 600;
    color: rgba(135, 79, 255, 1);
    font-family: roboto;
  }

  .p-game {
    font-size: 18px;
    font-weight: 800;
    color: white;
  }
}

@media screen and (max-width: 650px) {
  .inner-main-polygan {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px;
  }

  .game-detail-with-rate {
    gap: 15px;
    flex-direction: column;
  }

  .free-best-game-box {
    flex-direction: column;
  }

  .valorant-text {
    font-size: 16px;
    color: white;
    text-align: left;
    font-weight: 400;
  }

  .pegax-img {
    padding: 16px;
    border-radius: 8px;
    width: 250px;
    height: 61px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .polygan-div {
    position: absolute;
    bottom: 5%;
    width: 90%;
    left: 5%;
  }

  .first-div-in-polygan {
    position: absolute;
    top: 3%;
    left: 10%;
    width: 80%;
  }

  .div-wave {
    gap: 10px;
    flex-direction: column;
    margin-bottom: 12px !important;
  }

  .main-polygan {
    width: 100%;
    height: 930px;
  }
}

@media screen and (max-width: 600px) {
  .main-polygan {
    width: 100%;
    height: 973px;
  }

  .polygan-div {
    position: absolute;
    bottom: 1%;
    width: 90%;
    left: 5%;
  }

  .gameTextForPolygan {
    font-size: 18px;
  }

  .wave {
    width: 250px;
  }

  .commingSoonTextGame {
    font-size: 18px;
    color: white;
  }

  .valorant-img {
    width: 50%;
    position: relative;
    z-index: 2;
  }
}

@media screen and (max-width: 521px) {
  .main-polygan {
    width: 100%;
    height: 950px;
  }

  .polygan-div {
    position: absolute;
    bottom: 4%;
    width: 90%;
    left: 5%;
  }

  .wave {
    width: 180px;
  }

  .polygan-text {
    font-size: 20px;
    font-weight: 500;
    color: white;
    text-align: center;
  }

  .inder-polygan-text {
    color: #ffffff;
    border-top: 3px solid rgba(135, 79, 255, 1);
    font-size: 20px;
    font-weight: 400;
    text-align: center;
  }

  .about-game-text {
    font-size: 18px;
    font-weight: 400;
    color: white;
  }

  .p-game {
    font-size: 18px;
    font-weight: 800;
    color: white;
  }

  .game-rate-in-polygan {
    color: white;
    font-size: 18px;
  }

  .game-detail-with-rate {
    gap: 13px;
  }

  .type-game {
    font-size: 18px;
    font-weight: 600;
    color: rgba(135, 79, 255, 1);
    font-family: roboto;
  }

  .game-name-polygan {
    font-size: 18px;
    font-family: roboto;
    color: white;
  }

  /* .div-wave {
    
  } */
}

@media screen and (max-width: 380px) {
  .main-polygan {
    width: 100%;
    height: 990px;
  }

  .p-game {
    font-size: 16px;
    font-weight: 800;
    color: white;
  }

  .polygan-div {
    position: absolute;
    bottom: 4ch;
    width: 90%;
    left: 5%;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .ssub-main {
    font-size: 16px !important;
  }
  .sub-header {
    font-size: 35px !important;
  }
  .sub-img {
    width: 57px;
    height: 39.63px;
  } 
}

@media screen and (max-width: 815px) {
  .subscribe-btn {
    height: 35px !important;
  }
}

@media screen and (max-width: 877px) {
  .wizard-box {
    padding: 15px !important;
  }

  .email-input {
    height: 35px !important;
  }
}
</style>
<style>
.v-select .v-field .v-text-field__prefix,
.v-select .v-field .v-text-field__suffix,
.v-select .v-field .v-field__input,
.v-select .v-field.v-field {
  background-color: #a91fff36 !important;
}

.v-label {
  align-items: center;
  color: inherit;
  display: inline-flex;
  font-size: 13px !important;
  letter-spacing: 0.009375em;
  min-width: 0;
  opacity: var(--v-medium-emphasis-opacity);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 877px) {
  .v-label {
    align-items: center;
    color: inherit;
    display: inline-flex;
    font-size: 14px !important;
    letter-spacing: 0.009375em;
    min-width: 0;
    opacity: var(--v-medium-emphasis-opacity);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.valorant-rating .mdi-star {
  text-shadow: 0px 0px 14px;
}
</style>
