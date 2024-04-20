import { defineStore } from 'pinia'
import {useFetch} from "~/stores/Fetch.js";
import abstractEntity from "~/stores/StoreInterface/AbstractEntity.js";

export const useUsers = defineStore('users', () => {

  // Get action type
  const actionType = abstractEntity.actionType

  // get mutation type
  const mutationType = abstractEntity.mutationType

  // custom mutation type
  mutationType.SET_CURRENT_URI = 'SET_CURRENT_URI'
  mutationType.SET_MODAL_NAME = 'SET_REWRITE_MODAL_NAME'

  // Base url api
  const baseUrl = 'schoolspaces/users'
  const modalName = 'users'

  const useFetchStore = useFetch()
  const { $toast } = useNuxtApp()

  const state = ref(abstractEntity.getBaseState(
    {
      first_name : '',
      last_name : '',
      mail : '',
      civility : 'Monsieur'
    },
    {
      current_uri : baseUrl,
      modal_name_rewrite : 'users'
    }
  ))

  // Mutation
  const mutation = abstractEntity.generateMutation(state)
  // custom mutation type implemenation
  mutation[mutationType.SET_CURRENT_URI] = function (current_uri) {
    state.value = {
      ...state.value,
      current_uri : current_uri,
      list : null
    }
  }
  mutation[mutationType.SET_MODAL_NAME] = function (nameModal) {
    state.value = {
      ...state.value,
      modal_name_rewrite : nameModal,
    }
  }

  // Get basics action implementation
  const basicsImplementation = abstractEntity.basicsAction(state, mutation, mutationType)

  // Action
  const action = ({

    async [abstractEntity.actionType.SEND_FORM](){

      if ( ! ['Monsieur','Madame'].includes(state.value.formData.civility) ) {
        delete state.value.formData.civility
      }

      return await basicsImplementation[abstractEntity.actionType.SEND_FORM](
        baseUrl,
        'POST',
        useFetchStore,
        $toast,
        () => action[actionType.GET_LIST](true),
      )
    },

    async [abstractEntity.actionType.GET_LIST](forceReload = false, url = null){

      let callableUri = (url) ? url : state.value.current_uri
      mutation[mutationType.SET_CURRENT_URI](callableUri)

      basicsImplementation[abstractEntity.actionType.GET_LIST](
        callableUri,
        forceReload,
        useFetchStore,
        $toast
      )

    }

  })

  return { state, mutation, mutationType, action, actionType, modalName, baseUrl }
})