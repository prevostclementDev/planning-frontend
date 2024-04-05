<script setup>
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
  slot : {
    type : Array,
    required : true
  },
  name : {
    type : String,
    required : true,
  },
  modelValue : {}
})
</script>

<template>
  <div class="radio-list">

    <span class="title fw-600">{{ title }}</span>

    <div class="radioContainer">

      <div v-for="data in slot" class="radio">
        <label :for="data.value">{{ data.text }}</label>
        <input :checked="modelValue === data.value" :id="data.value" :name="name" :value="data.value" type="radio" @input="$emit('update:modelValue', $event.target.value)">
      </div>

    </div>

    <span v-if="isError" class="errors">
      <span v-for="error in errors">{{ error.$message }}</span>
    </span>

  </div>
</template>

<style scoped lang="scss">

.radio-list {
  @include flex(flex-start,flex-start,column);
  width: 100%;
  height: 100%;

  .title {
    margin-bottom: 0.5rem;

  }

  .radioContainer {
    @include flex(flex-start, flex-start);

    & > div {
      @include flex(flex-start, flex-start, row-reverse);

    }

  }

  input {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #BCBEC0;
    background: #FFF;
    padding: .8rem 1.8rem;
    outline: none;

    &:focus {
      outline: 1px solid #BCBEC0;

    }

  }

}

</style>