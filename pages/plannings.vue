<script setup>
import {useFetch} from "~/stores/Fetch.js";
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";
import Add from "~/components/icones/add.vue";
import { usePlanning } from "~/stores/entity/planning.js";
import PlanningCard from "~/components/planning/cards/planningCard.vue";
import {useRouting} from "~/stores/routing.js";

const useRoutingStore = useRouting()
const useModalStore = useModal()
const useFetchStore = useFetch()
const { $toast } = useNuxtApp()
const planningStore = usePlanning()
const useNavBarStore = useNavBar()

useNavBarStore.setNavBar(false)

useHead(() => ({
  title : 'Listes des plannings'
}))

const { state } = storeToRefs(useFetchStore)

onMounted(async () => {
  await planningStore.action[planningStore.actionType.GET_LIST]()
})

function openPlanningModal(){

  const args = {
    title : '',
    class :  '',
    program : '',
    startDate :  '',
    endDate : ''
  }

  planningStore.mutation[planningStore.mutationType.REMOVE_UPDATE]()
  planningStore.mutation[planningStore.mutationType.SET_FORM_DATA](args)

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

    <div v-if="state.error[planningStore.baseUrl]">
      Oups... Une erreur est survenue...
    </div>

    <div class="loader" v-if="state.loading[planningStore.baseUrl]">
      <loader-small-loader custom-class="blue" />
    </div>

    <div class="listes" v-else-if="planningStore.state.list?.data.plannings && planningStore.state.list?.data.plannings.length !== 0">

      <svg width="299" height="231" viewBox="0 0 299 231" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.7349 196.964C53.0674 188.124 62.0277 181.593 68.6064 172.883C96.9581 141.599 91.1302 132.729 85.3208 119.106C81.9668 111.276 78.6129 101.864 81.8192 85.6624C84.57 77.2783 93.0072 73.1232 99.0136 67.343C103.968 62.837 108.195 57.5554 113.703 53.6773C141.833 36.0289 178.198 52.9571 194.789 78.688C204.771 100.331 189.46 106.173 214.759 127.57C229.947 144.597 259.308 134.736 256.853 166.148C254.477 181.187 250.76 191.522 247.474 200.663C242.28 215.092 252.97 230.303 268.299 230.303C277.414 230.303 285.586 224.714 288.915 216.225C292.848 206.197 297.439 193.603 297.974 187.219C299.697 165.791 292.214 144.394 281.728 125.964C271.598 111.492 258.028 98.854 254.299 80.8117C253.825 76.3549 254.022 71.8428 254.231 67.3122C254.527 60.4055 254.822 53.4926 252.699 46.8629C242.865 23.5328 214.611 19.3592 192.888 12.551C176.419 9.01764 159.982 5.26887 143.538 1.60623C129.322 -1.44085 115.636 2.24021 103.125 9.01765C85.9547 15.6289 69.0372 23.5882 53.8489 34.0468C41.0608 45.5395 30.5251 62.7385 30.5497 80.3069C31.5774 103.612 49.3442 125.521 41.1347 149.374C41.1347 149.374 16.4508 172.033 2.78261 202.073C-3.23606 215.302 6.47503 230.321 21.0048 230.321C30.5559 230.321 38.7961 223.563 40.6239 214.181C42.8393 202.812 46.7472 196.958 46.7472 196.958L46.7349 196.964Z" fill="#C4581C"/>
        <path d="M126.313 217.838C138.277 207.225 149.465 193.689 148.536 176.736C149.834 164.148 148.234 150.833 148.136 137.937C153.09 125.397 157.945 146.271 157.619 151.079C157.945 157.235 157.521 163.649 157.065 169.903C155.49 192.279 153.939 212.531 187.294 211.054L191.774 211.085C217.756 211.085 232.551 201.451 218.353 179.678C218.138 179.352 217.923 179.026 217.695 178.706C199.928 165.742 189.417 185.594 187.288 140.51C187.214 136.958 187.411 133.246 187.614 129.491C188.291 115.948 188.992 101.759 177.78 92.3474C162.364 78.8972 134.984 80.5469 123.175 97.9799C110.737 113.615 116.67 135.351 119.322 153.344C119.95 161.131 115.79 168.223 112.867 175.179C107.513 186.887 95.5492 193.418 85.715 200.983C85.715 200.983 70.7114 216.317 91.9921 224.344C113.273 232.371 126.307 217.832 126.307 217.832L126.313 217.838Z" fill="#93C0FF"/>
      </svg>

      <planning-card  v-for="planning in planningStore.state.list?.data.plannings" :planning="planning" />
    </div>
    <div v-else-if="planningStore.state.list?.data.plannings && planningStore.state.list?.data.plannings.length === 0">
      Vous n'avez aucun planning
    </div>

  </div>
</template>

<style scoped lang="scss">
.topTitle {
  @include flex(space-between);
  position: relative;
  z-index: 1;

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

  svg {
    position: absolute;
    left: -6%;
    bottom: -15%;
    transform: rotate(90deg);
    z-index: 0;

  }

  margin: 1.4rem 0;
  @include flex(flex-start,flex-start,row,wrap,20px,20px);
  max-width: 75%;

}
</style>