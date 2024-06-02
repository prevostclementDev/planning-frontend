<script setup>
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import InputTable from "~/components/form/interaction/InputTable.vue";
import {useFetch} from "~/stores/Fetch.js";

const { $toast } = useNuxtApp()
const useFetchStore = useFetch()

const props = defineProps({
  onsuccess : {
    type : Function,
    required: false,
    default : (apiResult) => {}
  },
  onfailure : {
    type : Function,
    required: false,
    default : (apiResult) => {}
  },
  insertType : {
    type : String,
    required : true,
  },
  apiUrl : {
    type : String,
    required : true
  },
  dataset : {
    type : Array,
    required : false,
  }
})

// Base data
const formData = ref({
  inputTitle : [],
  inputModel : {},
  modelOn : props.dataset,
  specificField : {}
})

// Error on top on form
const globalError = ref('');

// Select correct data set by props type given
let model;
let tempModelOn;
switch (props.insertType) {

  case 'eleves':
     model = {'first_name':null,'last_name' : null,'mail' : null, errors : null};

    if ( props.dataset ) {
      tempModelOn = [];
      props.dataset.forEach(el => {
        tempModelOn.push({
          ...el,
          errors : null
        })
      })
    } else {
      tempModelOn = Array.from({ length : 1}, () => ({...model}))
    }

    formData.value = {
      ...formData.value,
      inputTitle : ['Nom des élèves','Prénom des élèves','Adresse mail des élèves'],
      inputModel : model,
      modelOn : tempModelOn
    }

    break

  case 'intervenant':
    model = {'civility': null ,'first_name':null,'last_name' : null,'mail' : null, errors : null};

    if ( props.dataset ) {
      tempModelOn = [];
      props.dataset.forEach(el => {

        tempModelOn.push({
          civility : null,
          ...el,
          errors : null
        })

      })
    } else {
      tempModelOn = Array.from({ length : 1}, () => ({...model}))
    }

    formData.value = {
      ...formData.value,
      inputTitle : ['Civilité','Nom des intervenants','Prénom des intervenants','Adresse mail'],
      inputModel : model,
      modelOn : tempModelOn,
      specificField : {
        'civility' : { type : 'select', data : { 'Madame' : 'Madame', 'Monsieur' : 'Monsieur' } }
      }
    }

    break

  case 'classroom':
    model = {'name': null ,'capacity':null, errors : null};

    if ( props.dataset ) {
      tempModelOn = [];
      props.dataset.forEach(el => {

        tempModelOn.push({
          ...el,
          errors : null
        })

      })
    } else {
      tempModelOn = Array.from({ length : 1}, () => ({...model}))
    }

    formData.value = {
      ...formData.value,
      inputTitle : ['Nom de la salle','Capacité'],
      inputModel : model,
      modelOn : tempModelOn,
      specificField : {
        'capacity' : { type : 'number',  }
      }
    }

    break

  case 'cours':
    model = {'name': null ,'hours_required':null,'color' : null, errors : null};

    if ( props.dataset ) {
      tempModelOn = [];
      props.dataset.forEach(el => {

        if ( el.color === null ) {
          el = {
            ...el,
            color : "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
          }
        }

        tempModelOn.push({
          ...el,
          errors : null
        })

      })
    } else {
      tempModelOn = Array.from({ length : 1}, () => ({...model, color : "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") }))
    }

    formData.value = {
      ...formData.value,
      onAddRow : () => {
        formData.value = {
          ...formData.value,
          modelOn : [
            ...formData.value.modelOn,
            {...formData.value.inputModel, color : "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") }
          ]
        }
      },
      inputTitle : ['Nom du cours','Nombre d\'heure requis','Couleur sur le planning'],
      inputModel : model,
      modelOn : tempModelOn,
      specificField : {
        'color' : { type : 'color' },
        'hours_required' : { type : 'number' }
      }
    }

    break

}

// On submit form
async function submit(){

  // load
  const idToast = $toast.loading('Enregistrement des données...')

  // fetch
  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA](props.apiUrl , 'POST', {
    data : formData.value.modelOn
  })

  // Has error in importation but not in request status
  let hasError = false

  // If error in importation
  if ( useFetchStore.state.data[props.apiUrl].data.errors && Object.keys(useFetchStore.state.data[props.apiUrl].data.errors).length > 0 ) {
    hasError = true
    setInError(useFetchStore.state.data[props.apiUrl].data.errors)
  }

  // If request good status
  if ( ! useFetchStore.state.error[props.apiUrl] && ! hasError ) {

    // Success !
    $toast.update(idToast, {
      render: 'Enregistrement avec succès',
      autoClose: true,
      type: 'success',
      isLoading: false,
    });
    globalError.value = ''

    props.onsuccess( useFetchStore.state.data[props.apiUrl] )

  } else {

    let message = 'Enregistrement avec succès pour certaines informations, les autres sont surlignés en rouge vous pouvez modifier/supprimer et soumettre à nouveau le formulaire'

    if ( useFetchStore.state.data[props.apiUrl].data.details ) message = useFetchStore.state.data[props.apiUrl].data.details

    // On failure request status
    $toast.update(idToast, {
      render: message,
      autoClose: 6000,
      type: 'error',
      isLoading: false,
    });

    globalError.value = message

    props.onfailure( useFetchStore.state.data[props.apiUrl] )

  }

}

function setInError(errors) {
 let inError = []

  // Add error to element
  Object.keys(errors).forEach(key => {
    const keyArrayModel = key.split('row_')[1]
    formData.value.modelOn[keyArrayModel].errors = errors[key]

    inError.push(keyArrayModel)
  })

  // remove element without error
  const _tmpError = []
  formData.value.modelOn.forEach((data,key) => {
    if ( inError.includes(key.toString()) ) {
      _tmpError.push(data)
    }
  })

  formData.value.modelOn = _tmpError

}

onUnmounted(() => {
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL](props.apiUrl)
})
</script>

<template>
  <form action="">

    <div class="errors"> {{ globalError }} </div>

    <InputTable
        :input-model="formData.inputModel"
        :input-title="formData.inputTitle"
        :model-on="formData.modelOn"
        :specific-field="formData.specificField"
        :on-add-row="( formData.onAddRow ) ? () => formData.onAddRow(formData.modelOn,formData.inputModel) : () => formData.modelOn.push({...formData.inputModel})
"
    />

    <div class="action end">
      <Button type="submit" @click.prevent="submit"> Enregistrer </Button>
    </div>

  </form>
</template>

<style scoped lang="scss">
.errors {
  margin: 0 auto 2rem;
  width: fit-content;
  font-size: getFontSize(s);

}
</style>