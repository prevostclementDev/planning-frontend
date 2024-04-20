<script setup>
import {useFetch} from "~/stores/Fetch.js";
import SmallLoader from "~/components/loader/smallLoader.vue";
import Error from "~/components/icones/error.vue";
import Eyes from "~/components/icones/eyes.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useCalendar} from "~/stores/calendar.js";

const fetchStore = useFetch()
const calendarStore = useCalendar();
const { $timeFormat } = useNuxtApp()

const props = defineProps({
  idPlanning : {
    type : String,
    required :true
  }
})

const url = `schoolspaces/plannings/${props.idPlanning}/conflicts`;

onMounted(() => {
  fetchStore.action[fetchStore.actionType.FETCH_DATA](url)
})

function renderTimeConflict(start_time,end_time){
  return $timeFormat.formatTime(start_time) + ' - ' +  $timeFormat.formatTime(end_time)
}

function renderDate(date){

  const toRenderDate = new Date(date)

  return $timeFormat.renderToDigit(toRenderDate.getDate()) + '/' + $timeFormat.renderToDigit(toRenderDate.getMonth()+1) + '/' + toRenderDate.getFullYear()
}

function openConflict(idPlanning, date, idSlot){

  navigateTo(`/planning/${idPlanning}?conflict=${date}|${idSlot}`, {
    open: {
      target: '_blank',
    }
  })

}
</script>

<template>
  <div class="conflictList">
    <h3>Erreur(s) & conflit(s)</h3>

    <div class="baseContainer">

      <div class="loading" v-if="fetchStore.state.loading[url]">
        <small-loader />
      </div>
      <div class="errors" v-else-if="fetchStore.state.error[url]">
        <error />
        <span class="textBold">Une erreur est survenue, nous n'arrivons pas à récupérer les erreurs du planning</span>
      </div>
      <div class="containerList" v-else-if="fetchStore.state.data[url] && fetchStore.state.data[url].data.conflicts.length > 0" v-dragscroll.x>

        <div class="conflit" v-for="conflit in fetchStore.state.data[url].data.conflicts">
          <div class="badge">Conflit</div>
          <div class="title h4">
            {{ ( idPlanning === conflit.IdPlanning ) ? conflit.NameSlot : conflit.NameSlotConflict  }}
          </div>
          <div class="date">
            <span class="date">{{ ( idPlanning === conflit.IdPlanning ) ? renderDate(conflit.daydateSlot) : renderDate(conflit.daydateSlotConflict) }}</span>
            <span class="time">{{ ( idPlanning === conflit.IdPlanning ) ? renderTimeConflict(conflit.startHourSlot, conflit.endHourSlot)  : renderTimeConflict(conflit.startHourSlotConflict, conflit.endHourSlotConflict)  }}</span>
          </div>
          <div class="content text">
            {{ (conflit.teacherId) ? 'L\'intervenant est indisponible' : 'Salle de classe indisponible' }}
          </div>
          <div class="action end">
            <Button
                custom-class="clear"
                @click="
                calendarStore.action[calendarStore.actionType.SEE_EVENTS_CONFLICTS](
                    ( idPlanning === conflit.IdPlanning ) ? conflit.daydateSlot : conflit.daydateSlotConflict,
                    ( idPlanning === conflit.IdPlanning ) ? conflit.IdSlot : conflit.IdSlotConflict,
                )"
            >
              <eyes />
            </Button>
            <Button
                @click.prevent="openConflict(
                     ( idPlanning === conflit.IdPlanning ) ?  conflit.IdConflictPlanning : conflit.IdPlanning,
                     ( idPlanning === conflit.IdPlanning ) ? conflit.daydateSlotConflict : conflit.daydateSlot ,
                     ( idPlanning === conflit.IdPlanning ) ? conflit.IdSlotConflict : conflit.IdSlot
                )"
                custom-class="clear" >
              <icones-link />
            </Button>
          </div>
        </div>

      </div>
      <div v-else-if="fetchStore.state.data[url] && fetchStore.state.data[url].data.conflicts.length === 0" class="noConflict">
        Aucun conflit sur le planning
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
.conflictList {
  margin: 1rem 0;
  min-height: 180px;

  h3 {
    border-bottom: 2px solid getColor(primary4,.2);
    padding-bottom: .8rem;

  }

  .noConflict {
    margin: 1rem 0;

  }

  .containerList {
    padding: 2rem 0 1rem;
    width: 100%;
    @include flex(flex-start,flex-start,row,nowrap,1rem,1rem);
    overflow: hidden;

    .conflit {
      @include bgColor(light3);
      @include effect(shadow);
      padding: 1.4rem 1.4rem .8rem;
      border-radius: 10px;
      position: relative;
      min-width: calc(100% / 4);
      user-select: none;

      .badge {
        @include bgColor(warning0);
        @include color(light3);
        padding: .3rem .6rem;
        border-radius: 4px;
        position: absolute;
        top: 0;
        right: 20px;
        transform: translate(0,-50%);

      }

      .date {
        margin: .4rem 0;
        width: 100%;
        @include flex(space-between);

        span {
          display: block;
          width: fit-content;

        }

      }

      .action {
        padding: .4rem 0;

        button {
          margin-right: .8rem;

        }

      }

    }

  }

  .laoding {
    width: 100%;
    height: 100%;
    padding : 2rem 0;
    @include flex();

  }

}
</style>