import { createRouter, createMemoryHistory } from 'vue-router';

import LoginView from "@/views/LoginView.vue";
import TodoListView from "@/views/TodoListView.vue";

const routes = [
    { path: '/', component: LoginView },
    { path: '/list', component: TodoListView }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
