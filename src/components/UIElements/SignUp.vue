<template>
  <form @submit.prevent="handleSubmit">
    <label class="name">
      <p>Имя</p>
      <input
        type="text"
        v-model="name"
        placeholder="Введите ваше имя"
        minlength="5"
        required
      />
    </label>
    <label class="email">
      <p>Почта</p>
      <input
        type="email"
        v-model="email"
        placeholder="example@email.com"
        required
      />
    </label>
    <label class="input-password">
      <p>Пароль</p>
      <input
        type="password"
        v-model="password"
        placeholder="Пароль должен содержать минимум 5 символов"
        minlength="5"
        required
      />
    </label>
    <label class="input-password">
      <p>Повторите пароль</p>
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Повторите ваш пароль"
        minlength="5"
        required
      />
    </label>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Пароли не совпадают!";
        return;
      }

      try {
        const response = await axios.put(
          "https://todo-list.edu-playground.ru/api/v1/auth/signup",
          {
            formData: {
              name: this.name,
              email: this.email,
              password: this.password,
              confirm_password: this.confirmPassword,
            },
          }
        );

        if (response.status === 200) {
          await this.loginUser();
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.cause;
        } else {
          this.errorMessage = "Произошла ошибка. Попробуйте снова.";
        }
      }
    },
    async loginUser() {
      try {
        const response = await axios.post(
          "https://todo-list.edu-playground.ru/api/v1/auth/signin",
          {
            formData: {
              email: this.email,
              password: this.password,
            },
          }
        );

        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          this.$router.push("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = error.response.data.cause; // Ошибка при входе
        } else {
          this.errorMessage = "Произошла ошибка. Попробуйте снова."; // Обработка других ошибок
        }
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  width: 66%;
  flex-direction: column;
  color: black;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "PT Sans", sans-serif;
  font-size: 12pt;
  width: 94%;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: white;
  color: #0284b0;
  font-family: "PT Sans", sans-serif;
  font-size: 14pt;
  border: 2px solid #0284b0;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #0284b0;
  color: white;
}

.error-message {
  color: red;
}
</style>
