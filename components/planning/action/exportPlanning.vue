<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Export from "~/components/icones/export.vue";
import {useFetch} from "~/stores/Fetch.js";

const props = defineProps({
  planningId : {
    type : Number,
    required : true
  }
})

const fetchStore = useFetch()
const isLoading = ref(false)
const downloadElement = ref(null);
let url = `schoolspaces/plannings/${props.planningId}/export`

watch( () => props.planningId, (nv,ov) => {
  url = `schoolspaces/plannings/${props.planningId}/export`
})

const handleExport = async () => {

  if ( props.planningId ) {

    isLoading.value = true

    await fetchStore.action[fetchStore.actionType.FETCH_DATA](
        url,
        'POST'
    )

    downloadElement.value.click()

    isLoading.value = false

  }

}

</script>

<template>
  <div class="exports">
    <Button :loading="fetchStore.state.loading[url]" :disabled="fetchStore.state.loading[url]" custom-class="small" @click.prevent="handleExport">
      <span>Exporter</span>
      <export v-if="fetchStore.state.loading[url] === false || typeof fetchStore.state.loading[url] === 'undefined'" />
    </Button>

    <a class="downloadElement" ref="downloadElement" :href="fetchStore.state.data[url]?.data.document_uri" download>Télécharger le fichier</a>

    <div class="result">

      <div class="errors" v-if="fetchStore.state.error[url]">
        Une erreur est survenu
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
.exports {

  .result {
    margin-top: 1rem;

  }

  .downloadElement {
    display: none;

  }

  button  {

    span {
      margin-right: .5rem;

    }

  }

}
</style>