import { defineStore } from 'pinia'
import {useFetch} from "~/stores/Fetch.js";
export const useAuth = defineStore('auth', () => {

  const localAuthItem = 'AUTH'

  const loginPath = '/se-connecter'

  const initialValue = {
    'X-CSRF-TOKEN' : null,
    'USER' : null,
    'PERMISSIONS' : null
  }

  const saveState = window.sessionStorage.getItem(localAuthItem);
  const authState = saveState ? ref(JSON.parse(saveState)) : ref(initialValue)

  const authError = ref([]);

  watch(authState , (newV, oldV) => {
    window.sessionStorage.setItem(localAuthItem, JSON.stringify(newV))
  })

  // Authentification api call
  const auth = async ( data, authUrl = 'connection' ) => {

    const useFetchStore = useFetch()

    await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](
      authUrl,
      'POST',
      data
    )

    if ( ! useFetchStore.state.error[authUrl] ) {
      authState.value = {
        'X-CSRF-TOKEN' : useFetchStore.state.data[authUrl].data.csrf,
        'USER' : useFetchStore.state.data[authUrl].data.user,
        'PERMISSIONS' : useFetchStore.state.data[authUrl].data.permissions
      }

      useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](authUrl)

      return true
    }

    authError.value = ( useFetchStore?.state?.data[authUrl]?.data ) ? useFetchStore.state.data[authUrl].data : 'Une erreur est survenue'
    useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](authUrl)

    return false
  }

  // logout user
  const logout = () => {
    authState.value = initialValue
    navigateTo(loginPath)
  }

  // Return bool if user is auth
  const userIsAuth = () => {
    return authState.value.USER && authState.value['X-CSRF-TOKEN']
  }

  return { authState, auth, logout, userIsAuth, loginPath, authError }
})