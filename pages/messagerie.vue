<script setup>
import {useNavBar} from "~/stores/ui/navbar";
import Ariane from "~/components/navigation/ariane.vue";
import {useRouting} from "~/stores/routing.js";

const useRoutingStore = useRouting()
const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Messagerie'
}))
</script>

<template>
  <div>
    <ariane :links="[
      { text : 'Dashboard', url : useRoutingStore.url.dashboard  }
    ]"/>
    <h2>La messagerie n'est pas encore disponible...</h2>
  </div>
</template>