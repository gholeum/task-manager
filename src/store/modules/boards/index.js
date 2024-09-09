import axios from "axios";

const boardStore = {
  namespaced: true,
  state: { boards: [] },
  getters: {
    getAllBoards(state) {
      return state.boards;
    },
  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards;
    },
    addBoard(state, board) {
      state.boards.push(board);
    },
    removeBoard(state, boardId) {
      state.boards = state.boards.filter((board) => board.id !== boardId);
    },
    updateBoard(state, { boardId, formData }) {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === boardId
      );
      if (boardIndex !== -1) {
        state.boards[boardIndex].name = formData.name;
        state.boards[boardIndex].description = formData.description;
      }
    },
  },
  actions: {
    async fetchBoards({ commit }) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `https://todo-list.edu-playground.ru/api/v1/user/${userId}/boards`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 200) {
          const boards = response.data.map((board) => ({
            ...board,
          }));
          commit("setBoards", boards);
        }
      } catch (error) {
        console.error("Ошибка загрузки досок:", error);
      }
    },
    async createBoard({ commit }, board) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/user/${userId}/boards`,
          board,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 201) {
          commit("addBoard", { ...response.data });
        }
      } catch (error) {
        console.error("Ошибка создания доски:", error);
      }
    },

    async updateBoard({ commit }, { boardId, formData }) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `https://todo-list.edu-playground.ru/api/v1/user/${userId}/boards/${boardId}`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        commit("updateBoard", { boardId, formData });
      } catch (error) {
        throw error;
      }
    },

    async deleteBoard({ commit }, boardId) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/user/${userId}/boards/${boardId}`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 204) {
          commit("removeBoard", boardId);
        }
      } catch (error) {
        console.error("Ошибка удаления доски:", error);
      }
    },
  },
};

export default boardStore;
