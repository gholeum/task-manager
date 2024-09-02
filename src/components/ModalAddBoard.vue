<template>
  <BaseModal :show="show" @update:show="closeModalAddBoard">
    <form @submit.prevent="submitForm">
      <input
        v-model="boardData.name"
        type="text"
        placeholder="Название"
        required
        minlength="5"
      />
      <textarea
        v-model="boardData.description"
        placeholder="Описание"
        required
        minlength="5"
      ></textarea>
      <div class="buttons">
        <button type="submit">Создать</button>
        <button type="button" class="cancel-button" @click="closeModalAddBoard">
          Отмена
        </button>
      </div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </BaseModal>
</template>

<script>
import BaseModal from "./UIElements/BaseModal.vue";
import axios from "axios";

export default {
  name: "modalAddBoard",
  components: { BaseModal },
  props: {
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      boardData: {
        name: "",
        description: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    closeModalAddBoard() {
      this.$emit("update:show", false);
      this.resetForm();
    },
    async submitForm() {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/user/${userId}/boards`,
          { formData: this.boardData },
          { headers: { "X-Base-Auth": token } }
        );

        if (response.status === 201) {
          this.$emit("board-created");
          this.closeModalAddBoard();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = error.response.data.cause;
        } else {
          this.errorMessage = "Произошла ошибка при создании доски.";
        }
      }
    },
    resetForm() {
      this.boardData.name = "";
      this.boardData.description = "";
      this.errorMessage = "";
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
