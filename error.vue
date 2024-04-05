<script setup>
import Button from "~/components/form/interaction/Button.vue";

const error = useError();

const handleError = () => {
  clearError({
    redirect: '/',
  });
};
</script>

<template>
  <div v-if="error">
    <h1>Ouups, nous avons eu une erreur</h1>
    <p>
      <strong>{{ error.message }}</strong>
    </p>
    <p>Une erreur est survenue...</p>

    <Button @click.prevent="handleError">Retour sur le dashboard</Button>

  </div>
</template>

<style scoped lang="scss">

</style>