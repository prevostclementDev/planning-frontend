<script setup>
import Select from "~/components/form/interaction/Select.vue";
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useUsers} from "~/stores/entity/users.js";
import {email, helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const useUsersStore = useUsers()

const props = defineProps({
  onfinish : {
    type : Function,
    required : false,
    default : () => { console.log('form send with success') }
  },
  usersData : {
    type : Object,
    required : false,
    default : null
  }
})

if ( props.usersData && props.usersData.id ) {
  useUsersStore.mutation[useUsersStore.mutationType.SET_FORM_DATA]({
    first_name : props.usersData.first_name,
    last_name : props.usersData.last_name,
    civility : ( props.usersData.civility ) ? props.usersData.civility : '-1',
    mail : props.usersData.mail,
  })

  useUsersStore.mutation[useUsersStore.mutationType.SET_UPDATE](props.usersData.id)
}

// *****************
// Validation rules
// *****************
const rules = computed(() => {
  return {
    mail : {
      required : helpers.withMessage('L\'email est obligatoire', required),
      email : helpers.withMessage('Le format de l\'email est invalide', email),
    },
    last_name : {
      required : helpers.withMessage('Le nom est obligatoire', required),
    },
    first_name : {
      required : helpers.withMessage('Le prénom est obligatoire', required),
    },
  }
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(rules,useUsersStore.state.formData)
const isLoading = ref(false)

async function submit(){

  isLoading.value = true

  await v$.value.$validate()

  if ( ! v$.value.$error ) {
    await useUsersStore.action[useUsersStore.actionType.SEND_FORM]()
    props.onfinish()
  }

  isLoading.value = false

}
</script>

<template>
  <form action="" method="post" >
    <div class="input-container">

      <Select
          title="Civilité"
          v-model="useUsersStore.state.formData.civility"
      >
        <option value="-1">Choisir une civilité</option>
        <option value="Madame">Madame</option>
        <option value="Monsieur">Monsieur</option>
      </Select>

      <div class="group">
        <Input
            placeholder="Nom de famille"
            title="Nom de famille"
            v-model="useUsersStore.state.formData.first_name"
            :is-error="v$.first_name.$error"
            :errors="v$.first_name.$errors"
        />

        <Input
            placeholder="Prénom"
            title="Prénom"
            v-model="useUsersStore.state.formData.last_name"
            :is-error="v$.last_name.$error"
            :errors="v$.last_name.$errors"
        />
      </div>

      <Input
          placeholder="email@domaine.com"
          type="email"
          title="Email"
          v-model="useUsersStore.state.formData.mail"
          :is-error="v$.mail.$error"
          :errors="v$.mail.$errors"
      />

      <div class="action end">
        <Button :loading="isLoading" type="submit" @click.prevent="submit">
          {{ ( useUsersStore.state.isUpdate ) ? 'Modifier' : 'Enregistrer' }}
        </Button>
      </div>

    </div>

  </form>
</template>