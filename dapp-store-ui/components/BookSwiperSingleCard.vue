<template>
  <div class="swiper-button-prev" @click="slidePrev"></div>
  <swiper
    class="swiper"
    :slides-per-view="1"
    :space-between="10"
    :breakpoints="swiperOptions.breakpoints"
    @swiper="onSwiper"
  >
  <h4 style="color: white; height: 100%; width: 100%;" class="d-flex justify-space-around mt-15 text-h4" v-if="cardContents.length<=0"> No items yet</h4>
    <swiper-slide v-else
      v-for="(card, i) in cardContents"
      :key="i"
      class="swiper-slide"
    >
      <v-card 
        class="mx-auto"
        style="box-shadow: none; background-color: #1b1825"
        @click="goToBookDetailsPage(card.id)"
      >
        <img class="card-image" :src="card.img" />
        <div style="text-align: left; padding-top: 5px; width: 160px;">
          <span style="font-size: 14px; color: #ffffff">{{ card.name }}</span>
        </div>
        <div style="text-align: left; padding-top: 5px; width: 160px;">
          <span style="font-size: 14px; color: #ffffff">{{ "$" + card.price }}</span>
        </div>
      </v-card>
    </swiper-slide>
  </swiper>
    <div class="swiper-button-next" @click="slideNext"></div>
</template>

<script>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
// import '../swiper/swiper-bundle.css';
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
          slidesPerView: 1,
          spaceBetween: 10,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1920: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      },
    };

    const goToBookDetailsPage = async (id) => {
     
      return await navigateTo ({ path: '/book-details', query: { bookId: id } });
    };
    const test2=()=>{
    const cardContentsValue = props.cardContents;
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
    onMounted(() => {
          console.log('swiper multi4444');
          test2();

    });
    return {
      swiperOptions,
      goToBookDetailsPage,
      onSwiper,
      slideNext,
      slidePrev,
    };
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  min-height: 338px;
  max-height: 365px;
}

/* :deep() .swiper-wrapper {
  justify-content: center;
} */

.swiper-slide {
  text-align: center;
  font-size: 14px;
  background: transparent;
  width: 200px !important;
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
  width: 160px;
  height: 240px;
  object-fit: cover;
}

/* For medium devices */
@media screen and (min-width: 600px) {
  .card-image {
    width: 180px;
    height: 270px;
  }
  .no-items {
    height: 270px;
  }
}

/* For large devices */
@media screen and (min-width: 1280) {
  .card-image {
    width: 200px;
    height: 300px;
  }
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

.swiper-button-prev:after{
  margin-right: 2px !important;
}
.swiper-button-next:after{
  margin-left: 2px !important;
}

</style>
