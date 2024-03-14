<script setup lang="ts">
import Navbar from "~/components/navigation/navbar.vue";
</script>

<template>
  <div id="app-layout">

    <div class="navbar">
      <Navbar />
    </div>

    <div class="content">

      <slot />

    </div>

  </div>
</template>

<style scoped lang="scss">
#app-layout {
  width: 100%;
  min-height: 100svh;
  align-items: start;

  @include grid(
      1fr,
      auto 1fr,
      'navbar content'
  );


  .navbar {
    grid-area: navbar;
    width: 105px;
    transition: 0.3s ease-in-out width;

    &:hover {
      width: 260px;

    }

  }

  .content {
    height: 300vh;
    grid-area: content;

  }

}
</style>