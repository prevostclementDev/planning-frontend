<script setup>
import Tabs from "~/components/form/interaction/Tabs.vue";
import FormUsers from "~/components/users/formUsers.vue";

useHead(() => ({
  title : 'Paramètre'
}))

const activeTabs = ref('general')
const authStore = useAuth()



</script>

<template>
  <div>
    <tabs :action="{ general : 'Mon profil utilisateur', school : 'Mon espace scolaire', other : 'Divers' }" :default-value="activeTabs" v-model="activeTabs" />

    <div class="containerParams">
      <form-users
          v-if="activeTabs === 'general'"
          :users-data="authStore.authState.USER"
          :onfinish="(params, status) => {
            if ( status ) {
               authStore.authState = {
                ...authStore.authState,
                USER : {
                  ...authStore.authState.USER,
                  first_name : params.first_name,
                  last_name : params.last_name,
                  civility : (params.civility) ? params.civility : null,
                  mail : params.mail
                }
              }
            }
          }"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">
.containerParams {
  padding: 2rem 0;

}
</style>