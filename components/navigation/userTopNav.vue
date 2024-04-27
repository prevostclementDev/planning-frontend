<script setup lang="ts">
import Notification from "~/components/icones/notification.vue";
import Parametre from "~/components/icones/parametre.vue";
import {useAuth} from "~/stores/Auth";
import Button from "~/components/form/interaction/Button.vue";
import Loggout from "~/components/icones/loggout.vue";
import Lists from "~/components/notifications/lists.vue";
import {useNotification} from "~/stores/entity/notification";
import {useRouting} from "~/stores/routing";

const profilActionOpen = ref(false);
const notificationOpen = ref(false);

const routingStore = useRouting()
const authStore = useAuth();
const notificationStore = useNotification()

onMounted(() => {
  notificationStore.action[notificationStore.actionType.GET_LIST]()
})

</script>

<template>
  <div id="userTopNav">

<!--    <div class="logo">-->
<!--      <img src="" alt="">-->
<!--    </div>-->

    <div class="title">
      <p class="fw-700 h4">({{ authStore?.authState?.USER?.schoolspaces_name }}) Espace {{ authStore?.authState?.USER?.roles?.display_name }} - {{ authStore?.authState?.USER?.first_name }} {{ authStore.authState?.USER?.last_name }}</p>
    </div>

    <div class="action">

<!--      <NuxtLink to="/"> Aide </NuxtLink>-->

      <div class="iconeAction">

        <NuxtLink :to="routingStore.url.params"><Parametre /></NuxtLink>

        <div class="notification-link">
          <Notification @click.prevent="notificationOpen = !notificationOpen" />
          <span
              class="number"
              v-if="notificationStore.state.list !== null && notificationStore.state.list.data.conflicts.length !== 0"
              @click.prevent="notificationOpen = !notificationOpen"
          >
            {{ notificationStore.state.list.data.conflicts.length }}
          </span>
          <div class="notificationListNotice" v-if="notificationOpen">
            <lists />
          </div>
        </div>

      </div>

      <div class="user-profil" @click="profilActionOpen = !profilActionOpen">
        <button><img src="" alt=""></button>
        <div v-if="profilActionOpen" class="profil-action">
          <a href="/" @click.prevent="authStore.logout()">
            <span>Se déconnecter</span>
            <loggout />
          </a>
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
    //text-align: center;

  }

  .action {
    @include flex(flex-end,center);

    .iconeAction {
      margin: 0 1rem;
      @include flex();

      a {
        margin: 0 .6rem;
        display: block;
        width: fit-content;

        &:first-child {
          height: 20px;

        }

      }

    }

    .notification-link {
      @include flex();
      position: relative;
      text-decoration: none;
      margin: 0 .5rem;

      span,svg {
        cursor: pointer;
        user-select: none;

      }

      span {
        margin-left: .3rem;
        @include bgColor(error0);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        @include color(light3);
        @include flex();

      }

      .notificationListNotice {
        display: inline-block;
        position: absolute;
        bottom: -10px;
        transform: translateY(100%);
        @include bgColor(light3);
        @include effect(shadow);
        border: 1px solid getColor(primary4,.2);
        padding: 1rem;
        width: 300px;
        border-radius: 8px;
        right: 0;

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
        bottom: 0;
        transform: translateY(100%);
        padding: 8px;
        border-radius: 10px;
        width: 200px;
        @include bgColor(light2);
        border: 1px solid getColor(primary4,.2);
        @include effect(shadow);
        text-align: right;

        a {
          @include flex(flex-end);
          padding: .5rem;
          text-decoration: none;
          border-radius: 8px;
          transition : 0.3s ease-in-out all;

          &:hover {
            @include bgColor(primary0,.6);

          }

          span,svg {
            margin-right: .5rem;

          }



        }

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