<script setup>
import {useFetch} from "~/stores/Fetch.js";
import DraggableCourseListe from "~/components/planning/draggableCourseListe.vue";
import Planning from "~/components/planning/planning.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import ActionPanel from "~/components/planning/actionPanel.vue";
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import {useRouting} from "~/stores/routing.js";
import Sidebar from "~/components/planning/sidebar.vue";

const useRoutingStore = useRouting()
const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(false)

const route = useRoute()

const titlePage = ref(null)

useHead(() => ({
  title : titlePage.value
}))

const urlApi = `/schoolspaces/plannings/${route.params.id}`

const useFetchStore = useFetch()

const { state } = storeToRefs(useFetchStore)

onMounted(async () => {

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](urlApi)

  if ( useFetchStore.state.error[urlApi] && useFetchStore.state.data[urlApi].code === 404 ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Nous n\'avons pas trouvé votre planning',
      fatal : true
    })
    return
  }

  titlePage.value = useFetchStore.state.data[urlApi].data.planning.name

})

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](urlApi)
})

</script>

<template>

  <ariane :links="[
      { text : 'Dashboard', url : useRoutingStore.url.dashboard },
      {text : 'Mes plannings', url : useRoutingStore.url.planningsList },
      { text : titlePage }]"
  />

  <h2> {{ titlePage }} </h2>

  <div v-if="state.loading[urlApi]" class="loading">
    <loader-small-loader custom-class="blue"/>
  </div>
  <div v-else-if="state?.data[urlApi]?.data?.planning?.name" class="planningPage">

    <div class="planningContainer">
      <planning :plannings-id="route.params.id" :start-date="state?.data[urlApi]?.data?.planning.start_date" :end-date="state?.data[urlApi]?.data?.planning.end_date" />
    </div>

    <div class="actionContainer">
      <sidebar :planningId="route.params.id" />
    </div>

  </div>
</template>

<style scoped lang="scss">
.loading {
  @include flex();
  height: 20vh;

}

.planningPage {
  @include flex(flex-start,flex-start,row,nowrap,10px,10px);
  width: 100%;
  margin-top: 1.5rem;

  .planningContainer {
    width: calc(100% - 350px);

  }

  .actionContainer {
    width: 350px;

  }

}
</style>