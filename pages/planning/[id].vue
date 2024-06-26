<script setup>
import {useFetch} from "~/stores/Fetch.js";
import Planning from "~/components/planning/planning.vue";
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import {useRouting} from "~/stores/routing.js";
import Sidebar from "~/components/planning/sidebar.vue";
import {usePlanning} from "~/stores/entity/planning.js";
import {useCalendar} from "~/stores/calendar.js";

const { $toast } = useNuxtApp()

const planningStore = usePlanning()
const useRoutingStore = useRouting()
const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(false)

const route = useRoute()

const titlePage = ref(null)

useHead(() => ({
  title : titlePage.value
}))

const urlApi = `${planningStore.baseUrl}/${route.params.id}`

const calendarStore = useCalendar();
const useFetchStore = useFetch()

onMounted(async () => {

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](urlApi)

  if ( useFetchStore.state.error[urlApi] && useFetchStore.state.data[urlApi]?.code === 404 ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Nous n\'avons pas trouvé votre planning',
      fatal : true
    })
    return
  }

  if ( useFetchStore.state.error[urlApi] ) {
    $toast.error('Impossible de charger le planning')
  }

  titlePage.value = useFetchStore.state.data[urlApi].data.planning.name

  calendarStore.mutation[calendarStore.mutationType.INIT_OPTIONS]({
    validRange: {
      start: new Date(useFetchStore.state?.data[urlApi]?.data?.planning.start_date).setDate(new Date(useFetchStore.state?.data[urlApi]?.data?.planning.start_date).getDate()+1),
      end: new Date(useFetchStore.state?.data[urlApi]?.data?.planning.end_date).setDate(new Date(useFetchStore.state?.data[urlApi]?.data?.planning.end_date).getDate()+1)
    },
  })

})

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](urlApi)
})

</script>

<template>
  <div class="pagePlanningLayout">

    <div class="titlePlanning">
      <ariane :links="[
      { text : 'Dashboard', url : useRoutingStore.url.dashboard },
      {text : 'Mes plannings', url : useRoutingStore.url.planningsList },
      { text : titlePage }]"
      />
    </div>

    <div class="contentPlanning">

      <div v-if="useFetchStore.state.loading[urlApi]" class="loading">
        <loader-small-loader custom-class="blue"/>
      </div>
      <div v-else-if="useFetchStore.state?.data[urlApi]?.data?.planning?.name" class="planningPage">
        <planning :plannings-id="route.params.id" :start-date="useFetchStore.state?.data[urlApi]?.data?.planning.start_date" :end-date="useFetchStore.state?.data[urlApi]?.data?.planning.end_date" />
      </div>
      <div v-else-if="useFetchStore.state.error[urlApi]">
        Une erreur est survenue
      </div>

    </div>

    <div class="sidebarPlanning">
      <div class="sidebar-wrapper">
        <sidebar :planningId="route.params.id" :planning="useFetchStore.state.data[urlApi]" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagePlanningLayout {
  @include grid(
    30px 1fr,
    calc(100vw - 350px - 105px - 4rem) 350px,
    "title sidebar"
    "planning sidebar"
  );

  .titlePlanning {
    grid-area: title;

  }

  .contentPlanning {
    grid-area: planning;

    .loading {
      @include flex();
      height: 20vh;

    }

    .planningPage {
      @include flex(flex-start,flex-start,row,nowrap,10px,10px);
      width: 100%;

      .planningContainer {
        width: calc(100% - 350px);

      }

      .actionContainer {
        width: 350px;

      }

    }

  }

  .sidebarPlanning {
    grid-area: sidebar;

    .sidebar-wrapper {
      position: sticky;
      top: 0;

    }

  }

}
</style>