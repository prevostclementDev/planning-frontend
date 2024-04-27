<script setup>
import Error from "~/components/icones/error.vue";

const props = defineProps({
  customClass : {
    type : String,
    required : false,
    default : ''
  },
  inputName : {
    type : String,
    required : false,
    default : ''
  },
  inputId : {
    type: String,
    default : '',
    required : false,
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
  defaultValue : {
    type : String,
    required : false,
    default : ''
  },
  disabled : {
    type : Boolean,
    required : false,
    default : false
  },
  onfocusin : {
    type : Function,
    default : () => {},
    required : false
  },
  onfocusout : {
    type : Function,
    default : () => {},
    required : false
  },
  modelValue : {}
})

const refType = ref(props.type);

</script>

<template>
  <label :for="inputId" :class="( isError ) ? 'error '+ customClass : customClass ">
    <span class="title fw-600">{{ title }}</span>

    <div class="layoutInput">
      <input
          :name="inputName"
          :id="inputId"
          :type="(type === 'password') ? refType : type"
          :placeholder="placeholder"
          :value="(defaultValue !== '') ? defaultValue :modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :disabled="disabled"
          @focusin="onfocusin"
          @focusout="onfocusout"
      >
      <div class="action" v-if="props.type === 'password'">
        <svg v-if="refType === 'password'" @click="refType = 'text'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5.25C4.5 5.25 1.5 12.0007 1.5 12.0007C1.5 12.0007 4.5 18.75 12 18.75C19.5 18.75 22.5 12.0007 22.5 12.0007C22.5 12.0007 19.5 5.25 12 5.25Z" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-if="refType === 'text'" @click="refType = 'password'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18.8594 11.9375L20.9978 15.6414" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.4531 13.9922L15.12 17.7744" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.53421 13.9922L8.86719 17.7751" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.14092 11.9297L2.99219 15.6514" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 9.83594C4.57617 11.7869 7.4657 14.2539 12.0001 14.2539C16.5344 14.2539 19.4239 11.7869 21.0001 9.83596" stroke="#09090A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <span v-if="isError" class="errors">
      <error />
      <span>{{ (errors[0].$message) ? errors[0].$message : errors[0] }}</span>
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

  input {
    @include interaction(input);
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

    input {
      border-radius: 4px;

    }

  }

}

</style>