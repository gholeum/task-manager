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
import { mapGetters, mapActions } from "vuex";
import theTask from "./TaskItem.vue";
import theModal from "./ModalAddTask.vue";
import modalAddColumn from "./ModalAddColumn.vue";
import modalDeleteColumn from "./ModalDeleteColumn.vue";
import thePlus from "./UIElements/ThePlus.vue";
import underHeader from "./UnderHeader.vue";

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
      showModal: false,
      showColumnModal: false,
      showDeleteModal: false,
    };
  },
  computed: {
    ...mapGetters("columns", ["getAllColumns"]),
    ...mapGetters("tasks", ["getAllTasks"]),
    columns() {
      return this.getAllColumns;
    },
    tasks() {
      return this.getAllTasks;
    },
  },
  mounted() {
    this.fetchColumns(this.boardId);
    this.fetchTasks(this.boardId);
  },
  methods: {
    ...mapActions("columns", [
      "fetchColumns",
      "createColumn",
      "deleteColumn",
      "updateColumn",
      "setSelectedColumnId",
    ]),
    ...mapActions("tasks", ["fetchTasks", "createTask", "deleteTask"]),

    setSelectedColumnId(columnId) {
      this.selectedColumnId = columnId;
    },

    async addColumn(columnTitle) {
      await this.createColumn({ columnTitle, boardId: this.boardId });
      this.showColumnModal = false;
    },

    async confirmDelete() {
      await this.deleteColumn({
        columnId: this.selectedColumnId,
        boardId: this.boardId,
      });
      this.showDeleteModal = false;
    },

    async updateColumnName(columnId, event) {
      const name = event.target.innerText.trim();
      if (name) {
        await this.updateColumn({ columnId, boardId: this.boardId, name });
      }
    },

    toggleEditMode(columnId) {
      this.setSelectedColumnId(columnId);
      this.toggleEditMode(columnId);
    },

    async addTask(task) {
      await this.createTask({ task, boardId: this.boardId });
      this.showModal = false;
    },

    async removeTask(taskId) {
      await this.deleteTask({ taskId, boardId: this.boardId });
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
