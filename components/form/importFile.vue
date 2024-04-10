<script setup>
import Button from "~/components/form/interaction/Button.vue";
import DropFile from '~/components/form/interaction/DropFile.vue'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import {useFetch} from "~/stores/Fetch.js";

const { $toast } = useNuxtApp()
const useFetchStore = useFetch()

const props = defineProps({
  onsuccess : {
    type : Function,
    required: false,
    default : (apiResult) => {}
  },
  onfailure : {
    type : Function,
    required: false,
    default : (apiResult) => {}
  },
  url : {
    type : String,
    default : '',
    required: true,
  }
})

const formData = ref({
  file : null
})

const rules = computed(() => {
  return {
    file : {
      required : helpers.withMessage('fichier requis', required)
    }
  }
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(rules,formData)

const submitFile = async () => {

  await v$.value.$validate()

  if ( ! v$.value.$error ) {

    const body = new FormData()
    body.append('csv_import',formData.value.file[0]);

    const idToast = $toast.loading('Importation du fichier')

    await useFetchStore.action[useFetchStore.actionType.FETCH_DATA]( props.url, 'POST', body, {} )

    if ( ! useFetchStore.state.error[props.url] ) {

      $toast.update(idToast, {
        render: 'Importation réussi',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

      props.onsuccess( useFetchStore.state.data[props.url] )
    } else {

      props.onfailure( useFetchStore.state.data[props.url] )

      $toast.update(idToast, {
        render: (useFetchStore.state.data[props.url].data.details) ? useFetchStore.state.data[props.url].data.details : 'Nous n\'avons pas réussi a importer votre fichier',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

    }

  }

}

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](props.url)
})
</script>

<template>
  <div class="step">

    <DropFile
        custom-id="importation_listes"
        v-model="formData.file"
        :is-error="v$.file.$error"
        :errors="v$.file.$errors"
    />

    <div class="action end">
      <Button :loading="useFetchStore.state.loading[url]" :disabled="useFetchStore.state.loading[url]" custom-class="stepFormButton" @click.prevent="submitFile">Importer</Button>
    </div>

  </div>
</template>