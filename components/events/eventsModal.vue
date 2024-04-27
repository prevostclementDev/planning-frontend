<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import EventsForm from "~/components/events/eventsForm.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";
import Repetition from "~/components/events/repetition.vue";

const activeTabs = ref('general')
const calendarStore = useCalendar()

defineProps({
  event : {
    type : Object,
    default : {},
    required : true
  }
})

</script>

<template>
  <div class="modal">
    <top-modal
        :title="( event?._def?.title ) ? event._def.title : 'Modifier le cours'"
        :color="(event._def.extendedProps.extraParams.color) ? event._def.extendedProps.extraParams.color : null"
    />
    <content-modal>

      <div class="tabs">
        <tabs :action="{ general : 'Informations générales', 'conflict' : 'Les conflits', repetition : 'Créer une répétition' }" :default-value="activeTabs" v-model="activeTabs" />
      </div>

      <div class="tabsContainer">
        <events-form v-if="activeTabs === 'general'" :event="event" />
        <planning-conflicts-lists
            v-if="activeTabs === 'conflict'"
            :id-planning="calendarStore.state.calendarId"
            :id-slots="event._def.extendedProps.extraParams.id_in_db"
        />
        <repetition v-if="activeTabs === 'repetition'" />
      </div>

    </content-modal>
  </div>
</template>

<style scoped lang="scss">
.modal {
  min-width: 50vw;

  .tabs {
    margin: .5rem 0 1rem;

  }

  .tabsContainer {
    margin: 1rem 0;

  }

}
</style>