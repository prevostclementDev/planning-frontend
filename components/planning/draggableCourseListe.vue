<script setup>
import {Draggable} from "@fullcalendar/interaction";
import {useFetch} from "~/stores/Fetch.js";
import {useCalendar} from "~/stores/calendar.js";
import CourseCard from "~/components/planning/cards/courseCard.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useModal} from "~/stores/ui/modal.js";

const modal = useModal()
const useCalendareStore = useCalendar()
const useFetchStore = useFetch()

const props = defineProps({
  idCalendar : {
    type : String,
    required : true
  },
  planning : {
    type : Object,
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

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](programsUrl)
})
</script>

<template>
  <div ref="draggableListes" class="listes">

    <div class="action end">
      <Button @click.prevent="modal.action[modal.actionType.OPEN_MODAL]('createCourseInProgram',{
        data : {
          id_program : planning.data.planning.id_programs,
          id_planning : planning.data.planning.id
        }
      })" custom-class="small">Ajouter un cours</Button>
    </div>

    <div class="loading" v-if="useFetchStore.state.loading[programsUrl]">
      <loader-small-loader custom-class="blue"/>
    </div>
    <div v-else-if="useCalendareStore.state.programs.length > 0 && ! useFetchStore.state.error[programsUrl]" v-for="course in useCalendareStore.state.programs">
      <course-card v-bind="course"/>
    </div>
    <div v-else-if="! useFetchStore.state.error[programsUrl]" class="noCourse textBold">
      Vous n'avez pas ajouté de cours dans votre maquette pédagogique
    </div>
    <div v-else class="course">
      Une erreur est survenue...
    </div>

  </div>
</template>

<style scoped lang="scss">
.listes {
  max-height: calc(100% - 80px);
  overflow: auto;
  padding: 1rem 0;

  .action {
    margin-bottom: .4rem;
    position: static;
    top: 0;
    @include bgColor(light1);
    padding: .4rem;

  }

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

  .noCourse {
    margin: 1rem 0;

  }

}
</style>