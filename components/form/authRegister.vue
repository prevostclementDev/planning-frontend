<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Input from "~/components/form/interaction/Input.vue";
import {email, helpers, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAuth} from "~/stores/Auth.js";
import {useFetch} from "~/stores/Fetch.js";
import {useRouting} from "~/stores/routing.js";

const routingStore = useRouting()
const useAuthStore = useAuth();
const useFetchStore = useFetch()
const { $toast } = useNuxtApp()

// *************************************
// Validation rules for authentification
// *************************************
const rules = computed(() => {
  return {
    mail : {
      required : helpers.withMessage('L\'email est obligatoire', required),
      email : helpers.withMessage('Le format de l\'email est invalide', email),
    },
    password : {
      required : helpers.withMessage('Le mot de passe est obligatoire', required),
      minLength : helpers.withMessage('La longueur minimum doit être de 10 caractères',minLength(10))
    },
    last_name : {
      required : helpers.withMessage('Le nom est obligatoire', required),
    },
    first_name : {
      required : helpers.withMessage('Le prénom est obligatoire', required),
    },
    name : {
      required : helpers.withMessage('Le nom de l\'espace obligatoire', required),
    },
  }
})

// **************
// Auth form data
// **************
const formData = ref({
  name : '',
  first_name : '',
  last_name : '',
  mail : '',
  password : '',
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(rules,formData)

// **************
// On submit form
// **************
async function submitForm(e){

  e.preventDefault()

  await v$.value.$validate()

  if ( !v$.value.$error ) {

    const idToast = $toast.loading('Inscription en cours...');

    const authentification = await useAuthStore.auth(formData.value,'schoolspaces')

    if ( authentification[0] && authentification[1] === 'confirm' ) {

      $toast.update(idToast, {
        render: 'Inscription réussi, vous allez être redirigé',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

      setTimeout(() => {
        navigateTo(routingStore.url.dashboard)
      },1000)

    } else if ( authentification[0] && authentification[1] === 'email-code-verif' ) {

      $toast.update(idToast, {
        render: 'Inscription réussi, veuillez confirmer votre email',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

      setTimeout(() => {
        navigateTo(routingStore.url.codeVerification)
      },1000)

    } else {

      $toast.update(idToast, {
        render: ( useAuthStore.authError[0] ) ? useAuthStore.authError[0] : 'Une erreur est survenu pendant l\'inscription',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

    }

  }

}
</script>

<template>
  <form @submit="submitForm" class="formLogin">

    <h1>Inscription</h1>

    <div class="input-container">

      <Input
          title="Nom de l'espace scolaire"
          placeholder="MyDigitalSchool..."
          :errors="v$.name.$errors"
          :is-error="v$.name.$error"
          v-model="formData.name"
      />

      <div class="group">

        <Input
            title="Nom de famille"
            placeholder="Ex : Prévost"
            :errors="v$.first_name.$errors"
            :is-error="v$.first_name.$error"
            v-model="formData.first_name"
        />

        <Input
            title="Prénom"
            placeholder="Ex : Clément"
            :errors="v$.last_name.$errors"
            :is-error="v$.last_name.$error"
            v-model="formData.last_name"
        />

      </div>

      <Input
          title="Email"
          type="email"
          placeholder="school@doriane.app"
          :errors="v$.mail.$errors"
          :is-error="v$.mail.$error"
          v-model="formData.mail"
      />

      <Input
          title="Mot de passe"
          type="password"
          placeholder="Mot de passe"
          :errors="v$.password.$errors"
          :is-error="v$.password.$error"
          v-model="formData.password"
      />

    </div>

    <div class="action">

      <Button type="submit" :loading="useFetchStore.state.loading['schoolspaces']">S'inscrire</Button>

    </div>

  </form>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>