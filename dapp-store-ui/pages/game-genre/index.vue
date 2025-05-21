<template>
    <v-container>
      <!-- <v-row>
        <v-col cols="12" >
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
      </v-row>  -->
      <v-row>
        
        <v-col cols="12" md="3" sm="6" v-for="(game, index) in state.games" :key="index">
            <div class="d-flex flex-column games">
                <div ><img class="games-image" :src="game.imgSrc" /></div>
                <div class="d-flex flex-column container-deatail">
                <v-span class="game">Name: {{ game.name }}</v-span>
                <v-span class="game">Rate: {{ game.rating }}</v-span>
                <v-span class="game">downloads: {{ game.downloadNumber }}</v-span>
              </div>
            </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="d-flex justify-center">
          <v-btn class="d-flex justify-center btn-imp" v-if="showMoreButton" @click="showMore">show more</v-btn>
        </v-col>
      </v-row>
      <!-- <v-btn @click="getAppsOfGenre()">test</v-btn> -->
      <v-btn @click="test2">test2</v-btn>
    </v-container>
  </template>
    
    <script>
    import {ref,reactive,onMounted,onUnmounted,computed} from "vue";
    import {genre} from './meta';
    import { useRoute } from 'vue-router'
    import { useMainStore } from "~/store";
    import axios from "axios";
    
    export default {
      setup(){
        const {
      baseURL,
      fileURL,
      gatewayWS,
      wsPort,
      setWebsocketClient,
      getWebsocketClient,
    } = useMainStore();
    //    let games=reactive(genre);
    // let games = [];
    const state=reactive({
        games:[],
    })
      // const games=reactive([]);
      const route = useRoute()
    //    let gamesToShow =  reactive(games.slice(0, 4));
        let showMoreButton= ref(true);
        // let gamesPerLoad= ref(4);
     
        const showMore = () => {
  // get the current length of the gamesToShow array
  let currentLength = gamesToShow.length;
  // get the next four items from the games array, starting from the current length
  let nextFour = games.slice(currentLength, currentLength + 4);
  // push the next four items to the gamesToShow array
  gamesToShow.push(...nextFour);
//   var test = async ()=>{
//   }

  // check if there are more items left in the games array
  if (currentLength + 4 >= games.length) {
    // if not, hide the show more button
    showMoreButton.value = false;
  };

  
};
const test2 = () => {
  console.log('test2');
}
let getAppsOfGenre = async () => {
      try {

        const res = await axios
          .get(baseURL + "/api/v1/getAppsOfGenre/" + route.query.id, {
            header: {
              "Content-Type": "application/json",
            },
          })
        // games = res.data
        res.data.forEach(element => {
            const [firstRelation] = element.appsVersionsModelRelation;
              let img = firstRelation.versionsFilesModelRelation.find(
                (x) => x.type === 3
              );
            state.games.push({
                name:element.name,
                rating: element.rating/ element.ratingNumber,
                downloadNumber: element.downloadNumber,
                imgSrc:
                      fileURL +
                      "/api/v1/downloadFileByName/" +
                      img.name +
                      "/" +
                      img.path +
                      "/" +
                      img.extension,
            })
        });
        } catch (error) {
      }
    };
    //   mounted() {
    //     this.showMore();
    //   },
    onMounted(() => {
        getAppsOfGenre()
    //   getSuggestedGamesByFilter();
    //   getSuggestedPlayToEarnGames(), nextsuggestedPlayToEarnGame();
    //   getSuggestedGames();
    //   getSpecialOffersGames();
    //   getCommingsoonApps();
    //   getBrowseByGenreGames();
    //   getAllGenres();
    //   state.skeletonLoader = false;
    });
    return{
        state,
        // gamesToShow,
        showMoreButton,
        // gamesPerLoad,
        showMore,
        getAppsOfGenre,
        // test,
        test2
    }
    }
    }
    </script>
    
    <style scoped>
    .btn-imp{
      background: linear-gradient(233.29deg, #7400b8 -27.18%, #5390d9 173.14%);
      border-radius: 0px 13.8848px;
      position: relative;
      color: #ffffff;
     
  }
  @media (max-width: 767px) {
      .v-col {
        width: 50% !important;
      }
    }
    @media (min-width: 768px) {
      .v-col {
        width: 25% !important;
      }
    }
    @media (max-width: 576px) {
      .v-col {
        width: 100% !important;
      }
    }
    @media (min-width: 577px) {
      .v-col {
        width: 50% !important;
      }
    }
    .games-image{
      width: 80%;
    }
    .container-deatail{
      color: white;
    }
    </style>