<template>
  <div class="todo-list">
    <div class="todo-list--header">Todo list</div>
    <div class="todo-list--actions">
      <input
          class="todo-list--actions-input"
          placeholder="Search"
          :value="todoFilter.title"
          @input="(v) => updateTodoFilter('title', v)"
      >
      <select
          class="todo-list--actions-select"
          :value="todoFilter.status"
          @input="(v) => updateTodoFilter('status', v)"
      >
        <option disabled selected>Status</option>
        <option v-for="(status, index) in statusOptions" :key="`status-option-${index}`">{{ status }}</option>
      </select>

      <select
          class="todo-list--actions-select"
          :value="todoFilter.userId"
          @input="(v) => updateTodoFilter('userId', v)"
      >
        <option disabled selected>User Id</option>
        <option>All Users</option>
        <option v-for="id in userIds" :key="id">{{ id }}</option>
      </select>
    </div>
    <div v-if="!!filteredTodoList.length" class="todo-list--items">
      <div v-for="item in filteredTodoList" :key="`todo-item-${item.id}`">
        <div class="todo-list__item">
          <div class="todo-list__item-data">
            <input type="checkbox" v-model="item.completed">
            <div class="todo-list__item-info">
              <span class="todo-list__item-title">{{ item.title }}</span>
              <span class="todo-list__item-assignee">assignee: {{ userNamesMap[item.userId] }}</span>
            </div>
          </div>
          <svg
              class="todo-list__icon" viewBox="0 0 20 23"
              @click="markItem(item)"
          >
            <path v-if="item.stared" :d="markOn"/>
            <path v-else :d="markOff"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-else>No results</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { TodoItem } from "@/common/types/types";
import { Icons } from "@/common/enums/icons";
import { useStore } from "vuex";


export default defineComponent({
  name: 'TodoList',
  props: {
    todoList: {
      type: Object as PropType<Array<TodoItem>>,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const todoFilter = ref({
      status: "Status",
      userId: "User Id",
      title: ''
    })
    const statusOptions = ['All', 'Completed', 'Uncompleted', 'Favourite'];

    function markItem(item: TodoItem) {
      store.commit('markTodoItem', item);
    }

    function updateTodoFilter(key: string, event: any) {
      todoFilter.value = { ...todoFilter.value, ...{ [key]: event.target.value } };
    }

    const filteredTodoList = computed(() => {
      let result = props.todoList;

      switch (todoFilter.value.status) {
        case 'All':
          break;
        case 'Completed':
          result = result.filter((t) => t.completed);
          break;
        case 'Uncompleted':
          result = result.filter((t) =>! t.completed);
          break;
        case 'Favourite':
          result = result.filter((t) => t.stared);
          break;
        default:
          break;
      }

      if (todoFilter.value.userId !== 'All Users' && todoFilter.value.userId !== 'User Id') {
        result = result.filter((t) => t.userId === Number(todoFilter.value.userId));
      }

      if (todoFilter.value.title) {
        result = result.filter((t) => t.title.includes(todoFilter.value.title));
      }

      return result;
    })

    return {
      userIds: computed(() => store.getters.uniqueTodoUserIds),
      userNamesMap: computed(() => store.getters.userNamesMap),
      markOff: Icons.markOff,
      markOn: Icons.markOn,
      todoFilter,
      statusOptions,
      filteredTodoList,
      markItem,
      updateTodoFilter
    }
  }
});
</script>

<style scoped lang="scss">

</style>