<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import {useModal} from "~/stores/ui/modal.js";
import FormPrograms from "~/components/programs/formPrograms.vue";
import CourseInPrograms from "~/components/programs/courses/courseInPrograms.vue";

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
    <top-modal :title="data.name" />
    <content-modal>
      <div class="innerModal">
        <tabs :action="{ general : 'Information général', cours : 'Les cours' }" v-model="activeTabs" :default-value="activeTabs" />

        <div class="tabsContainer">
          <form-programs
              v-if="activeTabs === 'general'"
              :id="parseInt(data?.id)"
              :name="data?.name"
              :onsuccess="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
              :onfailure="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
          />
          <course-in-programs v-if="activeTabs === 'cours'" :program="data" />
        </div>
      </div>

    </content-modal>
  </div>
</template>

<style scoped lang="scss">
</style>