<script setup>
useHead(() => ({
  title : 'Dashboard'
}))

definePageMeta({
  middleware : 'authentification'
})


</script>

<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<style scoped lang="scss">
</style>