<script setup>
useHead(() => ({
  title : 'Dashboard'
}))

definePageMeta({
  middleware : 'authentification'
})

const { $fetchTools } = useNuxtApp();

const data = await $fetchTools.fetchApi('schoolspaces/users','GET');

</script>

<template>
  <div>
    <h1>Dashboard</h1>

    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped lang="scss">
</style>