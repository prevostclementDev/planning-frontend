export default defineNuxtPlugin((nuxtApp) => {

  const AuthTools = {

    loginPath : '/login',

    storageName : {
      'csrf' : 'X-CSRF-TOKEN',
      'user' : 'USER',
      'permissions' : 'PERMISSIONS'
    },

    // Authentification api call
    async auth(mail,password) {

      const { $fetchTools } = nuxtApp

      const response = await $fetchTools.fetchApi('connection','POST',{
        mail : mail,
        password : password
      })

      if ( response.statusBool ) {
        window.localStorage.setItem(this.storageName.csrf,response.data.csrf)
        window.localStorage.setItem(this.storageName.user,JSON.stringify(response.data.user))
        window.localStorage.setItem(this.storageName.permissions,response.data.permissions)
        return true
      }

      return false

    },

    // logout user
    loggout() {
      Object.keys(this.storageName).forEach(key => {
        window.localStorage.removeItem(this.storageName[key])
      })

      navigateTo(this.loginPath)
    },

    // Return bool if user is auth
    userIsAuth() {
      const { csrf, user, permissions } = this.getUserAuthData();

      return !!(csrf && user && permissions);
    },

    // get auth user data
    getUserAuthData() {
      return {
        'csrf' : window.localStorage.getItem(this.storageName.csrf),
        'user' : window.localStorage.getItem(this.storageName.user),
        'permissions' : window.localStorage.getItem(this.storageName.permissions),
      }
    },

  }

  return {

    provide : {

      AuthTools,

    },

  }

});