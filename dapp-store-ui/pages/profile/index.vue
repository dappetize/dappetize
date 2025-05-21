<template>
  <h1 style="margin-top: 1rem">profile</h1>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "admin",
      middleware: ["auth"],
    });

    return {
      definePageMeta,
    };
  },
};
</script>

<style></style>
