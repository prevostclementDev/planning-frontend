<script setup>
import Button from "~/components/form/interaction/Button.vue";
import SearchSelect from "~/components/form/interaction/searchSelect.vue";
import {useFetch} from "~/stores/Fetch.js";
import {useModal} from "~/stores/ui/modal.js";
import {useNotification} from "~/stores/entity/notification.js";

const fetchStore = useFetch()
const notificationStore = useNotification()
const calendarStore = useCalendar()
const { $toast } = useNuxtApp()
const modalStore = useModal()

const props = defineProps({
  event : {
    type : Object,
    default : {},
    required : true
  }
})

const formData = ref({
  teacherId : props.event._def.extendedProps.extraParams.teacher_id,
  teacherName : props.event._def.extendedProps.extraParams.teacher,
  classroomId : props.event._def.extendedProps.extraParams.classroom_id,
  classroom : props.event._def.extendedProps.extraParams.classroom,
})

const updateUrl = `schoolspaces/plannings/${calendarStore.state.calendarId}/slots/${props.event._def.extendedProps.extraParams.id_in_db}`

async function deleteEvent () {

  if ( props.event._def.extendedProps.extraParams.id_in_db && calendarStore.state.calendarId ) {

    const idToast = $toast.loading('Suppression en cours...');

    const url = `schoolspaces/plannings/${calendarStore.state.calendarId}/slots/${props.event._def.extendedProps.extraParams.id_in_db}`
    await fetchStore.action[fetchStore.actionType.FETCH_DATA](url,'DELETE')

    if ( fetchStore.state.error[url] ) {

      $toast.update(idToast, {
        render: ( fetchStore.state.data[url].data && fetchStore.state.data[url].data.details ) ? fetchStore.state.data[url].data.details : 'Une erreur est survenue',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

    } else {

      props.event.remove()
      modalStore.action[modalStore.actionType.CLOSE_MODAL]()

      $toast.update(idToast, {
        render: 'Suppression avec succès',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

    }

  }

}

async function submit(){

  if ( props.event._def.extendedProps.extraParams.id_in_db && calendarStore.state.calendarId ) {

    const idToast = $toast.loading('Modification en cours...');

    await fetchStore.action[fetchStore.actionType.FETCH_DATA](
        updateUrl,
        'PUT',
        {
          id_teacher : ( formData.value.teacherId ) ? formData.value.teacherId : null ,
          id_classrom :  ( formData.value.classroomId ) ? formData.value.classroomId : null
        }
    )

    if ( fetchStore.state.error[updateUrl] ) {

      $toast.update(idToast, {
        render: ( fetchStore.state.data[updateUrl].data && fetchStore.state.data[updateUrl].data.details ) ? fetchStore.state.data[updateUrl].data.details : 'Une erreur est survenue',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

    } else {

      await calendarStore.state.calendarOptions.datesSet({
        start: new Date(calendarStore.state.calendarCurrentDate)
      })

      fetchStore.action[fetchStore.actionType.FETCH_DATA](`schoolspaces/plannings/${calendarStore.state.calendarId}/conflicts`)
      notificationStore.action[notificationStore.actionType.GET_LIST](true)

      modalStore.action[modalStore.actionType.CLOSE_MODAL]()

      $toast.update(idToast, {
        render: 'Modification réussi avec succès',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

    }

  }

}
</script>

<template>
  <form action="">

    <div class="input-container">

        <div class="group">

          <SearchSelect
            :url="`schoolspaces/courses/${props.event._def.extendedProps.extraParams.course_id}/teachers`"
            :display-array="[ 'first_name', 'last_name' ]"
            title="Ajouter un intervenant"
            :default-value="(formData.teacherId && formData.teacherName) ? formData.teacherName : ''"
            v-model="formData.teacherId"
          />

          <SearchSelect
              url="schoolspaces/classroom"
              :display-array="[ 'first_name', 'last_name' ]"
              title="Associer à une salle"
              :default-value="(formData.classroomId && formData.classroom) ? formData.classroom : ''"
              v-model="formData.classroomId"
          />

        </div>

      <div class="action between">

        <Button custom-class="delete small" @click.prevent="deleteEvent()">Supprimer</Button>
        <Button custom-class="small" :loading="fetchStore.state.loading[updateUrl]" @click.prevent="submit">Enregistrer</Button>

      </div>

    </div>

  </form>
</template>

<style scoped lang="scss">
</style>