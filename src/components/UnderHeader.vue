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
    <div class="under-header__instruments">
      <i
        v-if="currentPage !== 'boards'"
        class="bi bi-people-fill"
        title="Управление пользователями доски"
        @click="openUsers"
      ></i>
      <thePlus :title="currentPlusTitle" @click="openThePlus" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters({
      currentBoardName: "boards/getCurrentBoardName",
    }),
    currentPageTitle() {
      return this.currentPage === "boards" ? "Доски" : this.currentBoardName;
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
    openUsers() {
      this.$emit("open-board-user-modal");
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

.under-header__instruments {
  color: black;
  display: flex;
  gap: 10px;
  font-size: 1em;
  align-items: center;
  justify-content: center;
}

.bi-people-fill {
  opacity: 70%;
  transition: opacity 0.3s;
}

.bi-people-fill:hover {
  opacity: 100%;
  cursor: pointer;
}
</style>
