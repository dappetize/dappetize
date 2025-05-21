<!-- pages/admin.vue -->
<template>
  <div style="margin-top:10rem">
    <h1>Admin Dashboard</h1>

    {{url}}
    {{filePort}}
    <v-btn @change="$emit('childEmit')">
      click
    </v-btn>  
  </div>
</template>

<script setup>

import useStore from "~/store";
definePageMeta({
  layout: "default",
});
  const emit = defineEmits(['childEmit'])
const store=useStore();
const emit1=()=>
{
  emit('childEmit')
}

const url=store.stateConfig.baseUrl;
const filePort=store.stateConfig.fileUrl




</script>
