export default defineNuxtPlugin((nuxtApp) => {

  const timeFormat = {

    // Render string hours : 10h00 for time = 10:00
    formatTime: (time) => {
      const [hours, minutes] = time.split(':')
      let result = ''

      result += hours + 'h'
      if (minutes > 0) {
        result += minutes
      } else {
        result += '00'
      }

      return result;
    },

    // return month string by number of month 0 - 11
    getMonthText: (monthNumber) => {
      return ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][monthNumber]
    },

    // Render number to digit if 1 = 01
    renderToDigit: (number) => {

      let str = ''

      if (number.toString().length === 1) {
        str += "0" + number
      } else {
        str = number.toString()
      }

      return str

    },

    // format hours 10:00:00 in 10:00
    renderFormatTimeInput: (time) => {
      const [hours, min, sec] = time.split(':')
      return hours + ':' + min
    },

    // return date to Le 10/02/2024 à 15h02
    dateStringToLocal : function (date) {

      const dateObject = new Date(date)

      const hours = this.renderToDigit(dateObject.getHours())+'h'+this.renderToDigit(dateObject.getMinutes())
      const day = `Le ${this.dateFormat(date)}`

      return day + ' à ' + hours;

    },

    // render 10/02/2024
    dateFormat : function (date) {
      const toRenderDate = new Date(date)
      return this.renderToDigit(toRenderDate.getDate()) + '/' + this.renderToDigit(toRenderDate.getMonth()+1) + '/' + toRenderDate.getFullYear()
    },

    // Compare to time if first is more than second return true else false
    compareTime(toCompare,comparator) {
      const [ h1, m1 ] = toCompare.split(':')
      const [ h2, m2 ] = comparator.split(':')

      if ( parseInt(h1 * 60 + m1) > parseInt(h2 * 60 + m2) ) return true

      return false

    }

  }


  return {
    provide: {
      timeFormat,
    },
  };
});
