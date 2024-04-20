<script setup>
import Button from "~/components/form/interaction/Button.vue";
import Delete from "~/components/icones/delete.vue";
import Update from "~/components/icones/update.vue";
import Arrow from "~/components/icones/arrow.vue";
import {useFetch} from "~/stores/Fetch.js";
import SmallLoader from "~/components/loader/smallLoader.vue";
import {useModal} from "~/stores/ui/modal.js";
import SearchOnUri from "~/components/listes/searchOnUri.vue";
import Export from "~/components/icones/export.vue";

const useFetchStore = useFetch()
const modal = useModal()

const props = defineProps({
  title : {
    type : Array,
    required : true,
  },
  valueFormat : {
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
  },
  store : {}
})

const titleArrayRender = ref( [] )
const dataArrayRender = ref( ( props.store.state.list !== null ) ? props.store.state.list.data.array.map(obj => ({ ...obj })) : [] )
const dataPagination = ref( ( props.store.state.list !== null ) ? props.store.state.list.data.pagination : {} )
const loading = ref(props.dataIsLoading)
const currentUriPage = ref('')

setCustomColumn()

if ( props.store.state.list !== null ) {
  autcompletedCustomField()
  renderCustomColumn()
}

watch(() => props.store.state, (nv,ov) => {

  if ( nv.list !== null && nv.list !== ov.list ) {
    dataArrayRender.value = nv.list.data.array.map(obj => ({ ...obj }))
    setCustomColumn()
    autcompletedCustomField()
    renderCustomColumn()
  }

})

watch(() => props.store.state, (nv,ov) => {

  if ( nv.list !== null && nv.list !== ov.list ) {
    dataPagination.value = nv.list.data.pagination
  }

})

// pager prev
async function previousPagination() {
  if ( dataPagination.value.previous_uri ) {
    await updateList( dataPagination.value.previous_uri )
  }
}

// pager next
async function nextPagination(){
  if ( dataPagination.value.next_uri ) {
    await updateList( dataPagination.value.next_uri )
  }
}

// Update list from uri
async function updateList(url){

  window.scrollTo({ top: 0, behavior: "smooth" });

  loading.value = true

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](
      url,
      'GET',
      null,
      null,
      url.includes('http')
  )

  if ( ! useFetchStore.state.error[url] ) {

    currentUriPage.value = url

    dataArrayRender.value = useFetchStore.state.data[url].data.array
    dataPagination.value = useFetchStore.state.data[url].data.pagination

    loading.value = false

    autcompletedCustomField()
    await renderCustomColumn()


  }

}

// Render data
async function renderCustomColumn(){
  // Set custom column
  if ( props.customColumn.length !== 0 ) {

    for (const el of props.customColumn) {

      for (const element of dataArrayRender.value) {
        const key = dataArrayRender.value.indexOf(element);

        if (key !== -1) {
          const updatedValue = {
            ...dataArrayRender.value[key],
            [el.title]: await el.value(element.id)
          };

          dataArrayRender.value = [
            ...dataArrayRender.value.slice(0, key),
            updatedValue,
            ...dataArrayRender.value.slice(key + 1)
          ];
        }

      }

    }

  }
}

// Set title of new custom column
function setCustomColumn() {
  // Set custom columns
  titleArrayRender.value = [...props.title]

  if ( props.customColumn.length !== 0 ) {

    props.customColumn.forEach(el => {

      titleArrayRender.value = [
          ...titleArrayRender.value,
          el.title
      ]

    })

  }

}

// Complete data before insert data
function autcompletedCustomField(){

  props.customColumn.forEach(el => {

    for (const element of dataArrayRender.value) {
      const key = dataArrayRender.value.indexOf(element);

      if (key !== -1) {
        const updatedValue = {
          ...dataArrayRender.value[key],
          [el.title]: 'En chargement'
        };

        dataArrayRender.value = [
          ...dataArrayRender.value.slice(0, key),
          updatedValue,
          ...dataArrayRender.value.slice(key + 1)
        ];
      }

    }

  })

}

// After delete line
async function afterDelete(params) {

  await props.store.action[props.store.actionType.GET_LIST](true)

  if ( currentUriPage.value.includes('page') ) {
    await updateList(currentUriPage.value)
  }

}

async function onsearch(search) {

  let current_uri = (currentUriPage.value !== '') ? currentUriPage.value : ( props.store.state.current_uri !== undefined ) ? props.store.state.current_uri : props.store.baseUrl
  const regexSearchParams = /search=\w+&{0,1}/i

  current_uri = current_uri.replace(regexSearchParams, '')

  let url;

  if ( search ) {

    const params = current_uri.includes('?') ? `&search=${search}` : `?search=${search}`
    url = current_uri + params

  } else {

    url = current_uri

  }

  await updateList(url)
}
</script>

<template>

  <div class="action between filterBar">
    <Button custom-class="small">
      <span>Exporter</span>
      <export />
    </Button>
    <search-on-uri :onsearch="onsearch" :button-is-loading="loading" />
  </div>

  <div class="containerTableList">
    <table>
      <thead>
        <tr>
          <th v-for="textTitle in titleArrayRender">{{ textTitle }}</th>
          <th></th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="loading" class="loading" >
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
            <Button
                custom-class="clear"
                @click.prevent="modal.action[modal.actionType.OPEN_CONFIRM_DELETE](store.baseUrl+'/'+obj.id, afterDelete)"
            >
              <delete />
            </Button>
            <Button
                custom-class="clear"
                @click.prevent="modal.action[modal.actionType.OPEN_MODAL](
                    ( store.state.modal_name_rewrite !== undefined ) ? store.state.modal_name_rewrite : store.modalName,
                    {data : obj}
                )"
            >
              <update />
            </Button>
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
.filterBar {
  margin: 1rem 0 0;

  button  {

    span {
      margin-right: .5rem;

    }

  }

}

.containerTableList {
  padding: 2rem 0;

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0;

      th  {
        padding: 0.9rem;
        text-align: left;
        @include bgColor(light3);
        @include effect(shadow);
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