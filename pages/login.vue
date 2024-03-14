<script setup>
definePageMeta({
  layout: false,
});

import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import {navigateTo} from "nuxt/app"
import {required, email, minLength, helpers} from '@vuelidate/validators'
const { $AuthTools } = useNuxtApp()
import { useVuelidate } from '@vuelidate/core'

// ********************
// If user already auth
// ********************
if ( $AuthTools.userIsAuth() ) {
  navigateTo('/')
}

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

    const authentification = await $AuthTools.auth(
        formData.value.mail,
        formData.value.password
    );

    if ( authentification ) {

      navigateTo('/')

    }

  }

}
</script>

<template>
  <div class="login">

<!--    <img src="/images/login.jpg" alt="">-->

    <form @submit="submitForm" class="formLogin">

      <h1>Connexion</h1>

      <div class="input">

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

        <Button type="submit">Se connecter</Button>

        <a href="">Vous n’avez pas de compte ? <span>Créer un compte</span></a>
      </div>

    </form>
    
  </div>
</template>

<style scoped lang="scss">

.login {
  width: 100%;
  min-height: 100vh;
  @include flex();
  background : #D9D9D9;

  h1  {
    margin-bottom: 1.6rem;

  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    position: absolute;

  }

  .formLogin {
    position: relative;
    z-index: 1;
    padding: 3.125rem;
    border-radius: 40px;
    border: 3px solid rgba(236, 240, 246, 0.49);
    background: rgba(165, 169, 176, 0.28);
    backdrop-filter: blur(12.5px);
    @include flex(center,center,column);

    .input {
      @include flex(center,center,column);
      width: 100%;

      label {
        margin: 1rem 0;

      }

    }

    .action {
      @include flex(center,center,column);

      a {
        width: 100%;
        text-align: left;

      }

    }

  }

}

</style>