import { createStore } from "vuex";
import boardStore from "./modules/boards";
import columnStore from "./modules/columns";
import taskStore from "./modules/tasks";

const store = createStore({
  modules: {
    boards: boardStore,
    columns: columnStore,
    tasks: taskStore,
  },
});

export default store;
