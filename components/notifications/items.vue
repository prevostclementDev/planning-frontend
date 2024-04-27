<script setup>

  const { $timeFormat } = useNuxtApp()

  defineProps({
    title : {
      type : String,
      default : ''
    },
    date : {
      type : String,
      default : Date.toLocaleString()
    },
    link : {
      type : String,
      default : ''
    }
  })
</script>

<template>
  <div class="notification">
    <div class="content">
      <h4> {{ title }} </h4>
      <p> {{ $timeFormat.dateStringToLocal(date) }} </p>
    </div>
    <nuxt-link :to="link">Voir</nuxt-link>
  </div>
</template>

<style scoped lang="scss">
.notification {
  @include flex(space-between,flex-start);
  border-bottom: 1px solid getColor(primary4,.2);
  padding: 1rem 0 1rem 2rem;
  margin-right: 1rem;
  position: relative;

  &:last-child {
    border-bottom: none;

  }

  &::before {
    content : '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 1rem;
    width: 1rem;
    @include bgColor(warning0);
    border-radius: 50%;
    transform: translateY(-50%);

  }

}
</style>