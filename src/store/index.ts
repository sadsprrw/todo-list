import { createStore } from "vuex";
import { User, TodoItem } from "@/common/types/types";
import { api } from "@/services/api";

export interface State {
    loading: boolean;
    user: User;
    usersList: User[];
    todoList: TodoItem[];
    staredTodoIds: number[];
}

export default createStore<State>({
    state: {
        loading: false,
        user: {
            id: 0,
            name: '',
            username: '',
            email: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                    lat: '',
                    lng: ''
                }
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        },
        usersList: [],
        todoList: [],
        staredTodoIds: [],
    },
    getters: {
        uniqueTodoUserIds(state) {
            return [...new Set(state.todoList.map((t: TodoItem) => t.userId))];
        },
        userNamesMap(state) {
            const result: { [key: number]: string } = {};

            for (const user of state.usersList) {
                result[user.id] = user.name;
            }
            return result;
        }
    },
    mutations: {
        setLoading (state: State, value: boolean) {
            state.loading = value;
        },
        setUser (state: State, user: User) {
            state.user = user;
        },
        setTodoList (state: State, todos: TodoItem[]) {
            state.todoList = todos;
        },
        setStaredTodoIds(state: State, items: number[]) {
            state.staredTodoIds = items;
        },
        addNewTodo(state: State, item: TodoItem) {
            state.todoList.unshift(item);
        },
        syncStaredTodoList(state: State) {
            if (state.todoList.length && state.staredTodoIds.length) {
                state.staredTodoIds.forEach((id) => {
                    const staredTodo = state.todoList.find((t) => t.id === id);
                    if (staredTodo) staredTodo.stared = true;
                })
            }
        },
        markTodoItem (state: State, item: TodoItem) {
            item.stared = !item.stared;
            if (item.stared) state.staredTodoIds.push(item.id);
            else state.staredTodoIds = state.staredTodoIds.filter((id) => id === item.id);

            localStorage.setItem('staredTodoIds', JSON.stringify(state.staredTodoIds));
        }
    },
    actions: {
        async getUsersList ({ commit, state }) {
            commit('setLoading', true);
            const response = await api.getAllUsers();
            if (response) {
                state.usersList = response;
            }

            commit('setLoading', false);
        },
        async getTodosList ({ commit, state }) {
            commit('setLoading', true);
            const response = await api.getAllTodos();
            if (response) {
                state.todoList = response;
            }
            commit('syncStaredTodoList');
            commit('setLoading', false);
        },
        async createNewTodo ({ commit, state }, payload) {
            const response = await api.createTodo(payload);

            if (response) {
                commit('addNewTodo', { ...response, stared: false });
            }
        }
    },
    modules: {},
});