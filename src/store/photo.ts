import { defineStore } from "pinia";

export const usePhotoStore = defineStore("photo", {
  state: () => ({ gPhoto: "", fPhoto: "" }),
  actions: {
    setGooglePhoto(value: { photo: string }) {
      this.gPhoto = value.photo;
    },
    setFbPhoto(value: { photo: string }) {
      this.fPhoto = value.photo;
    },
  },
});
