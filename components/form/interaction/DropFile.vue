<script setup>
import File from '~/components/icones/file.vue'
import Error from "~/components/icones/error.vue";

defineProps({
  customId : {
    type : String,
    required: true
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
  <div class="fileDrop">
    <svg class="bg" xmlns="http://www.w3.org/2000/svg" width="238" height="227" viewBox="0 0 238 227" fill="none">
      <path d="M107.868 116.501C107.868 116.501 48.0815 20.0349 90.7907 2.79277C133.5 -14.4432 155.704 52.7647 123.247 111.324C123.247 111.324 160.83 30.3456 201.834 42.417C242.839 54.4822 218.912 118.225 135.198 132.013C135.198 132.013 235.989 118.218 237.688 161.296C239.387 204.368 133.469 192.302 121.518 132.013C121.518 132.013 153.974 237.097 85.6397 225.057C34.4195 216.014 71.4977 164.399 93.2892 139.105C95.597 136.421 92.5877 132.5 89.3937 134.026C62.5497 146.861 11.8772 164.805 1.92613 123.414C-11.7543 66.572 49.7616 66.5721 107.844 116.519L107.868 116.495V116.501Z" fill="#FFEE8C"/>
    </svg>
    <label :for="customId">
      <file />
      <span class="text">Faites glisser votre fichier ici </span>
      <span class="button"> Sélectionner mon fichier </span>
    </label>
    <span v-if="isError" class="errors">
      <error />
      <span v-for="error in errors">{{ error.$message }}</span>
    </span>
    <input type="file" :id="customId" @input="$emit('update:modelValue', $event.target.files)">
  </div>
</template>

<style scoped lang="scss">
.fileDrop {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: fit-content;
  margin: 0 auto;

  .bg {
    position: absolute;
    bottom: 0;
    transform: translate(-25%,25%);

  }

  label {
    @include flex(center,center,column);
    padding: 2.5rem 0;
    @include effect(blur);
    border-radius: 8px;

    .text {
      margin: 1rem 0 1.2rem;

    }

    .button {
      @include interaction(button-primary);
      margin: 0;

    }

  }

  input {
    display: none;

  }

}
</style>