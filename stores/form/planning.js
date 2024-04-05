import { defineStore } from 'pinia'
import {useFetch} from "~/stores/Fetch.js";
export const usePlanningForm = defineStore('planningStore', () => {

  const useFetchStore = useFetch()
  const { $timeFormat, $toast } = useNuxtApp()

  const state = ref({
    formData : {
      title : '',
      class : '',
      program : '',
      startDate : '',
      endDate : '',
    },
    isUpdate : false,
    updateId : ''
  })

  const mutationType = {
    SET_FORM_DATA : 'SET_FORM_DATA',
    SET_UPDATE : 'SET_UPDATE',
    REMOVE_UPDATE : 'REMOVE_UPDATE',
  }

  const mutation = ({

    [mutationType.SET_FORM_DATA](formData) {
      state.value = {
        ...state.value,
        formData : formData
      }
    },

    [mutationType.SET_UPDATE](updateId) {
      state.value = {
        ...state.value,
        isUpdate : true,
        updateId : updateId
      }
    },

    [mutationType.REMOVE_UPDATE]() {
      state.value = {
        ...state.value,
        isUpdate : false,
        updateId : ''
      }
    },

  })

  const actionType = {
    SEND_FORM : 'SEND_FORM_PLANNING'
  }

  const action = ({

    async [actionType.SEND_FORM](){

      let url = '/schoolspaces/plannings'
      let method = 'POST'

      if ( state.value.isUpdate ) {
        url += '/'+state.value.updateId
        method = 'PUT'
      }

      const startDate = new Date(state.value.formData.startDate)
      const endDate = new Date(state.value.formData.endDate)

      const idToast = $toast.loading('Enregistrement...')

      await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](url,method,{
        name : state.value.formData.title,
        id_class : state.value.formData.class,
        id_programs : state.value.formData.program,
        end_date : `${endDate.getFullYear()}-${$timeFormat.renderToDigit(endDate.getMonth() + 1)}-${$timeFormat.renderToDigit(endDate.getDate())}`,
        start_date : `${startDate.getFullYear()}-${$timeFormat.renderToDigit(startDate.getMonth() + 1)}-${$timeFormat.renderToDigit(startDate.getDate())}`,
      })

      useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)

      if ( ! useFetchStore.state.error[url] ) {

        useFetchStore.action[useFetchStore.actionType.FETCH_DATA]('/schoolspaces/plannings')

        $toast.update(idToast, {
          render: 'Enregistrement réussi !',
          autoClose: true,
          type: 'success',
          isLoading: false,
        });
        return true
      } else {
        $toast.update(idToast, {
          render: 'Une erreur est survenue',
          autoClose: true,
          type: 'error',
          isLoading: false,
        });
        return false
      }

    }

  })

  return { state, mutation, mutationType, action, actionType }
})