<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {usePlanning} from "~/stores/entity/planning.js";
import {useFetch} from "~/stores/Fetch.js";
import {helpers, maxLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import SearchSelect from "~/components/form/interaction/searchSelect.vue";
import DatePicker from "~/components/form/interaction/DatePicker.vue";
import {useModal} from "~/stores/ui/modal.js";
import Info from "~/components/icones/info.vue";

const planningStore = usePlanning()
const useFetchStore = useFetch()

const props = defineProps({
  onsubmitvalide : {
    type : Function,
    required : false,
    default : () => { console.log('finish') }
  }
})

// *****************
// Validation rules
// *****************
const rules = computed(() => {

  return {
    title : {
      required : helpers.withMessage('Le titre est obligatoire', required),
      email : helpers.withMessage('Le nom est trop long', maxLength(255)),
    },
    startDate : {
      required : helpers.withMessage('Champ requis', required),
    },
    endDate : {
      required : helpers.withMessage('Champ requis', required),
    },
  }

})

const v$ = useVuelidate(
    rules,
    planningStore.state.formData
)

// If class is already set get name
const className = ref('')
if ( planningStore.state.formData.class && planningStore.state.formData.class !== "0" ) {

  const urlGetClass = 'schoolspaces/class/'+planningStore.state.formData.class;

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](urlGetClass)

  if ( useFetchStore.state.error[urlGetClass] ) {
    className.value = 'Erreur de récupération'
  } else {
    className.value = useFetchStore.state.data[urlGetClass].data[0].name
  }

  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](urlGetClass)

}

// on submit
async function submit(e){

  await v$.value.$validate()

  if ( ! v$.value.$error ) {

    const status = await planningStore.action[planningStore.actionType.SEND_FORM]()

    if ( status ) {

      props.onsubmitvalide()

    }

  }

}
</script>

<template>
  <form>

    <div class="input-container">

      <Input
          placeholder="B3 - 2024/2025"
          title="Nom du planning"
          v-model="planningStore.state.formData.title"
          :is-error="v$.title.$error"
          :errors="v$.title.$errors"
      />

      <div class="group">

        <div class="containerToolsTips">
          <tooltips text="Valeur non obligatoire, peut être attribuée plus tard"><info /></tooltips>
        </div>

        <search-select
            title="Choisissez une classe ?"
            url="schoolspaces/class"
            :display-array="[ 'name' ]"
            v-model="planningStore.state.formData.class"
            :default-value="className"
        />

      </div>

      <div class="group" v-if="! planningStore.state.isUpdate">
        <div class="containerToolsTips">
          <tooltips :text="'Si vous n\'ajoutez pas de maquette pédagogique, une maquette vide serra créée avec le nom suivant : ' + planningStore.state.formData.title + '_maquette_peda'  "><info /></tooltips>
        </div>

        <search-select
            title="Choisissez une maquette pédagogique ?"
            url="schoolspaces/programs"
            :display-array="[ 'name' ]"
            v-model="planningStore.state.formData.program"
        />
      </div>

      <div class="group">

        <date-picker
            type="date"
            title="Date de départ"
            v-model="planningStore.state.formData.startDate"
            :default-value="planningStore.state.formData.startDate"
            :is-error="v$.startDate.$error"
            :errors="v$.startDate.$errors"
        />

        <date-picker
            type="date"
            title="Date de fin"
            v-model="planningStore.state.formData.endDate"
            :default-value="planningStore.state.formData.endDate"
            :is-error="v$.endDate.$error"
            :errors="v$.endDate.$errors"
        />

      </div>

      <div class="action end">
        <Button @click.prevent="submit">
          {{ ( planningStore.state.isUpdate ) ? 'Modifier' : 'Ajouter' }}
        </Button>
      </div>

    </div>

  </form>
</template>