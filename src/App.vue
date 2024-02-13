<script setup lang="ts">
import Map from "./components/Map.vue";

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
function handleCredentialResponse(response: any) {
  const data = parseJwt(response.credential);
  window.googleAccount = data;
  console.log(data);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "9336568270-26iggqk24vkpg5ogtspegnbguji3kgsd.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
</script>

<template>
  <div id="buttonDiv"></div>
  <Map></Map>
</template>

<style scoped></style>
