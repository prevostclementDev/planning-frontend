<script setup>
import {useFetch} from "~/stores/Fetch.js";
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";
import Add from "~/components/icones/add.vue";
import {usePlanningForm} from "~/stores/form/planning.js";
import PlanningCard from "~/components/planning/cards/planningCard.vue";
import {useRouting} from "~/stores/routing.js";

const useRoutingStore = useRouting()
const usePlanningStore = usePlanningForm()
const useModalStore = useModal()
const useFetchStore = useFetch()
const { $toast } = useNuxtApp()

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(false)

useHead(() => ({
  title : 'Listes des plannings'
}))

const urlPlannings = '/schoolspaces/plannings'

const { state } = storeToRefs(useFetchStore)

onMounted(async () => {
  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](urlPlannings)

  if ( useFetchStore.state.error[urlPlannings] ) {
    $toast.error('Impossible de charger les plannings')
  }

})

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](urlPlannings)
})

function openPlanningModal(){

  const args = {
    title : '',
    class :  '-1',
    program : '-1',
    startDate :  '',
    endDate : ''
  }

  usePlanningStore.mutation[usePlanningStore.mutationType.REMOVE_UPDATE]()
  usePlanningStore.mutation[usePlanningStore.mutationType.SET_FORM_DATA](args)

  useModalStore.mutation[useModalStore.mutationType.SET_PROPS_MODAL]({
    modalTitle : 'Ajouter un planning' ,
  })

  useModalStore.action[useModalStore.actionType.OPEN_MODAL]('planningModal')
}
</script>

<template>
  <div class="listes-plannings">
      <ariane :links="[
          { text : 'Dashboard', url : useRoutingStore.url.dashboard  },
          { text : 'Mes plannings'}
          ]"
      />

    <div class="topTitle">
      <h2>Mes plannings</h2>
      <Button @click.prevent="openPlanningModal">
        <add />
        Créer un planning
      </Button>
    </div>

    <div v-if="state.error[urlPlannings]">
      Oups... Une erreur est survenue...
    </div>

    <div class="loader" v-if="state.loading[urlPlannings]">
      <loader-small-loader custom-class="blue" />
    </div>

    <div class="listes" v-if="state.data[urlPlannings]?.data.plannings">
      <planning-card  v-for="planning in state.data[urlPlannings].data.plannings"  :planning="planning" />
    </div>

  </div>
</template>

<style scoped lang="scss">
.topTitle {
  @include flex(space-between);

  button {
    margin: 0;

  }

}

.loader {
  @include flex();
  width: 100%;
  height: 30vh;

}

.listes {
  margin: 1.4rem 0;
  @include flex(flex-start,flex-start,row,wrap,20px,20px);
  max-width: 70%;

}
</style>