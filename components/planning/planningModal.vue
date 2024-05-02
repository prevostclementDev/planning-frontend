<script setup lang="ts">
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import {useModal} from "~/stores/ui/modal.js";
import FormPlanning from "~/components/planning/form/formPlanning.vue";

const useModalStore = useModal()

defineProps({
  modalTitle : {
    type : String,
    required : false,
    default : ''
  }
})


const handleFirstSubmitValid = () => useModalStore.action[useModalStore.actionType.CLOSE_MODAL]()

</script>

<template>
  <div class="modal">
    <top-modal :title="modalTitle" />
    <content-modal>
      <form-planning :onsubmitvalide="handleFirstSubmitValid" />
    </content-modal>
  </div>
</template>

<style scoped lang="scss">
button {
  margin: 0.8rem 0;

}
</style>