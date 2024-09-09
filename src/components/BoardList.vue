<template>
  <underHeader
    :currentPage="currentPage"
    @open-board-modal="showModal = true"
  />
  <div class="kanban">
    <section v-for="board in getAllBoards" :key="board.id" class="boards">
      <div class="board__header">
        <div class="board__header-content">
          <h2
            class="board__title"
            :contenteditable="board.isEditing"
            :placeholder="board.isEditing ? 'Введите название доски' : ''"
            :class="{ editable: board.isEditing }"
            :data-board-id="board.id"
          >
            {{ board.name }}
          </h2>
          <span
            class="info-icon"
            :title="`Создано: ${formatDate(
              board.createdAt
            )}\nОбновлено: ${formatDate(board.updatedAt)}\nВладелец: ${
              board.owner.email
            }`"
          >
            <i class="bi bi-info-circle"></i>
          </span>
        </div>
        <p
          class="board-description"
          :contenteditable="board.isEditing"
          :placeholder="board.isEditing ? 'Введите описание доски' : ''"
          :class="{ editable: board.isEditing }"
          :data-board-id="board.id"
        >
          {{ board.description }}
        </p>
        <p class="last-updated">
          Последнее изменение: {{ formatDate(board.updatedAt) }}
        </p>
        <a @click="goToKanban(board.id)" class="go-to-kanban">
          <i class="bi bi-arrow-right"></i> Перейти к этой доске
        </a>
        <div class="board-actions">
          <button class="edit-button" @click="toggleEditMode(board.id)">
            {{ board.isEditing ? "Сохранить" : "Редактировать" }}
          </button>
          <button class="delete-button" @click="openDeleteModal(board.id)">
            <i class="bi bi-trash"></i> Удалить
          </button>
        </div>
      </div>
    </section>
    <div v-if="getAllBoards.length === 0" class="boards">
      <div class="no-boards-message">
        <p>У вас ещё нет досок. Давайте создадим!</p>
        <a href="#" class="create" @click="showModal = true">Создать</a>
      </div>
    </div>
  </div>

  <errorMessage v-if="errorMessages.length" :messages="errorMessages" />
  <modalAddBoard
    :show="showModal"
    @update:show="showModal = false"
    @board-created="fetchBoards"
  />
  <modalDeleteBoard
    :show="showDeleteModal"
    :boardId="selectedBoardId"
    @update:show="showDeleteModal = false"
    @delete-board="confirmDelete"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modalAddBoard from "./ModalAddBoard.vue";
import modalDeleteBoard from "./ModalDeleteBoard.vue";
import underHeader from "./UnderHeader.vue";
import errorMessage from "./UIElements/ErrorMessage.vue";

export default {
  name: "BoardList",
  components: {
    modalAddBoard,
    modalDeleteBoard,
    underHeader,
    errorMessage,
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      selectedBoardId: null,
      currentPage: "boards",
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters("boards", ["getAllBoards"]),
    errorMessages() {
      return this.errorMessage ? [this.errorMessage] : [];
    },
  },
  mounted() {
    this.fetchBoards();
  },
  methods: {
    ...mapActions("boards", [
      "fetchBoards",
      "createBoard",
      "deleteBoard",
      "updateBoard",
    ]),

    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("ru-RU", options);
    },

    toggleEditMode(boardId) {
      const board = this.getAllBoards.find((b) => b.id === boardId);
      if (board) {
        if (board.isEditing) {
          this.saveBoard(boardId);
        } else {
          board.isEditing = true;
        }
      }
    },

    async saveBoard(boardId) {
      this.errorMessage = [];
      const board = this.getAllBoards.find((b) => b.id === boardId);

      const boardTitleElement = document.querySelector(
        `h2[contenteditable][data-board-id="${boardId}"]`
      );
      const boardDescriptionElement = document.querySelector(
        `p.board-description[contenteditable][data-board-id="${boardId}"]`
      );

      if (!boardTitleElement || !boardDescriptionElement) {
        console.error(`Editable elements for boardId ${boardId} not found.`);
        return;
      }

      board.name = boardTitleElement.innerText;
      board.description = boardDescriptionElement.innerText;

      if (board.name.length < 5) {
        this.errorMessage.push(
          "Название доски должно содержать не менее 5 символов."
        );
      }

      if (board.description.length < 5) {
        this.errorMessage.push(
          "Описание доски должно содержать не менее 5 символов."
        );
      }

      if (this.errorMessage.length > 0) {
        return;
      }

      const formData = {
        formData: {
          name: board.name,
          description: board.description,
        },
      };

      try {
        await this.updateBoard({ boardId, formData });
        board.isEditing = false;
      } catch (error) {
        this.errorMessage.push(
          error.response ? error.response.data.cause : "Ошибка редактирования"
        );
      }
    },

    openDeleteModal(boardId) {
      this.selectedBoardId = boardId;
      this.showDeleteModal = true;
    },

    async confirmDelete(boardId) {
      try {
        await this.deleteBoard(boardId);
        await this.fetchBoards();
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.cause
          : "Ошибка удаления";
      } finally {
        this.showDeleteModal = false;
      }
    },

    goToKanban(boardId) {
      const board = this.getAllBoards.find((b) => b.id === boardId);
      const boardName = board.name;
      this.$router.push({
        name: "KanbanBoard",
        params: { boardId },
        query: { boardName },
      });
    },
  },
};
</script>

<style scoped>
.boards {
  flex: 0 0 100%;
  background-color: #d5ccff;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
  border-radius: 16px;
  min-height: 260px;
}

.board__header {
  padding: 0px 24px;
}

.board__header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board__title {
  font-family: "PT Sans", sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #02315e;
  text-align: left;
  overflow-wrap: break-word;
  margin-bottom: 0px;
  gap: 24px;
}

.board-description {
  font-size: 18px;
  color: #555;
  overflow-wrap: break-word;
}

.editable {
  border: 1px dashed #777;
}

.last-updated {
  font-size: 14px;
  color: #777;
}

.no-boards-message {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #555;
}

.create {
  color: #02315e;
}

.board-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

button {
  height: 40px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.edit-button {
  color: #5738a0;
  border: 2px solid #5738a0;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #5738a0;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: darkred;
}

.go-to-kanban {
  cursor: pointer;
  color: #02315e;
}

@media screen and (min-width: 640px) {
  .boards {
    flex: 0 0 calc(32% - 20px);
  }
}
</style>
