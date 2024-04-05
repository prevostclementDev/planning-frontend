<script setup lang="ts">
import SmallLoader from "~/components/loader/smallLoader.vue";

const props = defineProps({
  type : {
    type : String,
    required : false,
    default : ''
  },
  customClass : {
    type : String,
    required : false,
    default : ''
  },
  loading : {
    type : Boolean,
    required: false,
    default : false,
  }
})
</script>

<template>
  <button :class="customClass" :type="type" :disabled="loading">
    <small-loader v-if="loading"></small-loader>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  @include interaction(button-primary);
  @include flex();

  &.clear {
    @include interaction(clear);

  }

  &.small {
    @include interaction(button-primary-small)

  }

  svg {
    margin-right: 10px;

  }

}
</style>