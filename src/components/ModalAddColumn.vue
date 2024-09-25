<template>
  <BaseModal :show="show" @update:show="closeModal">
    <form @submit.prevent="submitForm">
      <input
        v-model="columnTitle"
        type="text"
        placeholder="Введите название колонки"
        required
        minlength="5"
      />
      <button type="submit">Создать</button>
      <button type="button" class="cancel-button" @click="closeModal">
        Отмена
      </button>
    </form>
  </BaseModal>
</template>

<script>
import BaseModal from "./UIElements/BaseModal.vue";

export default {
  name: "ModalAddColumn",
  components: { BaseModal },
  props: {
    show: { type: Boolean, required: true },
  },
  data() {
    return { columnTitle: "" };
  },
  methods: {
    submitForm() {
      if (this.columnTitle) {
        this.$emit("create", this.columnTitle);
        this.columnTitle = "";
      }
    },
    closeModal() {
      this.$emit("close-modal");
      this.columnTitle = "";
    },
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "PT Sans", sans-serif;
  font-size: 12pt;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14pt;
}

button[type="submit"] {
  background-color: white;
  color: #0284b0;
  border: 2px solid #0284b0;
  transition: background-color 0.3s, color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0284b0;
  color: white;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: darkred;
}
</style>
