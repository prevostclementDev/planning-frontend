<script setup>
import Input from "~/components/form/interaction/Input.vue";
import SmallLoader from "~/components/loader/smallLoader.vue";
import Close from "~/components/icones/close.vue";
import Button from "~/components/form/interaction/Button.vue";
import {useFetch} from "~/stores/Fetch";

const props = defineProps({
  url : {
    type : String,
    default : '',
    required : false
  },
  displayArray : {
    type : Array,
    default : [],
    required : false
  },
  title : {
    type : String,
    required : false,
    default : ''
  },
  errors : {
    type : Array,
    required : false,
    default : []
  },
  isError : {
    type : Boolean,
    required : false,
    default : false,
  },
  defaultValue : {
    type : String,
    default : '',
    required : false,
  },
  modelValue : {}
})

const emit = defineEmits(['update:modelValue'])

const fetchStore = useFetch()
const placeholder = ref('Chercher avec 3 caractères minimum')
const inputSearchValue = ref('')
const findByApiValue = ref('')

const inputIsFocus = ref(false)
const boxIsOver = ref(false)
const isOpenMenu = ref(false)
const isChoose = ref(false)
const searchUri = ref('')

if ( props.defaultValue ) {
  inputSearchValue.value = props.defaultValue
  isChoose.value = true
}

watch(inputSearchValue, async (nv,ov) => {

  if ( nv.length >= 3 && ! isChoose.value ) {
    searchUri.value = props.url + (( props.url.includes('?') ) ? '&search='+nv : '?search='+nv)
    isOpenMenu.value = true
    fetchStore.action[fetchStore.actionType.FETCH_DATA](searchUri.value)
  } else {
    isOpenMenu.value = false
    fetchStore.mutation[fetchStore.mutationType.RESET_API_URL](searchUri.value)
  }

})

function setData(data,newTitle) {

  isOpenMenu.value = false

  inputSearchValue.value = newTitle
  findByApiValue.value = data
  isChoose.value = true

  emit('update:modelValue', findByApiValue.value);

}

function removeData() {

  isOpenMenu.value = false

  inputSearchValue.value = ''
  findByApiValue.value = ''
  isChoose.value = false

  emit('update:modelValue', findByApiValue.value);

}

function getTitleRendered(object){
  let string = '';

  props.displayArray.forEach(el => {
    string += ( object[el] ) ? object[el] + ' ' : ''
  })

  return string
}

</script>

<template>
  <div class="search-select">

      <div class="layout">
        <Input
            :title="title"
            :placeholder="placeholder"
            :disabled="isChoose"
            v-model="inputSearchValue"
            :onfocusin="() => { inputIsFocus = true }"
            :onfocusout="() => { inputIsFocus = false }"
            :errors="errors"
            :is-error="isError"
        />
        <div class="button-reset" v-if="isChoose">
          <Button custom-class="clear" @click.prevent="removeData"><close type="blue" /></Button>
        </div>
      </div>

      <div
          class="box"
          v-if="isOpenMenu && (inputIsFocus || boxIsOver )"
          @mouseenter="boxIsOver = true"
          @mouseleave="boxIsOver = false"
      >

        <div class="loading" v-if="fetchStore.state.loading[searchUri]">
          <small-loader custom-class="blue" />
        </div>

        <div class="data" v-else-if="! fetchStore.state.error[searchUri] && fetchStore.state.data[searchUri]?.data?.array">
          <ul>

            <li
                v-if="fetchStore.state.data[searchUri].data.array.length > 0"
                v-for="searchElement in fetchStore.state.data[searchUri].data.array"
                @click.prevent="setData(searchElement.id,getTitleRendered(searchElement))"
            >
              {{ getTitleRendered(searchElement) }}
            </li>
            <li v-else>Nous n'avons rien trouvé</li>

          </ul>
        </div>

        <div class="data" v-else>
          <ul>
            <li class="errors">Un erreur est survenue...</li>
          </ul>
        </div>

      </div>

  </div>
</template>

<style scoped lang="scss">
.search-select {
  @include flex(flex-start,flex-start,column);
  width: 100%;
  height: 100%;
  position: relative;

  .layout {
    position: relative;
    width: 100%;

    .button-reset {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-50%,-45%);

    }

  }

  .box {
    max-width: 500px;
    min-width: 300px;
    max-height: 250px;
    overflow: auto;
    position: absolute;
    display: inline;
    @include bgColor(light3);
    @include effect(shadow);
    border: 1px solid getColor(grey8);
    border-radius: 8px;
    padding: 1rem;
    z-index: 99999;
    top: 100%;

    .loading {
      width: 100%;
      @include flex();

    }

    .data {

      ul {

        li {

          padding: .25rem .5rem;
          margin: .25rem 0;
          border-radius: 4px;
          cursor: pointer;
          transition: .3s ease-in-out background;

          span {
            margin: 0 .3rem;

            &:first-child {
              margin-left: 0;

            }

          }

          &:hover {
            @include bgColor(primary1,0.5)

          }

        }

      }

    }

  }

}
</style>