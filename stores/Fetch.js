import { defineStore } from 'pinia'
export const useFetch = defineStore('fetch', () => {

  const baseApiUrl = useNuxtApp().$config.public.apiBase
  const useAuthStore = useAuth()

  const actionType = {
    FETCH_DATA : 'FETCH_DATA',
  }

  const mutationType = {
    SET_LOADING : 'SET_LOADING',
    SET_DATA : 'SET_DATA',
    SET_ERROR : 'SET_ERROR',
    RESET : 'RESET',
    RESET_API_URL : 'RESET_API_DATA_URL',
  }

  const state = ref({
      loading : {},
      data : {},
      error : {}
  })

  const mutation = ({

    [mutationType.SET_LOADING](apiUrl, loading){
      state.value = {
        ...state.value,
        loading: {
          ...state.value.loading,
          [apiUrl] : loading
        }
      }
    },

    [mutationType.SET_DATA](apiUrl, data) {
      state.value = {
        ...state.value,
        data : {
          ...state.value.data,
          [apiUrl] : data
        }
      }
    },

    [mutationType.SET_ERROR](apiUrl, error) {
      state.value = {
        ...state.value,
        error : {
          ...state.value.error,
          [apiUrl] : error
        }
      }
    },

    [mutationType.RESET]() {
      state.value = {
        loading : {},
        data : {},
        error : {}
      }
    },

    [mutationType.RESET_API_URL](apiUrl) {
      state.value = {
        ...state.value,
        data : {
          ...state.value.data,
          [apiUrl] : null
        },
      }
    }

  })

  const action = ({

    async [actionType.FETCH_DATA]( apiUrl, method = 'GET', body = null, headers = null , isCustomUrl = false)  {

      mutation[mutationType.SET_LOADING](apiUrl, true);

      // set args
      let args = {
        method : method,
        headers : ( headers ) ? headers : { "Content-Type": "application/json" },
        credentials: "include",
      }

      // set X-CSRF-TOKEN
      if ( useAuthStore.authState['X-CSRF-TOKEN'] ) args.headers['X-CSRF-TOKEN'] = useAuthStore.authState['X-CSRF-TOKEN']

      // if have to send json
      args.body = ( body && args.headers["Content-Type"] === "application/json" )  ? JSON.stringify(body) : body

      let _response;
      // fetch response
      try {
        _response = await window.fetch((isCustomUrl) ? apiUrl : baseApiUrl + apiUrl, args)
      }
      catch (e) {

        mutation[mutationType.SET_ERROR](apiUrl, true)
        mutation[mutationType.SET_LOADING](apiUrl, false)
        return false

      }

      if ( _response.status === 304 ) {
        mutation[mutationType.SET_ERROR](apiUrl, false)
        mutation[mutationType.SET_DATA](apiUrl, {})
        mutation[mutationType.SET_LOADING](apiUrl, false)
        return;
      }

      // format json
      const JSONResponse = await _response.json()

      // if 403 && auth error type => logout user
      if ( JSONResponse.code === 403 && JSONResponse.data.TypeError && JSONResponse.data.TypeError === 'auth' ) {
        mutation[mutationType.RESET]()
        useAuthStore.logout()
        return;
      }

      // set error if is error
      mutation[mutationType.SET_DATA](apiUrl, JSONResponse)
      mutation[mutationType.SET_ERROR](apiUrl, ! JSONResponse.statusBool)
      mutation[mutationType.SET_LOADING](apiUrl, false)

      // if 403 permissions return not confirm email error type
      if ( JSONResponse.code === 403 && JSONResponse.data.TypeError && JSONResponse.data.TypeError === 'not_confirm_email' ) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Votre email n\'est pas verifié',
          fatal : true
        })
      }

    }

  })

  return { action, state, actionType, mutation , mutationType }
})