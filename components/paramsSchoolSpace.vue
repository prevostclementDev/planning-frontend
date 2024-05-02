<script setup>
import {useFetch} from "~/stores/Fetch.js";

const fetch = useFetch()
const url = 'schoolspaces/options'
const options = ref({})

onMounted(async () => {
  await fetch.action[fetch.actionType.FETCH_DATA](url)

  if ( ! fetch.state.error[url] ) {

    fetch.state.data[url].data.options.forEach(opt => {

      options.value = {
        ...options.value,
        [opt.opt_key] : opt.opt_value
      }

    })

  }

})

function updateValue(optionsKey, value) {

  fetch.action[fetch.actionType.FETCH_DATA](url,'POST',{
    key : optionsKey,
    value : value
  })

}

</script>

<template>
  <div class="textContainer">
    <h3>Configuration des mails</h3>
    <div class="spacing"></div>

    <div class="options">
      <input
          type="checkbox"
          id="SEND_TEACHER_ACCESS_ON_PLANNING_VALIDATION"
          @change.prevent="(event) => updateValue('SEND_TEACHER_ACCESS_ON_PLANNING_VALIDATION', (event.target.checked) ? '1' : '0')"
          :checked="!!( options.SEND_TEACHER_ACCESS_ON_PLANNING_VALIDATION && options.SEND_TEACHER_ACCESS_ON_PLANNING_VALIDATION === '1' )"
      >
      <label for="SEND_TEACHER_ACCESS_ON_PLANNING_VALIDATION">
        <span class="textBold">Envoyer un mail de connexion aux intervenants quand le planning passe au status : En validation des intervenants</span>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.options {
  @include flex(flex-start,center);
  margin: 1rem 0;

  span {
    margin-left: .8rem;
    user-select: none;

  }

}
</style>