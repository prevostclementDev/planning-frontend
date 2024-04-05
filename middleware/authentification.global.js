export default defineNuxtRouteMiddleware(to => {

  if ( process.server ) return

  const useAuthStore = useAuth()

  if ( to.fullPath === '/se-connecter' && ! useAuthStore.userIsAuth() ) return

  if ( useAuthStore.userIsAuth() && to.fullPath === '/se-connecter' ) return navigateTo('/')

  if ( ! useAuthStore.userIsAuth() ) return navigateTo(useAuthStore.loginPath)

})