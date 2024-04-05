<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useFetch} from "~/stores/Fetch.js";
import {helpers, maxLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const { $toast } = useNuxtApp()
const useFetchStore = useFetch()

// props
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
  id : {
    type : Number,
    required : false,
  },
  name : {
    type : String,
    required : false
  }
})

// *************************************
// Validation rules for class
// *************************************
const rules = computed(() => {
  return {
    name : {
      required : helpers.withMessage('Le nom est obligatoire', required),
      email : helpers.withMessage('Le nom est trop long', maxLength(255)),
    },
  }
})

// form data
const formData = ref({
  name : (props.name) ? props.name : ''
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(rules,formData)

// Url
let url = 'schoolspaces/class'

// If id exist for update url
if ( props.id ) {
  url+= `/${props.id}`
}

async function submit(){

  await v$.value.$validate()

  if (  !v$.value.$error ) {

    const idToast = $toast.loading('Création de la classe...')

    await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](url , 'POST', formData.value)

    if ( ! useFetchStore.state.error[url] ) {

      $toast.update(idToast, {
        render: 'Création de la classe réussi',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

      props.onsuccess( useFetchStore.state.data[url] )

    } else {

      $toast.update(idToast, {
        render: 'Une erreur est survenue pendant la création de la classe',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

      props.onfailure( useFetchStore.state.data[url] )

    }

  }

}

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)
})
</script>

<template>
  <form action="" @submit.prevent="submit">

      <Input
        placeholder="B3 2024 développement web"
        title="Le nom de votre classe"
        v-model="formData.name"
        :errors="v$.name.$errors"
        :is-error="v$.name.$error"
      />

    <div class="action end">
      <Button :loading="useFetchStore.state.loading[url]" :disabled="useFetchStore.state.loading[url]" type="submit"> Enregistrer </Button>
    </div>

  </form>
</template>

<style scoped lang="scss">
</style>