import { defineStore } from "pinia";

export const useGDataStore = defineStore("gData", {
  state: () => ({ name: "", photo: "", id: "" }),
  actions: {
    setGData(value: { name: string; photo: string; id: string }) {
      this.id = value.id;
      this.name = value.name;
      this.photo = value.photo;
    },
  },
});
