<template>
  <div>
    <v-card style="box-shadow: none; background: transparent">
      <div style="display: flex">
        <div style="align-items: center; display: flex">
          <img :src="cardContents.img" style="width: 100px;height: 100px; border-radius: 15px;" />
        </div>

        <div style="text-align: left">
          <v-list
            three-line
            style="text-align: left; background: transparent"
            class="pt-0 pl-2"
          >
            <div class="title-text">
              {{ cardContents.name }}
            </div>
            <div class="subTitle-1">
              {{ cardContents.text }}
            </div>
            <div class="d-md-flex align-center pt-3">
              <div>
                <v-btn rounded class="get-btn-style"> Get </v-btn>
              </div>

              <div class="subTitle-2 pt-2 pt-md-0" color="#ffffff">
                {{ cardContents.price }}
              </div>
            </div>
          </v-list>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
// import { Navigation } from 'swiper'

// import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

// import 'swiper/swiper-bundle.css'

// SwiperCore.use([Navigation])

import { Swiper, SwiperSlide } from 'swiper/vue';
//import SwiperCore, { Navigation } from 'swiper';
import { ref, reactive, onMounted, onUnmounted } from "vue";
// Import Swiper styles
// import 'swiper/swiper-bundle.css';
//import '../node_modules/swiper/swiper-bundle.css';
//SwiperCore.use([Navigation]);


export default {
  props: ['cardContents'],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props){
    const swiper = ref(null);
    const swiperOptions= {
    swiperOptions: {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 50,
        },

        769: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    },
  };
  const goToAppDetailsPage=()=>{
    this.$router.push({ path: '/app-details' })

  };

  },
 
}
</script>
<style scoped>
.title-text {
  font-style: normal;
  font-weight: 500;
  font-size: 17px;

  color: #ffffff;
}
.subTitle-1 {
 
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  /* identical to box height */

  color: #a5a5a5;
}
.subTitle-2 {

  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  padding-left: 8px;
  /* identical to box height */

  color: #a5a5a5;
}
.get-btn-style {
  background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
  color: #ffffff;
  padding: 8px 24px !important;
}
</style>
