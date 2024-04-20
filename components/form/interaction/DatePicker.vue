<script setup>

import VueDatePicker from "@vuepic/vue-datepicker";
import Error from "~/components/icones/error.vue";

const { $timeFormat } = useNuxtApp()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  customClass : {
    type : String,
    required : false,
    default : ''
  },
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
  modelType : {
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
  defaultValue : {
    type : String,
    required : false,
    default : ''
  },
  modelValue : {}
})

const datePickerData = ref((props.defaultValue) ? props.defaultValue : '')

watch(() => datePickerData.value, (nv,ov) => {
  emit('update:modelValue', nv)
})

function formatTime(date){
  const min =  $timeFormat.renderToDigit(date.getMinutes())
  const h = $timeFormat.renderToDigit(date.getHours())

  return h+'h'+min
}
function formatDay(date){
  const day = $timeFormat.renderToDigit(date.getDate())
  const month = $timeFormat.renderToDigit(date.getMonth() + 1)
  const year = $timeFormat.renderToDigit(date.getFullYear())

  return `Le ${day}/${month}/${year}`
}

</script>

<template>

  <label :class="( isError ) ? 'error '+customClass : customClass ">
    <span class="title fw-600">{{ title }}</span>

    <div class="layoutInput">
      <VueDatePicker
          v-model="datePickerData"
          :model-type="modelType"
          :time-picker="(type === 'time')"
          :format="(type !== 'time') ? formatDay : formatTime"
          auto-apply
      />
    </div>

    <span v-if="isError" class="errors">
      <error />
      <span v-for="error in errors">{{ (error.$message) ? error.$message : error }}</span>
    </span>
  </label>
</template>

<style scoped lang="scss">

label {
  @include flex(flex-start,flex-start,column);
  width: 100%;
  height: 100%;

  .title {
    margin-bottom: 0.5rem;

  }

  .layoutInput {
    position: relative;
    width: 100%;

    svg {
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-100%,-50%);

    }

  }

  &.error {

    input {
      border-color: getColor(error0);

    }

  }

  &.nolabel {

    .title {
      display: none;

    }

  }

  &.tableView {

    .title {
      display: none;

    }

  }

}

</style>