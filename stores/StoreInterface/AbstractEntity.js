export default {

  actionType : {
    SEND_FORM : 'SEND_FORM',
    GET_LIST : 'GET_LIST'
  },

  mutationType : {
    SET_FORM_DATA : 'SET_FORM_DATA',
    SET_UPDATE : 'SET_UPDATE',
    REMOVE_UPDATE : 'REMOVE_UPDATE',
    SET_LIST_DATA : 'SET_LIST'
  },

  getBaseState(formData, additionalElements =  {}) {
    return {
      formData : formData,
      list : null,
      isUpdate : false,
      updateId : '',
      ...additionalElements
    }
  },

  generateMutation(state) {
    return ({

      [this.mutationType.SET_FORM_DATA](formData) {
        state.value = {
          ...state.value,
          formData : formData
        }
      },

      [this.mutationType.SET_UPDATE](updateId) {
        state.value = {
          ...state.value,
          isUpdate : true,
          updateId : updateId
        }
      },

      [this.mutationType.REMOVE_UPDATE]() {
        state.value = {
          ...state.value,
          isUpdate : false,
          updateId : ''
        }
      },

      [this.mutationType.SET_LIST_DATA](list) {
        state.value = {
          ...state.value,
          list : list
        }
      },

    })
  },

  basicsAction(state, mutation, mutationType) {
    return ({

      async [this.actionType.GET_LIST](
        callableUri,
        forceReload = false,
        fetchStore,
        $toast
      ) {

        if ( state.value.list === null || forceReload ) {
          await fetchStore.action[fetchStore.actionType.FETCH_DATA](callableUri)

          if ( ! fetchStore.state.error[callableUri]) {
            mutation[mutationType.SET_LIST_DATA](fetchStore.state.data[callableUri])
          } else {
            $toast.error('Impossible de charger les données')
          }

          fetchStore.mutation[fetchStore.mutationType.RESET_API_URL](callableUri)
        }

      },

      async [this.actionType.SEND_FORM](
        url,
        method,
        fetchStore,
        $toast,
        onfinish = () => {},
        data = null
      ) {

        if ( state.value.isUpdate ) {
          url += '/'+state.value.updateId
          method = 'PUT'
        }

        let status = false

        const idToast = $toast.loading('Enregistrement...')

        await fetchStore.action[fetchStore.actionType.FETCH_DATA](url,method,(data) ? data : state.value.formData)

        if ( ! fetchStore.state.error[url] ) {

          onfinish()

          $toast.update(idToast, {
            render: 'Enregistrement réussi !',
            autoClose: true,
            type: 'success',
            isLoading: false,
          });
          status = true

        } else {

          let errorMsg = false

          if ( typeof fetchStore.state.data[url].data !== 'undefined' && fetchStore.state.data[url].data.errors ) {
            errorMsg = ''
            Object.keys(fetchStore.state.data[url].data.errors).forEach(key => {
              errorMsg += fetchStore.state.data[url].data.errors[key] + ' '
            })
          }

          $toast.update(idToast, {
            render: ( fetchStore.state.data[url].data.details ) ? fetchStore.state.data[url].data.details : (errorMsg !== false) ? errorMsg : 'Une erreur est survenue',
            autoClose: true,
            type: 'error',
            isLoading: false,
          });

        }

        return status

      }

    })
  }

}