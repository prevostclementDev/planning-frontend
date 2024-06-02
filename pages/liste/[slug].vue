<script setup>
import Ariane from "~/components/navigation/ariane.vue";
import TableList from "~/components/listes/tableList.vue";
import {useFetch} from "~/stores/Fetch.js";
import Button from "~/components/form/interaction/Button.vue";
import {useNavBar} from "~/stores/ui/navbar";
import { useCreateDonnees } from '~/stores/ui/createDonnees.js'
import {useRouting} from "~/stores/routing.js";
import {useUsers} from "~/stores/entity/users.js";
import {useClass} from "~/stores/entity/class.js";
import {usePrograms} from "~/stores/entity/programs.js";
import {useCourse} from "~/stores/entity/cours.js";
import {useClassRoom} from "~/stores/entity/classroom.js";

const useRoutingStore = useRouting()
const { $timeFormat, $toast } = useNuxtApp()
const useCreateDonneesStore = useCreateDonnees()
const useNavBarStore = useNavBar()
const useFetchStore = useFetch()
const route = useRoute()

// Set page type
useNavBarStore.setNavBar(false)
const titlePage = ref('')

// Set data for render tableList
let store;
let titleArray = []
let valueFormat = {}
let customColumn = []

// Button action
let actionAdd;
let textButtonAdd = 'Ajouter'

// Page title
useHead(() => ({ title : titlePage.value }))

// Set list type and format data for table List
switch (route.params.slug) {

  case 'mes-cours':
    // Page title
    titlePage.value = 'Mes cours'

    store = useCourse()

    // Title displaying
    titleArray = ['Nom du cours','Heure requise','Couleur']

    // specific render format value
    valueFormat = {
      'hours_required' : (value) => {
        if ( value ) {
          return $timeFormat.formatTime(value)
        } else {
          return 'Non spécifié'
        }
      },
      'color'  : (value) => ( value ) ? `<div class="TableListColor" style="background : ${value};" ></div>` : 'Aucune couleur choisi',
    }

    // Action
    actionAdd = (e) => {
      useCreateDonneesStore.state.parcours = 'cours'
      navigateTo('/creer-des-donnees')
    }
    textButtonAdd = 'Ajouter des cours'
    break;

  case 'mes-programmes':
    // Page title
    titlePage.value = 'Mes maquettes pédagogiques'

    store = usePrograms()

    // Title displaying
    titleArray = ['Nom du programme']

    // Action
    actionAdd = (e) => {
      useCreateDonneesStore.state.parcours = 'formation'
      navigateTo('/creer-des-donnees')
    }
    textButtonAdd = 'Ajouter une maquette pédagogique'
    break;

  case 'mes-classes':

    store = useClass()

    // Page title
    titlePage.value = 'Mes classes'

    // Title displaying
    titleArray = ['Nom de la classe']

    // render custom column on table
    customColumn = [
      {
        title : 'Nombre élèves',
        value : async (id) => {
          const url = `schoolspaces/class/${id}/users`
          await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](url)

          if ( ! useFetchStore.state.error[url] ) {
            return useFetchStore.state.data[url].data.pagination.total + ' élève(s)'
          } else {
            return 'Une erreur est survenue pendant la récupération des élèves'
          }

        }
      }
    ]

    // Action
    actionAdd = (e) => {
      useCreateDonneesStore.state.parcours = 'classes'
      navigateTo('/creer-des-donnees')
    }
    textButtonAdd = 'Ajouter une classe'

    break;

  case 'mes-salles':

    store = useClassRoom()

    // Page title
    titlePage.value = 'Mes salles'

    // Title displaying
    titleArray = ['Nom de la salle','Capacité']

    // Action
    actionAdd = (e) => {
      useCreateDonneesStore.state.parcours = 'classroom'
      navigateTo('/creer-des-donnees')
    }
    textButtonAdd = 'Ajouter'
    break;

  case 'mes-intervenants':
    // Page title
    titlePage.value = 'Mes intervenants'

    store = useUsers()
    const teacherUri = store.baseUrl+'?roles=3'

    if ( store.state.current_uri !== teacherUri ) {
      store.mutation[store.mutationType.SET_CURRENT_URI](teacherUri)
      store.mutation[store.mutationType.SET_MODAL_NAME]('teachers')
    }

    // Title displaying
    titleArray = ['Civilité','Prénom','Nom','Email']

    // specific render format value
    valueFormat = {
      'roles' : (value) => null,
      'profile_picture' : (value) => null ,
      'password' : (value) => null ,
      'id_school_space' : (value) => null,
      'last_connection' : (value) => null ,
      'civility' : (value) => ( value ) ? value : 'Non renseigné' ,
    }

    // Action
    actionAdd = (e) => {
      useCreateDonneesStore.state.parcours = 'intervenant'
      navigateTo('/creer-des-donnees')
    }
    textButtonAdd = 'Ajouter des intervenants'
    break;

  case 'mes-eleves':

    store = useUsers()
    const elevesUrl = store.baseUrl+'?roles=2'

    if ( store.state.current_uri !== elevesUrl ) {
      store.mutation[store.mutationType.SET_CURRENT_URI](elevesUrl)
      store.mutation[store.mutationType.SET_MODAL_NAME]('users')
    }

    // Page title
    titlePage.value = 'Mes élèves'

    // Title displaying
    titleArray = ['Civilité','Prénom','Nom','Email']

    // specific render format value
    valueFormat = {
      'roles' : (value) => null,
      'profile_picture' : (value) => null ,
      'password' : (value) => null ,
      'id_school_space' : (value) => null,
      'last_connection' : (value) => null ,
      'civility' : (value) => ( value ) ? value : 'Non renseigné' ,
    }

    // Action
    actionAdd = (e) => {}
    textButtonAdd = null

    break;

  default:
    throw createError({
      statusCode: 404,
      statusMessage: 'Nous n\'avons pas trouvé votre listes...',
      fatal : true
    })

}

// On mounted get data
onMounted(async () => {

  await store.action[store.actionType.GET_LIST]()

  if ( useFetchStore.state.error[store.baseUrl] ) {
    $toast.error('Une erreur est survenue, nous allons vous rediriger')
    setTimeout(() => {
      navigateTo('/listes')
    },2000)
  }

})
</script>

<template>
  <div>
    <ariane :links="[
        { text : 'Dashboard', url : useRoutingStore.url.dashboard },
        {text : 'Mes listes', url : useRoutingStore.url.dataList},
        { text : titlePage }]"
    />

    <div class="titleTop">
      <h2>{{ titlePage }}</h2>
      <Button v-if="textButtonAdd !== null" @click.prevent="actionAdd">{{ textButtonAdd }}</Button>
    </div>

    <table-list
        :title="titleArray"
        :store="store"
        :value-format="valueFormat"
        :custom-column="customColumn"
        :data-is-loading="useFetchStore.state.loading[store.baseUrl]"
    />

   </div>
</template>

<style scoped lang="scss">
.titleTop {
  @include flex(space-between);

  button {
    margin: 0;

  }

}
</style>