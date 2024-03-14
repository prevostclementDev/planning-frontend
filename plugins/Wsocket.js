export default defineNuxtPlugin((nuxtApp) => {

  const WsTools = {

    baseApiUrl : 'ws://localhost:8080', // wss://preprod.api.doriane.app/ws
    socket : null,

    // Base Fetch
    createSocket : function (open = null,message = null,close = null) {
      this.socket = new WebSocket(this.baseApiUrl)
      const self = this;

      // Set event on open
      this.socket.onopen = (event) => {
        if ( typeof open === 'function' ) { open(event,self.socket) }
        else { self.onOpen(event); }
      }

      // Set event on message
      this.socket.onmessage = (event) => {
        if ( typeof message === 'function' ) { message(event,self.socket) }
        else { self.onMessage(event); }
      }

      // set event on close
      this.socket.onclose = (event) => {
        if ( typeof close === 'function' ) { close(event,self.socket) }
        else { self.onClose(event); }
      }

    },

    onOpen : function (event) {
      console.log(` WS ---------------- CONNECTED TO : ${this.baseApiUrl} `);
    },

    onMessage : function (event) {
      console.log(` WS ---------------- MESSAGE FROM : ${this.baseApiUrl} `);
    },

    onClose : function (event) {
      console.log(` WS ---------------- CLOSE WITH : ${this.baseApiUrl} `);
    },

  }

  return {

    provide : {
      WsTools,
    },

  }

});