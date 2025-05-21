<!-- pages/index.vue -->
<template>
  <div style="margin-top: 10rem; color: navy">
   
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {
    var name = "faraz";
    const router = useRouter();
    onMounted(async () => {
      router.push({
        path: "/games",
      });
    });
    return {
      // definePageMeta,
      name,
    };
  },
};
</script>
