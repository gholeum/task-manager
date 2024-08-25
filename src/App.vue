<template>
  <div id="app">
    <theHeader @open-column-modal="openColumnModal" />
    <theKanban :columns="columns" @add-column="addColumn" />
    <modalAddColumn
      :show="showColumnModal"
      @close-modal="showColumnModal = false"
      @create-column="addColumn"
    />
  </div>
</template>

<script>
import theHeader from "./components/TheHeader.vue";
import theKanban from "./components/KanbanBoard.vue";
import modalAddColumn from "./components/ModalAddColumn.vue";

export default {
  components: {
    theHeader,
    theKanban,
    modalAddColumn,
  },
  data() {
    return {
      showColumnModal: false,
      columns: [
        { id: "to-do", title: "Задачи", icon: "bi bi-hourglass-top" },
        {
          id: "in-progress",
          title: "В процессе",
          icon: "bi bi-hourglass-split",
        },
        { id: "done", title: "Выполнено", icon: "bi bi-hourglass-bottom" },
      ],
    };
  },
  methods: {
    openColumnModal() {
      this.showColumnModal = true;
    },
    addColumn(columnTitle) {
      const newColumn = {
        id: Date.now(),
        title: columnTitle,
        icon: "bi bi-list",
      };
      this.columns.push(newColumn);
      this.showColumnModal = false;
    },
  },
};
</script>
