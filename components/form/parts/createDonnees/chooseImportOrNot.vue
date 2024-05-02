<script setup>
import Button from "~/components/form/interaction/Button.vue";
import importFile from "~/components/form/importFile.vue";

const isImport = ref(false)

const props = defineProps({
  onChoose : {
    type : Function,
    default : (choice) => { console.log(choice) },
    required : false,
  },
  onImportSuccess : {
    type : Function,
    default : (data) => {},
    required: false,
  },
  importUrl : {
    type : String,
    required : true
  },
  linkDefaultFile : {
    type : String,
    default : ''
  }
})
</script>

<template>
  <div class="chooseImport" v-if="isImport === false">

    <Button @click.prevent="isImport = true">Depuis un fichier CSV</Button>
    <Button @click.prevent="onChoose('table')">Sans fichier CSV</Button>

    <div class="action">
      <nuxt-link to="/listes">Ne pas continuer</nuxt-link>
    </div>

  </div>
  <div v-else>
    <import-file :onsuccess="(data) => onImportSuccess(data)"  :url="importUrl" :link-default-file="linkDefaultFile"/>

    <div class="action">
      <nuxt-link @click.prevent="onChoose('table')">Ne pas importer de fichier</nuxt-link>
    </div>

  </div>
</template>

<style scoped lang="scss">
.chooseImport {
  @include flex(center,center,row,wrap,1rem,1rem);

  .action {
    width: 100%;

  }

}
</style>