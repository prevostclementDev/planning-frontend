import { defineStore } from 'pinia'
export const useModal = defineStore('modal', () => {

  const actionType = {
    OPEN_MODAL : 'OPEN_MODAL',
    CLOSE_MODAL : 'CLOSE_MODAL'
  }

  const mutationType = {
    SET_OPEN_MODAL : 'SET_OPEN_MODAL',
    DELETE_OPEN_MODAL : 'DELETE_OPEN_MODAL',
    SET_PROPS_MODAL : 'SET_PROPS_MODAL'
  }

  const state = ref({
    openModal : '',
    propsModal : ''
  })

  const mutation = ({

    [mutationType.SET_PROPS_MODAL](props) {
      state.value = {
        ...state.value,
        propsModal : props
      }
    },

    [mutationType.SET_OPEN_MODAL](modal) {
      state.value = {
        ...state.value,
        openModal : modal
      }
    },

    [mutationType.DELETE_OPEN_MODAL]() {
      state.value = {
        ...state.value,
        openModal : ''
      }
    }

  })

  const action = ({

    [actionType.OPEN_MODAL](modal) {
      mutation[mutationType.SET_OPEN_MODAL](modal)
    },

    [actionType.CLOSE_MODAL]() {
      mutation[mutationType.DELETE_OPEN_MODAL]()
    }

  })


  return { state, actionType, action, mutationType, mutation }
})