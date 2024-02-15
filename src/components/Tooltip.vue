<script setup lang="ts">
defineProps({
  gPhoto: String,
  fPhoto: Number,
});
</script>

<template>
  <div>
    <div>
      <img height="30px" width="30px" src="{{gPhoto}}" />
    </div>
    <div>
      <img height="30px" width="30px" src="{{fPhoto}}" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
