<script setup>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin,  { Draggable } from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

const calendar = ref(null);
const calendarObject = ref(null);
const modalEventCalendar = ref(null);
const titleModalEvent = ref(null);
const deleteEvent = ref(null);

const config = useRuntimeConfig()
console.log('Runtime config:', config);

let deleteEventSelected;

const calendarOptions = ref({
  plugins: [ timeGridPlugin, interactionPlugin, multiMonthPlugin ],
  droppable: true,
  initialView: 'timeGridWeek',
  weekends: false,
  editable: true,
  dayHeaderFormat : { weekday: 'long', day: 'numeric' },
  locale : 'fr',
  slotMinTime : '07:00:00',
  slotMaxTime : '19:00:00',
  titleFormat : { year: 'numeric', month: 'long' },
  eventResizableFromStart : true,
  allDaySlot: false,
  navLinks : true,
  views : {
    viewMultiYear : {
      type: 'multiMonthYear',
      dayHeaderFormat : { weekday: 'long' },
    },
  },
  headerToolbar: {
    left: 'prev,next,today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay,viewMultiYear',
  },

  eventClick : function (info) {

    modalEventCalendar.value.style.top = info.jsEvent.clientY + 'px';
    modalEventCalendar.value.style.left = info.jsEvent.clientX + 'px';

    modalEventCalendar.value.style.display = 'block';
    modalEventCalendar.value.style.opacity = 1;

    deleteEventSelected = info.event;

  },

  events: [
    {
      title  : 'Evenement',
      start  : '2024-02-12T12:30:00',
      allDay : false // will make the time show
    }
  ]

});

onMounted(() => {

  console.log(calendarObject.value.getApi().getEvents())

  new Draggable(calendar.value, {
    itemSelector : '.draggable',
  });

  deleteEvent.value.onclick = (e) => {
    if ( deleteEventSelected ) {

      deleteEventSelected.remove();

    }
  }

})

</script>

<template>
  <section ref="calendar">
    <div class="draggable" data-event='{ "id" : "1" , "title": "HTML / CSS", "duration": "01:00", "editable" : true, "description": "Autonomie" }' > HTML / CSS </div>
    <FullCalendar ref="calendarObject" :options="calendarOptions"/>

    <div id="modal-event-calendar" ref="modalEventCalendar">

      <div class="top">
        <h3 ref="titleModalEvent"></h3>

        <div class="action">
          <button ref="deleteEvent" data-delete="">Supprimer</button>
        </div>
      </div>

    </div>

  </section>
</template>

<style>

#modal-event-calendar {

  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: white;
  border: 1px solid black;
  opacity: 0;
  display: none;
  z-index: 9999;

}

</style>