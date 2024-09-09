import axios from "axios";

const taskStore = {
  namespaced: true,
  state: {
    tasks: [],
  },
  getters: {
    getAllTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
  },
  actions: {
    async fetchTasks({ commit }, boardId) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.ok) {
          const data = await response.json();
          commit(
            "setTasks",
            data.flatMap((item) => item.tasks)
          );
        } else if (response.status === 403) {
          alert("Доступ к группе запрещен");
        }
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    },
    async createTask({ commit }, { task, boardId }) {
      const token = localStorage.getItem("token");
      const formData = {
        formData: {
          statusId: task.columnId,
          name: task.name,
          description: task.description,
          plannedCompletionAt: task.date,
        },
      };
      try {
        const response = await axios.post(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 201) {
          commit("addTask", response.data);
        }
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
      }
    },
    async deleteTask({ commit }, { taskId, boardId }) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks/${taskId}`,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 204) {
          commit("removeTask", taskId);
        }
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
      }
    },
    async updateTask({ commit }, { task, boardId }) {
      const token = localStorage.getItem("token");
      const formData = {
        formData: {
          statusId: task.statusId,
          name: task.name,
          description: task.description,
          plannedCompletionAt: task.date,
        },
      };
      try {
        const response = await axios.put(
          `https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks/${task.id}`,
          formData,
          {
            headers: { "X-Base-Auth": token },
          }
        );
        if (response.status === 200) {
          commit("updateTask", task);
        }
      } catch (error) {
        console.error("Ошибка обновления задачи:", error);
      }
    },
  },
};

export default taskStore;
