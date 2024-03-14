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
button {

  padding: .5rem 3rem;
  outline: none;
  border: 1px solid #000;
  background-color: #000000;
  color: #FFFFFF;
  border-radius: 6px;
  font-weight: 600;
  margin: 1.8rem 0;
  cursor: pointer;

}
</style>