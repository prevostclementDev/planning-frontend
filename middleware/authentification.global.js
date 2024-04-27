import {useRouting} from "~/stores/routing.js";

export default defineNuxtRouteMiddleware(to => {

  if ( process.server ) return

  const useAuthStore = useAuth()
  const routingStore = useRouting()

  if ( to.fullPath === useAuthStore.loginPath && ! useAuthStore.userIsAuth() ) return

  if ( useAuthStore.userIsAuth() && to.fullPath === useAuthStore.loginPath ) return navigateTo(routingStore.url.dashboard)

  if ( ! useAuthStore.userIsAuth() ) return navigateTo(useAuthStore.loginPath)

})