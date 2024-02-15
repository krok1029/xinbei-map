import { defineStore } from "pinia";

export const useFDataStore = defineStore("fData", {
  state: () => ({ name: "", photo: "", id: "" }),
  actions: {
    setFData(value: { name: string; photo: string; id: string }) {
      this.id = value.id;
      this.name = value.name;
      this.photo = value.photo;
    },
  },
});
