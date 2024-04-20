<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Select from "~/components/form/interaction/Select.vue";

const props = defineProps({
  planning : {
    type : Object,
    required : true
  }
})

const status = ref(props.planning?.data?.planning?.status)

watch(() => props.planning, (nv,ov) => {
  status.value = props.planning?.data?.planning?.status
})

</script>

<template>
  <form action="">

    <div class="input-container">

      <div class="group">

        <Select
            custom-class="notitle"
            v-model="status"
        >
          <option value="draft">Brouillon</option>
          <option value="in_validation">En validation des intervenants</option>
          <option value="publish">Validé</option>
        </Select>

        <Button custom-class="small">Valider</Button>

      </div>

    </div>
  </form>
</template>

<style scoped lang="scss">
</style>