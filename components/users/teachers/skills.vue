<script setup>
import {useFetch} from "~/stores/Fetch.js";
import Button from "~/components/form/interaction/Button.vue";
import Delete from "~/components/icones/delete.vue";
import {useModal} from "~/stores/ui/modal.js";
import SmallLoader from "~/components/loader/smallLoader.vue";

const props = defineProps({
  teacherData : {
    type : Object,
    required : false,
    default : null
  }
})

const modal = useModal()
const fetchStore = useFetch();
const url = `schoolspaces/users/${props.teacherData.id}/skills`
fetchStore.action[fetchStore.actionType.FETCH_DATA](url)

function openDelete(skillId){

  modal.action[modal.actionType.OPEN_CONFIRM_DELETE](
      `schoolspaces/users/${props.teacherData.id}/skills/${skillId}`,
      (params) => {
        modal.action[modal.actionType.OPEN_MODAL]('teachers', { data : params })
      },
      props.teacherData
  )

}

function openAddToUser(){
  modal.mutation[modal.mutationType.SET_PROPS_MODAL]({
    teachers : props.teacherData
  })

  modal.action[modal.actionType.OPEN_MODAL]('addSkillTeacher')
}

</script>

<template>
  <div class="teachersSkills">
    <div v-if="fetchStore.state.loading[url]" class="loading">
      <small-loader custom-class="blue" />
    </div>
    <div v-else-if="fetchStore.state.error[url]">
      Une erreur est survenu
    </div>
    <div v-else-if="fetchStore.state.data[url]" class="listSkills">

      <div class="lists">
        <div
            v-if="fetchStore.state.data[url].data.skills.length > 0"
            class="skills"
            v-for="skill in fetchStore.state.data[url].data.skills">
          <span class="">{{ skill.name }}</span>
          <Button custom-class="clear" @click.prevent="openDelete(skill.id)"> <delete /> </Button>
        </div>
        <div v-else>
          Aucun cours associé
        </div>
      </div>

      <div class="action end">
        <Button custom-class="small" @click.prevent="openAddToUser">Ajouter un cours a l'intervenant</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.teachersSkills {
  position: relative;
  min-height: 250px;

  .loading {
    @include flex();
    padding: 1rem 1rem;

  }

  .lists {
    @include flex(flex-start,flex-start,column,nowrap,0.8rem);
    margin: 1rem 0;
    max-height: 300px;
    overflow: auto;
    min-height: 300px;

  }

  .skills {
    width: 100%;
    @include flex(space-between);
    @include bgColor(primary2,0.1);
    @include color(primary4);
    @include typographie(h4);
    border: 1px solid getColor(primary4,0.2);
    padding: 1rem;
    border-radius: 10px;

  }

}
</style>