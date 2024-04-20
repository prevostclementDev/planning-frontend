export default defineNuxtPlugin((nuxtApp) => {

  const timeFormat = {

    formatTime : (time) => {
      const [ hours, minutes ] = time.split(':')
      let result = ''

      result += hours + 'h'
      if (minutes > 0) {
        result += minutes
      } else {
        result+='00'
      }

      return result;
    },

    getMonthText : (monthNumber) => {
      return ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][monthNumber]
    },

    renderToDigit : (number) => {

      let str = '';

      if ( number.toString().length === 1 ) {
        str += "0"+number
      } else {
        str = number.toString()
      }

      return str

    },

    renderFormatTimeInput: (time) => {

      const [hours, min, sec] = time.split(':')

      return hours+':'+min;

    }

  }

  return {
    provide: {
      timeFormat,
    },
  };
});
