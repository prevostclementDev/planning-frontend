<script setup>
defineProps({
  stepNumber : {
    type : Number,
    required : true
  },
  activeStep : {
    type : Number,
    required : true
  }
})
</script>

<template>
  <div class="layoutStep">
    <div class="containsStep" v-for="i in stepNumber">
      <div :class="(i === activeStep || i < activeStep) ? 'stepIndicator active' : 'stepIndicator'" :step="i">{{ i }}</div>
      <div
          v-if="stepNumber !== i"
          :class="(i === activeStep) ? 'separator active' : ( i < activeStep ) ? 'separator finish' : 'separator'"
          :step="i">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layoutStep {
  @include flex();
  padding: 0 0 1.875rem;
  border-bottom: 1px solid getColor(grey9);

  .containsStep {
    display: contents;

    .stepIndicator {
      padding: 0.5rem;
      @include bgColor(grey9);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      color: white;
      @include flex();

      &.active {
        @include bgColor(primary3);
      }

    }

    .separator {
      margin: 0 1rem;
      height: 5px;
      width: 90px;
      @include bgColor(grey9);
      border-radius: 40px;
      position: relative;

      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 40px;
        @include bgColor(primary3);
        transform: scaleX(0);
        transform-origin: left;
        transition: .3s ease-in-out transform;

      }

      &.active {

        &::before {
          transform: scaleX(0.5);

        }

      }

      &.finish {

        &::before {
          transform: scaleX(1);

        }

      }

    }

  }

}
</style>