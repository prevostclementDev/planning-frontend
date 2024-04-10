<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Delete from "~/components/icones/delete.vue";
import Update from "~/components/icones/update.vue";
import Arrow from "~/components/icones/arrow.vue";
import {useFetch} from "~/stores/Fetch.js";
import SmallLoader from "~/components/loader/smallLoader.vue";

const useFetchStore = useFetch()

const props = defineProps({
  title : {
    type : Array,
    required : true,
  },
  data : {
    type : Array,
    required : true,
  },
  valueFormat : {
    type : Object,
    required: false,
    default : {}
  },
  pagination : {
    type : Object,
    required: false,
    default : {}
  },
  customColumn : {
    type : Array,
    required : false,
    default : []
  },
  dataIsLoading : {
    type : Boolean,
    required : false,
    default : false,
  }
})

const titleArrayRender = ref(( props.title ) ? props.title : [])
const dataArrayRender = ref((props.data) ? props.data : [] )
const dataPagination = ref((props.pagination) ? props.pagination : {})

watch(() => props.data, (nv,ov) => {
  dataArrayRender.value = nv
  setCustomColumn()
  renderCustomColumn()
})

watch(() => props.pagination, (nv,ov) => {
  dataPagination.value = nv
})

async function previousPagination() {
  if ( dataPagination.value.previous_uri ) {
    await updateList( dataPagination.value.previous_uri )
  }
}

async function nextPagination(){
  if ( dataPagination.value.next_uri ) {
    await updateList( dataPagination.value.next_uri )
  }
}

async function updateList(url){

  window.scrollTo({ top: 0, behavior: "smooth" });

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](
      url,
      'GET',
      null,
      null,
      true
  )

  if ( ! useFetchStore.state.error[url] ) {

    dataArrayRender.value = useFetchStore.state.data[url].data.array
    dataPagination.value = useFetchStore.state.data[url].data.pagination

    autcompletedCustomField()
    await renderCustomColumn()


  }

}

async function renderCustomColumn(){
  // Set custom column
  if ( props.customColumn.length !== 0 ) {

    for (const el of props.customColumn) {

      for (const element of dataArrayRender.value) {
        const key = dataArrayRender.value.indexOf(element);

        dataArrayRender.value[key][el.title] = await el.value(element.id)

      }

    }

  }
}

function setCustomColumn() {
  // Set custom columns
  if ( props.customColumn.length !== 0 ) {

    props.customColumn.forEach(el => {

      titleArrayRender.value.push(el.title)

    })

    autcompletedCustomField()

  }

}

function autcompletedCustomField(){

  props.customColumn.forEach(el => {

    for (const element of dataArrayRender.value) {
      const key = dataArrayRender.value.indexOf(element);

      dataArrayRender.value[key][el.title] = 'Chargement...'

    }

  })

}
</script>

<template>
  <div class="containerTableList">
    <table>
      <thead>
        <tr>
          <th v-for="textTitle in titleArrayRender">{{ textTitle }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>

        <tr v-if="dataIsLoading" class="loading" >
          <td colspan="100%">
            <div>
              <small-loader custom-class="blue full" />
            </div>
          </td>
        </tr>

        <tr v-else-if="dataArrayRender.length !== 0" v-for="obj in dataArrayRender">

          <td
              v-for="dataEntry in Object
                                    .entries(obj)
                                    .filter(d => d[0] !== 'id' && (! valueFormat.hasOwnProperty(d[0]) || valueFormat[d[0]](d[1]) !== null) )
              "
              v-html="(dataEntry[0] in valueFormat) ? valueFormat[dataEntry[0]](dataEntry[1]) : dataEntry[1]">
          </td>

          <td class="action">
            <Button custom-class="clear"> <delete /> </Button>
            <Button custom-class="clear"> <update /> </Button>
          </td>

        </tr>

        <tr v-else>
          <td colspan="100%">Aucune donnée trouvée</td>
        </tr>

      </tbody>
      <tfoot v-if="dataPagination">
        <tr>
          <td colspan="100%">

            <div class="containerFooter">

              <div class="result">{{ ( dataPagination.total || dataPagination.total === 0 ) ? dataPagination.total : 'n/a' }} résultats</div>

              <div class="pagination">

                <Button custom-class="clear" @click.prevent="previousPagination" ><arrow format="blue" /></Button>

                <div class="updatePagination">
                  <input :disabled="true" type="text" :value="(dataPagination.current_page ) ? dataPagination.current_page : '1'">
                  <span>/ {{ ( dataPagination.page_count ) ? dataPagination.page_count : '1'  }}</span>
                </div>

                <Button custom-class="clear" @click.prevent="nextPagination"><arrow format="blue" /></Button>

              </div>

            </div>

          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped lang="scss">
.containerTableList {
  padding: 2rem 0;

  table {
    width: 100%;
    border-collapse: collapse;

    thead {

      th  {
        padding: 0.9rem;
        text-align: left;
        @include bgColor(light3);
        border-bottom: 1px solid getColor(grey8);

        &:first-child {
          border-radius: 8px 0 0 0;

        }

        &:last-child {
          border-radius: 0 8px 0 0;

        }

      }

    }

    tbody {

      tr {
        @include bgColor(light3);

        &:nth-child(2n) {
          @include bgColor(primary1 , .02);

        }

        td {
          padding: 1rem;

          &.action {
            @include flex(flex-end,center);

            button {
              margin: 0 .4rem;

            }

          }

        }

        &.loading {
          padding: 1rem;
          width: 100%;

          div {
            @include flex();
            height: 200px;

          }

        }

      }

    }

    tfoot {

      tr {

        td {
          padding: 0.9rem;
          text-align: left;
          @include bgColor(light3);
          @include color(primary4);
          border-top: 1px solid getColor(grey8);
          border-radius: 0 0 8px 8px;

          .containerFooter {
            @include flex(space-between);

            .pagination {
              @include flex(flex-end);

              button {
                &:first-child {
                  transform: rotate(180deg);
                }
              }

              .updatePagination {
                margin: 0 1.4rem;

                input {
                  @include interaction(clear);
                  @include bgColor(primary4);
                  @include color(light3);
                  @include typographie(text);
                  border-radius: 8px;
                  padding: 0.5rem;
                  text-align: center;
                  width: 50px;
                  margin-right: 0.5rem;

                }

              }

            }

          }

        }

      }

    }

  }

}
</style>