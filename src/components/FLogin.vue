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
const skipLogin = () => {
  photoStore.setFbPhoto({
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  });
};
</script>
<template>
  <h3>請登入Facebook帳號</h3>

  <div class="btn-group">
    <button class="login" @click="login">登入Facebook</button>

    <button class="skip" @click="skipLogin">略過</button>
  </div>
</template>

<style scoped>
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .login {
    background-color: #4267b2;
  }
  .skip {
    background-color: #7388b2;
  }
}
</style>
