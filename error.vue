<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Logo from "~/components/icones/logo.vue";

const error = useError();

const handleError = () => {
  clearError({
    redirect: '/',
  });
};
</script>

<template>
  <div v-if="error" class="errorsContainer bg-light2">

    <logo />

    <h1 class="c-primary2">Ouups, nous avons rencontré <br> une erreur :(</h1>
    <p class="c-error0">
      <strong>{{ error.message }}</strong>
    </p>

    <Button @click.prevent="handleError">Retour sur le dashboard</Button>

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