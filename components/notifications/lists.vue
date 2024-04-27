<script setup>
import {useFetch} from "~/stores/Fetch.js";
import SmallLoader from "~/components/loader/smallLoader.vue";
import Items from "~/components/notifications/items.vue";
import {useRouting} from "~/stores/routing.js";
import {useNotification} from "~/stores/entity/notification.js";

const routingStore = useRouting()

const fetchStore = useFetch()
const notificationStore = useNotification()

onMounted(async () => {
  await notificationStore.action[notificationStore.actionType.GET_LIST]()
})

</script>

<template>
  <div class="containerNotification">
      <div class="loading" v-if="fetchStore.state.loading[notificationStore.baseUrl] || typeof fetchStore.state.loading[notificationStore.baseUrl] === 'undefined'">
        <small-loader custom-class="blue"></small-loader>
      </div>
    <div v-else-if="fetchStore.state.error[notificationStore.baseUrl]" class="errors">
      Une erreur est survenue
    </div>
    <div v-else-if="notificationStore.state.list !== null && notificationStore.state.list.data.conflicts.length === 0">
      Aucune notification
    </div>
    <div v-else-if="notificationStore.state.list !== null && notificationStore.state.list.data" class="list">
      <items
          v-for="item in notificationStore.state.list.data.conflicts"
          title="Conflit sur un planning"
          :date="item.createdAt"
          :link="routingStore.url.planningSingle(item.IdPlanning)+`?conflict=${item.daydateSlot}|${item.IdSlot}`"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.containerNotification {

  .list {
    max-height: 300px;
    overflow: auto;

  }

}
</style>