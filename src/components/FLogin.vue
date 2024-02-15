<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFDataStore } from "@/store/fData";
import { FB_APP_ID } from "@/const";

const router = useRouter();
const { setFData } = useFDataStore();

function statusChangeCallback(response) {
  if (response.status === "connected") {
    testAPI();
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: FB_APP_ID,
    xfbml: true,
    version: "v19.0",
  });
};

function testAPI() {
  let photo = "";
  let name = "";
  let id = "";
  FB.api("/me/picture?redirect=false", function (response) {
    console.log("picture: ", response);
    photo = response.data.url;
  });
  FB.api("/me", function (response) {
    console.log("response: ", response);
    console.log("Successful login for: " + response.name);
    name = response.name;
    id = response.id;
  });
  setFData({ name, photo, id });
  router.push("/map");
}
onMounted(() => {
  FB.Event.subscribe("auth.statusChange", checkLoginState);
});
</script>
<template>
  <!-- <p id="profile"></p> -->

  <div
    class="fb-login-button"
    data-max-rows="1"
    data-size="large"
    data-button-type="continue_with"
    data-use-continue-as="true"
  ></div>

  <div id="status"></div>
</template>

<style scoped></style>
