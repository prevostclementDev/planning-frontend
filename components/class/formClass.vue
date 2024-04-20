<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useFetch} from "~/stores/Fetch.js";
import {helpers, maxLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useClass} from "~/stores/entity/class.js";

const { $toast } = useNuxtApp()
const useFetchStore = useFetch()
const classStore = useClass()

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
let url = classStore.baseUrl

// If id exist for update url
if ( props.id ) {
  url+= `/${props.id}`

  classStore.mutation[classStore.mutationType.SET_UPDATE](props.id)
  classStore.mutation[classStore.mutationType.SET_FORM_DATA]({
    name : props.name
  })

} else {

  classStore.mutation[classStore.mutationType.REMOVE_UPDATE]()
  classStore.mutation[classStore.mutationType.SET_FORM_DATA]({
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
    classStore.state.formData
)

async function submit(){

  await v$.value.$validate()

  if (  !v$.value.$error ) {


    if ( await classStore.action[classStore.actionType.SEND_FORM]() ) {

      props.onsuccess( useFetchStore.state.data[url] )

    } else {

      props.onfailure( useFetchStore.state.data[url] )

    }

  }

}
</script>

<template>
  <form>

    <div class="input-container">
      <Input
          placeholder="B3 2024 développement web"
          title="Le nom de votre classe"
          v-model="classStore.state.formData.name"
          :errors="v$.name.$errors"
          :is-error="v$.name.$error"
      />
    </div>

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