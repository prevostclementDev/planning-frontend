<script setup>
import Tabs from "~/components/form/interaction/Tabs.vue";
import FormUsers from "~/components/users/formUsers.vue";
import Ariane from "~/components/navigation/ariane.vue";
import {useRouting} from "~/stores/routing.js";

useHead(() => ({
  title : 'Paramètre'
}))

const activeTabs = ref('general')
const authStore = useAuth()
const rootingStore = useRouting()

</script>

<template>
  <div>

    <div class="title">
      <ariane :links="[ { text : 'Dashboard', url : rootingStore.url.dashboard }, { text : 'paramètre' } ]" />
      <h2>Paramètre</h2>
    </div>

    <tabs :action="{ general : 'Mon profil utilisateur', school : 'Mon espace scolaire' }" :default-value="activeTabs" v-model="activeTabs" />

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
          :without-email="true"
      />
      <params-school-space v-if="activeTabs === 'school'" />
    </div>

  </div>
</template>

<style scoped lang="scss">
.containerParams {
  padding: 2rem 0;

}

.title {
  margin-bottom: 1rem;

}
</style>