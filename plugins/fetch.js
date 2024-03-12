export default defineNuxtPlugin((nuxtApp) => {

  const fetchTools = {

    // Get base url api
    baseApiUrl : nuxtApp.$config.public.apiBase,

    // Base Fetch
    async fetchApi(url, method = 'POST', body = null ,headers = null) {

      const { $AuthTools } = nuxtApp

      let args = {
        method : method,
        headers : ( headers ) ? headers : { "Content-Type": "application/json" },
        credentials: "include",
      }

      const csrfToken = window.localStorage.getItem('X-CSRF-TOKEN')
      if ( csrfToken ) args.headers['X-CSRF-TOKEN'] = csrfToken

      if ( body ) args.body = JSON.stringify(body)

      const _response = await fetch(this.baseApiUrl + url, args)

      const JSONResponse = await _response.json()

      if ( JSONResponse.code === 403 && JSONResponse.data.TypeError && JSONResponse.data.TypeError === 'auth' ) {
        $AuthTools.loggout();
      }

      return JSONResponse;

    },

  }

  return {

    provide : {
      fetchTools,
    },

  }

});