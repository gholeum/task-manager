<template>
  <div class="header__container">
    <h1 class="header__title">Таск-менеджер</h1>
    <div class="header__option">
      <div class="header__user-icon">
        <i class="bi bi-person-fill"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style scoped>
template {
  margin-top: 10px;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.header__title {
  margin: 0;
  padding: 10px 0;
  color: #02315e;
}

.header__option {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header__user-icon {
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
