<script setup lang="ts">
import Ariane from "~/components/navigation/ariane.vue";
import {useNavBar} from "~/stores/ui/navbar";
import CreateDonnees from "~/components/form/createDonnees.vue";
import { useCreateDonnees } from '~/stores/ui/createDonnees.js'
import {useRouting} from "~/stores/routing";

const useCreateDonneesStore = useCreateDonnees()
const useRoutingStore = useRouting()

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(false)

useHead(() => ({
  title : 'Créer des données'
}))

onUnmounted(() => {
  useCreateDonneesStore.reset()
})
</script>

<template>
  <ariane :links="[
      { text : 'Dashboard', url : useRoutingStore.url.dashboard },
      {text : 'Mes listes', url : useRoutingStore.url.dataList },
      { text : 'Créer des données' }]"
  />

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