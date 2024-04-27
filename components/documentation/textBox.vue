<script setup>
defineProps({
  type : {
    type : String,
    default : 'warning',
    required : false
  },
  title : {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : true
  }
})
</script>

<template>
  <div :class="'textBox '+type">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
  </div>
</template>

<style scoped lang="scss">
.textBox {
  margin: 1rem 0;
  padding: 1rem 2rem;
  border-radius: 10px;

  p {
    margin-top: .8rem;

  }

  &.warning {
    @include bgColor(warning0,.1);
    border: 1px solid getColor(warning0);
    @include color(warning0)

  }

  &.error {
    @include bgColor(error0,.1);
    border: 1px solid getColor(error0);
    @include color(error0)

  }

  &.success {
    @include bgColor(valid0,.1);
    border: 1px solid getColor(valid0);
    @include color(valid0)

  }

}
</style>