<script setup>
import {useNavBar} from "~/stores/ui/navbar";
import VueDatePicker from '@vuepic/vue-datepicker';

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Dashboard'
}))

</script>

<template>
  <div>
    <h2>Dashboard</h2>
  </div>
</template>

<style scoped lang="scss">
</style>