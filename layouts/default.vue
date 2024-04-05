<script setup lang="ts">
import Navbar from "~/components/navigation/navbar.vue"
import UserTopNav from "~/components/navigation/userTopNav.vue"
import {useNavBar} from "~/stores/ui/navbar";

const useNavBarStore = useNavBar()

const isFullNavBar = ref(false)

</script>

<template>
  <div id="appLayout" :class="(useNavBarStore.isFullNavBar) ? 'navbarFullWith' : ''">

    <div class="navbar">
      <Navbar />
    </div>

    <div class="content">

      <UserTopNav />

      <div class="containerAppPage">
        <slot />
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
#appLayout {
  width: 100%;
  min-height: 100svh;
  align-items: start;

  @include grid(
      1fr,
      105px calc(100vw - 105px),
      'navbar content'
  );

  transition: 0.3s ease-in-out grid-template-columns;

  .navbar {
    grid-area: navbar;
    width: 105px;
    transition: 0.3s ease-in-out width;
    position: relative;
    z-index: 9;

  }

  .content {
    position: relative;
    height: fit-content;
    grid-area: content;

    .containerAppPage {
      padding: 2rem;
      position: relative;
      z-index: 1;

    }

  }

  &.navbarFullWith {

    @include grid(
        1fr,
        260px calc(100vw - 260px),
        'navbar content'
    );

    .navbar {
      width: 260px;

    }

  }

}
</style>