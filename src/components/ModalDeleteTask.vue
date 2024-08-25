<template>
  <div class="delete-confirm" v-if="show">
    <div class="modal__container">
      <div class="confirm">
        <h5 class="confirm-text">
          Вы уверены, что хотите удалить выбранную задачу?
        </h5>
        <div class="buttons">
          <button class="refuse-button" @click="hideModal">Отмена</button>
          <button class="confirm-button" @click="confirmDelete">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalDeleteTask",
  props: {
    show: { type: Boolean, default: false },
    taskId: { type: [String, Number], required: true },
  },
  emits: ["delete-task"],
  methods: {
    hideModal() {
      this.$emit("update:show", false);
    },
    confirmDelete() {
      this.$emit("delete-task", this.taskId);
      this.hideModal();
    },
  },
};
</script>

<style scoped>
.delete-confirm {
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
  flex-direction: column;
  gap: 5px;
}

.refuse-button {
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

.refuse-button:hover {
  background-color: #0284b0;
  color: white;
}

.confirm-button {
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
