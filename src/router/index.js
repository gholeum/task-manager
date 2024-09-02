import { createRouter, createWebHistory } from "vue-router";
import BoardList from "../components/BoardList.vue";
import KanbanBoard from "../components/KanbanBoard.vue";
import LoginPage from "../components/LoginPage.vue";

const routes = [
  { path: "/", component: BoardList },
  {
    path: "/board/:boardId",
    name: "KanbanBoard",
    component: KanbanBoard,
    props: (route) => ({
      boardId: route.params.boardId,
      boardName: route.query.boardName,
    }),
  },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (token && userId) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

export default router;
