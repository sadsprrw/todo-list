<template>
  <div>
    <RouterView :key="$route.path" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();

    onMounted(() => {
      const staredTodoIds = localStorage.getItem('staredTodoIds');
      if (staredTodoIds) {
        try {
          const parsedList = JSON.parse(staredTodoIds);
          store.commit('setStaredTodoIds', parsedList);
        } catch (e) {
          console.error(e);
        }
      }
      store.dispatch('getUsersList');
    });
  }
});
</script>

<style lang="scss">
#app {
  background-color: #545454;
}
</style>
