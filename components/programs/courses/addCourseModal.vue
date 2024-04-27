<script setup>
import SearchSelect from "~/components/form/interaction/searchSelect.vue";
import Button from "~/components/form/interaction/Button.vue";
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import { helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import { useFetch } from "~/stores/Fetch.js";
import {useModal} from "~/stores/ui/modal.js";

const props = defineProps({
  program : {
    type : Number,
    required : true
  }
})

const { $toast } = useNuxtApp()

const modalStore = useModal()
const fetchStore = useFetch()

const BaseUri = `schoolspaces/programs/${props.program.id}/courses/`
let current_uri = ref('');

const rules = computed(() => {
  return {
    courseId: {
      required: helpers.withMessage('Champs obligatoire', required),
    }
  }
})

const formData = ref({
  courseId : ''
})

const v$ = useVuelidate(rules,formData)

async function submit(){

  await v$.value.$validate()

  if ( ! v$.value.$error ) {

    current_uri.value = BaseUri  + formData.value.courseId

    await fetchStore.action[fetchStore.actionType.FETCH_DATA](
        current_uri.value,
        'POST'
    )

    if ( fetchStore.state.error[current_uri.value] ) {
      $toast.error(
          (fetchStore.state.data[current_uri.value].data.details) ? fetchStore.state.data[current_uri.value].data.details : 'Impossible de lier le cours'
      )
    } else {
      $toast.success('Ajouté avec succès')
    }

    modalStore.mutation[modalStore.mutationType.SET_PROPS_MODAL]({ data : props.program })

    modalStore.action[modalStore.actionType.OPEN_MODAL]('programs')

  }

}
</script>

<template>
  <div class="modal">
    <top-modal title="Associé un cours" />
    <content-modal>
      <form action="">

        <div class="input-container">

          <search-select
              url="schoolspaces/courses"
              :display-array="[ 'name' ]"
              title="Ajouter un cours"
              v-model="formData.courseId"
              :errors="v$.courseId.$errors"
              :is-error="v$.courseId.$error"
          />

        </div>

        <div class="action end">
          <Button :loading="fetchStore.state.loading[current_uri]"
                  custom-class="small"
                  @click.prevent="submit"
          >
            Ajouter le cours au module pédagogique
          </Button>
        </div>

      </form>
    </content-modal>
  </div>
</template>

<style scoped lang="scss">
.action {
  margin-top: 1rem;

}
</style>