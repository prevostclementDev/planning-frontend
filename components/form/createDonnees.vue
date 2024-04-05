<script setup>
import LayoutStep from '~/components/form/utils/layoutStep.vue'
import { useCreateDonnees } from '~/stores/ui/createDonnees.js'

const useCreateDonneesStore = useCreateDonnees()
</script>

<template>

  <form action="" class="stepByStep" id="createList">

    <layout-step v-if="useCreateDonneesStore.state.parcours" :step-number="useCreateDonneesStore.state.stepNumber" :active-step="useCreateDonneesStore.state.currentStep"></layout-step>

    <div class="contentStep">

      <div class="step">

        <h2>{{ useCreateDonneesStore.state.titleStep }}</h2>

        <Transition name="fade" mode="out-in">
          <component :is="useCreateDonneesStore.state.components" v-bind="useCreateDonneesStore.state.propsStep"></component>
        </Transition>

      </div>

    </div>

  </form>
</template>