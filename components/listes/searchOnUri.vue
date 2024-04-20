<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import Filter from "~/components/icones/filter.vue";
import Search from "~/components/icones/search.vue";

defineProps({
  onsearch : {
    type : Function,
    required : false,
    default : (data) => { console.log(data) }
  },
  buttonIsLoading : {
    type : Boolean,
    required : false,
    default : true
  }
})

const inputSearch = ref('');

</script>

<template>
  <div class="action end">
    <Input
      custom-class="nolabel"
      placeholder="Rechercher..."
      v-model="inputSearch"
    />
    <Button :loading="buttonIsLoading" custom-class="small" @click.prevent="onsearch(inputSearch)">
      <span>Rechercher</span>
      <Search type="light" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.action {
  width: fit-content;

  button {
    height: 100%;
    margin-left: 0.5rem;
    min-height: 43px;

    span {
      margin-right: .5rem;

    }

  }

}

</style>