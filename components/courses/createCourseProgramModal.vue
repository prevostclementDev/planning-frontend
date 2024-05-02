<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import {useModal} from "~/stores/ui/modal.js";
import FormCourses from "~/components/courses/formCourses.vue";
import TeachersToCourse from "~/components/courses/teachers/teachersToCourse.vue";
import {useFetch} from "~/stores/Fetch.js";

const { $toast } = useNuxtApp()
const modalStore = useModal()
const fetchStore = useFetch()
const calendarStore = useCalendar()

const props = defineProps({
  data : {
    type : Object,
    required : false,
    default : null
  }
})

const handleSuccess = async (params) => {

  const idToast = $toast.loading('Association du cours à la maquette pédagogique')

  if ( params.data.id && props.data.id_program && props.data.id_planning )  {

    const url = `schoolspaces/programs/${props.data.id_program}/courses/${params.data.id}`

    await fetchStore.action[fetchStore.actionType.FETCH_DATA](
        url,
        'POST'
    )

    if ( fetchStore.state.error[url] ) {

      $toast.update(idToast, {
        render: 'Nous n\'avons pas réussi à associer le cours à la maquette pédagogique. Essayer manuellement',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });

    } else {

      calendarStore.action[calendarStore.actionType.SET_PROGRAM_FROM_API](props.data.id_planning)

      $toast.update(idToast, {
        render: 'Liaison avec la maquette pédagogique réussi',
        autoClose: true,
        type: 'success',
        isLoading: false,
      });

    }

  }

  modalStore.action[modalStore.actionType.CLOSE_MODAL]()

}
</script>

<template>
  <div class="modal">
    <top-modal title="Ajouter un cours à la maquette pédagogique" />
    <content-modal>
      <form-courses
          :onsuccess="handleSuccess"
          :onfailure="() => modalStore.action[modalStore.actionType.CLOSE_MODAL]()"
      />
    </content-modal>
  </div>
</template>

<style scoped lang="scss">
</style>