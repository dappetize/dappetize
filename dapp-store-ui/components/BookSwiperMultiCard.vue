<template>
  <div class="swiper-button-prev" @click="slidePrev"></div>
  <swiper 
    slides-per-view="3"
    space-between="50"
    :breakpoints="swiperOptions.breakpoints"
    class="mySwiper"
    @swiper="onSwiper"
  >
    <swiper-slide
      v-for="(cards, index) in state.cardContentsSeperated"
      :key="index"
      style="display: block; width: 400px;"
    >
    <h4 style="color: white; height: 100%; width: 100%;" class="d-flex justify-space-around mt-15 text-h4" v-if="cards.length<=0"> No items yet</h4>
  
      <v-card
      v-else
        v-for="(card, i) in cards"
        :key="i"
        style="box-shadow: none; background: transparent"
        @click="goToBookDetailsPage(card.id)"
        class="my-5"
      >
        <div style="display: flex">
          <div>
            <img
              class="card-image"
              :src="card.img"
              style="border-radius: 5px;"
            />
          </div>

          <div  style="text-align: left">
            <v-list
              three-line
              style="text-align: left; background: transparent;max-width: 100%; height: auto; overflow: hidden;"
              class="pl-3 pt-0"
            >
              <v-list-item style="display: contents">
                <div  style="font-size: 16px; color: #ffffff" class="text name-space">
                  {{ card.name }} 
                </div>
                <v-list-item-title
                  dark
                  style="font-size: 14px; color: #ffffff"
                  class="pb-2"
                >
                  {{ card.price }} DT
                </v-list-item-title>
                <v-list-item-subtitle
                  dark
                  style="font-size: 14px; color: #ffffff"
                  class="pb-2"
                >
                  {{ card.rate }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-card>
    </swiper-slide>
  </swiper>
    <div class="swiper-button-next" @click="slideNext"></div>
    <!-- Repeat the above structure for 'New Releases' and 'Deals' -->
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
//import SwiperCore, { Navigation } from 'swiper';
import { ref, reactive, onMounted, onUnmounted } from "vue";
// Import Swiper styles
// import 'swiper/swiper-bundle.css';
import '../node_modules/swiper/swiper-bundle.css';
//SwiperCore.use([Navigation]);

export default {
  props: ['cardContents', 'mainCard', 'select', 'offerCard'],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props){
    // const swiper= null;
    const swiper = ref(null);
    const swiperOptions= {
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 0,
          items:3,
        },
        430: {
          slidesPerView: 1,
          spaceBetween: 0,
          items:3,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
          items:6,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 50,
          items:9,
        },
       
      },
    };
    const state=reactive({
        cardContentsSeperated : [],
        mainCardsSperated:[],
        offerCardSeprated:[],
      })


    

  const goToBookDetailsPage = async (id) => {
   return await navigateTo  ({ path: '/book-details', query: { bookId: id } });
  };

  const onSwiper = (swiperInstance) => {
    swiper.value = swiperInstance;
  };

  const slideNext = () => {
    swiper.value.slideNext();
  };
  const test2=()=>{
    const cardContentsValue = props.cardContents;
  };


  const slidePrev = () => {
    swiper.value.slidePrev();
  };

  let interval;
        onMounted(() => {
          test2();
          setTimeout(() => {
            let seprated = props.cardContents.slice();
            let seprated2 = props.mainCard.slice();
            let offer = props.offerCard.slice();
            while (seprated.length) {
            state.cardContentsSeperated.push(seprated.splice(0, 3));
    }
    while (seprated2.length) {
      state.mainCardsSperated.push(seprated2.splice(0, 3));
    }
    while (offer.length) {
      state.offerCardSeprated.push(offer.splice(0, 3));
    }
  }, 500);

    });
  return {
    state,
    swiperOptions,
    goToBookDetailsPage,
    onSwiper,
    slideNext,
    slidePrev
  };
  },
  // mounted: async function () {
  //   setTimeout(() => {
  //     let seprated = this.cardContents.slice()
  //     let seprated2 = this.mainCard.slice();
  //     let offer = this.offerCard.slice();
  //     while (seprated.length) {
  //       this.cardContentsSeperated.push(seprated.splice(0, 3))
  //     }
  //     while (seprated2.length)
  //     {
  //       this.mainCardsSperated.push(seprated2.splice(0,3))
  //     }
  //     while (offer.length)
  //     {
  //       this.offerCardSeprated.push(offer.splice(0, 3));
  //     }
  //   }, 500)
  // },
};
</script>

<style scoped>

.swiper {
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}
.truncated-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;

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

.card-image {
  width: 100px;
  height: 130px;
  object-fit: cover;
}

/* For medium devices */
@media screen and (min-width: 600px) {
  .card-image {
    width: 110px;
    height: 150px;
  }
}

/* For large devices */
@media screen and (min-width: 1280) {
  .card-image {
    width: 120px;
    height: 170px;
  }
}
.text {
  line-height: 1.5em; /* Set the desired line height (adjust as needed) */
  height: 3em; /* Set the height to accommodate two lines (2x line-height) */
  overflow: hidden; /* Prevent extra lines from being visible */
  text-overflow: ellipsis; /* Add ellipses for overflow */
}

.swiper-button-prev,
.swiper-button-next {
  top: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  background: linear-gradient(216.64deg, #5390d9 -41.27%, #7400b8 147.09%);
  /* border: 1px solid gray; */
  border-radius: 50% !important;
  color: white;
  font-weight: 300;
  outline: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-family: swiper-icons;
  font-size: 14px;
  text-transform: none !important;
  letter-spacing: 0;
  text-transform: none;
  font-variant: initial;
  line-height: 1;
}
</style>
