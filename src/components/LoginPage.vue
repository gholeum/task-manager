<template>
  <main>
    <div class="login-space">
      <div class="intro-text">
        <h2>{{ title }}</h2>
        <p class="motivation-text">
          {{ motivationText }}
        </p>
      </div>
      <component :is="currentComponent" @change-component="toggleComponent" />
      <p>
        {{ toggleText }}
        <span class="toggle-switch" @click="toggleComponent">
          {{ toggleSwitch }}
        </span>
      </p>
    </div>
    <img src="/src/assets/mascot.png" />
  </main>
</template>

<script>
import SignIn from "./UIElements/SignIn.vue";
import SignUp from "./UIElements/SignUp.vue";

export default {
  name: "LoginPage",
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      currentComponent: "SignIn",
      title: "Добро пожаловать 👋",
      motivationText:
        "Сегодня новый день. Это твой день. Ты его формируешь. Войди, чтобы начать управлять своими проектами.",
    };
  },
  computed: {
    toggleText() {
      return this.currentComponent === "SignIn"
        ? "У вас нет аккаунта?"
        : "Уже есть аккаунт?";
    },
    toggleSwitch() {
      return this.currentComponent === "SignIn"
        ? "Зарегистрироваться"
        : "Войти";
    },
  },
  methods: {
    toggleComponent() {
      this.currentComponent =
        this.currentComponent === "SignIn" ? "SignUp" : "SignIn";
      this.title =
        this.currentComponent === "SignIn"
          ? "Добро пожаловать 👋"
          : "Создайте аккаунт";
      this.motivationText =
        this.currentComponent === "SignIn"
          ? "Сегодня новый день. Это твой день. Ты его формируешь. Войди, чтобы начать управлять своими проектами."
          : "Присоединяйтесь к нам, чтобы управлять своими проектами и достигать успеха!";
    },
  },
};
</script>

<style scoped>
main {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}

.login-space {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 32px;
}

.toggle-switch {
  color: #0284b0;
  cursor: pointer;
}

img {
  width: 35%;
  height: 100%;
  object-fit: cover;
}

.intro-text {
  width: 66%;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #313957;
}

.motivation-text {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #313957;
}

p {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #0c1421;
}
</style>
