<script setup>
import TopModal from "~/components/modal/elements/topModal.vue";
import ContentModal from "~/components/modal/elements/contentModal.vue";
import EventsForm from "~/components/events/eventsForm.vue";
import Tabs from "~/components/form/interaction/Tabs.vue";

const activeTabs = ref('general')

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
    <top-modal :title="( event?.def?.title ) ? event.def.title : 'Modifier le cours'" />
    <content-modal>

      <div class="tabs">
        <tabs :action="{ general : 'Informations générales', 'conflict' : 'Les conflits', repetition : 'Créer une répétition' }" :default-value="activeTabs" v-model="activeTabs" />
      </div>

      <div class="tabsContainer">
        <events-form v-if="activeTabs === 'general'" :event="event" />
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