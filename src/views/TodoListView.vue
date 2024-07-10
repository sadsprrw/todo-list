<template>
  <div>
    <div v-if="loading" class="main-container">
      <div>Loading...</div>
    </div>
    <div v-else class="main-container">
      <div class="todo-view">
        <UserInfo :user="user" />
        <NewTodoBlock />
        <TodoList :todo-list="todoList" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import TodoList from "@/components/TodoList.vue";
import NewTodoBlock from "@/components/NewTodoBlock.vue";

export default defineComponent({
  name: "TodoListView",
  components: { NewTodoBlock, UserInfo, TodoList },
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.loading);
    const user = computed(() => store.state.user);
    const todoList = computed(() => store.state.todoList);

    return { loading, user, todoList };
  }
});
</script>

<style scoped>
.todo-view {
  min-width: 60%;
}
</style>