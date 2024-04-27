<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import {useModal} from "~/stores/ui/modal.js";
import FormClass from "~/components/class/formClass.vue";
import UsersInClass from "~/components/class/users/usersInClass.vue";

const modalStore = useModal()
const activeTabs = ref('general')

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
    <top-modal title="Classes" />
    <content-modal>
      <div class="innerModal">
        <tabs :action="{ general : 'Information général', eleves : 'Élève(s) associé(s)' }" v-model="activeTabs" :default-value="activeTabs" />

        <div class="tabsContainer">
          <form-class
              v-if="activeTabs === 'general'"
              :id="parseInt(data?.id)"
              :name="data?.name"
              :onsuccess="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
              :onfailure="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
          />
          <users-in-class v-if="activeTabs === 'eleves'" :class-data="data" />
        </div>
      </div>

    </content-modal>
  </div>
</template>

<style scoped lang="scss">
</style>