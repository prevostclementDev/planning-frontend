<script setup>
import Ariane from "~/components/navigation/ariane.vue";
import TableList from "~/components/tableList.vue";
const { $timeFormat } = useNuxtApp()
import {useFetch} from "~/stores/Fetch.js";
import Button from "~/components/form/interaction/Button.vue";
import {useNavBar} from "~/stores/ui/navbar";
import { useCreateDonnees } from '~/stores/ui/createDonnees.js'

const useCreateDonneesStore = useCreateDonnees()

const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

const useFetchStore = useFetch()
const {$toast} = useNuxtApp()

// Set page type
const route = useRoute()
const titlePage = ref('')

let dataUrl = ''

// Set data for render tableList
let titleArray = []
let valueFormat = {}
let customColumn = []

let actionAdd;
let textButtonAdd = 'Ajouter'

// Data in table list
const pagination = ref({})
const data = ref([])

// Page title
useHead(() => ({
  title : titlePage.value
}))

// Set list type and format data for table List
switch (route.params.slug) {

  case 'mes-cours':
    titlePage.value = 'Mes cours'
    dataUrl = 'schoolspaces/courses'
    titleArray = ['Nom du cours','Heure requise','Couleur']
    valueFormat = {
      'hours_required' : (value) => {
        return $timeFormat.formatTime(value)
      },
      'color'  : (value) => ( value ) ? `<div style="background : ${value};" >${value}</div>` : 'Aucune couleur choisi',
    }

    actionAdd = (e) => {
      console.log(e)
    }
    textButtonAdd = 'Ajouter des cours'
    break;

  case 'mes-programmes':
    titlePage.value = 'Mes programmes'
    dataUrl = 'schoolspaces/programs'
    titleArray = ['Nom du programme']

    actionAdd = (e) => {
      console.log(e)
    }
    textButtonAdd = 'Ajouter un programme'
    break;

  case 'mes-classes':
    titlePage.value = 'Mes classes'
    dataUrl = 'schoolspaces/class'
    titleArray = ['Nom de la classe']
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

    actionAdd = (e) => {
      useCreateDonneesStore.state.parcours = 'classes'
      navigateTo('/creer-des-donnees')
    }
    textButtonAdd = 'Ajouter une classe'
    break;

  case 'mes-salles':
    titlePage.value = 'Mes salles'
    dataUrl = 'schoolspaces/classrooms'
    titleArray = ['Nom de la salle','Capacité']

    actionAdd = (e) => {
      console.log(e)
    }
    textButtonAdd = 'Ajouter des salles'
    break;

  case 'mes-intervenants':
    titlePage.value = 'Mes intervenants'
    dataUrl = 'schoolspaces/users?roles=3'
    titleArray = ['Civilité','Prénom','Nom','Email']
    valueFormat = {
      'roles' : (value) => null,
      'profile_picture' : (value) => null ,
      'password' : (value) => null ,
      'id_school_space' : (value) => null,
      'last_connection' : (value) => null ,
      'civility' : (value) => ( value ) ? value : 'Non renseigné' ,
    }

    actionAdd = (e) => {
      console.log(e)
    }
    textButtonAdd = 'Ajouter des intervenants'
    break;

  case 'mes-eleves':
    titlePage.value = 'Mes élèves'
    dataUrl = 'schoolspaces/users?roles=2'
    titleArray = ['Civilité','Prénom','Nom','Email']
    valueFormat = {
      'roles' : (value) => null,
      'profile_picture' : (value) => null ,
      'password' : (value) => null ,
      'id_school_space' : (value) => null,
      'last_connection' : (value) => null ,
      'civility' : (value) => ( value ) ? value : 'Non renseigné' ,
    }

    actionAdd = (e) => {
      console.log(e)
    }
    textButtonAdd = 'Ajouter des élèves'
    break;

  default:
    throw createError({
      statusCode: 404,
      statusMessage: 'Nous n\'avons pas trouvé votre listes...',
      fatal : true
    })
    break

}

const { state } = storeToRefs(useFetchStore)

// On mounted get data
onMounted(async () => {

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](dataUrl)

  if ( useFetchStore.state.error[dataUrl] ) {
    $toast.error('Une erreur est survenue, nous allons vous rediriger')
    setTimeout(() => {
      navigateTo('/listes')
    },2000)
  }

})

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](dataUrl)
})

</script>

<template>
  <div>
    <ariane :links="[{ text : 'Dashboard', url : '/' }, {text : 'Mes listes', url : '/listes'}, { text : titlePage }]" />

    <div class="titleTop">
      <h2>{{ titlePage }}</h2>
      <Button @click.prevent="actionAdd">{{ textButtonAdd }}</Button>
    </div>

    <table-list
        v-if="state?.data[dataUrl]?.data?.array"
        :title="titleArray"
        :data="state.data[dataUrl].data.array"
        :pagination="state.data[dataUrl].data.pagination"
        :value-format="valueFormat"
        :custom-column="customColumn"
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