<script setup>
import {useNavBar} from "~/stores/ui/navbar";
import Ariane from "~/components/navigation/ariane.vue";
import {useRouting} from "~/stores/routing.js";
import TextBox from "~/components/documentation/textBox.vue";

const useRoutingStore = useRouting()

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Documentation'
}))
</script>

<template>
  <div class="documentation-page">
    <ariane :links="[
      { text : 'Dashboard', url : useRoutingStore.url.dashboard  },
      { text : 'Documentation' }
    ]"/>

    <div class="textContainer">
      <h2>Documentation</h2>

      <div class="spacing"></div>

      <text-box title="Documentation en cours de développement" content="La documentation est en train d'être écrite. Si il vous manque des informations veuillez contactez le support"  />

      <div class="paragraphe">Bienvenue sur notre page de documentation, votre guide pour maîtriser notre application !</div>

      <div class="paragraphe">Cette page a été spécialement conçue pour vous aider à tirer le meilleur parti de notre application, en vous fournissant des instructions détaillées, des conseils utiles et des réponses à vos questions. Notre objectif est de vous accompagner à chaque étape de votre parcours, afin que vous puissiez utiliser notre application de manière efficace et agréable.</div>

      <div class="paragraphe">Actuellement, notre documentation est en cours de développement et nous travaillons dur pour l'améliorer et l'enrichir continuellement. Pour le moment, la section <nuxt-link to="/">Comment bien commencer</nuxt-link> est la seule disponible. Cette section vous guidera à travers les premières étapes de l'utilisation de notre application, en vous montrant comment naviguer dans l'interface et utiliser les fonctionnalités de base.</div>

      <div class="paragraphe">Nous vous recommandons vivement de consulter cette section avant de commencer à utiliser notre application. Elle vous aidera à comprendre les concepts fondamentaux et à vous familiariser avec notre application, ce qui vous permettra de gagner du temps et de profiter pleinement de ses fonctionnalités.</div>

      <div class="paragraphe">Nous sommes conscients que notre documentation n'est pas encore complète, mais nous nous engageons à la développer et à l'améliorer en permanence. Nous vous invitons à consulter régulièrement cette page pour découvrir les nouvelles sections et les mises à jour.</div>
    </div>

    <div class="action end">
      <nuxt-link to="/">Comment bien commencer</nuxt-link>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.action {

  a {
    @include interaction(button-primary);

  }

}
</style>