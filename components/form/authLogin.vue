<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Input from "~/components/form/interaction/Input.vue";
import {useVuelidate} from "@vuelidate/core";
import {required, email, minLength, helpers} from '@vuelidate/validators'
import {useFetch} from "~/stores/Fetch.js";

const useAuthStore = useAuth()
const { $toast } = useNuxtApp()
const useFetchStore = useFetch()

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
  }
})

// **************
// Auth form data
// **************
const formData = ref({
  mail : 'clementprevost45@gmail.com',
  password : 'motdepasse12.',
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

    const idToast = $toast.loading('Connexion en cours...');

    const authentification = await useAuthStore.auth(formData.value);

    if ( authentification ) {

      $toast.update(idToast, {
        render: 'Connexion réussi !',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

      setTimeout(() => {
        navigateTo('/')
      },1000)

    } else {

      $toast.update(idToast, {
        render: ( useAuthStore.authError[0] ) ? ( typeof useAuthStore.authError === 'string' ) ? useAuthStore.authError : useAuthStore.authError[0] : 'Une erreur est survenu pendant l\'authentification',
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

    <h1>Connexion</h1>

    <div class="input-container">

      <Input
          title="Email"
          type="email"
          placeholder="username@gmail.com"
          :errors="v$.mail.$errors"
          :is-error="v$.mail.$error"
          v-model="formData.mail"
      />

      <Input
          title="Mot de passe"
          type="password"
          placeholder="mot de passe"
          :errors="v$.password.$errors"
          :is-error="v$.password.$error"
          v-model="formData.password"
      />

    </div>

    <div class="action">
      <a href="">Mot de passe oublié ?</a>

      <Button type="submit" :loading="useFetchStore.state.loading['connexion']">Se connecter</Button>

    </div>

  </form>
</template>

<style scoped lang="scss">
.formLogin {
  @include flex(center,center,column);
  width: 100%;

  .action {
    @include flex(center,center,column);
    width: 100%;
    margin-top: 1rem;

    a {
      width: 100%;
      text-align: left;

    }

  }

}
</style>