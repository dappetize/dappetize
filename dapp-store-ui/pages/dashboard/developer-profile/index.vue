<template class="back">
  <div class="container-profile">
    <v-container class="container">
      <v-row>
        <div class="blob">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 310 350"
          >
            <path
              d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"
            />
          </svg>
        </div>
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12" 
          style="
            position: relative;
            top: 15px;
            display: flex;
            justify-content: center;
          "
        >
          <div class="main-container">
            <img  src="/image/developerAvatar.png" class="avatar" />
            <VueFileAgent
              ref="vueFileAgent"
              :theme="'list'"
              :multiple="true"
              :deletable="true"
              :meta="true"
              :accept="'image/*,.zip'"
              :maxSize="'10MB'"
              :maxFiles="14"
              :errorText="{
                type: 'Invalid file type. Only images or zip Allowed',
                size: 'Files should not exceed 10MB in size',
              }"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
              @delete="fileDeleted($event)"
              v-model="fileRecords"
            >
            </VueFileAgent>

            <p class="display-name"> {{ displayName }}!</p>
            <v-btn class="action-profile">Change Your Avatar</v-btn>
            <v-btn class="action-profile" @click="showModal = true">Change Your Name</v-btn>

            <v-btn class="action-profile" @click.prevent="goBack">Back to Dashboard</v-btn>
            <!-- Simple modal using Vue's v-if -->
            <div v-if="showModal" class="modal">
              <div class="modal-content">
                <h4>Change Name</h4>
                <input v-model="inputName" placeholder="Enter new name" />
                <div class="d-flex justify-space-around">
                  <button @click="updateName">Confirm</button>
                <button @click="showModal = false">Close</button>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {ref,reactive} from 'vue';

export default {
    setup(){
      

      definePageMeta({
  layout:'custom',
  middleware: ["auth"],
});
     let avatar=ref('true');
     let displayName=ref('hddh');
     let fileRecords=reactive([]);
     let showModal = ref(false);
     let inputName =ref('');
     let fileRecordsForUpload=reactive('');
    const updateName=()=> {
      displayName.value = inputName.value
      showModal.value = false 
    };
    const deleteUploadedFile= (fileRecord)=> {
      // Using the default uploader. You may use another uploader instead.
      // $refs.vueFileAgent.deleteUpload(
      //   uploadUrl,
      //   uploadHeaders,
      //   fileRecord
      // )
    };
    const fileDeleted= (fileRecord)=> {
      var i = fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        fileRecordsForUpload.splice(i, 1)
      } else {
        deleteUploadedFile(fileRecord)
      }
    };
     const filesSelected = (fileRecordsNewlySelected)=>{
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      )

      if (validFileRecords.length > 0) {
        // Take the last valid file record
        let lastValidFile = validFileRecords[validFileRecords.length - 1]

        // Set avatar to the last valid file's URL
        avatar.value = lastValidFile.urlResized

        // Reset fileRecords to only contain the last valid file
        fileRecords = [lastValidFile]
      }
     };

    const onBeforeDelete=  (fileRecord)=> {
      var i = fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        fileRecordsForUpload.splice(i, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord) // will trigger 'delete' event
        }
      }
    };
   const goBack=()=> {
      // this.$router.push({ path: '/dashboard-new/developer-list-view' })
    };
  return{
    inputName,
    showModal,
    fileRecords,
    fileRecordsForUpload,
    deleteUploadedFile,
    updateName,
    filesSelected,
    onBeforeDelete,
    fileDeleted,
    goBack,
  }

}
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:700');

@media only screen and (max-width: 1270px) {
  .main-container {
    width: 348px;
    min-height: 502px;
  }
  .avatar {
    width: 110px;
  }
}
@media only screen and (max-width: 960px) {
  .main-container {
    width: 348px;
    min-height: 502px;
  }
  .action-profile :deep(.v-btn__content) {
    white-space: wrap
  }
}
@media only screen and (max-width: 550px) {
  .main-container {
    width: 70% !important;
    min-height: 502px;
  }
  .action-profile :deep(.v-btn__content) {
    white-space: wrap
  }
  .action-profile{
    font-size: 12px !important;
  }
}
@media only screen and (max-width: 760px){
  .action-profile:deep(.v-btn__content) {
    white-space: wrap;
    
  }
  .action-profile{
    font-size: 12px !important;
  }
}
.blob {
  position: absolute;
  top: 0;
  left: 0;
  fill: #538fd9a6;

  width: 20vmax;
  /* z-index: -1; */
  animation: move 50s ease-in-out infinite;
  transform-origin: 50% 50%;
}
@keyframes move {
  0% {
    transform: scale(1) translate(10px, -30px);
  }
  38% {
    transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
  }
  40% {
    transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
  }
  78% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }
  80% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }
  100% {
    transform: scale(1) translate(10px, -30px);
  }
}
.container-profile{
  background: radial-gradient( circle, rgba(116, 0, 184, 0.49343487394957986) 0%, rgba(116, 0, 184, 1) 100% );
  height: 100vh;
}


.main-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 30%;
  min-height: 150%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
  /* z-index: 10; */
  color: whitesmoke;
  margin: 0 !important;
  
}
.main-container :deep(.vue-file-agent.file-input-wrapper) {
  opacity: 0 !important;
  width: 60%;
  height: 50px;
  position: absolute !important;
  top: 51% !important;
  right: 70px !important;
  z-index: 2;
}
.main-container :deep(.grid-block-wrapper .grid-block .file-preview) {
  display: none;
}
.main-container :deep(canvas) {
  width: 120px;
  height: 120px;
  position: relative;
}
.avatar {
  width: 35%;
  /* height: 120px; */
  border-radius: 100px;
  margin: 0;
}
.v-btn {
  width: 60% !important;
  height: 50px !important;
  font-size: 15px;
  color: white;
  border-radius: 50px;
  background: rgb(116, 0, 184);
  background: linear-gradient(
    90deg,
    rgba(116, 0, 184, 1) 0%,
    rgba(83, 144, 217, 1) 100%
  );
  text-transform: none;
  font-weight: bolder;
}
.display-name {
  font-size: 20px;
}
.modal{
  background-color: #312351;
}
.modal-content{
  background-color: #312351;
}
.modal:deep(input) {
  color: white;
}
</style>