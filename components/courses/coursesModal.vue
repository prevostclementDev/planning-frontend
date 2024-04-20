<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import {useModal} from "~/stores/ui/modal.js";
import FormCourses from "~/components/courses/formCourses.vue";

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
        <tabs :action="{ general : 'Information général', intervenant : 'Intervenant(s) associé(s)' }" v-model="activeTabs" :default-value="activeTabs" />

        <div class="tabsContainer">
          <form-courses
              v-if="activeTabs === 'general'"
              :data="data"
              :onsuccess="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
              :onfailure="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
          />
        </div>
      </div>

    </content-modal>
  </div>
</template>

<style scoped lang="scss">
</style>