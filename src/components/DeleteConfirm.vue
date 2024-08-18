<template>
  <div class="delete-confirm">
    <div class="modal__container">
        <div class="confirm">
          <h5 class="confirm-text">Вы уверены, что хотите удалить выбранную задачу?</h5>
          <div class="buttons">
            <button class="refuse-button">Отмена</button> 
            <button class="confirm-button">Удалить</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deleteConfirm'
}
</script>

<style>
.delete-confirm {
  display: none;
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

.refuse-button {
  padding: 10px 20px;
  background-color: white;
  color: #0284B0;
  font-family: 'PT Sans', sans-serif;
  font-size: 14pt;
  border: 2px solid #0284B0;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.refuse-button:hover {
  background-color: #0284B0;
  color: white;
}

.confirm-button {
  padding: 10px 20px;
  background-color: #F44336;
  color: white;
  font-family: 'PT Sans', sans-serif;
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
  margin-bottom: 10px;
}

.confirm {
  display: block;
}
</style>