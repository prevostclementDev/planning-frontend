<script setup>
import {useCalendar} from "~/stores/calendar.js";
import Button from "~/components/form/interaction/Button.vue";

const calendarStore = useCalendar();
</script>

<template>
  <div class="containButton">
    <Button custom-class="small" @click="calendarStore.state.calendar.getApi().changeView('timeGridWeek')">Semaine</Button>
    <Button custom-class="small" @click="calendarStore.state.calendar.getApi().changeView('timeGridDay')">Jour</Button>
  </div>
</template>

<style scoped lang="scss">
.containButton {
  @include flex(flex-start,flex-start,row,wrap,10px,10px);

  button {
    margin: 0;

  }

}
</style>