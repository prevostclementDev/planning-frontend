<script setup>
import ParentsModal from "~/components/modal/parentsModal.vue";
</script>

<template>
  <div id="doriane-app" class="f-s-400 c-text bg-light1">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <parents-modal />
  </div>
</template>
