<template>
  <div class="task-item" @keydown.enter.prevent="saveChanges">
    <div class="task-head">
      <h3
        v-if="isEditing"
        @blur="updateTitle"
        contenteditable="true"
        spellcheck="false"
        :class="{ editing: isEditing }"
      >
        {{ editedTask.title }}
      </h3>
      <h3 v-else @click="toggleEdit">
        {{ task.title }}
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
        v-if="isEditing"
        @blur="updateDescription"
        contenteditable="true"
        spellcheck="false"
        :class="{ editing: isEditing }"
      >
        {{ editedTask.description }}
      </p>
      <p v-else>
        {{ task.description }}
      </p>

      <div class="task-panel">
        <input v-if="isEditing" type="date" v-model="editedTask.date" />
        <div v-else>
          <time>{{ formatDate(task.date) }}</time>
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
import modalDeleteTask from "./ModalDeleteTask.vue";

export default {
  name: "theTask",
  components: { modalDeleteTask },
  props: {
    task: {
      type: Object,
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
        this.isEditing = false;
        this.$emit("update-task", { ...this.editedTask, id: this.task.id });
      } else {
        this.isEditing = true;
      }
    },
    saveChanges() {
      this.isEditing = false;
      this.$emit("update-task", { ...this.editedTask, id: this.task.id });
    },
    updateTitle(event) {
      this.editedTask.title = event.target.innerText;
    },
    updateDescription(event) {
      this.editedTask.description = event.target.innerText;
    },
    reverseDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
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

time {
  color: #02315e;
  font-size: 18px;
}

.editing {
  border: 1px dashed #777;
  border-radius: 3px;
  padding: 0px 3px;
}
</style>
