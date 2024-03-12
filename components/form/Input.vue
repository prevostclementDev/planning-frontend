<script setup>
const props = defineProps({
  title : {
    type : String,
    required : false,
    default : ''
  },
  type : {
    type : String,
    required : false,
    default : 'text'
  },
  placeholder : {
    type : String,
    required : false,
    default : ''
  },
  errors : {
    type : Array,
    required : false,
    default : []
  },
  isError : {
    type : Boolean,
    required : false,
    default : false,
  },
  modelValue : {}
})
</script>

<template>
  <label for="">
    <span class="title">{{ title }}</span>

    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >

    <span v-if="isError" class="errors">
      <span v-for="error in errors">{{ error.$message }}</span>
    </span>
  </label>
</template>

<style scoped lang="scss">
</style>