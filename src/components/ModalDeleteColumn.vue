<template>
  <BaseModal :show="show" @update:show="hideModal">
    <div class="confirm">
      <h5 class="confirm-text">
        Вы уверены, что хотите удалить выбранную колонку?
      </h5>
      <div class="buttons">
        <button class="refuse-button" @click="hideModal">Отмена</button>
        <button class="confirm-button" @click="confirmDelete">Удалить</button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "./UIElements/BaseModal.vue";

export default {
  name: "ModalDeleteColumn",
  components: { BaseModal },
  props: {
    show: { type: Boolean, default: false },
    columnId: { type: [String, Number], required: true },
  },
  emits: ["delete-column"],
  methods: {
    hideModal() {
      this.$emit("update:show", false);
    },
    confirmDelete() {
      this.$emit("delete-column", this.columnId);
      this.hideModal();
    },
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

button {
  padding: 10px 20px;
  font-size: 14pt;
  border-radius: 10px;
  cursor: pointer;
}

.refuse-button {
  background-color: white;
  color: #0284b0;
  border: 2px solid #0284b0;
  transition: background-color 0.3s, color 0.3s;
}

.refuse-button:hover {
  background-color: #0284b0;
  color: white;
}

.confirm-button {
  background-color: #f44336;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: darkred;
}

.confirm-text {
  font-size: 14pt;
  color: black;
  text-align: center;
  margin: 0px 0px 10px 0px;
}

.confirm {
  display: block;
}
</style>
