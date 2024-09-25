<template>
  <div
    class="task-item"
    @keydown.enter.prevent="saveChanges"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="task-head">
      <h3
        :contenteditable="isEditing"
        spellcheck="false"
        :class="{ editing: isEditing }"
        :data-task-id="task.id"
        ref="taskTitle"
        @input="editName"
      >
        {{ editedTask.name }}
      </h3>
      <div class="instruments">
        <div class="edit-task" @click="toggleEdit">
          <i class="bi" :class="isEditing ? 'bi-check-lg' : 'bi-pencil'"></i>
        </div>
        <div class="delete-task" @click="showDeleteModal = true">
          <i class="bi bi-trash"></i>
        </div>
      </div>
    </div>
    <div>
      <p
        :contenteditable="isEditing"
        spellcheck="false"
        :class="{ editing: isEditing }"
        :data-task-id="task.id"
        ref="taskDescription"
        @input="editDescription"
      >
        {{ editedTask.description }}
      </p>
      <div class="task-panel">
        <input v-if="isEditing" type="date" v-model="editedTask.date" />
        <div v-else>
          <time>{{ formatDate(task.plannedCompletionAt) }}</time>
        </div>
      </div>
    </div>
    <ModalDeleteTask
      :show="showDeleteModal"
      :task-id="task.id"
      @update:show="showDeleteModal = false"
      @delete-task="$emit('delete-task', task.id)"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModalDeleteTask from "./ModalDeleteTask.vue";

export default {
  name: "TaskItem",
  components: { ModalDeleteTask },
  props: {
    task: { type: Object, required: true },
    boardId: { type: String, required: true },
  },
  data() {
    return {
      showDeleteModal: false,
      isEditing: false,
      editedTask: { ...this.task },
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),

    handleDragStart(event) {
      event.dataTransfer.setData("text/plain", this.task.id);
      event.target.classList.add("dragging");
    },

    handleDragEnd(event) {
      event.target.classList.remove("dragging");
    },

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
    editName(event) {
      this.editedTask.name = event.target.innerText;
    },
    editDescription(event) {
      this.editedTask.description = event.target.innerText;
    },
    async saveChanges() {
      await this.updateTask({ task: this.editedTask });
      this.isEditing = false;
      this.$emit("update-task", boardId);
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
.task-item:hover .bi {
  opacity: 0.7;
}
.delete-task:hover .bi,
.edit-task:hover .bi {
  opacity: 1;
  color: black;
}
.task-item {
  background-color: #fdfdfd;
  border-radius: 12px;
  padding: 0 24px 24px;
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
.editing {
  border: 1px dashed #777;
  border-radius: 3px;
  padding: 0 3px;
}
.dragging {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
