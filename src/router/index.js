import { createRouter, createWebHistory } from "vue-router";
import BoardList from "../components/BoardList.vue";
import KanbanBoard from "../components/KanbanBoard.vue";
import LoginPage from "../components/LoginPage.vue";

const routes = [
  { path: "/", component: BoardList, meta: { requiresAuth: true } },
  {
    path: "/board/:boardId",
    name: "KanbanBoard",
    component: KanbanBoard,
    props: (route) => ({
      boardId: route.params.boardId,
    }),
    meta: { requiresAuth: true },
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

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !(token && userId)) {
    next({ path: "/login" });
  } else if (to.path === "/login" && token && userId) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
