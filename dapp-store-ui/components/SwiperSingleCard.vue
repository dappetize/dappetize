<template>
  <div> <!-- Single root element -->
    <v-snackbar v-model="state.snackbar" :color="state.snackbarInfo.color">
      {{ state.snackbarInfo.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="state.snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-container style="margin-top: 1.5rem;">
      <div>

        <div style="display: flex;align-items: baseline;justify-content: space-between;">
          <span style="color: #ffffff; font-size: 28px" class="font-weight-bold">
            Browse by genre
          </span>
          <div class="mr-10 text-right" style="display: flex; justify-content: end; gap: 5px" v-if="showBtn">
            <v-btn color="#615BF1" class="mr-2 mt-1" size="x-small" fab dark icon="mdi-chevron-left"
              @click="slidePrev()">
            </v-btn>
            <v-btn color="#615BF1" class="mt-1" size="x-small" fab dark icon="mdi-chevron-right" @click="slideNext()">
            </v-btn>
          </div>
        </div>
        <br />
        <swiper class="swiper" :slidesPerView="1.25" :spaceBetween="10" :breakpoints="swiperOptions.breakpoints"
          @swiper="onSwiper" v-if="cardContents">
          <swiper-slide class="swiper-slide" v-for="(card, i) in cardContents" :key="i" style="width: 200px">
            <v-card style="box-shadow: none; background-color: #1b1825" @mouseover="hover(i)" @mouseleave="unhover(i)"
              @click="goToAppDetailsPage(card.id)">
              <div class="d-flex container-of-image">
                <img class="card-image" :src="card.img" />
                <div style="position: absolute; bottom: -1px">
                  <div class="d-flex align-center container-hover-image">

                    <img class="abstract" v-bind:id="'imageId' + i" :src="state.imgSrc" />
                    <div style="position: absolute; bottom: 1.4vw; margin-left: 1vw">
                      <span style="color: #1e1e1e; font-size: 20px">
                        {{ card.categoryName }}
                      </span>
                      <v-btn color="#615BF1" class="ml-4" size="x-small" fab dark icon="mdi-chevron-right"
                        elevation="0">
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </swiper-slide>
        </swiper>
      </div>
    </v-container>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import '../node_modules/swiper/swiper-bundle.css';

export default {
  props: ['cardContents'],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const swiper = ref(null);
    const swiperOptions = {
      breakpoints: {
        425: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1920: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      },
    };
    const state = reactive({
      snackbar: false,
      snackbarInfo: {},
      hoverSrc: {},
      img: '',
      imgSrc: ref("img/Vector444.png"),
    });
    const showBtn = ref(true);
    const cards = ref([
      { id: 1, imgSrc: 'img/card1.png', categoryName: 'Category 1' },
      { id: 2, imgSrc: 'img/card2.png', categoryName: 'Category 2' },
      // Add more cards as needed
    ]);
    const goToAppDetailsPage = (id) => {
      // this.$router.push({ path: '/game-details', query: { gameId: id } })
      navigateTo({
        path: '/game-genre',
        query: {
          gameId: "id"

        }
      })
    };
    const onSwiper = (swiperInstance) => {
      swiper.value = swiperInstance;
    };
    const slideNext = () => {
      swiper.value.slideNext();
    };
    const slidePrev = () => {
      swiper.value.slidePrev();
    };
    const hover = (i) => {
      document.getElementById("imageId" + i).setAttribute("src", 'img/Vector443.png')
    };
    const unhover = (i) => {
      document.getElementById("imageId" + i).setAttribute("src", 'img/Vector444.png')
    };
    onMounted(async () => {
      if (window.innerWidth >= 1280) {
        showBtn.value = false;
      }
      else if (window.innerWidth < 1280) {
        showBtn.value = true;

      }
      window.addEventListener("resize", function () {

        if (this.window.innerWidth >= 1280) {
          showBtn.value = false;
        }
        else if (this.window.innerWidth < 1280) {
          showBtn.value = true
        }

      })
    })
    return {
      swiperOptions,
      onSwiper,
      slideNext,
      slidePrev,
      hover,
      unhover,
      state,
      showBtn,
      goToAppDetailsPage
    };
  },

}
</script>
<style scoped>
.swiper {
  width: 100%;
  height: 200px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  width: 200px !important;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100% !important;
  height: 100%;
  object-fit: cover;
}

.card-image {
  width: 200px;
  height: 230px;
  object-fit: contain;
}

.abstract {
  width: 200px;
}

.container-of-image {
  height: 15vw;
  max-height: 250px;
  min-width: 180px;
  min-height: 180px;
}

.container-hover-image {
  height: 6.7vw;
  max-height: 110px;
}

/* For medium devices */
@media screen and (max-width: 1280px) and (min-width: 960px) {

  /* .card-image {
    width: 240px;
    height: 280px;
  } */
  .container-of-image {
    width: 15vw
  }

  .container-hover-image {
    width: 16vw;
    height: 10vw;
    min-width: 200px;

  }

}

@media screen and (max-width: 959px) and (min-width: 600px) {
  .container-of-image {
    width: 15vw
  }

  .container-hover-image {
    width: 16vw;
    height: 10vw;
    min-height: 100px;
    min-width: 190px;

  }
}

@media screen and (max-width: 600px) {
  .container-hover-image {
    height: 94px;
    width: 197px;


  }
}

/* @media screen and (min-width: 600px) {
  .card-image {
    width: 220px;
    height: 250px;
  }

  .abstract {
    width: 220px;
  }
} */

/* For large devices */
</style>
