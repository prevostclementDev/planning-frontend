<script setup>
import { useModal } from '~/stores/ui/modal.js'
import UpdateUsers from "~/components/modal/child/updateUsers.vue";
import PlanningModal from "~/components/modal/child/planningModal.vue";
import ConfirmDelete from "~/components/modal/child/confirmDelete.vue";
const modalStore = useModal();

function closeModalOnClickParent(e) {

  if ( e.target.getAttribute('id') === 'parent-modal' ) {
    modalStore.action[modalStore.actionType.CLOSE_MODAL]()
  }

}

</script>

<template>
  <transition name="fade">
    <div id="parent-modal" v-if="modalStore.state.openModal !== ''" @click.prevent="closeModalOnClickParent">

      <update-users v-if="modalStore.state.openModal === 'updateUsers'" v-bind="modalStore.state.propsModal"/>
      <planning-modal v-else-if="modalStore.state.openModal === 'planningModal'" v-bind="modalStore.state.propsModal" />
      <loader-small-loader v-else-if="modalStore.state.openModal === 'loading'" custom-class="full" />
      <confirm-delete v-else-if="modalStore.state.openModal === 'delete'" v-bind="modalStore.state.propsModal"/>

    </div>
  </transition>
</template>

<style scoped lang="scss">
#parent-modal {

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100svw;
  height: 100svh;
  @include bgColor(primary4,.5);
  @include flex();

}
</style>