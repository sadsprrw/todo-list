<template>
  <div v-if="!!user" class="user-card">

    <div class="user-card--header">{{ user.name }}</div>
    <div class="user-card--panels">
      <div class="user-card--contact-panel">
        <div class="user-card__contact">
          <svg class="user-card__icon" viewBox="0 0 25 25"><path :d="phone"/></svg>{{ user.phone }}
        </div>
        <div class="user-card__contact">
          <svg class="user-card__icon" viewBox="0 0 25 25"><path :d="mail"/></svg>{{ user.email }}
        </div>
        <div class="user-card__contact">
          <svg class="user-card__icon" viewBox="0 0 25 25"><path :d="link"/></svg>{{ user.website }}
        </div>
        <div class="user-card__contact">
          <svg class="user-card__icon" viewBox="0 0 25 25"><path :d="mapMarker"/></svg>
          {{ user.address.city }}, {{ user.address.street }}, {{ user.address.suite }}
        </div>
      </div>
      <div class="user-card--company-panel">
        <div class="user-card--company-name"> {{ user.company.name }} </div>
        <div class="user-card--company-phrase"> «{{user.company.catchPhrase}}» </div>
        <div class="user-card--company-bs"> {{ user.company.bs }} </div>
      </div>
    </div>
    <div class="user-card-bg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from "@/common/types/types";
import { Icons } from "@/common/enums/icons";

export default defineComponent({
  name: 'UserInfo',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup () {
    return {
      account: Icons.account,
      mail: Icons.mail,
      link: Icons.link,
      phone: Icons.phone,
      mapMarker: Icons.mapMarker
    }
  }
})
</script>
<style scoped lang="scss">
.user-card {
  width: calc(100% - 40px);
  color: #252f42;;
  background-color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid #252f42;

  &--header {
    font-size: 24px;
    width: 100%;
    padding: 10px 0;
  }

  &--panels {
    display: grid;
    grid-template-columns: 50% 50%;

  }

  &--panel-description {
    font-size: 18px;
  }

  &--contact-panel {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__icon {
    vertical-align: center;
    width: 25px;
    height: 25px;

    & > path {
      fill: rgb(54, 151, 229);
    }

  }

  &--company {

    &-panel {
      z-index: 3;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
      color: white;
    }

    &-name {
      font-size: 24px;
      text-transform: uppercase;
      font-weight: bold;
    }

    &-phrase {
      font-size: 16px;
      color: #b7b7b7;
    }

    &-bs {
      font-size: 14px;
      color: rgb(96, 184, 255);
    }
  }

  &-bg {
    display: inline-block;
    -webkit-transform: rotate(15deg);
    position: absolute;
    overflow: hidden;
    height: 1000px;
    width: 800px;
    top: -50%;
    left: max(230px, 40%);
    background-color: #252f42;
  }

}


</style>