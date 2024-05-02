<script setup>
import Tabs from "~/components/form/interaction/Tabs.vue";
import ActionPanel from "~/components/planning/actionPanel.vue";
import DraggableCourseListe from "~/components/planning/draggableCourseListe.vue";

const displayRightPanel = ref('programs')

const props = defineProps({
  planning : {
    type : Object,
    required : true
  },
  planningId : {
    type : Number,
    required : true
  }
})
</script>

<template>
  <div class="innerSidebarPlanning">
    <Tabs v-model="displayRightPanel" :action="{ programs : 'Maquette pédagogique liée', action : 'Action' }" :default-value="displayRightPanel" />

    <action-panel v-show="displayRightPanel === 'action'" :planning="planning" />
    <draggable-course-liste v-show="displayRightPanel === 'programs'" :id-calendar="planningId" :planning="planning" />
  </div>
</template>

<style scoped lang="scss">
.innerSidebarPlanning {
  height: calc(100vh - 80px);
  padding: 1rem 0 0 1rem;

}
</style>