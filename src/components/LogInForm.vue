<template>
  <div class="login-form">
    <div class="login-form--header">Log In</div>
    <div class="login-form--validation"> {{ validationMessage  }}</div>
    <div class="login-form--content">
      <input
          class="login-form--content-input"
          placeholder="Username"
          v-model="username"
          autocomplete="on"
          name="username"
      />
      <input
          class="login-form--content-input"
          placeholder="Phone Number"
          v-model="phone"
          autocomplete="on"
          type="tel"
          name="phone"
      />
      <button class="login-form--content-button" @click="login">Register</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: 'LogInForm',
  props: {
    validationMessage: {
      type: String,
      required: true
    },
  },
  setup() {
    let username: string = '';
    let phone: string = '';

    return { username, phone };
  },
   methods: {
     login() {
      this.$emit('login', { username: this.username,  phone: this.phone });
    }
   }
});
</script>

<style scoped lang="scss">
.login-form {
  width: 447px;
  padding: 0 0 30px 0;
  gap: 15px;
  border-radius: 5px;
  background-color: #C3C3C3;
  display: flex;
  flex-direction: column;

  font-weight: 400;
  line-height: 21px;
  color: #5F5F5F;

  &--header {
    width: 100%;
    padding: 15px 0;
    gap: 10px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: #A5A5A5;
    font-size: 17px;
    text-align: center;
  }

  &--validation {
    color: red;
    height: 21px;
    padding: 0 25px;
    font-size: 15px;
  }

  &--content {
    display: flex;
    flex-direction: column;
    padding: 0 25px;
    gap: 25px;

    &-input {
      border: none;
      border-radius: 5px;
      color: #353535;
      font-size: 17px;
      line-height: 21px;
      padding: 10px;
    }

    &-button {
      border: none;
      border-radius: 5px;
      color: #fff;
      background-color: #519945;
      padding: 10px 30px;
      cursor: pointer;

      font-size: 17px;
      font-weight: 500;
      line-height: 21px;

      &:hover {
        background-color: #60ab54;
      }
    }
  }
}
</style>