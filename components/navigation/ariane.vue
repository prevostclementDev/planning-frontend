<script setup>
  defineProps({
    links : {
      type : Array,
      required : true
    }
  })
</script>

<template>
  <div class="text ariane">
    <div v-for="(link,key) in links" :class="(!link.url) ? 'withoutClick' : ''">
      <nuxt-link  :to="(link.url) ? link.url : ''">{{ link.text }}</nuxt-link>
      <span v-if="key !== links.length - 1"> > </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ariane {
    width: fit-content;
    @include flex();

    & > div {
      margin: 2px;

      span {
        margin: 2px;

      }

    }

    .withoutClick {

      a {
        text-decoration: none;

      }

    }

  }
</style>