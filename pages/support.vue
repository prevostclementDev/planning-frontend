<script setup>
import {useNavBar} from "~/stores/ui/navbar";
import {useRouting} from "~/stores/routing.js";
import Ariane from "~/components/navigation/ariane.vue";

const useRoutingStore = useRouting()
const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Support'
}))
</script>

<template>
  <div>
    <ariane :links="[
      { text : 'Dashboard', url : useRoutingStore.url.dashboard  }
    ]"/>
    <h2>Le support n'est pas encore disponible...</h2>
  </div>
</template>