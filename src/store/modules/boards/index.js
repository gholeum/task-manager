import axios from "axios";

const boardStore = {
  namespaced: true,
  state: {
    boards: [],
    currentBoardName: "",
  },
  getters: {
    getAllBoards(state) {
      return state.boards;
    },
    getCurrentBoardName(state) {
      return state.currentBoardName;
    },
  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards;
    },
    setCurrentBoardName(state, name) {
      state.currentBoardName = name;
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
    async createBoard(store, board) {
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
          boardStore.actions.fetchBoards(store);
        }
      } catch (error) {
        console.error("Ошибка создания доски:", error);
      }
    },

    async updateBoard(store, { boardId, formData }) {
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
        boardStore.actions.fetchBoards(store);
      } catch (error) {
        throw error;
      }
    },

    async deleteBoard(store, boardId) {
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
          boardStore.actions.fetchBoards(store);
        }
      } catch (error) {
        console.error("Ошибка удаления доски:", error);
      }
    },

    setBoardName({ commit }, name) {
      commit("setCurrentBoardName", name);
    },
  },
};

export default boardStore;
