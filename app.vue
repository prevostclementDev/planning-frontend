<script setup>
import ParentsModal from "~/components/modal/parentsModal.vue";
</script>

<template>
  <div id="doriane-app" class="f-s-400 c-text bg-light1">
    <parents-modal />
    <NuxtLoadingIndicator throttle="0" color="#93c0ff" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
