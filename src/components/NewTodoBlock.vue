<template>
  <div class="todo-new">
    <div class="todo-list--header">Create a Todo</div>
    <div>
      <div class="todo-new--description">What's on your todo list?</div>
      <input
          class="todo-list--actions-input"
          placeholder="e.g. finish refactoring"
          v-model="title"
      >
    </div>
    <div>
    <div class="todo-new--description">Select Assignee:</div>
      <select
          class="todo-list--actions-select"
          v-model="userId"
      >
        <option disabled selected>User</option>
        <option v-for="id in userIds" :key="id" :value="id">{{ userNamesMap[id] }}</option>
      </select>
    </div>
    <div class="todo-new--action">
      <div class="todo-new--validation"> {{ validationMessage }} </div>
      <button class="todo-new--button" @click="createNewTodo"> Add todo </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NewTodoBlock",
  setup() {
    const store = useStore();

    const userIds = computed(() => store.getters.uniqueTodoUserIds);
    const userNamesMap = computed(() => store.getters.userNamesMap);
    let userId = ref('User');
    let title = ref('');
    let validationMessage = ref('');


    function createNewTodo() {
      if (!title.value.length) {
        validationMessage.value = 'Title is required.';
        return;
      }
      else if (userId.value === 'User') {
        validationMessage.value = 'User is required.';
        return;
      }

      store.dispatch('createNewTodo', {
        userId: userId.value,
        title: title.value,
        completed: false
      });

      userId.value = 'User';
      title.value = '';
    }

    return {
      userIds,
      userNamesMap,
      userId,
      title,
      validationMessage,
      createNewTodo
    }
  }
});
</script>

<style scoped lang="scss">
.todo-new {
  width: calc(100% - 100px);
  height: 220px;
  background-color: white;
  overflow-y: scroll;
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &--description {
    color: #5F5F5F;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 5px;
  }

  &--action{
    display: flex;
    justify-content: space-between;
  }

  &--button {
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: rgb(96, 184, 255);
    padding: 10px 30px;
    cursor: pointer;

    font-size: 17px;
    font-weight: 500;
    line-height: 21px;

    &:hover {
      background-color: rgb(79, 150, 208);
    }
  }

  &--validation {
    text-align: center;
    display: flex;
    align-items: center;
    color: red;
  }
}
.todo-list--header {

}

</style>