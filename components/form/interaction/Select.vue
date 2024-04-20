<script setup>
import Error from "~/components/icones/error.vue";

const props = defineProps({
  title : {
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
  disabled : {
    type: Boolean,
    required : false,
    default : false
  },
  loading : {
    type : Boolean,
    required : false,
    default : false,
  },
  customClass : {
    type : String,
    default : '',
    required: false,
  },
  modelValue : {}
})
</script>

<template>
  <div :class="(customClass) ? 'selectContainer ' + customClass : 'selectContainer' ">
    <span class="title fw-600">{{ title }}</span>

    <div class="containsSelect">
      <select
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :disabled="disabled"
      >
        <slot></slot>
      </select>
      <loader-small-loader v-if="loading" custom-class="blue" />
    </div>

    <span v-if="isError" class="errors">
      <error />
      <span v-for="error in errors">{{ error.$message }}</span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.selectContainer {
  @include flex(flex-start,flex-start,column);
  width: 100%;
  height: 100%;

  .title {
    margin-bottom: 0.5rem;

  }

  .containsSelect {
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);

    }

    select {
      @include interaction(input);

    }

  }


  &.tableView {

    .title {
      display: none;

    }

    .containsSelect {

      select {
        border-radius: 4px;

      }

    }

  }

  &.error {

    select {
      border-color: getColor(error0);

    }

  }

  &.notitle {

    .title {
      display: none;

    }

  }

}

</style>