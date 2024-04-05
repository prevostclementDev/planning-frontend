<script setup>
import UpdateViewPlanning from "~/components/planning/action/updateViewPlanning.vue";
</script>

<template>
  <div class="actionPanel">

    <div class="action">
      <h5 class="h4">Changer la vue du planning</h5>
      <update-view-planning />
    </div>

  </div>
</template>

<style scoped lang="scss">
.actionPanel {
  padding: 1rem;

  .action {
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