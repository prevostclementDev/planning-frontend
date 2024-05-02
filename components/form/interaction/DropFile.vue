<script setup>
import Error from "~/components/icones/error.vue";
import Folder from "~/components/icones/folder.vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
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

const isDragOver = ref(false);

const onDropFile = (e) => {
  isDragOver.value = false

  let data = ( e.dataTransfer.items ) ? e.dataTransfer.items : e.dataTransfer.files
  let file = null;

  [...data].forEach((item, i) => {
    if ( e.dataTransfer.items && item.kind === "file") {
      file = item.getAsFile();
    } else if ( e.dataTransfer.files ) {
      file = item
    }
  });

  if ( file ) {

    const files = new DataTransfer();
    files.items.add(file);
    emit('update:modelValue', files.files);

  }

}
</script>

<template>
  <div
      :class="(isDragOver) ? 'isdroppable fileDrop' : 'fileDrop'"
      @dragenter.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @dragover.prevent=""
      @drop.prevent="onDropFile" >

    <label :for="customId">
      <folder type="full" />
      <span class="text"> {{ (modelValue) ? modelValue[0].name : 'Faites glisser votre fichier ici' }} </span>
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

  &.isdroppable {
    border-radius: 12px;
    outline: 2px dashed getColor(primary4);

  }

  .bg {
    position: absolute;
    bottom: 0;
    transform: translate(-25%,25%);

  }

  label {
    @include flex(center,center,column);
    padding: 2.5rem 0;
    @include effect(blur);
    @include bgColor(primary2,0.1);
    border-radius: 12px;

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