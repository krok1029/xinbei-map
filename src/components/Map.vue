<script setup lang="ts">
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geolocationJson } from "@/api/map";

onMounted(async () => {
  const map = L.map("map").setView([24.993955, 121.504603], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude: latit, longitude: longit } = pos.coords;
    L.marker([latit, longit]).addTo(map);
  });

  const result = await geolocationJson("tucheng.json");
  L.polygon(result).addTo(map);
  
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 50vh;
  width: 50vw;
}
</style>
