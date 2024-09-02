<template>
  <underHeader
    :currentPage="currentPage"
    :boardName="boardName"
    @open-column-modal="showColumnModal = true"
  />
  <div class="kanban">
    <template v-if="columns.length === 0">
      <div class="kanban__column empty">
        Создайте свою первую колонку, чтобы начать управление задачами
        <a href="#" class="create" @click="showColumnModal = true">Создать</a>
      </div>
    </template>

    <template v-else>
      <section
        v-for="column in columns"
        :key="column.id"
        :class="`kanban__column kanban__column--${column.id}`"
        :data-column-id="column.id"
        @keydown.enter.prevent="saveColumn(column.id)"
      >
        <div class="kanban__header">
          <div class="kanban__header-content">
            <div class="title">
              <div class="kanban__icon kanban__icon--column">
                <i class="bi bi-list"></i>
              </div>
              <h2
                class="kanban__title"
                :contenteditable="column.isEditing"
                :placeholder="
                  column.isEditing ? 'Введите название колонки' : ''
                "
                :class="{ editable: column.isEditing }"
                :data-column-id="column.id"
                @blur="updateColumnName(column.id, $event)"
              >
                {{ column.name }}
              </h2>
              <div class="instruments">
                <div class="edit-button" @click="toggleEditMode(column.id)">
                  <i
                    :class="column.isEditing ? 'bi bi-check2' : 'bi bi-pencil'"
                  ></i>
                </div>
                <div
                  class="delete-button"
                  @click="
                    setSelectedColumnId(column.id);
                    showDeleteModal = true;
                  "
                >
                  <i class="bi bi-trash"></i>
                </div>
              </div>
            </div>

            <thePlus
              :column-id="column.id"
              @add-task="setSelectedColumnId"
              @click="showModal = true"
            />
          </div>
          <div class="kanban__list">
            <div
              v-if="
                tasks.filter((task) => task.statusId === column.id).length === 0
              "
              class="empty-column"
            >
              <p>В этой колонке ещё нет задач</p>
            </div>
            <theTask
              v-for="task in tasks.filter(
                (task) => task.statusId === column.id
              )"
              :key="task.id"
              :task="task"
              :boardId="boardId"
              @delete-task="removeTask"
              @update-task="fetchTasks"
            />
          </div>
        </div>
      </section>
    </template>

    <theModal
      :show="showModal"
      @update:show="showModal = $event"
      @create="addTask"
      :column-id="selectedColumnId"
    />

    <modalAddColumn
      :show="showColumnModal"
      @update:show="showColumnModal = $event"
      @create="addColumn"
      @close-modal="showColumnModal = false"
    />

    <modalDeleteColumn
      :show="showDeleteModal"
      :columnId="selectedColumnId"
      @update:show="showDeleteModal = false"
      @delete-column="confirmDelete"
    />
  </div>
</template>

<script>
import theTask from "./TaskItem.vue";
import theModal from "./ModalAddTask.vue";
import modalAddColumn from "./ModalAddColumn.vue";
import modalDeleteColumn from "./ModalDeleteColumn.vue";
import thePlus from "./UIElements/ThePlus.vue";
import underHeader from "./UnderHeader.vue";
import axios from "axios";

export default {
  name: "theKanban",
  components: {
    theTask,
    thePlus,
    theModal,
    modalAddColumn,
    modalDeleteColumn,
    underHeader,
  },
  props: {
    boardId: { type: String, required: true },
    boardName: { type: String, required: true },
  },
  data() {
    return {
      columns: [],
      showModal: false,
      showColumnModal: false,
      showDeleteModal: false,
      selectedColumnId: "",
      tasks: [],
      boardId: this.$route.params.boardId,
    };
  },
  mounted() {
    this.fetchColumns();
    this.fetchTasks();
  },
  methods: {
    async fetchColumns() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/statuses`,
          {
            headers: {
              "X-Base-Auth": token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          this.columns = data;
        } else if (response.status === 403) {
          alert("Доступ к группе запрещен");
          this.columns = [];
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },

    async fetchTasks() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/tasks`,
          {
            headers: {
              "X-Base-Auth": token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          this.tasks = data.flatMap((item) => item.tasks);
        } else if (response.status === 403) {
          alert("Доступ к группе запрещен");
          this.tasks = [];
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },

    async addColumn(columnTitle) {
      const boardId = this.boardId;
      const token = localStorage.getItem("token");

      const formData = {
        formData: {
          name: columnTitle,
        },
      };

      try {
        await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        this.showColumnModal = false;
        this.fetchColumns();
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.cause
          : "Ошибка обновления";
      }
    },

    setSelectedColumnId(columnId) {
      this.selectedColumnId = columnId;
    },

    async confirmDelete(columnId) {
      const boardId = this.boardId;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${columnId}`,
          { headers: { "X-Base-Auth": token } }
        );
        if (response.status === 204) {
          this.fetchColumns();
        }
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.cause
          : "Ошибка удаления";
      } finally {
        this.showDeleteModal = false;
      }
    },

    toggleEditMode(columnId) {
      const column = this.columns.find((c) => c.id === columnId);
      if (column) {
        if (column.isEditing) {
          this.saveColumn(columnId);
        }
        column.isEditing = !column.isEditing;
      }
    },

    async saveColumn(columnId) {
      const boardId = this.boardId;
      const token = localStorage.getItem("token");
      const column = this.columns.find((c) => c.id === columnId);

      const columnTitleElement = document.querySelector(
        `h2[contenteditable][data-column-id="${columnId}"]`
      );

      if (columnTitleElement) {
        column.name = columnTitleElement.innerText;
      }

      const formData = {
        formData: {
          name: column.name,
        },
      };

      try {
        await axios.put(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${columnId}`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        column.isEditing = false;
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.cause
          : "Ошибка обновления";
      }
    },

    async addTask(task) {
      task.columnId = this.selectedColumnId;
      const boardId = this.boardId;
      const token = localStorage.getItem("token");

      const formData = {
        formData: {
          statusId: task.columnId,
          name: task.title,
          description: task.description,
          plannedCompletionAt: task.date,
        },
      };

      try {
        await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        this.showModal = false;
        this.fetchTasks();
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.cause
          : "Ошибка обновления";
      }
    },

    async removeTask(taskId) {
      const boardId = this.boardId;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks/${taskId}`,
          { headers: { "X-Base-Auth": token } }
        );
        if (response.status === 204) {
          this.fetchTasks();
        }
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.cause
          : "Ошибка удаления";
      }
    },
  },
};
</script>

<style>
.kanban {
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  gap: 30px;
  justify-content: space-around;
  flex-grow: 1;
  background: linear-gradient(#b9848c, #806491);
  border-radius: 480px 0px;
}

.kanban__column {
  flex: 0 0 100%;
  background-color: #d5ccff;
  border-radius: 16px;
  gap: 24px;
}

.empty-column {
  text-align: center;
  color: #777;
}

.empty {
  display: flex;
  flex-direction: column;
  min-height: 460px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #555;
  padding: 12px;
}

.create {
  color: #02315e;
}

.kanban__title {
  font-family: "PT Sans", sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #02315e;
  line-height: 41.66px;
  text-align: left;
  padding-bottom: 10px;
  margin-bottom: 0px;
}

.kanban__header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0px 20px;
}

.kanban__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  min-height: 331px;
}

.title {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.bi-list {
  font-size: 1.5em;
  color: white;
}

.instruments {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: rgb(77, 63, 63);
  opacity: 0;
  transition: opacity 0.5s;
  font-size: 0.9em;
}

.kanban__column:hover .instruments {
  opacity: 1;
}

.edit-button:hover .bi,
.delete-button:hover .bi {
  color: #000000;
}

.editable {
  border: 1px dashed #777;
}

@media screen and (min-width: 640px) {
  .kanban__column {
    flex: 0 0 calc(32% - 20px);
  }
}
</style>
