<template>
  <div class="modal">
    <div class="modal__container">
      <a href="#" class="close-modal">✖</a> 
      <form>
        <input type="text" id="title-task" name="title" placeholder="Введите заголовок задачи"/>
        <textarea id="description-task" name="description" placeholder="Введите описание задачи"></textarea>
        <input type="date" name="date" placeholder="Выберите дату"/>
        <button type="submit">Отправить</button>
        <button type="button" class="cancel-button">Отмена</button> 
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theModal'
}
</script>

<style>
.modal {
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
    font-family: 'PT Sans', sans-serif;
    font-size: 12pt;
  }
  
  textarea {
    resize: vertical; 
  }
  
  button[type="submit"] {
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
  
  button[type="submit"]:hover {
    background-color: #0284B0;
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
    background-color: #F44336;
    color: white;
    font-family: 'PT Sans', sans-serif;
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