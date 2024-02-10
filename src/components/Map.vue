<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geolocationJson, calcDistance } from "@/api/map";
import { geocoding as getCoord } from "@/api/geocoding";

const message = ref("");

const locations = ref<
  Array<{
    id: number;
    name: string;
    stopName: string;
    lng: number;
    lat: number;
    distance: number;
  }>
>([]);

const getCurrentLocation = async () => {
  return new Promise<{ lat: number; lng: number }>((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      resolve({ lat, lng });
    });
  });
};

let map: L.Map;

onMounted(async () => {
  map = L.map("map").setView([24.973714, 121.445266], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const currentLocation = await getCurrentLocation();
  L.marker(currentLocation).addTo(map);

  const result = await geolocationJson("tucheng.json");
  L.polygon(result).addTo(map);
});

const handleOnEnter = async () => {
  if (!message.value) return;
  const coords = await getCoord(message.value);
  if (coords) {
    const result = await calcDistance(coords);
    result.forEach((location) => addMarker(location.lat, location.lng));
  }
};

const onClickHandler = (page: number) => {
  console.log(page);
};

const currentPage = ref(1);

const addMarker = (lat: number, lng: number) => {
  L.marker({ lat, lng }).addTo(map);
};
</script>

<template>
  <div id="map"></div>
  <div class="search_list">
    <p>Message is: {{ message }}</p>
    <input
      v-model="message"
      placeholder="請輸入地址"
      @keydown.enter="handleOnEnter"
    />
    <div class="location-list">
      <div
        class="location-card"
        v-for="item in locations"
        @click="setMapCenter(item.lat, item.lng)"
      >
        <div class="name">{{ `${item.stopName} | ${item.name}` }}</div>
        <div class="distance">{{ item.distance }} km</div>
      </div>
    </div>
    <vue-awesome-paginate
      :total-items="50"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style scoped lang="scss">
#map {
  height: 50vh;
}
.location-list {
  margin-top: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  .location-card {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 8px;
    border: 1px solid #aaa;
    .name {
      text-align: start;
    }
    .distance {
      text-align: end;
    }
  }
}
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
