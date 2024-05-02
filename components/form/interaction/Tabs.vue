<script setup>
defineProps({
  action : {
    type : Object,
    required : true
  },
  defaultValue : {
    type : String,
    required : false
  },
  modelValue : {}
})
</script>

<template>
  <div class="Tabs">
    <button v-for=" (value, key) in action " :class=" ( defaultValue === key ) ? 'active' : '' " @click="$emit('update:modelValue', key)">{{ value }}</button>
  </div>
</template>

<style scoped lang="scss">
.Tabs {
  position: relative;
  width: 100%;
  @include flex(center,stretch);

  button {
    width: 100%;
    border: none;
    display: block;
    @include bgColor(primary1,0.4);
    padding: 1rem;
    @include color(primary4);
    cursor: pointer;
    font-size: getFontSize(s);
    @include typographie(textBold);

    &.active {
      @include bgColor(primary4);
      @include color(light3);

    }

    &:first-child {
      border-radius: 8px 0 0 8px;

    }

    &:last-child {
      border-radius:  0 8px 8px 0;

    }

  }

}
</style>