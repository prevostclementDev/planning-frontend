<script setup lang="ts">
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";
import Delete from "~/components/icones/delete.vue";

const useModalStore = useModal()

defineProps({
  modalTitle : {
    type : String,
    required : false,
    default : 'Confirmer la suppression'
  },
  deleteUrl : {
    type : String,
    required : true,
  }
})

</script>

<template>
  <div class="modal">
    <top-modal :title="modalTitle" />
    <content-modal>
      <div class="action around">
        {{ deleteUrl }}
        <Button custom-class="secondary" @click="useModalStore.action[useModalStore.actionType.CLOSE_MODAL]()">annuler</Button>
        <Button custom-class="delete">
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