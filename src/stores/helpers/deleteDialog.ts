import { defineStore } from "pinia";

export const useDeleteDialog = defineStore("deleteDialog", {
  state: () => ({
    openModal: false,
    idToDelete: 0,
    value: "",
  }),
  getters: {
    getDrawer: (state) => state.openModal,
  },
  actions: {
    openDialog(id:number, value: string) {
      this.value = value;
      this.idToDelete = id;
      this.openModal = true;
    },
    closeDialog() {
      this.openModal = true;
    },
  },
});
