<script setup>
defineProps({
  type: {
    type : String,
    default : 'default',
    required : false,
  }
})
</script>

<template>
  <svg v-if="type === 'default'" xmlns="http://www.w3.org/2000/svg" width="68" height="61" viewBox="0 0 68 61" fill="none">
    <path d="M67 53.4444C67 55.1831 66.3046 56.8505 65.0669 58.0799C63.8292 59.3093 62.1504 60 60.4 60H7.6C5.84957 60 4.17083 59.3093 2.93309 58.0799C1.69535 56.8505 1 55.1831 1 53.4444V7.55556C1 5.81691 1.69535 4.14948 2.93309 2.92008C4.17083 1.69067 5.84957 1 7.6 1H24.1L30.7 10.8333H60.4C62.1504 10.8333 63.8292 11.524 65.0669 12.7534C66.3046 13.9828 67 15.6502 67 17.3889V53.4444Z" stroke="#303741" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <svg v-else-if="type === 'full'" xmlns="http://www.w3.org/2000/svg" width="117" height="88" viewBox="0 0 117 88" fill="none">
    <path d="M64.0422 16.4319L64.7749 17.1667H65.8125H102.375C105.588 17.1667 108.672 18.4468 110.946 20.7277C113.221 23.0088 114.5 26.1042 114.5 29.3333V73.3333C114.5 76.5624 113.221 79.6578 110.946 81.939C108.672 84.2199 105.588 85.5 102.375 85.5H14.625C11.4115 85.5 8.32827 84.2199 6.05384 81.939C3.77917 79.6578 2.5 76.5624 2.5 73.3333V14.6667C2.5 11.4376 3.77917 8.34217 6.05384 6.06102C8.32827 3.78011 11.4115 2.5 14.625 2.5H50.1499L64.0422 16.4319Z" stroke="#303741" stroke-width="5"/>
    <path d="M43 51.5H74M58.5 37V66" stroke="#303741" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
