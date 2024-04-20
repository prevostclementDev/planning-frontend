<script setup lang="ts">
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";
import { useFetch } from "~/stores/Fetch";
import Delete from "~/components/icones/delete.vue";

const { $toast } = useNuxtApp()
const useModalStore = useModal()
const useFetchStore = useFetch()

const props = defineProps({
  modalTitle : {
    type : String,
    required : false,
    default : 'Confirmer la suppression'
  },
  deleteUrl : {
    type : String,
    required : true,
  },
  ondelete : {
    type : Function,
    required : false,
    default : (params) => { console.log(params) }
  },
  ondeleteparams : {
    type : String,
    required : false,
    default : null
  }
})

async function removeElement(){

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](props.deleteUrl,'DELETE')

  if ( useFetchStore.state.error[props.deleteUrl] ) {
    useModalStore.action[useModalStore.actionType.CLOSE_MODAL]()
    $toast.error('Une erreur est survenue pendant la suppression')
  } else {

    props.ondelete(props.ondeleteparams)
    $toast.success('Suppression avec succès')
  }

}

</script>

<template>
  <div class="modal">
    <top-modal :title="modalTitle" />
    <content-modal>
      <div class="action around">
        <Button custom-class="secondary" @click="useModalStore.action[useModalStore.actionType.CLOSE_MODAL]()">annuler</Button>
        <Button :loading="useFetchStore.state.loading[props.deleteUrl]" custom-class="delete" @click.prevent="removeElement">
          <span>Supprimer</span>
          <delete type="white" />
        </Button>
      </div>

    </content-modal>
  </div>
</template>

<style scoped lang="scss">
button {
  margin: 0.8rem 0;

  span {
    margin-right: 0.5rem;

  }

}
</style>