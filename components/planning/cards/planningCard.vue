<script setup lang="ts">
import Planning from "~/components/icones/planning.vue";
import Button from "~/components/form/interaction/Button.vue";
import Delete from "~/components/icones/delete.vue";
import Update from "~/components/icones/update.vue";
import {useModal} from "~/stores/ui/modal";
import {usePlanningForm} from "~/stores/form/planning";
import {useRouting} from "~/stores/routing";

const useRoutingStore = useRouting()
const usePlanningStore = usePlanningForm()
const useModalStore = useModal()

const props = defineProps({
  planning : {
    type : Object,
    required : true
  },
})

function openPlanningModal(){

  const args = {
    id : ( props.planning.id ) ? props.planning.id : '',
    title : (  props.planning.name ) ? props.planning.name : '',
    class : ( props.planning.id_class ) ? props.planning.id_class : '-1',
    program : ( props.planning.id_programs ) ? props.planning.id_programs : '-1',
    startDate : ( props.planning.start_date ) ? props.planning.start_date : '',
    endDate : ( props.planning.end_date ) ? props.planning.end_date : ''
  }

  usePlanningStore.mutation[usePlanningStore.mutationType.SET_UPDATE]( args.id )

  usePlanningStore.mutation[usePlanningStore.mutationType.SET_FORM_DATA](args)

  useModalStore.mutation[useModalStore.mutationType.SET_PROPS_MODAL]({
    modalTitle : 'Modifier le planning' ,
  })

  useModalStore.action[useModalStore.actionType.OPEN_MODAL]('planningModal')
}
</script>

<template>
  <nuxt-link class="planning" :to="useRoutingStore.url.planningSingle(planning.id)">

    <planning format="lists" />

    <div class="content">
      <h4>{{ planning.name }}</h4>
      <div class="action">
        <Button custom-class="clear" @click.prevent="openPlanningModal()"> <update /> </Button>
        <Button custom-class="clear" @click.prevent="useModalStore.action[useModalStore.actionType.OPEN_CONFIRM_DELETE]('/schoolspaces/planning/'+planning.id)"> <delete /> </Button>
      </div>
    </div>

  </nuxt-link>
</template>

<style scoped lang="scss">
a {
  @include effect(blur);
  @include flex(flex-start,center,row,nowrap,1rem,1rem);
  border-radius: 20px;
  text-decoration: none;
  width: calc(100% / 3 - 20px);
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
</style>