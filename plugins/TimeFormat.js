export default defineNuxtPlugin((nuxtApp) => {

  const timeFormat = {

    formatTime : (time) => {
      const [ hours, minutes ] = time.split(':');
      let result = '';

      result += hours + 'h';
      if (minutes > 0) result += minutes;

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

    }

  }

  return {
    provide: {
      timeFormat,
    },
  };
});
