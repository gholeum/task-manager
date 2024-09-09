import axios from "axios";

const columnStore = {
  namespaced: true,
  state: {
    columns: [],
    selectedColumnId: null,
  },
  getters: {
    getAllColumns(state) {
      return state.columns;
    },
  },
  mutations: {
    setColumns(state, columns) {
      state.columns = columns;
    },
    addColumn(state, column) {
      state.columns.push(column);
    },
    editColumn(state, { columnId, name }) {
      const column = state.columns.find((c) => c.id === columnId);
      if (column) {
        column.name = name;
      }
    },
    removeColumn(state, columnId) {
      state.columns = state.columns.filter((column) => column.id !== columnId);
    },
    toggleEditMode(state, columnId) {
      const column = state.columns.find((c) => c.id === columnId);
      if (column) {
        column.isEditing = !column.isEditing;
      }
    },
    setSelectedColumnId(state, columnId) {
      state.selectedColumnId = columnId;
    },
  },
  actions: {
    async fetchColumns({ commit }, boardId) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.ok) {
          const data = await response.json();
          commit("setColumns", data);
        } else if (response.status === 403) {
          alert("Доступ к группе запрещен");
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
    async createColumn({ commit }, { columnTitle, boardId }) {
      const token = localStorage.getItem("token");
      const formData = { formData: { name: columnTitle } };
      try {
        const response = await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 201) {
          commit("addColumn", response.data);
        }
      } catch (error) {
        console.error("Ошибка при создании колонки:", error);
      }
    },
    async deleteColumn({ commit }, { columnId, boardId }) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${columnId}`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 204) {
          commit("removeColumn", columnId);
        }
      } catch (error) {
        console.error("Ошибка при удалении колонки:", error);
      }
    },
    async updateColumn({ commit }, { columnId, boardId, name }) {
      const token = localStorage.getItem("token");
      const formData = { formData: { name } };
      try {
        const response = await axios.put(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${columnId}`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 200) {
          commit("editColumn", { columnId, name });
        }
      } catch (error) {
        console.error("Ошибка при обновлении колонки:", error);
      }
    },
  },
};

export default columnStore;
