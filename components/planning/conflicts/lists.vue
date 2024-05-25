<script setup>
import {useFetch} from "~/stores/Fetch.js";
import SmallLoader from "~/components/loader/smallLoader.vue";
import Error from "~/components/icones/error.vue";
import Eyes from "~/components/icones/eyes.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useCalendar} from "~/stores/calendar.js";
import {useRouting} from "~/stores/routing.js";

const fetchStore = useFetch()
const calendarStore = useCalendar();
const routingStore = useRouting()
const { $timeFormat } = useNuxtApp()

const props = defineProps({
  idPlanning : {
    type : String,
    required :true
  },
  idSlots : {
    type : String,
    default : null,
    required : false
  }
})

let url = ''

if ( props.idSlots === null ) {
   url = `schoolspaces/plannings/${props.idPlanning}/conflicts`
} else {
   url = `schoolspaces/plannings/${props.idPlanning}/slots/${props.idSlots}/conflicts`
}


onMounted(() => {
  fetchStore.action[fetchStore.actionType.FETCH_DATA](url)
})

function renderTimeConflict(start_time,end_time){
  return $timeFormat.formatTime(start_time) + ' - ' +  $timeFormat.formatTime(end_time)
}

function openConflict(idPlanning, date, idSlot){

  navigateTo(routingStore.url.planningSingle(idPlanning)+`?conflict=${date}|${idSlot}`, {
    open: {
      target: '_blank',
    }
  })

}
</script>

<template>
  <div :class="( idSlots !== null ) ? 'conflictList forSlot' : 'conflictList'">
<!--    <h3 v-if="props.idSlots === null">Erreur(s) & conflit(s)</h3>-->

    <div class="baseContainer">

      <div class="loading" v-if="fetchStore.state.loading[url]">
        <small-loader />
      </div>
      <div class="errors" v-else-if="fetchStore.state.error[url]">
        <error />
        <span class="textBold">
          Une erreur est survenue, nous n'arrivons pas à récupérer les erreurs du {{ ( props.idSlots === null ) ? 'planning' : 'cours' }}
        </span>
      </div>
      <div class="containerList" v-else-if="fetchStore.state.data[url] && fetchStore.state.data[url].data.conflicts.length > 0" v-dragscroll.x>

        <div class="conflit" v-for="conflit in fetchStore.state.data[url].data.conflicts">
          <div class="badge" v-if="props.idSlots === null">Conflit</div>
          <div class="title h4">
            {{ ( idPlanning === conflit.IdPlanning && idSlots === null ) ? conflit.NameSlot : conflit.NameSlotConflict  }}
          </div>
          <div class="date">
            <span class="date">{{ ( idPlanning === conflit.IdPlanning && idSlots === null ) ? $timeFormat.dateFormat(conflit.daydateSlot) : $timeFormat.dateFormat(conflit.daydateSlotConflict) }}</span>
            <span class="time">{{ ( idPlanning === conflit.IdPlanning && idSlots === null ) ? renderTimeConflict(conflit.startHourSlot, conflit.endHourSlot)  : renderTimeConflict(conflit.startHourSlotConflict, conflit.endHourSlotConflict)  }}</span>
          </div>
          <div class="content text">
            {{ (conflit.teacherId) ? 'L\'intervenant est indisponible' : 'Salle de classe indisponible' }}
          </div>
          <div class="action end">
            <tooltips text="Voir le cours en conflit sur ce planning">
              <Button
                  v-if="props.idSlots === null"
                  custom-class="clear"
                  @click="
                calendarStore.action[calendarStore.actionType.SEE_EVENTS_CONFLICTS](
                    ( idPlanning === conflit.IdPlanning ) ? conflit.daydateSlot : conflit.daydateSlotConflict,
                    ( idPlanning === conflit.IdPlanning ) ? conflit.IdSlot : conflit.IdSlotConflict,
                )"
              >
                <eyes />
              </Button>
            </tooltips>
            <tooltips text="Voir le cours en conflit sur l'autre planning">
              <Button
                  @click.prevent="openConflict(
                     ( idPlanning === conflit.IdPlanning ) ?  conflit.IdConflictPlanning : conflit.IdPlanning,
                     ( idPlanning === conflit.IdPlanning ) ? conflit.daydateSlotConflict : conflit.daydateSlot ,
                     ( idPlanning === conflit.IdPlanning ) ? conflit.IdSlotConflict : conflit.IdSlot
                )"
                  custom-class="clear" >
                <icones-link />
              </Button>
            </tooltips>
          </div>
        </div>

      </div>
      <div v-else-if="fetchStore.state.data[url] && fetchStore.state.data[url].data.conflicts.length === 0 && props.idSlots !== null" class="noConflict">
        Aucun conflit sur le {{ ( props.idSlots === null ) ? 'planning' : 'cours' }}
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
.conflictList {
  margin: 1rem 0;
  //min-height: 180px;

  h3 {
    border-bottom: 2px solid getColor(primary4,.2);
    padding-bottom: .8rem;

  }

  .noConflict {
    margin: 2rem 0;
    @include typographie(textBold);

  }

  .containerList {
    padding: 1rem 0;
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

  &.forSlot {

    .containerList {
      flex-direction: column;

      .conflit {
        background: transparent;
        width: 100%;
        border-radius: 0;
        border-bottom: 1px solid getColor(primary4);

        &:last-child {
          border-bottom: none;

        }

      }

    }

  }

}
</style>