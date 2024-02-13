<script setup lang="ts">
import { useRouter } from "vue-router";
import parseJwt from "@/util/parseJwt";
const router = useRouter();

function handleCredentialResponse(response: any) {
  const data = parseJwt(response.credential);
  window.googleAccount = data;
  router.push("/map");
  console.log(data);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "9336568270-26iggqk24vkpg5ogtspegnbguji3kgsd.apps.googleusercontent.com",
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
