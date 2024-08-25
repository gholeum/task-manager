<template>
  <div class="kanban">
    <section
      v-for="column in columns"
      :key="column.id"
      :class="`kanban__column kanban__column--${column.id}`"
      :data-column-id="column.id"
    >
      <div class="kanban__header">
        <div class="kanban__header-content">
          <div class="title">
            <div class="kanban__icon kanban__icon--column">
              <i :class="column.icon"></i>
            </div>
            <h2 class="kanban__title">{{ column.title }}</h2>
          </div>
          <thePlus :column-id="column.id" @add-task="setSelectedColumnId" />
        </div>
      </div>
      <div class="kanban__list">
        <theTask
          v-for="task in tasks.filter((task) => task.columnId === column.id)"
          :key="task.id"
          :task="task"
          @delete-task="removeTask"
          @update-task="updateTask"
        />
      </div>
    </section>
    <theModal
      :show="showModal"
      @update:show="showModal = $event"
      @create="addTask"
      :column-id="selectedColumnId"
    />
  </div>
</template>

<script>
import theTask from "./TaskItem.vue";
import theModal from "./ModalAddTask.vue";
import thePlus from "./UIElements/ThePlus.vue";

export default {
  name: "theKanban",
  components: {
    theTask,
    thePlus,
    theModal,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      selectedColumnId: "",
      tasks: [],
    };
  },
  methods: {
    setSelectedColumnId(columnId) {
      this.selectedColumnId = columnId;
      this.showModal = true;
    },
    addTask(task) {
      task.id = this.tasks.length + 1;
      task.columnId = this.selectedColumnId;
      this.tasks.push(task);
    },
    updateTask(updatedTask) {
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1, updatedTask);
      }
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
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
  gap: 8px;
}

[class^="bi bi-hourglass"] {
  font-size: 1.5em;
  color: white;
}

@media screen and (min-width: 640px) {
  .kanban__column {
    flex: 0 0 calc(32% - 20px);
  }
}
</style>
