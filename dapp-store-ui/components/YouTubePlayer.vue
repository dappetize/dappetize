<template>
    <div>
        <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
        <button @click="playVideo">play</button>
    </div>

</template>

<script>

import Vue from 'vue'
import VueYoutube from 'vue-youtube'
 
Vue.use(VueYoutube)

Vue.config.productionTip = false
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA'
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      console.log('\o/ we are watching!!!')
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  }
}
</script>