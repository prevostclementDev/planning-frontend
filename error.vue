<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Logo from "~/components/icones/logo.vue";
import {useRouting} from "~/stores/routing.js";

const routingStore = useRouting()
const error = useError();

const handleError = (uri) => {
  clearError({
    redirect: uri,
  });
};
</script>

<template>
  <div v-if="error" class="errorsContainer bg-light2">

    <logo />

    <h1 class="c-primary2">Ooops, nous avons rencontré <br> une erreur :(</h1>
    <p class="c-error0">
      <strong>{{ error.message }}</strong>
    </p>

    <Button @click.prevent="handleError(( error.message !== 'Votre email n\'est pas verifié' ) ? routingStore.url.dashboard : routingStore.url.codeVerification )"
    >
      {{ ( error.message !== 'Votre email n\'est pas verifié' ) ? 'Retour sur le dashboard' : 'Verifier mon mail' }}
    </Button>

  </div>
</template>

<style scoped lang="scss">
.errorsContainer {
  @include flex(center,center,column);
  width: 100vw;
  height: 100vh;
  text-align: center;

  h1 {
    margin-top: 1rem;

  }

  p {
    margin: 2rem 0 0;

  }

}
</style>