import { defineStore } from 'pinia'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import {isObject} from "vue-js-modal/src/utils/types.js";
import {useFetch} from "~/stores/Fetch.js";

export const useCalendar = defineStore('calendar', () => {

  const useFetchStore = useFetch()
  const { $toast } = useNuxtApp()
  const { $timeFormat } = useNuxtApp()

  // Base options for calendar
  const initialOptions = {
    plugins: [ timeGridPlugin, interactionPlugin, multiMonthPlugin ],

    // Default display
    height : 'auto',

    //  remove all Tools
    headerToolbar: false,

    // Comportement
    droppable: true,
    editable: true,
    displayEventEnd : true,
    displayEventTime : true,
    eventResizableFromStart : true,
    navLinks : true,
    eventOverlap : false,

    // Lang
    locale : 'fr',

    // timezone
    timeZone: 'UTC',

    // View
    initialView: 'timeGridWeek',

    validRange: {
      start: '2024-01-01',
      end: '2024-12-31'
    },

    // Format
    weekends: false,
    dayHeaderFormat : { weekday: 'short', day: 'numeric', month: 'long' },
    slotMinTime : '07:00:00',
    slotMaxTime : '19:00:00',
    titleFormat : { year: 'numeric', month: 'long' },

    allDaySlot: false,

    // Event customization
    eventClick : (info) => {
      console.log(info)
    },
    eventContent : (args) => {
      const [time1, time2] = args.timeText.split(' - ')

      const [h1, m1] = time1.split(':').map(Number)
      const [h2, m2] = time2.split(':').map(Number)

      const minutes1 = h1 * 60 + m1
      const minutes2 = h2 * 60 + m2

      const totalMinutesDuration = minutes2 - minutes1

      return { html : `
          <div class="doriane-event-custom s-${totalMinutesDuration}">
              <div class="colorLine" style="background : ${args.event.extendedProps.extraParams.color};"></div>
              <div class="content-doriane-event">
                  <div class="time">${args.timeText}</div>
                  <div class="title fw-700">${args.event.title}</div>
                  <div class="info-sup">
                  ${ ( args.event.extendedProps.extraParams.teacher ) ? `<div class="teacherName">${args.event.extendedProps.extraParams.teacher}</div>` : `` }
                  ${ ( args.event.extendedProps.extraParams.classroom ) ? `<div class="classroom">${args.event.extendedProps.extraParams.classroom}</div>` : `` }
                  </div>
              </div>
          </div>
        ` }
    },
    datesSet : async (data) => {
      // Set current date
      mutation[mutationType.SET_CURRENT_DATE](state.value.calendar?.getApi().currentData.currentDate)

      if ( state.value.calendarId !== 0 ) {

        // get current slot
        const month = ((data.start.getMonth() + 1) < 10 ) ? "0"+ (data.start.getMonth() + 1) : (data.start.getMonth() + 1)
        const day = (data.start.getDate() < 10 ) ? "0"+ data.start.getDate() : data.start.getDate()
        const startDataFormat = data.start.getFullYear() + '-' + month + '-' + day

        const url = `schoolspaces/plannings/${state.value.calendarId}/slots?start_date=${startDataFormat}`

        await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](url)

        const events = [];

        if ( useFetchStore.state.error[url]  ) {
          $toast.error('Nous n\'avons pas reussi à charger les cours')
        }

        useFetchStore.state.data[url].data.slots.forEach(el => {
          el.fullCalendarObject.extraParams.id_in_db = el.fullCalendarObject.extraParams.id
          events.push(el.fullCalendarObject)
        })

        mutation[mutationType.SET_OPTIONS]({ events : events })
        useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)

      }

    },
    eventReceive  : async ( args ) => {

      const url = `schoolspaces/plannings/${state.value.calendarId}/slots`

      const end = new Date(args.event._instance.range.end)
      const start = new Date(args.event._instance.range.start)

      const end_hours = $timeFormat.renderToDigit(end.getUTCHours())  + ':' + $timeFormat.renderToDigit(end.getUTCMinutes()) + ':' + $timeFormat.renderToDigit(end.getUTCSeconds());
      const start_hours = $timeFormat.renderToDigit(start.getUTCHours())  + ':' + $timeFormat.renderToDigit(start.getUTCMinutes()) + ':' + $timeFormat.renderToDigit(start.getUTCSeconds());
      const day = start.getUTCFullYear()+'-'+$timeFormat.renderToDigit(start.getUTCMonth() + 1)+'-'+$timeFormat.renderToDigit(start.getUTCDate());

      if ( state.value.calendarId ) {

        await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](
          url,
          'POST',
          {
            "start_hour" : start_hours,
            "end_hour" : end_hours,
            "daydate" : day,
            "id_course" : args.event._def.extendedProps.extraParams.course_id,
            "color" : (args.event._def.extendedProps.extraParams.color) ? args.event._def.extendedProps.extraParams.color : '#fff4b5',
          }
        )

        if ( ! useFetchStore.state.error[url] ) {

          $toast.success('Cours enregistré',{ transition: $toast.TRANSITIONS.ZOOM, position: $toast.POSITION.BOTTOM_CENTER, autoClose : 500 });
          args.event._def.extendedProps.extraParams.id_in_db = useFetchStore.state.data[url].data.id
          action[actionType.SET_PROGRAM_FROM_API](state.value.calendarId)

        } else {

          args.event.remove()
          $toast.error('Nous n\'arrivons pas à créer votre cours');

        }

        useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)

      } else {
        args.event.remove()
        $toast.error('Nous n\'arrivons pas à créer votre cours');
      }

    },
    eventChange : async (args) => {

      if ( state.value.calendarId && args.event._def.extendedProps.extraParams.id_in_db ) {

        const url = `schoolspaces/plannings/${state.value.calendarId}/slots/${args.event._def.extendedProps.extraParams.id_in_db}`
        const end = new Date(args.event._instance.range.end)
        const start = new Date(args.event._instance.range.start)

        const end_hours = $timeFormat.renderToDigit(end.getUTCHours())  + ':' + $timeFormat.renderToDigit(end.getUTCMinutes()) + ':' + $timeFormat.renderToDigit(end.getUTCSeconds());
        const start_hours = $timeFormat.renderToDigit(start.getUTCHours())  + ':' + $timeFormat.renderToDigit(start.getUTCMinutes()) + ':' + $timeFormat.renderToDigit(start.getUTCSeconds());
        const day = start.getUTCFullYear()+'-'+$timeFormat.renderToDigit(start.getUTCMonth() + 1)+'-'+$timeFormat.renderToDigit(start.getUTCDate());

        await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](
          url,
          'PUT',
          {
            "start_hour" : start_hours,
            "end_hour" : end_hours,
            "daydate" : day,
          }
        )

        if ( ! useFetchStore.state.error[url] ) {

          $toast.success('Cours sauvegardé',{ transition: $toast.TRANSITIONS.ZOOM, position: $toast.POSITION.BOTTOM_CENTER, autoClose : 500 });
          action[actionType.SET_PROGRAM_FROM_API](state.value.calendarId)

        } else {

          args.event = args.oldEvent
          $toast.error('Nous n\'arrivons pas à modifier votre cours');

        }

        useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)

      }
      else {

        args.event = args.oldEvent
        $toast.error('Nous n\'arrivons pas à créer votre cours');

      }

    },

    // Event data source
    events: []

  }

  const state = ref({
    calendarId : 0,
    calendarCurrentDate : '',
    calendarOptions : initialOptions,
    calendar : null,
    programs : [],
  })

  // On change set current date
  watch(() => state.value.calendar,(newV,oldV) => {
    mutation[mutationType.SET_CURRENT_DATE](state.value.calendar?.getApi().currentData.currentDate)
  })

  // ********************************
  //            mutation
  // ********************************
  // type
  const mutationType = {
    SET_CALENDAR : 'SET_CALENDAR',
    SET_CURRENT_DATE : 'SET_CURRENT_DATE',
    SET_OPTIONS : 'SET_CALENDAR_OPTIONS',
    SET_CALENDAR_ID : 'SET_CALENDAR_ID',
    SET_PROGRAM : 'SET_PROGRAM'
  }

  // Mutation
  const mutation = ({

    [mutationType.SET_CALENDAR](calendar,customOption = {}) {
      state.value = {
        ...state.value,
        calendar : calendar,
        calendarCurrentDate: calendar.getApi().currentData.currentDate,
        calendarOptions : {
          ...initialOptions,
          ...customOption
        }
      }
    },

    [mutationType.SET_CURRENT_DATE](date) {
      state.value = {
        ...state.value,
        calendarCurrentDate : date
      }
    },

    [mutationType.SET_OPTIONS](options) {
      state.value = {
        ...state.value,
        calendarOptions : {
          ...state.value.calendarOptions,
          ...options
        }
      }
    },

    [mutationType.SET_CALENDAR_ID](idCalendar) {
      state.value = {
        ...state.value,
        calendarId: idCalendar
      }
    },

    [mutationType.SET_PROGRAM](programs) {
      state.value = {
        ...state.value,
        programs: programs
      }
    }

  })

  // ********************************
  //            Action
  // ********************************
  // Type
  const actionType = {
    SET_PROGRAM_FROM_API : 'GET_PROGRAM_API'
  }

  const action = ({

    async [actionType.SET_PROGRAM_FROM_API](idCalendar){

      if ( idCalendar !== 0 ) {

        const url = `schoolspaces/plannings/${idCalendar}/programs`

        await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](url)

        if ( useFetchStore.state.error[url]  ) {
          $toast.error('Nous n\'arrivons pas a charger votre programme')
          return;
        }

        mutation[mutationType.SET_PROGRAM](
          useFetchStore.state.data[url].data.programs
        )

        useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](url)

      }

    }

  })

  return { state, mutation, mutationType, actionType, action }
})