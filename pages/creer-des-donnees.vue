<script setup lang="ts">
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import CreateDonnees from "~/components/form/createDonnees.vue";
import { useCreateDonnees } from '~/stores/ui/createDonnees.js'

const useCreateDonneesStore = useCreateDonnees()

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Créer des données'
}))

onUnmounted(() => {
  useCreateDonneesStore.reset()
})
</script>

<template>
  <ariane :links="[{ text : 'Dashboard', url : '/' }, {text : 'Mes listes', url : '/listes'}, { text : 'Créer des données' }]" />

  <div class="formContainer">
    <create-donnees />
  </div>

</template>

<style scoped lang="scss">
.formContainer {
  margin: 1rem 0;

  svg {
    position: absolute;

    &:first-child {
      right: 10%;
      bottom: 0;
      transform: translate(-10%,20%) rotate(10deg);

    }


  }

}
</style>