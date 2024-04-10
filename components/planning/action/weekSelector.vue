<script setup>
import {useCalendar} from "~/stores/calendar.js";

const { $timeFormat } = useNuxtApp()

const calendarStore = useCalendar();
const props = defineProps({
  startMonth : {
    type : Number,
    required : true
  },
  endMonth : {
    type : Number,
    required : true
  },
  startYear : {
    type : Number,
    required : true
  },
  endYear : {
    type : Number,
    required : true
  },
})

function clickUpdateCalendarWeek(e){
  if ( calendarStore.state.calendar ) calendarStore.state.calendar.getApi().gotoDate(e.target.getAttribute('data-date-to-go'))
}

function numberDaysInMonth(monthNumber, yearNumber) {
  let firstDayNextMonth = new Date(yearNumber, monthNumber, 1);
  firstDayNextMonth.setDate(firstDayNextMonth.getDate() - 1);

  return firstDayNextMonth.getDate();
}

// Render Array
const monthToDisplay = computed(() => {
  const startDateMonth = new Date(props.startYear, props.startMonth - 1, 1)
  const endDateMonth = new Date(props.endYear, props.endMonth - 1, 31)
  let whileDate = new Date(startDateMonth)
  let weekNumber = 0

  const data = {};

  while( whileDate <= endDateMonth ) {

    weekNumber++

    if ( ! data[$timeFormat.getMonthText(whileDate.getMonth())] ) {
      data[$timeFormat.getMonthText(whileDate.getMonth())] = []
    }

    const weekStartDate = new Date(whileDate);
    const month = ((weekStartDate.getMonth() + 1) < 10 ) ? "0"+(weekStartDate.getMonth() + 1) : (weekStartDate.getMonth() + 1);
    const day = ((weekStartDate.getDate()) < 10 ) ? "0"+(weekStartDate.getDate()) : (weekStartDate.getDate());

    const formatDate = `${weekStartDate.getFullYear()}-${month}-${day}`

    data[$timeFormat.getMonthText(whileDate.getMonth())].push( { date : formatDate, number: weekNumber } )

    whileDate.setDate(whileDate.getDate() + 7)
  }

  return data;

});
</script>

<template>
  <div class="selectorMonthCalendar" v-dragscroll.x>
    <div class="month" v-for="(month,key) in monthToDisplay">
      <div class="weekSelector">
        <button @click.prevent="clickUpdateCalendarWeek" v-for="weekData in month" :data-date-to-go="weekData.date" >{{ weekData.number }}</button>
      </div>
      <div class="monthText">{{ key }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selectorMonthCalendar {
  @include flex(flex-start);
  width: 100%;
  overflow: hidden;

  .month {
    width: 100%;

    .weekSelector {
      width: 100%;
      @include flex(flex-start);

      button {
        width: 100%;
        border: none;
        @include bgColor(primary2);
        @include flex();
        @include typographie(text);
        @include color(light3);
        border-left: 1px solid getColor(light3);
        border-right: 1px solid getColor(light3);
        padding: 8px;
        cursor: pointer;

      }

    }

    .monthText {
      width: 100%;
      text-align: center;
      @include color(text);
      @include typographie(text);
      border-left: 1px solid getColor(primary3);
      border-right: 1px solid getColor(primary3);
      padding: 4px;
      cursor: move;
      user-select: none;

      &::first-letter {
        text-transform: uppercase;
      }

    }

  }

}
</style>