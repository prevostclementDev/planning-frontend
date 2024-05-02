<script setup>
import Info from "~/components/icones/info.vue";

defineProps({
  text : {
    type : String,
    default : '',
    required : false,
  },
})

</script>

<template>
  <div class="tooltips">
    <slot />
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.tooltips {
  position: relative;
  z-index: 9;

  .text {
    position: absolute;
    display: none;
    top: 0;
    left: 50%;
    transform: translate(-50%,calc( -100% - 3px ));
    @include bgColor(primary3);
    @include color(light3);
    @include effect(shadow);
    padding: .5rem;
    border-radius: 10px;
    min-width: 200px;
    text-align: center;

  }

  &:hover {

   .text {
     display: inline-block;

   }

  }

}
</style>