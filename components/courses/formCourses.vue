<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useFetch} from "~/stores/Fetch.js";
import {helpers, maxLength, numeric, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useCourse} from "~/stores/entity/cours.js";
import {ColorPicker} from "vue3-colorpicker";

const { $toast, $timeFormat } = useNuxtApp()
const useFetchStore = useFetch()
const courseStore = useCourse()

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
  data : {
    type : Object,
    required : false,
    default : {}
  }
})

// Url
let url = courseStore.baseUrl

// If id exist for update url
if ( props.data.id ) {
  url+= `/${props.data.id}`

  courseStore.mutation[courseStore.mutationType.SET_UPDATE](props.data.id)
  courseStore.mutation[courseStore.mutationType.SET_FORM_DATA]({
    name: props.data.name,
    hours_required: (props.data.hours_required) ? props.data.hours_required.split(':')[0] : null,
    color: props.data.color,
  })

} else {

  courseStore.mutation[courseStore.mutationType.REMOVE_UPDATE]()
  courseStore.mutation[courseStore.mutationType.SET_FORM_DATA]({
    name: '',
    hours_required: '',
    color:  "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"),
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
    hours_required : {
      number : helpers.withMessage('Doit être un nombre', numeric)
    }
  }
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(
    rules,
    courseStore.state.formData
)

async function submit(){

  await v$.value.$validate()

  if (  !v$.value.$error ) {


    if ( await courseStore.action[courseStore.actionType.SEND_FORM]() ) {

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
          placeholder="Mathématique, francais etc..."
          title="Le nom du cours"
          v-model="courseStore.state.formData.name"
          :errors="v$.name.$errors"
          :is-error="v$.name.$error"
      />

      <Input
        type="number"
        title="Le nombres d'heures requises"
        v-model="courseStore.state.formData.hours_required"
        :errors="v$.hours_required.$errors"
        :is-error="v$.hours_required.$error"
      />

      <div class="input-container">
        <p class="title fw-600">Couleur sur le planning</p>
        <div class="colorPicker">
          <color-picker
              v-model:pureColor="courseStore.state.formData.color"
          />
        </div>
      </div>


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
.colorPicker {
  width: 50%;

}
</style>