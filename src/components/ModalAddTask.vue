<template>
  <BaseModal :show="show" @update:show="closeModalAddTask">
    <form @submit.prevent="submitForm">
      <input
        v-model="task.title"
        type="text"
        placeholder="Введите заголовок задачи"
        required
        minlength="5"
      />
      <textarea
        v-model="task.description"
        placeholder="Введите описание задачи"
        required
        minlength="5"
      ></textarea>
      <input v-model="task.date" type="date" />
      <button type="submit">Создать задачу</button>
      <button type="button" class="cancel-button" @click="closeModalAddTask">
        Отмена
      </button>
    </form>
  </BaseModal>
</template>

<script>
import BaseModal from "./UIElements/BaseModal.vue";

export default {
  name: "modalAddTask",
  components: { BaseModal },
  props: {
    show: { type: Boolean, default: false },
    columnId: { type: String, required: true },
  },
  data() {
    return { task: { title: "", description: "", date: "" } };
  },
  methods: {
    closeModalAddTask() {
      this.$emit("update:show", false);
    },
    submitForm() {
      this.task.columnId = this.columnId;
      this.$emit("create", this.task);
      this.resetTask();
    },
    resetTask() {
      this.task = { title: "", description: "", date: "" };
      this.closeModalAddTask();
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

input[type="text"],
input[type="date"],
textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "PT Sans", sans-serif;
  font-size: 12pt;
}

textarea {
  resize: vertical;
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
  background-color: #f44336;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: darkred;
}
</style>
