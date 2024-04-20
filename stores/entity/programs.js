import { defineStore } from 'pinia'
import abstractEntity from "~/stores/StoreInterface/AbstractEntity.js";
import { useFetch } from "~/stores/Fetch.js";

export const usePrograms = defineStore('programs', () => {

  const useFetchStore = useFetch()
  const { $toast } = useNuxtApp()

  // Get action type
  const actionType = abstractEntity.actionType

  // get mutation type
  const mutationType = abstractEntity.mutationType

  // Base url api
  const baseUrl = 'schoolspaces/programs'
  const modalName = 'programs'

  // State entity
  const state = ref( abstractEntity.getBaseState({
    name : ''
  }))

  // Mutation
  const mutation = abstractEntity.generateMutation(state)

  // Get basics action implementation
  const basicsImplementation = abstractEntity.basicsAction(state, mutation, mutationType)

  // Action
  const action = ({

    async [abstractEntity.actionType.SEND_FORM](){
      return await basicsImplementation[abstractEntity.actionType.SEND_FORM](
        baseUrl,
        'POST',
        useFetchStore,
        $toast,
        () => action[abstractEntity.actionType.GET_LIST](true)
      )
    },

    async [abstractEntity.actionType.GET_LIST](forceReload = false, url = null) {

      let callableUri = (url) ? url : baseUrl

      return await basicsImplementation[abstractEntity.actionType.GET_LIST](
        callableUri,
        forceReload,
        useFetchStore,
        $toast,
      )


    }

  })

  return { state, mutation, action, baseUrl,actionType, mutationType, modalName }
})