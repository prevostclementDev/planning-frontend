import { defineStore } from 'pinia'
import {useFetch} from "~/stores/Fetch.js";
import abstractEntity from "~/stores/StoreInterface/AbstractEntity.js";
export const usePlanning = defineStore('planningStore', () => {

  // Get action type
  const actionType = abstractEntity.actionType

  // get mutation type
  const mutationType = abstractEntity.mutationType

  const useFetchStore = useFetch()
  const { $timeFormat, $toast } = useNuxtApp()

  // Base url api
  const baseUrl = '/schoolspaces/plannings'

  // State entity
  const state = ref( abstractEntity.getBaseState({
        title : '',
        class : '',
        program : '',
        startDate : '',
        endDate : '',
      },
    )
  )

  // Mutation
  const mutation = abstractEntity.generateMutation(state)

  // Get basics action implementation
  const basicsImplementation = abstractEntity.basicsAction(state, mutation, mutationType)

  // Action
  const action = ({

    async [abstractEntity.actionType.SEND_FORM](){

      const startDate = new Date(state.value.formData.startDate)
      const endDate = new Date(state.value.formData.endDate)

      return await basicsImplementation[abstractEntity.actionType.SEND_FORM](
        baseUrl,
        'POST',
        useFetchStore,
        $toast,
        () => action[actionType.GET_LIST](true),
        {
          name : state.value.formData.title,
          id_class : state.value.formData.class,
          id_programs : state.value.formData.program,
          end_date : `${endDate.getFullYear()}-${$timeFormat.renderToDigit(endDate.getMonth() + 1)}-${$timeFormat.renderToDigit(endDate.getDate())}`,
          start_date : `${startDate.getFullYear()}-${$timeFormat.renderToDigit(startDate.getMonth() + 1)}-${$timeFormat.renderToDigit(startDate.getDate())}`,
        }
      )
    },

    async [abstractEntity.actionType.GET_LIST](forceReload = false) {

      basicsImplementation[abstractEntity.actionType.GET_LIST](
        baseUrl,
        forceReload,
        useFetchStore,
        $toast
      )

    }

  })

  return { state, mutation, action, baseUrl,actionType, mutationType }
})