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
  classData : {
    type : Object,
    required : true
  }
})

const { $toast } = useNuxtApp()

const modalStore = useModal()
const fetchStore = useFetch()

const BaseUri = `schoolspaces/class/${props.classData.id}/users/`
let current_uri = ref('');

const rules = computed(() => {
  return {
    usersId: {
      required: helpers.withMessage('Champs obligatoire', required),
    }
  }
})

const formData = ref({
  usersId : ''
})

const v$ = useVuelidate(rules,formData)

async function submit(){

  await v$.value.$validate()

  if ( ! v$.value.$error ) {

    current_uri.value = BaseUri  + formData.value.usersId

    await fetchStore.action[fetchStore.actionType.FETCH_DATA](
        current_uri.value,
        'POST'
    )

    if ( fetchStore.state.error[current_uri.value] ) {
      $toast.error(
          (fetchStore.state.data[current_uri.value].data.details) ? fetchStore.state.data[current_uri.value].data.details : 'Impossible de lier l\'élève'
      )
    } else {
      $toast.success('Ajouté avec succès')
    }

    modalStore.mutation[modalStore.mutationType.SET_PROPS_MODAL]({ data : props.classData })

    modalStore.action[modalStore.actionType.OPEN_MODAL]('class')

  }

}
</script>

<template>
  <div class="modal">
    <top-modal title="Associé un élève à la classe" />
    <content-modal>
      <form action="">

        <div class="input-container">

          <search-select
              url="schoolspaces/users?roles=2"
              :display-array="[ 'first_name', 'last_name' ]"
              title="Ajouter un élève"
              v-model="formData.usersId"
              :errors="v$.usersId.$errors"
              :is-error="v$.usersId.$error"
          />

        </div>

        <div class="action end">
          <Button :loading="fetchStore.state.loading[current_uri]"
                  custom-class="small"
                  @click.prevent="submit"
          >
            Ajouter l'élève à la classe
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