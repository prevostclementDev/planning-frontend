<script setup>
defineProps({
  type : {
    type : String,
    default : 'default',
    required: false
  }
})
</script>

<template>
  <svg v-if="type === 'default'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H9L11 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V14C18 14.5304 17.7893 15.0391 17.4142 15.4142C17.0391 15.7893 16.5304 16 16 16H4C3.46957 16 2.96086 15.7893 2.58579 15.4142C2.21071 15.0391 2 14.5304 2 14V6Z" fill="white"/>
    <path d="M8 11H12M10 9V13" stroke="#38557E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <svg v-else-if="type === 'rounded'" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
    <path d="M9.5 14.5H14.5M14.5 14.5H19.5M14.5 14.5V9.5M14.5 14.5V19.5" stroke="#303741" stroke-width="2.41668" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5 27C21.4035 27 27 21.4035 27 14.5C27 7.59644 21.4035 2 14.5 2C7.59644 2 2 7.59644 2 14.5C2 21.4035 7.59644 27 14.5 27Z" stroke="#303741" stroke-width="2.41668" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
