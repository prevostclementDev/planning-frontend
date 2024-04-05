<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Close from "~/components/icones/close.vue";
import {useModal} from "~/stores/ui/modal.js";

const useModalStore = useModal()

defineProps({
  title : {
    type : String,
    required : true
  }
})
</script>

<template>
  <div class="title">
    <h3>{{ title }}</h3>
    <Button custom-class="clear" @click.prevent="useModalStore.action[useModalStore.actionType.CLOSE_MODAL]"> <close /> </Button>
  </div>
</template>

<style scoped lang="scss">
.title {
  padding: 1.4rem 2rem;
  @include bgColor(primary4);
  @include color(light2);
  border-radius: 8px 8px 0 0;
  @include flex(space-between);

  h3 {
    margin-right: 4rem;

  }

}
</style>