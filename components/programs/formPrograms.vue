<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useFetch} from "~/stores/Fetch.js";
import {helpers, maxLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {usePrograms} from "~/stores/entity/programs.js";

const { $toast } = useNuxtApp()
const useFetchStore = useFetch()
const programStore = usePrograms()

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
    required : false,
    default : ''
  }
})

// Url
let url = programStore.baseUrl

// If id exist for update url
if ( props.id ) {
  url+= `/${props.id}`

  programStore.mutation[programStore.mutationType.SET_UPDATE](props.id)
  programStore.mutation[programStore.mutationType.SET_FORM_DATA]({
    name : props.name
  })

} else {

  programStore.mutation[programStore.mutationType.REMOVE_UPDATE]()
  programStore.mutation[programStore.mutationType.SET_FORM_DATA]({
    name : ''
  })

}

// *************************************
// Validation rules for class
// *************************************
const rules = computed(() => {
  return {
    name : {
      required : helpers.withMessage('Le nom est obligatoire', required),
      lenght : helpers.withMessage('Le nom est trop long', maxLength(255)),
    },
  }
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(
    rules,
    programStore.state.formData
)

async function submit(){

  await v$.value.$validate()

  if (  !v$.value.$error ) {


    if ( await programStore.action[programStore.actionType.SEND_FORM]() ) {

      props.onsuccess( useFetchStore.state.data[url] )

    } else {

      props.onfailure( useFetchStore.state.data[url] )

    }

  }

}
</script>

<template>
  <form>
    <Input
        placeholder="choisir un nom..."
        title="Le nom de votre maquette pédagogique"
        v-model="programStore.state.formData.name"
        :errors="v$.name.$errors"
        :is-error="v$.name.$error"
    />

    <div class="action end">
      <Button
          :loading="useFetchStore.state.loading[url]"
          :disabled="useFetchStore.state.loading[url]"
          type="submit"
          @click.prevent="submit"
      > Enregistrer </Button>
    </div>

  </form>
</template>

<style scoped lang="scss">
</style>