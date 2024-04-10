<script setup>
import FullCalendar from "@fullcalendar/vue3";
import { useCalendar } from '~/stores/calendar'
import WeekSelector from "~/components/planning/action/weekSelector.vue";
import GoBack from "~/components/planning/action/updateDatePlanning.vue";
import Update from "~/components/icones/update.vue";
import UpdateDatePlanning from "~/components/planning/action/updateDatePlanning.vue";

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

const startDateObject = new Date(props.startDate)
const endDateObject = new Date(props.endDate)

const calendar = ref(null);
const calendarStore = useCalendar();

calendarStore.mutation[calendarStore.mutationType.SET_CALENDAR_ID](props.planningsId)

const nowDate = computed(() => {
  const date = new Date(calendarStore.state.calendarCurrentDate)

  return `${$timeFormat.getMonthText(date.getMonth()) } ${date.getFullYear()}`
})

onMounted(() => {

  calendarStore.mutation[calendarStore.mutationType.SET_CALENDAR](
      calendar.value,
      {
        validRange: {
          start: props.startDate,
          end: props.endDate
        },
      }
  )

})
</script>

<template>
  <section>

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
</style>