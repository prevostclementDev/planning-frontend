<script setup>
import {Draggable} from "@fullcalendar/interaction";
import {useFetch} from "~/stores/Fetch.js";
import {useCalendar} from "~/stores/calendar.js";

const { $timeFormat, $toast } = useNuxtApp()
const useCalendareStore = useCalendar()
const useFetchStore = useFetch()

const props = defineProps({
  idCalendar : {
    type : String,
    required : true
  }
})

const draggableListes = ref(null);
const programsUrl = `schoolspaces/plannings/${props.idCalendar}/programs`

useCalendareStore.action[useCalendareStore.actionType.SET_PROGRAM_FROM_API](props.idCalendar)

onMounted(async () => {

  new Draggable(draggableListes.value, {
    itemSelector : '.course',
  });

})
</script>

<template>
  <div ref="draggableListes" class="listes">

    <h3 class="h4">Program du planning :</h3>

    <div v-if="useFetchStore.state.loading[programsUrl]">
      Chargement...
    </div>
    <div v-else-if="useCalendareStore.state.programs.length > 0 && ! useFetchStore.state.error[programsUrl]" v-for="course in useCalendareStore.state.programs" class="course"
         :data-event='JSON.stringify({
         "title": course.CourseName,
         "duration": "01:00",
         "editable" : true,
         "extraParams": { "color" : course.CourseColor, "course_id": course.CourseId }
         })' >
      <h4> {{ course.CourseName }} </h4>
      <div class="progressBar">
        <div class="title f-s-400 fs-s">
          {{ $timeFormat.formatTime(course.totalTimePlaced) }} sur {{ $timeFormat.formatTime(course.hoursRequired) }}
        </div>
        <div class="background">
          <span class="backgroundProgress" :style="{ background : (course.CourseColor) ? course.CourseColor : '' }"></span>
          <span class="progress" :style="{ background : (course.CourseColor) ? course.CourseColor : '', width : (course.pourcentHourPlace) ? course.pourcentHourPlace : '' }"></span>
        </div>
      </div>

    </div>
    <div v-else-if="! useFetchStore.state.error[programsUrl]" class="course">
      Vous n'avez pas ajouté de cours dans votre programme
    </div>
    <div v-else class="course">
      Une erreur est survenue...
    </div>

  </div>
</template>

<style scoped lang="scss">
.listes {
  max-height: 100%;
  overflow: auto;

  h3 {
    margin: 1.4rem 1rem 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid getColor(grey8);
    z-index: 3;

  }

  .course {
    margin: 0.5rem 1rem;
    @include effect(shadow);
    border-radius: 8px;
    cursor: grab;
    z-index: 1;

    h4 {
      padding: 1rem 1rem 0;

    }

    .progressBar {
      padding: 1rem;
      position: relative;

      .title {
        position: relative;
        z-index: 2;

      }

      .background {
        z-index: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;

        span {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 0 0 8px 8px;
          @include bgColor(secondary0);
          max-width: 100%;

          &.backgroundProgress {
            opacity: 0.2;


          }

        }

      }

    }

  }

}
</style>