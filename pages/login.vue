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

    <form @submit="submitForm">

      <Input
          title="Email"
          type="email"
          placeholder="default@doriane.app"
          :errors="v$.mail.$errors"
          :is-error="v$.mail.$error"
          v-model="formData.mail"
      />

      <Input
          title="Mot de passe"
          type="password"
          :errors="v$.password.$errors"
          :is-error="v$.password.$error"
          v-model="formData.password"
      />

      <Button type="submit">Se connecter</Button>

    </form>
    
  </div>
</template>

<style scoped lang="scss">
</style>