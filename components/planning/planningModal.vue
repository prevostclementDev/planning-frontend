<script setup lang="ts">
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";
import FormPlanning from "~/components/planning/formPlanning.vue";

const useModalStore = useModal()

defineProps({
  modalTitle : {
    type : String,
    required : false,
    default : ''
  }
})

</script>

<template>
  <div class="modal">
    <top-modal :title="modalTitle" />
    <content-modal>
      <form-planning :onsubmitvalide="() => useModalStore.action[useModalStore.actionType.CLOSE_MODAL]()" />
    </content-modal>
  </div>
</template>

<style scoped lang="scss">
button {
  margin: 0.8rem 0;

}
</style>