<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import {useUsers} from "~/stores/entity/users.js";
import {useModal} from "~/stores/ui/modal.js";
import FormUsers from "~/components/users/formUsers.vue";

const useUsersStore = useUsers()
const modal = useModal()

defineProps({
  data : {
    type : Object,
    required : false,
    default : null
  }
})
</script>

<template>
  <div class="modal">
    <top-modal :title="`${( useUsersStore.state.isUpdate ) ? 'Modifier' : 'Ajouter'} l'élève`" />
    <content-modal>
      <form-users :users-data="data" :onfinish="() => modal.action[modal.actionType.CLOSE_MODAL]()" />
    </content-modal>
  </div>
</template>

<style scoped lang="scss">
</style>