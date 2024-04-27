<script setup lang="ts">
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import FormUsers from "~/components/users/formUsers.vue";
import Skills from "~/components/users/teachers/skills.vue";

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
    <top-modal :title="data.first_name + ' ' + data.last_name" />
    <content-modal>
      <div class="innerModal">
        <tabs :action="{ general : 'Information général', skill : 'Cours associé(s)' }" :default-value="activeTabs" v-model="activeTabs"></tabs>

        <div class="tabsContainer">
          <form-users v-if="activeTabs === 'general'" :users-data="data" :onfinish="() => {}" />
          <skills v-if="activeTabs === 'skill'" :teacher-data="data" />
        </div>

      </div>
    </content-modal>
  </div>
</template>

<style scoped lang="scss">
</style>