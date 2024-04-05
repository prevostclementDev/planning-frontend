<script setup>
import {useNavBar} from "~/stores/ui/navbar";

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Messagerie'
}))
</script>

<template>
  <div>
    <h2>La messagerie n'est pas encore disponible...</h2>
  </div>
</template>