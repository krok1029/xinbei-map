<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePhotoStore } from "@/store/photo";

const router = useRouter();
const photoStore = usePhotoStore();

photoStore.$subscribe((_, state) => {
  if (state.fPhoto) {
    router.push("/map");
  }
});

const getPhoto = async () => {
  await FB.api("/me/picture?redirect=false", (response) => {
    const photo = response.data.url;
    photoStore.setFbPhoto({ photo });
  });
};

const login = () => {
  FB.login((response) => {
    if (response.status === "connected") {
      getPhoto();
    }
  });
};
</script>
<template>
  <h3>請登入Facebook帳號</h3>

  <button @click="login">登入Facebook</button>
</template>

<style scoped>
button {
  background-color: #4267b2;
}
</style>
