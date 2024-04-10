<script setup>

const { $timeFormat } = useNuxtApp()

defineProps({

  CourseName : {
    type : String,
    required : false,
    default : ''
  },

  CourseColor : {
    type : String,
    required : false,
    default : ''
  },

  CourseId : {
    type : String,
    required : false,
    default : ''
  },

  hoursRequired : {
    type : String,
    required : false,
    default : ''
  },

  pourcentHourPlace : {
    type : String,
    required : false,
    default : ''
  },

  totalTimePlaced : {
    type : String,
    required : false,
    default : ''
  },

})
</script>

<template>
  <div class="course" :data-event='JSON.stringify({
         "title": CourseName,
         "duration": "01:00",
         "editable" : true,
         "extraParams": { "color" : CourseColor, "course_id": CourseId }
         })' >

    <h4> {{ CourseName }} </h4>
    <div v-if="hoursRequired" class="progressBar">
      <div class="title f-s-400 fs-s">
        {{ $timeFormat.formatTime(totalTimePlaced) }} sur {{ $timeFormat.formatTime(hoursRequired) }}
      </div>
      <div class="background">
        <span class="backgroundProgress" :style="{ background : (CourseColor) ? CourseColor : '' }"></span>
        <span class="progress" :style="{ background : (CourseColor) ? CourseColor : '', width : (pourcentHourPlace) ? pourcentHourPlace : '' }"></span>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.course {
  margin: 0.5rem 1rem;
  @include effect(shadow);
  border-radius: 8px;
  cursor: grab;
  z-index: 1;

  h4 {
    padding: 1rem;

  }

  .progressBar {
    padding: 0 1rem 1rem;
    position: relative;

    .title {
      position: relative;
      z-index: 2;

    }

    .background {
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;

      span {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 0 0 8px 8px;
        @include bgColor(secondary0);
        max-width: 100%;

        &.backgroundProgress {
          opacity: 0.2;


        }

      }

    }

  }

}
</style>