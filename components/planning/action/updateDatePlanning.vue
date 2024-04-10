<script setup>
import {useCalendar} from "~/stores/calendar.js";
import Button from "~/components/form/interaction/Button.vue";
import Arrow from "~/components/icones/arrow.vue";

const calendarStore = useCalendar();
</script>

<template>
  <div>
    <div class="containsBtn">
      <Button custom-class="small" @click.prevent="calendarStore.state.calendar.getApi().prev()"> <arrow custom-class="rotate" /> </Button>
    </div>
    <div class="containsBtn">
      <Button custom-class="small" @click.prevent="calendarStore.state.calendar.getApi().next()"> <arrow /> </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
div {
  @include flex();

  .containsBtn {
    margin: 0 .5rem;

  }

}
</style>