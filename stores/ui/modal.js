import { defineStore } from 'pinia'
export const useModal = defineStore('modal', () => {

  const actionType = {
    OPEN_MODAL : 'OPEN_MODAL',
    CLOSE_MODAL : 'CLOSE_MODAL',
    OPEN_CONFIRM_DELETE : 'OPEN_CONFIRM_DELETE_MODAL'
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

    [actionType.OPEN_MODAL](modal, props = null) {
      mutation[mutationType.SET_OPEN_MODAL](modal)

      if (props) mutation[mutationType.SET_PROPS_MODAL](props)
    },

    [actionType.CLOSE_MODAL]() {
      mutation[mutationType.DELETE_OPEN_MODAL]()
      mutation[mutationType.SET_PROPS_MODAL]({})
    },

    [actionType.OPEN_CONFIRM_DELETE](url, ondelete = null, ondeleteparams = '') {
      mutation[mutationType.SET_OPEN_MODAL]('delete')

      let args = { deleteUrl : url }

      if ( ondelete ) {
        args = {
          ...args,
          ondelete : ondelete,
          ondeleteparams : ondeleteparams
        }
      }

      mutation[mutationType.SET_PROPS_MODAL](args)
    }

  })


  return { state, actionType, action, mutationType, mutation }
})