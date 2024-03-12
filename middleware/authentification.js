export default defineNuxtRouteMiddleware(to => {

  if ( process.server ) return

  const { $AuthTools } = useNuxtApp()

  if ( ! $AuthTools.userIsAuth() ) {
    return navigateTo($AuthTools.loginPath)
  }

})