<script setup>
import FullCalendar from "@fullcalendar/vue3";
import { useCalendar } from '~/stores/calendar'
import WeekSelector from "~/components/planning/action/weekSelector.vue";
import GoBack from "~/components/planning/action/updateDatePlanning.vue";
import Update from "~/components/icones/update.vue";
import UpdateDatePlanning from "~/components/planning/action/updateDatePlanning.vue";
import Lists from "~/components/planning/conflicts/lists.vue";

const { $timeFormat } = useNuxtApp()

const props = defineProps({
  planningsId : {
    type : String,
    default : '',
    required: true,
  },
  startDate : {
    type : String,
    default : '',
    required: true
  },
  endDate : {
    type : String,
    default : '',
    required: true
  }
})

const route = useRoute()

const startDateObject = new Date(props.startDate)
const endDateObject = new Date(props.endDate)

const calendar = ref(null);
const calendarStore = useCalendar();

calendarStore.mutation[calendarStore.mutationType.INIT_OPTIONS]({
  validRange: {
    start: new Date(props.startDate).setDate(new Date(props.startDate).getDate() + 1),
    end: new Date(props.endDate).setDate(new Date(props.endDate).getDate() + 1)
  },
})

calendarStore.mutation[calendarStore.mutationType.SET_CALENDAR_ID](props.planningsId)

const nowDate = computed(() => {
  const date = new Date(calendarStore.state.calendarCurrentDate)

  return `${$timeFormat.getMonthText(date.getMonth()) } ${date.getFullYear()}`
})

onMounted(() => {

  calendarStore.mutation[calendarStore.mutationType.SET_CALENDAR]( calendar.value )
  calendarStore.state.calendar.getApi().gotoDate(props.startDate)

  if ( route.query.conflict ) {
    const [ date, idSlot ] = route.query.conflict.split('|')
    calendarStore.action[calendarStore.actionType.SEE_EVENTS_CONFLICTS](date, idSlot)
  }

})
</script>

<template>
  <section>

    <lists :id-planning="planningsId" />

    <div class="date">
      <h3>{{ nowDate }}</h3>
      <div class="action end">
        <update-date-planning />
      </div>
    </div>

    <week-selector :end-year="endDateObject.getFullYear()" :start-year="startDateObject.getFullYear()" :end-month="endDateObject.getMonth() + 1" :start-month="startDateObject.getMonth() + 1" />

    <div>

      <FullCalendar ref="calendar" :options="calendarStore.state.calendarOptions"/>

    </div>

  </section>
</template>

<style lang="scss" scoped>

section {
  width: 100%;

  .date {
    @include flex(space-between);
    margin: 0 0 1rem;

    h3 {

      &::first-letter {
        text-transform: uppercase;

      }

    }

    .action {
      width: fit-content;

    }

  }

}
</style>