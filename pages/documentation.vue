<script setup>
import {useNavBar} from "~/stores/ui/navbar";

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Documentation'
}))
</script>

<template>
  <div>
    <h2>La documentation n'est pas encore disponible...</h2>
  </div>
</template>