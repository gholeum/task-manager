<template>
  <div class="modal" v-if="show">
    <div class="modal__container">
      <a href="#" class="close-modal" @click="closeModal">✖</a>
      <form @submit.prevent="submitForm">
        <input
          v-model="columnTitle"
          type="text"
          placeholder="Введите название колонки"
        />
        <button type="submit">Создать</button>
        <button type="button" class="cancel-button" @click="closeModal">
          Отмена
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalAddColumn",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      columnTitle: "",
    };
  },
  methods: {
    submitForm() {
      if (this.columnTitle) {
        this.$emit("create-column", this.columnTitle);
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
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 33%);
  backdrop-filter: blur(15px);
}

.modal__container {
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 430px;
}

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

button[type="submit"] {
  padding: 10px 20px;
  background-color: white;
  color: #0284b0;
  font-family: "PT Sans", sans-serif;
  font-size: 14pt;
  border: 2px solid #0284b0;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0284b0;
  color: white;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  color: black;
  font-size: 16pt;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  font-family: "PT Sans", sans-serif;
  font-size: 14pt;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: darkred;
}
</style>
