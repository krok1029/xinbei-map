<script setup lang="ts">
import parseJwt from "@/util/parseJwt";
import { useRouter } from "vue-router";
import { useGDataStore } from "@/store/gData";
import { GOOGLE_CLIENT_ID } from "@/const";

const router = useRouter();
const { setGData } = useGDataStore();

function handleCredentialResponse(response: any) {
  const data = parseJwt(response.credential);
  setGData({ name: data.name, photo: data.picture, id: data.sub });
  console.log(data);
  router.push("/facebook");
}

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
  <div id="buttonDiv"></div>
</template>

<style scoped></style>
