<script setup lang="ts">
const props = defineProps({
  type : {
    type : String,
    required : false,
    default : ''
  }
})
</script>

<template>
  <button :type="type">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
</style>