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

const url = 'schoolspaces/users/import?readOnly=true'

const submitFile = async () => {

  await v$.value.$validate()

  if ( ! v$.value.$error ) {

    const body = new FormData()
    body.append('csv_import',formData.value.file[0]);

    const idToast = $toast.loading('Importation du fichier')

    await useFetchStore.action[useFetchStore.actionType.FETCH_DATA]( url, 'POST', body, {} )

    if ( ! useFetchStore.state.error[url] ) {

      $toast.update(idToast, {
        render: 'Importation réussi',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

      props.onsuccess( useFetchStore.state.data[url] )
    } else {

      props.onfailure( useFetchStore.state.data[url] )

      $toast.update(idToast, {
        render: (useFetchStore.state.data[url].data.details) ? useFetchStore.state.data[url].data.details : 'Nous n\'avons pas réussi a importer votre fichier',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

    }

  }

}

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)
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
      <Button custom-class="stepFormButton" @click.prevent="submitFile">Importer</Button>
    </div>

  </div>
</template>