<script setup>
import {useFetch} from "~/stores/Fetch.js";
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import Planning from "~/components/icones/planning.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";
import Add from "~/components/icones/add.vue";
import Update from "~/components/icones/update.vue";
import Delete from "~/components/icones/delete.vue";
import {usePlanningForm} from "~/stores/form/planning.js";

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

function openPlanningModal(data = null){

  const args = {
    title : ( data.name ) ? data.name : '',
    class : ( data.id_class ) ? data.id_class : '-1',
    program : ( data.id_programs ) ? data.id_programs : '-1',
    startDate : ( data.start_date ) ? data.start_date : '',
    endDate : ( data.end_date ) ? data.end_date : ''
  }

  if ( data.id ) {
    args.id = data.id
    usePlanningStore.mutation[usePlanningStore.mutationType.SET_UPDATE]( args.id )
  } else {
    usePlanningStore.mutation[usePlanningStore.mutationType.REMOVE_UPDATE]()
  }

  usePlanningStore.mutation[usePlanningStore.mutationType.SET_FORM_DATA](args)

  useModalStore.mutation[useModalStore.mutationType.SET_PROPS_MODAL]({
    modalTitle : ( data.id ) ? 'Modifier le planning' : 'Ajouter un planning' ,
  })

  useModalStore.action[useModalStore.actionType.OPEN_MODAL]('planningModal')
}
</script>

<template>
  <div class="listes-plannings">
      <ariane :links="[{ text : 'Dashboard', url : '/' }, {text : 'Mes plannings'}]" />

    <div class="topTitle">
      <h2>Mes plannings</h2>
      <Button @click.prevent="openPlanningModal">
        <add />
        Créer un planning
      </Button>
    </div>

    <div v-if="state?.error[urlPlannings]">
      Oups... Une erreur est survenue...
    </div>

    <div class="listes" v-if="state?.data[urlPlannings]?.data.plannings">
      <nuxt-link class="planning" v-for="planning in state.data[urlPlannings].data.plannings" :to="`/planning/${planning.id}`">

        <planning format="lists" />

        <div class="content">
          <h4>{{ planning.name }}</h4>
          <div class="action">
            <Button custom-class="clear" @click.prevent="openPlanningModal(planning)"> <update /> </Button>
            <Button custom-class="clear" @click.prevent="console.log('delete')"> <delete /> </Button>
          </div>
        </div>

      </nuxt-link>
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

.listes {
  margin: 1.4rem 0;
  @include flex(flex-start,flex-start,row,wrap,20px,20px);

  a {
    @include effect(blur);
    @include flex(center,center,row,nowrap,1rem,1rem);
    border-radius: 20px;
    text-decoration: none;
    width: fit-content;
    padding: 2rem;
    transition: .3s ease-in-out all;

    .content {

      .action {
        margin-top: 8px;
        @include flex(flex-start,flex-start,row,nowrap,5px,5px);

      }

    }

    &:hover {
      background: getColor(light3);

    }

  }

}
</style>