<script setup>
import {useNavBar} from "~/stores/ui/navbar";

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Support'
}))
</script>

<template>
  <div>
    <h2>Le support n'est pas encore disponible...</h2>
  </div>
</template>