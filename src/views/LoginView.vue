<template>
  <div>
    <header />
    <div v-if="loading" class="main-container">
      <div>Loading...</div>
    </div>
    <div v-else class="main-container">
      <LogInForm :validation-message="validationMessage" @login="login"/>
    </div>
    <footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import LogInForm from "@/components/LogInForm.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { User } from "@/common/types/types";

export default defineComponent({
  name: "LoginView",
  components: { LogInForm },
  setup() {
    const store = useStore();
    const router = useRouter();

    const loading = computed(() => store.state.loading);
    const usersList = computed(() => store.state.usersList);
    let validationMessage = ref('');

    function login(data: any) {
      const { username, phone } = data;
      const user = usersList.value.find((u: User) => u.username === username && u.phone === phone);

      if (user) {
        store.commit('setLoading', true);

        validationMessage.value = "";
        store.commit('setUser', user);
        store.dispatch('getTodosList');
        store.commit('syncStaredTodoList');
        router.push({ path: '/list'});

        store.commit('setLoading', false);
      }
      else {
        validationMessage.value = "login error";
      }
    }


    return {
      loading,
      validationMessage,
      login
    };
  }
});
</script>

<style scoped>
.main-container {
  align-items: center;
  min-height: calc(100vh - 60px - 270px);
}
</style>