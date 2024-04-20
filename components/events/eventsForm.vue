<script setup>
import Button from "~/components/form/interaction/Button.vue";
import SearchSelect from "~/components/form/interaction/searchSelect.vue";

defineProps({
  event : {
    type : Object,
    default : {},
    required : true
  }
})

</script>

<template>
  <form action="">

    <div class="input-container">

        <div class="group">

          <SearchSelect
            url="schoolspaces/courses/id/teachers"
            :display-array="[ 'first_name', 'last_name' ]"
            title="Ajouter un intervenant"
          />

          <SearchSelect
              url="schoolspaces/classroom"
              :display-array="[ 'first_name', 'last_name' ]"
              title="Associer à une salle"
          />

        </div>

      <div class="action between">

        <Button custom-class="delete small">Supprimer</Button>
        <Button custom-class="small">Enregistrer</Button>

      </div>

    </div>

  </form>
</template>

<style scoped lang="scss">
</style>