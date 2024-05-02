<script setup>
import { useModal } from '~/stores/ui/modal.js'
import UpdateUsers from "~/components/users/usersModal.vue";
import PlanningModal from "~/components/planning/planningModal.vue";
import ConfirmDelete from "~/components/modal/child/confirmDelete.vue";
import UsersModal from "~/components/users/usersModal.vue";
import TeachersModal from "~/components/users/teachersModal.vue";
import ClassModal from "~/components/class/classModal.vue";
import ProgramsModal from "~/components/programs/programsModal.vue";
import CoursesModal from "~/components/courses/coursesModal.vue";
import EventsModal from "~/components/events/eventsModal.vue";
import AddSkillsModal from "~/components/users/teachers/addSkillsModal.vue";
import AddTeacherModal from "~/components/courses/teachers/addTeacherModal.vue";
import AddCourseModal from "~/components/programs/courses/addCourseModal.vue";
import AddCourseProgramModal from "~/components/courses/createCourseProgramModal.vue";
import CreateCourseProgramModal from "~/components/courses/createCourseProgramModal.vue";
const modalStore = useModal();

function closeModalOnClickParent(e) {

  if ( e.target.getAttribute('id') === 'parent-modal' ) {
    modalStore.action[modalStore.actionType.CLOSE_MODAL]()
  }

}

</script>

<template>
  <transition name="fade">
    <div id="parent-modal" v-if="modalStore.state.openModal !== ''" @click.prevent="closeModalOnClickParent">

      <update-users v-if="modalStore.state.openModal === 'updateUsers'" v-bind="modalStore.state.propsModal"/>
      <planning-modal v-else-if="modalStore.state.openModal === 'planningModal'" v-bind="modalStore.state.propsModal" />
      <loader-small-loader v-else-if="modalStore.state.openModal === 'loading'" custom-class="full" />
      <confirm-delete v-else-if="modalStore.state.openModal === 'delete'" v-bind="modalStore.state.propsModal"/>
      <users-modal v-else-if="modalStore.state.openModal === 'users'" v-bind="modalStore.state.propsModal"/>
      <teachers-modal v-else-if="modalStore.state.openModal === 'teachers'" v-bind="modalStore.state.propsModal" />
      <class-modal v-else-if="modalStore.state.openModal === 'class'" v-bind="modalStore.state.propsModal"/>
      <programs-modal v-else-if="modalStore.state.openModal === 'programs'" v-bind="modalStore.state.propsModal" />
      <courses-modal  v-else-if="modalStore.state.openModal === 'courses'" v-bind="modalStore.state.propsModal" />
      <events-modal  v-else-if="modalStore.state.openModal === 'events'" v-bind="modalStore.state.propsModal" />
      <add-skills-modal v-else-if="modalStore.state.openModal === 'addSkillTeacher'" v-bind="modalStore.state.propsModal"/>
      <add-teacher-modal v-else-if="modalStore.state.openModal === 'addTeacherCourse' " v-bind="modalStore.state.propsModal" />
      <add-course-modal v-else-if="modalStore.state.openModal === 'addCourseProgram'"  v-bind="modalStore.state.propsModal"/>
      <class-users-add-users-modal v-else-if="modalStore.state.openModal === 'addUserClass'" v-bind="modalStore.state.propsModal" />
      <create-course-program-modal v-else-if="modalStore.state.openModal === 'createCourseInProgram'" v-bind="modalStore.state.propsModal" />

    </div>
  </transition>
</template>

<style scoped lang="scss">
#parent-modal {

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100svw;
  height: 100svh;
  @include bgColor(primary4,.5);
  @include flex();

}
</style>