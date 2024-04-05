<script setup>
import Select from "~/components/form/interaction/Select.vue";
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {usePlanningForm} from "~/stores/form/planning";
import {useFetch} from "~/stores/Fetch";
import {helpers, maxLength, not, required, sameAs} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const usePlanningStore = usePlanningForm()
const useFetchStore = useFetch()

const urlPrograms = 'schoolspaces/programs'
const urlClass = 'schoolspaces/class'

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
    class : {
      required : helpers.withMessage('Choisissez un valeur', not(sameAs("-1"))),
    },
    program : {
      required : helpers.withMessage('Choisissez un valeur', not(sameAs("-1"))),
    },
    startDate : {
      required : helpers.withMessage('Champ requis', required),
    },
    endDate : {
      required : helpers.withMessage('Champ requis', required),
    },
  }
})

const v$ = useVuelidate(rules,usePlanningStore.state.formData)

async function submit(e){

  await v$.value.$validate()

  if ( ! v$.value.$error ) {

    if ( await usePlanningStore.action[usePlanningStore.actionType.SEND_FORM]() ) {

      props.onsubmitvalide()

    }


  }

}

onMounted(() => {

  useFetchStore.action[useFetchStore.actionType.FETCH_DATA](urlPrograms)
  useFetchStore.action[useFetchStore.actionType.FETCH_DATA](urlClass)

})
</script>

<template>
  <form>

    <div class="input-container">

      <Input
          placeholder="B3 - 2024/2025"
          title="Nom du planning"
          v-model="usePlanningStore.state.formData.title"
          :is-error="v$.title.$error"
          :errors="v$.title.$errors"
      />

      <div class="group">

        <Select
            title="Choisissez une classe ?"
            v-model="usePlanningStore.state.formData.class"
            :loading="( useFetchStore.state.loading[urlClass] ) ? useFetchStore.state.loading[urlClass] : false"
            :disabled="( useFetchStore.state.loading[urlClass] ) ? useFetchStore.state.loading[urlClass] : false"
            :is-error="v$.class.$error"
            :errors="v$.class.$errors"
        >
          <option value="-1"> ---- Veuillez choisir une classe ---- </option>
          <option
              v-if="useFetchStore?.state?.data[urlClass]?.data?.array"
              v-for="fetchClass in useFetchStore.state.data[urlClass].data.array"
              :value="fetchClass.id"
          > {{ fetchClass.name }}</option>

        </Select>

        <Select
            title="Choisissez un programme ?"
            v-model="usePlanningStore.state.formData.program"
            v-if="! usePlanningStore.state.isUpdate"
            :loading="( useFetchStore.state.loading[urlPrograms] ) ? useFetchStore.state.loading[urlPrograms] : false"
            :disabled="( useFetchStore.state.loading[urlPrograms] ) ? useFetchStore.state.loading[urlPrograms] : false"
            :is-error="v$.program.$error"
            :errors="v$.program.$errors"
        >
          <option value="-1"> ---- Veuillez choisir un programme ---- </option>
          <option
              v-if="useFetchStore?.state?.data[urlPrograms]?.data?.array"
              v-for="fetchClass in useFetchStore.state.data[urlPrograms].data.array"
              :value="fetchClass.id"
          > {{ fetchClass.name }}</option>
        </Select>

      </div>

      <div class="group">

        <Input
            type="date"
            title="Date de départ"
            v-model="usePlanningStore.state.formData.startDate"
            :is-error="v$.startDate.$error"
            :errors="v$.startDate.$errors"
        />

        <Input
            type="date"
            title="Date de fin"
            v-model="usePlanningStore.state.formData.endDate"
            :is-error="v$.endDate.$error"
            :errors="v$.endDate.$errors"
        />

      </div>

      <div class="action end">
        <Button @click.prevent="submit">
          {{ ( usePlanningStore.state.isUpdate ) ? 'Modifier' : 'Ajouter' }}
        </Button>
      </div>

    </div>

  </form>
</template>