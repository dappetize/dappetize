<template>


  <div style="width: 95%;position: relative;">
    <img :src="gamecardContents.imgThumbnail"
      style="width: 100% !important;height: 233px !important;border-radius: 8px;">
    <div style="background-color: rgba(108, 108, 108, 0.85);
      position: absolute;bottom: 2%;left: 0;width: 100%;
      border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;">
      <div class="d-flex justify-space-between align-center">
        <svg style="height:61px; 
                  opacity: 1;" viewBox="0 0 98 61" fill="red" xmlns="http://www.w3.org/2000/svg">
          <path style="opacity: 1;"
            d="M0.162328 0.168635L81.1905 0.556194C92.3816 0.609722 100.065 11.8412 96.0587 22.2892L81.613 59.9584L8.71949 60.0301C4.32996 60.0345 0.755597 56.501 0.709371 52.1118L0.162328 0.168635Z"
            fill="#615BF1" />
          <path
            d="M40.0073 21.5324V38.5949H37.0659L29.4136 26.3723V38.5949H26.4722V21.5324H29.4136L37.0894 33.7785V21.5324H40.0073ZM50.0198 38.8293C49.0823 38.8293 48.2347 38.677 47.4769 38.3723C46.7269 38.0598 46.0862 37.6262 45.555 37.0715C45.0315 36.5168 44.6292 35.8645 44.3479 35.1145C44.0667 34.3645 43.9261 33.5559 43.9261 32.6887V32.2199C43.9261 31.2278 44.0706 30.3293 44.3597 29.5246C44.6487 28.7199 45.0511 28.0324 45.5667 27.4621C46.0823 26.884 46.6917 26.4426 47.3948 26.1379C48.0979 25.8332 48.8597 25.6809 49.68 25.6809C50.5862 25.6809 51.3792 25.8332 52.0589 26.1379C52.7386 26.4426 53.3011 26.8723 53.7464 27.427C54.1995 27.9738 54.5354 28.6262 54.7542 29.384C54.9808 30.1418 55.094 30.9778 55.094 31.8918V33.0988H45.2972V31.0715H52.305V30.8488C52.2894 30.341 52.1878 29.8645 52.0003 29.4192C51.8206 28.9738 51.5433 28.6145 51.1683 28.341C50.7933 28.0676 50.2933 27.9309 49.6683 27.9309C49.1995 27.9309 48.7815 28.0324 48.4144 28.2356C48.055 28.4309 47.7542 28.716 47.512 29.091C47.2698 29.466 47.0823 29.9192 46.9495 30.4504C46.8245 30.9738 46.762 31.5637 46.762 32.2199V32.6887C46.762 33.2434 46.8362 33.759 46.9847 34.2356C47.1409 34.7043 47.3675 35.1145 47.6644 35.466C47.9612 35.8176 48.3206 36.0949 48.7425 36.2981C49.1644 36.4934 49.6448 36.591 50.1839 36.591C50.8636 36.591 51.469 36.4543 52.0003 36.1809C52.5315 35.9074 52.9925 35.5207 53.3831 35.0207L54.8714 36.4621C54.5979 36.8606 54.2425 37.2434 53.805 37.6106C53.3675 37.9699 52.8323 38.2629 52.1995 38.4895C51.5745 38.716 50.8479 38.8293 50.0198 38.8293ZM61.9425 35.7824L64.8722 25.9153H66.6769L66.1847 28.8684L63.2315 38.5949H61.6144L61.9425 35.7824ZM60.2198 25.9153L62.505 35.8293L62.6925 38.5949H60.8878L57.4542 25.9153H60.2198ZM69.419 35.7121L71.6339 25.9153H74.3878L70.9659 38.5949H69.1612L69.419 35.7121ZM66.9815 25.9153L69.8761 35.6653L70.2394 38.5949H68.6222L65.6339 28.8567L65.1417 25.9153H66.9815Z"
            fill="white" />
        </svg>
        <div class="d-flex flex-column">
          <div style="font-size: 16px;font-weight: 500;color: white;">
            {{ gamecardContents.name.substr(0, 14) + (gamecardContents.name.length > 14 ? '...' : " ") }}</div>
          <div class="d-flex">
            <div style="font-size: 10px;color: white;">Rate: </div>
            <div class="d-flex">
              <v-icon style="color:rgba(255, 200, 58, 1);width: 13px;height: 13px;">mdi-star</v-icon>
              <div style="font-size: 12px;color: white;"> {{ gamecardContents.rate }}</div>
            </div>
          </div>
        </div>
        <v-btn @click="goToGameDetialPage(gamecardContents.id)"
          style="width: 68px;
      height: 30px;border-radius: 24px;background: linear-gradient(233.29deg, #7400B8 -27.18%, #5390D9 173.14%);color: white;margin-right: 0.5rem;">
          Get
        </v-btn>
      </div>
    </div>
    <div class="playbtn">
      <v-icon>mdi-play-outline </v-icon>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['gamecardContents'])

const goToGameDetialPage = (id) => {
  navigateTo({
    path: "/game-details",
    query: { gameId: id }
  })
}
</script>
<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.playbtn {
  position: absolute;
  width: 35.92px;
  height: 35.85px;
  top: 2%;
  right: 2%;
  background: rgba(255, 252, 252, 0.85);
  display: flex;
  justify-content: center;
  border-radius: 50px;
  align-items: center
}

.swiper-slide {
  text-align: center;
  font-size: 14px;
  background: transparent;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev,
.swiper-button-next {
  top: 45%;
  width: 50px;
  height: 50px;
  background: #fff !important;
  /* border: 1px solid gray; */
  border-radius: 50% !important;
  color: black;
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

<style>
.v-img__img--contain {
  object-fit: cover !important;
}
</style>