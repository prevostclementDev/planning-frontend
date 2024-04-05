<script setup lang="ts">
import Notification from "~/components/icones/notification.vue";
import Parametre from "~/components/icones/parametre.vue";
import {useAuth} from "~/stores/Auth";
import Button from "~/components/form/interaction/Button.vue";

const profilActionOpen = ref(false);
const authStore = useAuth();

</script>

<template>
  <div id="userTopNav">

    <div class="logo">
      <img src="" alt="">
    </div>

    <div class="title">
      <p class="fw-700 h4">({{ authStore?.authState?.USER?.schoolspaces_name }}) Espace {{ authStore?.authState?.USER?.roles?.display_name }} - {{ authStore?.authState?.USER?.first_name }} {{ authStore.authState?.USER?.last_name }}</p>
    </div>

    <div class="action">

      <NuxtLink to="/"> Aide </NuxtLink>

      <div class="iconeAction">
        <NuxtLink to="/"><Notification /></NuxtLink>
        <NuxtLink to="/"><Parametre /></NuxtLink>
      </div>

      <div class="user-profil" @click="profilActionOpen = !profilActionOpen">
        <button><img src="" alt=""></button>
        <div v-if="profilActionOpen" class="profil-action">
          <a href="/" @click.prevent="authStore.logout()">Se déconnecter</a>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
#userTopNav {
  padding: 1rem 4.375rem;
  @include effect(shadow);
  @include flex(space-between);
  position: relative;
  z-index: 9;

  .logo,.action {
    width: 25%;

  }

  .title {
    width: 50%;
    text-align: center;

  }

  .action {
    @include flex(flex-end);

    .iconeAction {
      margin: 0 1rem;
      @include flex();

      a {
        margin: 0 .75rem;

      }

    }

    .user-profil {
      position: relative;

      button {
        @include interaction(clear);
        border-radius: 50%;

      }

      .profil-action {
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: -40px;
        padding: 8px;
        border-radius: 10px;
        width: 200px;
        @include bgColor(light2);
        border: 1px solid getColor(grey8);
        @include effect(shadow);
        text-align: right;


      }

    }

  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    @include bgColor(grey7);

  }

}
</style>