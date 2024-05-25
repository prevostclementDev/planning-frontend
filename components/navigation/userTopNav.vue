<script setup lang="ts">
import Notification from "~/components/icones/notification.vue";
import Parametre from "~/components/icones/parametre.vue";
import {useAuth} from "~/stores/Auth";
import Button from "~/components/form/interaction/Button.vue";
import Loggout from "~/components/icones/loggout.vue";
import Lists from "~/components/notifications/lists.vue";
import {useNotification} from "~/stores/entity/notification";
import {useRouting} from "~/stores/routing";
import {useNotice} from "~/stores/ui/notice";

const noticeStore = useNotice()
const routingStore = useRouting()
const authStore = useAuth();
const notificationStore = useNotification()

onMounted(() => {
  notificationStore.action[notificationStore.actionType.GET_LIST]()
})

const toggleNotice = (noticeName) => {

  if ( ! noticeStore.notice[noticeName] ) {
    noticeStore.action[noticeStore.actionType.CLOSE_ALL_NOTICE]()
    noticeStore.action[noticeStore.actionType.OPEN_NOTICE](noticeName)
  } else {
    noticeStore.action[noticeStore.actionType.CLOSE_ALL_NOTICE]()
  }

}

</script>

<template>
  <div id="userTopNav">

    <div class="title">
      <p class="fw-700 h4">({{ authStore?.authState?.USER?.schoolspaces_name }}) Espace {{ authStore?.authState?.USER?.roles?.display_name }} - {{ authStore?.authState?.USER?.first_name }} {{ authStore.authState?.USER?.last_name }}</p>
    </div>

    <div class="action">

      <div class="iconeAction">

        <NuxtLink :to="routingStore.url.params"><Parametre /></NuxtLink>

        <div class="notification-link">
          <Notification @click.prevent="toggleNotice('notification')" />
          <span
              class="number"
              v-if="notificationStore.state.list !== null && notificationStore.state.list.data.conflicts.length !== 0"
              @click.prevent="toggleNotice('notification')"
          >
            {{ notificationStore.state.list.data.conflicts.length }}
          </span>
          <div class="notificationListNotice" v-if="noticeStore.notice.notification">
            <lists />
          </div>
        </div>

      </div>

      <div class="user-profil" @click="toggleNotice('user')">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 6C7.79565 6 8.55871 5.68393 9.12132 5.12132C9.68393 4.55871 10 3.79565 10 3C10 2.20435 9.68393 1.44129 9.12132 0.87868C8.55871 0.316071 7.79565 0 7 0C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3C4 3.79565 4.31607 4.55871 4.87868 5.12132C5.44129 5.68393 6.20435 6 7 6ZM0 15C-1.36979e-08 14.0807 0.18106 13.1705 0.532843 12.3212C0.884626 11.4719 1.40024 10.7003 2.05025 10.0503C2.70026 9.40024 3.47194 8.88463 4.32122 8.53284C5.1705 8.18106 6.08075 8 7 8C7.91925 8 8.82951 8.18106 9.67878 8.53284C10.5281 8.88463 11.2997 9.40024 11.9497 10.0503C12.5998 10.7003 13.1154 11.4719 13.4672 12.3212C13.8189 13.1705 14 14.0807 14 15H0Z" fill="#303741"/>
          </svg>
        </button>
        <div v-if="noticeStore.notice.user" class="profil-action">
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

        svg {
          width: 35px;
          height: 25px;

        }

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