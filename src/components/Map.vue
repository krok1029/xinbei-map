<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geolocationJson, calcDistance } from "@/api/map";
import { geocoding as getCoord } from "@/api/geocoding";
import { useGDataStore } from "@/store/gData";

const message = ref("");
const gData = useGDataStore();
console.log(gData.photo);

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

const paginationLocations = computed(() =>
  locations.value.filter(
    (_, index) =>
      index < currentPage.value * 5 && index >= (currentPage.value - 1) * 5
  )
);

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

  const result = await geolocationJson("tucheng.json");
  L.polygon(result).addTo(map);

  const currentLocation = await getCurrentLocation();
  L.marker(currentLocation).bindTooltip('test').addTo(map);
});

const addMarker = (lat: number, lng: number) => {
  L.marker({ lat, lng }).addTo(map);
};

const handleSearch = async () => {
  if (!message.value) return;
  const coords = await getCoord(message.value);
  if (coords) {
    const result = await calcDistance(coords);
    result.forEach((location) => addMarker(location.lat, location.lng));
    locations.value = result;
  }
};

const currentPage = ref(1);

const setMapCenter = (lat: number, lng: number) => map.panTo({ lat, lng });
</script>

<template>
  <div id="map"></div>
  <div class="search-list">
    <div class="search-bar">
      <input
        v-model="message"
        placeholder="請輸入地址"
        @keydown.enter="handleSearch"
      />
      <button @click="handleSearch">Search</button>
    </div>
    <div class="location-list">
      <div
        class="location-card"
        v-for="item in paginationLocations"
        @click="setMapCenter(item.lat, item.lng)"
      >
        <div class="name">{{ `${item.stopName} | ${item.name}` }}</div>
        <div class="distance">{{ item.distance }} km</div>
      </div>
    </div>
    <vue-awesome-paginate
      v-if="locations.length"
      :total-items="locations.length"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="currentPage"
    />
  </div>
</template>

<style scoped lang="scss">
#map {
  height: 50vh;
  width: 90vw;
}
.search-list {
  display: grid;
  .search-bar {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    input {
      flex-grow: 1;
      padding: 5px;
    }
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
}
.pagination-container {
  display: flex;
  column-gap: 10px;
  justify-content: center;
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
