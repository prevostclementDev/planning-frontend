<script setup>
import UpdateViewPlanning from "~/components/planning/action/updateViewPlanning.vue";
import UpdateStatus from "~/components/planning/action/updateStatus.vue";

defineProps({
  planning : {
    type : Object,
    required : true
  }
})
</script>

<template>
  <div class="actionPanel">

    <div class="action-wrapper">
      <h5 class="h4">Changer le status</h5>
      <update-status :planning="planning" />
    </div>

    <div class="action-wrapper">
      <h5 class="h4">Changer la vue du planning</h5>
      <update-view-planning />
    </div>

  </div>
</template>

<style scoped lang="scss">
.actionPanel {
  padding: 1rem;

  .action-wrapper {
    margin: 1rem 0;
    padding-bottom: 1rem;

    h5 {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid getColor(grey8);
      margin-bottom: 0.5rem;

    }

  }

}
</style>