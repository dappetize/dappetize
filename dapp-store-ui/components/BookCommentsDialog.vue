<template>
    <div>
      <v-card style="max-width: 700px">
        <v-toolbar>
          <img
            :src="app.mainBanner"
            class="ml-4"
            style="border-radius: 20%; width: 50px"
          />
          <!-- <v-img src="../../assets/images/adobe.png" style="border-radius: 20%;" /> -->
          <v-toolbar-title class="pl-2">
            {{ app.name }}
          </v-toolbar-title>
  
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="closeModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
  
        <v-card-title>
          Reviews are public and include your account and device info
        </v-card-title>
        <v-card-text>
          Everyone can see your Google Account name and photo, and the type of
          device associated with your review. Developers can also see your country
          and device information (such as language, model, and OS version) and may
          use this information to respond to you. Past edits are visible to users
          and the app developer unless you delete your review.
        </v-card-text>
        <br />
        <div style="text-align: center">
          <v-rating
          v-model="rateValue"
            hover
            density="comfortable"
            color="#01875f"
            size="x-large"
            :readonly="state.rateStatus.rated"
          ></v-rating>
          <v-text-field
            variant="solo"
            style="width: 95%; margin: auto"
            label="Describe your experience (optional)"
            v-model="commentText"
          ></v-text-field>
        </div>
        <v-btn
          class="ma-4"
          @click="postReviewAndRate(),closeModal()"
          >submit</v-btn
        >
      </v-card>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useMainStore } from "~/store";
  export default {
    props: {
      app: {
        type: Object,
      },
    },
    setup(
      props,
      context
    ) //props and context the props is for data who comming from parent component
    // and context is for emit when i want send data to parant componet via child component
    {
      const { app } = props;
      const userToken=ref(null);
      const closeModal = () => {
        context.emit("close", false);
      };
      const {
        baseURL,
        fileURL,
        gatewayWS,
        wsPort,
        setWebsocketClient,
        getWebsocketClient,
      } = useMainStore();
      const rateValue = ref(1);
      const commentText = ref("");
      const { $auth } = useNuxtApp();
      const state = reactive({
      rateStatus: {
      }
    })
      const detail = () => {
      };
      const postComment = () => {
        context.emit("postComment", commentText.value);
      };
      const postRate = async () => {
      userToken.value = await $auth.token();
      try {
        const rate = await axios.post(baseURL + "/api/v1/postRating", 
        {
          version_id: app.version.id,
          type_rating: 1,
          value: rateValue.value,
          user_id: "",
        },
          {
              headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + userToken.value
              },
        })
        return rate;
      } catch (error) {
        console.log("error while post Rate",error);
      }
    }
    const postReview=async (value)=>{
      userToken.value = await $auth.token();
      try {
        const review=await axios.post(baseURL+"/api/v1/postReview",{
            book_id: app.BookId,
            comment: commentText.value,
            user_id: "",
            author: "",
            rating_id:value
        },{
          headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + userToken.value
              },
        })
        return await review.data;
        //context.emit("postComment","hello");
      } catch (error) {
        console.log("error while post review",error);
      }
    }
    const postReviewAndRate = async () => {
      if(state.rateStatus.rated==false)
      {
        let rateData= await postRate();
      if(rateData.status==200)
      {
     let data= await postReview(rateData.data.id);
     context.emit('addComment',data)
      } 
      }
      else{
      let data= await postReview(state.rateStatus.id);
      context.emit('addComment',data)
      }


    }
      const checkUserRatingForBook=async(versionId)=>{
        userToken.value= await $auth.token()
        try {
          const res=await axios.get(baseURL+"/api/v1/checkUserRatingForApp/"+versionId,{
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken.value
          }
          })
          if(res.data==false)
          {
            state.rateStatus.rated=false;
          }
          else{
            rateValue.value=res.data.value;
            state.rateStatus.rated=res.data.rated;
            state.rateStatus.id=res.data.id;
          }
        } catch (error) {
         console.log(error); 
        }
      };
      onMounted(async()=>{
        await checkUserRatingForBook(app.version.id);
      })
      return {
        app,
        state,
        closeModal,
        postRate,
        rateValue,
        commentText,
        postComment,
        postReviewAndRate,
      };
    },
  };
  </script>
  
  <style></style>
  