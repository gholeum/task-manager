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
  },
  actions: {
    async fetchColumns({ commit }, boardId) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        commit("setColumns", response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            alert("Доступ к группе запрещен");
          } else {
            console.error("Ошибка при получении данных:", error.response.data);
          }
        } else {
          console.error("Ошибка при получении данных:", error);
        }
      }
    },

    async createColumn(store, { columnTitle, boardId }) {
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
          columnStore.actions.fetchColumns(store, boardId);
        }
      } catch (error) {
        console.error("Ошибка при создании колонки:", error);
      }
    },

    async deleteColumn(store, { columnId, boardId }) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${columnId}`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 204) {
          columnStore.actions.fetchColumns(store, boardId);
        }
      } catch (error) {
        console.error("Ошибка при удалении колонки:", error);
      }
    },
    async updateColumn(store, { columnId, boardId, formData }) {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.put(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${columnId}`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 200) {
          columnStore.actions.fetchColumns(store, boardId);
        }
      } catch (error) {
        console.error("Ошибка при обновлении колонки:", error);
      }
    },
  },
};

export default columnStore;
