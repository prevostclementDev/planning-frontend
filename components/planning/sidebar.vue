<script setup>
import Tabs from "~/components/form/interaction/Tabs.vue";
import ActionPanel from "~/components/planning/actionPanel.vue";
import DraggableCourseListe from "~/components/planning/draggableCourseListe.vue";

const displayRightPanel = ref('programs')

const props = defineProps({
  planningId : {
    type : Number,
    required : true
  }
})
</script>

<template>
  <div class="sidebarPlanning">
    <Tabs v-model="displayRightPanel" :action="{ programs : 'Le programme', action : 'Action' }" :default-value="displayRightPanel" />

    <action-panel v-show="displayRightPanel === 'action'" />
    <draggable-course-liste v-show="displayRightPanel === 'programs'" :id-calendar="planningId" />
  </div>
</template>

<style scoped lang="scss">
.sidebarPlanning {
}
</style>