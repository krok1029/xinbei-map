<script setup lang="ts">
import parseJwt from "@/util/parseJwt";
import { useRouter } from "vue-router";
import { usePhotoStore } from "@/store/photo";
import { GOOGLE_CLIENT_ID } from "@/const";

const router = useRouter();
const photoStore = usePhotoStore();

function handleCredentialResponse(response: any) {
  const data = parseJwt(response.credential);
  photoStore.setGooglePhoto({ photo: data.picture });
}

photoStore.$subscribe((_, state) => {
  if (state.gPhoto) {
    router.push("/facebook");
  }
});

window.onload = function () {
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
    theme: "outline",
    size: "large",
  });
  google.accounts.id.prompt();
};
</script>

<template>
  <h3>請登入Google帳號</h3>
  <div id="buttonDiv"></div>
</template>

<style scoped></style>
@/store/photo
