<template>
  <div class="task-item" @keydown.enter.prevent="saveChanges">
    <div class="task-head">
      <h3
        contenteditable="true"
        :class="{ editing: isEditing }"
        :data-task-id="task.id"
      >
        {{ task.name }}
      </h3>
      <div class="instruments">
        <div class="edit-task" @click="toggleEdit">
          <i class="bi" :class="isEditing ? 'bi-check-lg' : 'bi-pencil'"></i>
        </div>
        <div class="delete-task" @click="openDeleteModal">
          <i class="bi bi-trash"></i>
        </div>
      </div>
    </div>

    <div>
      <p
        contenteditable="true"
        :class="{ editing: isEditing }"
        :data-task-id="task.id"
      >
        {{ task.description }}
      </p>

      <div class="task-panel">
        <input v-if="isEditing" type="date" v-model="editedTask.date" />
        <div v-else>
          <time>{{ formatDate(task.plannedCompletionAt) }}</time>
        </div>
      </div>
    </div>

    <modalDeleteTask
      :show="showDeleteModal"
      :task-id="task.id"
      @update:show="showDeleteModal = $event"
      @delete-task="$emit('delete-task', task.id)"
    />
  </div>
</template>

<script>
import axios from "axios";
import modalDeleteTask from "./ModalDeleteTask.vue";

export default {
  name: "theTask",
  components: { modalDeleteTask },
  props: {
    task: {
      type: Object,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDeleteModal: false,
      isEditing: false,
      editedTask: { ...this.task },
    };
  },
  methods: {
    openDeleteModal() {
      this.showDeleteModal = true;
    },
    toggleEdit() {
      if (this.isEditing) {
        this.saveChanges();
      } else {
        this.isEditing = true;
        this.editedTask = { ...this.task };
      }
    },
    saveChanges() {
      const taskTitleElement = document.querySelector(
        `h3[contenteditable][data-task-id="${this.task.id}"]`
      );
      const taskDescriptionElement = document.querySelector(
        `p[contenteditable][data-task-id="${this.task.id}"]`
      );

      if (taskTitleElement) {
        this.editedTask.title = taskTitleElement.innerText;
      }
      if (taskDescriptionElement) {
        this.editedTask.description = taskDescriptionElement.innerText;
      }

      const token = localStorage.getItem("token");

      const formData = {
        formData: {
          statusId: this.task.statusId,
          name: this.editedTask.title,
          description: this.editedTask.description,
          plannedCompletionAt: this.editedTask.date,
        },
      };

      axios
        .put(
          `https://todo-list.edu-playground.ru/api/v1/boards/${this.boardId}/tasks/${this.task.id}`,
          formData,
          {
            headers: {
              "X-Base-Auth": token,
            },
          }
        )
        .then(() => {
          this.isEditing = false;
          this.$emit("update-task", { ...this.editedTask, id: this.task.id });
        })
        .catch((error) => {
          console.error("Ошибка обновления задачи:", error);
        });
    },

    reverseDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    formatDate(date) {
      return this.reverseDate(date);
    },
  },
};
</script>

<style scoped>
.bi {
  font-size: 1em;
  color: rgb(77, 63, 63);
  opacity: 0.1;
  transition: opacity 0.3s;
}

.task-item:hover .bi,
.task-item:hover .bi {
  opacity: 0.7;
}

.edit-task:hover .bi,
.delete-task:hover .bi {
  opacity: 1;
  color: black;
}

.task-item {
  background-color: #fdfdfd;
  border-radius: 12px;
  padding: 0px 24px 24px 24px;
  gap: 16px;
}

.task-head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.instruments {
  display: flex;
  gap: 10px;
}

h3 {
  font-size: 24px;
  text-align: left;
  color: black;
  margin-bottom: 8px;
}

p {
  color: black;
}

.editable {
  border: 1px dashed #777;
}

time {
  color: #02315e;
  font-size: 18px;
}
</style>
