vue
<template>
  <div class="under-header__container">
    <div class="title">
      <div
        v-if="currentPage !== 'boards'"
        class="back-arrow"
        title="Вернуться к списку досок"
        @click="goBack"
      >
        <i class="bi bi-arrow-left"></i>
      </div>
      <h2 class="under-header__title">{{ currentPageTitle }}</h2>
    </div>
    <thePlus :title="currentPlusTitle" @click="openThePlus" />
  </div>
</template>

<script>
import thePlus from "./UIElements/ThePlus.vue";

export default {
  name: "underHeader",
  components: {
    thePlus,
  },
  props: {
    currentPage: {
      type: String,
      required: true,
    },
    boardName: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentPageTitle() {
      return this.currentPage === "boards" ? "Доски" : this.boardName;
    },
    currentPlusTitle() {
      return this.currentPage === "boards"
        ? "Добавить доску"
        : "Добавить колонку";
    },
  },
  methods: {
    openThePlus() {
      this.$emit(
        this.currentPage === "boards" ? "open-board-modal" : "open-column-modal"
      );
    },
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.under-header__container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.under-header__title {
  margin: 0;
  padding: 10px 0;
  color: #02315e;
}

.back-arrow {
  cursor: pointer;
  margin-right: 10px;
  font-size: 1.5em;
  color: #02315e;
}
</style>
