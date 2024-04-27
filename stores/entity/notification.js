import { defineStore } from 'pinia'
import abstractEntity from "~/stores/StoreInterface/AbstractEntity.js";
import { useFetch } from "~/stores/Fetch.js";

export const useNotification = defineStore('notification', () => {

  const useFetchStore = useFetch()
  const { $toast } = useNuxtApp()

  // Get action type
  const actionType = abstractEntity.actionType

  // get mutation type
  const mutationType = abstractEntity.mutationType

  // Base url api
  const baseUrl = 'schoolspaces/conflicts'
  const modalName = ''

  // State entity
  const state = ref( abstractEntity.getBaseState({}))

  // Mutation
  const mutation = abstractEntity.generateMutation(state)

  // Get basics action implementation
  const basicsImplementation = abstractEntity.basicsAction(state, mutation, mutationType)

  // Action
  const action = ({

    async [abstractEntity.actionType.SEND_FORM](){
      throw new Error('action impossible')
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