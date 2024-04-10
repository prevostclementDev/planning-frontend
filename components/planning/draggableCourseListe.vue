<script setup>
import {Draggable} from "@fullcalendar/interaction";
import {useFetch} from "~/stores/Fetch.js";
import {useCalendar} from "~/stores/calendar.js";
import CourseCard from "~/components/planning/cards/courseCard.vue";

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

    <div class="loading" v-if="useFetchStore.state.loading[programsUrl]">
      <loader-small-loader custom-class="blue"/>
    </div>
    <div v-else-if="useCalendareStore.state.programs.length > 0 && ! useFetchStore.state.error[programsUrl]" v-for="course in useCalendareStore.state.programs">
      <course-card v-bind="course"/>
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

  .loading {
    @include flex();
    height: 20vh;

  }

}
</style>