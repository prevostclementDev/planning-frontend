import { defineStore } from 'pinia'
import chooseType from '~/components/form/parts/createDonnees/chooseType.vue'
import formClass from "~/components/form/formClass.vue";
import formListInsert from "~/components/form/formListInsert.vue";
import end from "~/components/form/parts/createDonnees/end.vue";
import chooseImportOrNot from "~/components/form/parts/createDonnees/chooseImportOrNot.vue";
import formFormation from "~/components/form/formFormation.vue";

export const useCreateDonnees = defineStore('createDonnees', () => {

  // const
  const listesTypeOptions = {
    'classes': {
      title : 'Une classe',
      stepNumber : 4,
      step : {
        1 : {
          title : 'Créez votre classe',
          props : {
            onsuccess : async (apiResult) => {
              listesTypeOptions.classes.step[3].props.apiUrl = `schoolspaces/class/${apiResult.data.id}/users/list`
              updateStep()
            }
          },
          components : formClass
        },
        2 : {
          title : 'Ajouter des élèves dans votre nouvelle classe ?',
          props : {
            onChoose : (choice) => {
              if ( choice === 'table' ) {
                delete listesTypeOptions.classes.step[3].props.dataset
                updateStep()
              }
            },
            onImportSuccess : (data) => {
              listesTypeOptions.classes.step[3].props.dataset = data.data.insert
              listesTypeOptions.classes.step[3].title = 'Verifier les champs après importation'
              updateStep()
            },
            importUrl : 'schoolspaces/users/import?readOnly=true'
          },
          components : chooseImportOrNot
        },
        3 : {
          title : 'Ajouter des élèves',
          props : {
            insertType : 'eleves',
            apiUrl : '',
            onsuccess : async (apiResult) => {
              updateStep(4)
            }
          },
          components : formListInsert
        },
        4 : {
          title : 'Et voila ! Toutes les données sont créent',
          components : end
        }
      }
    },

    'formation': {
      title : 'Un Programme',
      stepNumber : 4,
      step : {
        1 : {
          title : 'Créez votre programme',
          props : {
            onsuccess : async (apiResult) => {
              listesTypeOptions.formation.step[3].props.apiUrl = `schoolspaces/programs/${apiResult.data.id}/courses/list`
              updateStep()
            }
          },
          components : formFormation
        },
        2 : {
          title : 'Ajouter des cours dans votre nouvelle formation ?',
          props : {
            onChoose : (choice) => {
              if ( choice === 'table' ) {
                delete listesTypeOptions.formation.step[3].props.dataset
                updateStep()
              }
            },
            onImportSuccess : (data) => {
              listesTypeOptions.formation.step[3].props.dataset = data.data.insert
              listesTypeOptions.formation.step[3].title = 'Verifier les champs après importation'
              updateStep()
            },
            importUrl : 'schoolspaces/courses/import'
          },
          components : chooseImportOrNot
        },
        3 : {
          title : 'Ajouter des cours',
          props : {
            insertType : 'cours',
            apiUrl : '',
            onsuccess : async (apiResult) => {
              updateStep(4)
            }
          },
          components : formListInsert
        },
        4 : {
          title : 'Et voila ! Toutes les données sont créent',
          components : end
        }
      }
    },

    'intervenant' : {
      title : 'Un/des intervenant(s)',
      stepNumber : 3,
      step : {
        1 : {
          title : 'Choisissez votre méthode',
          props : {
            onChoose : (choice) => {
              if ( choice === 'table' ) {
                delete listesTypeOptions.intervenant.step[2].props.dataset
                updateStep()
              }
            },
            onImportSuccess : (data) => {
              listesTypeOptions.intervenant.step[2].props.dataset = data.data.insert
              listesTypeOptions.intervenant.step[2].title = 'Verifier les champs après importation'
              updateStep()
            },
            importUrl : 'schoolspaces/users/import?readOnly=true'
          },
          components : chooseImportOrNot
        },
        2: {
          title : 'Ajouter des intervenants',
          props : {
            insertType : 'intervenant',
            apiUrl : 'schoolspaces/users/list?types=3',
            onsuccess : async (apiResult) => {
              updateStep()
            }
          },
          components : formListInsert
        },
        3: {
          title : 'Et voila ! Toutes les données sont créent',
          components : end
        }
      }
    },

    'cours' : {
      title : 'Un/des cours' ,
      stepNumber : 3,
      step : {
        1 : {
          title : 'Choisissez votre méthode',
          props : {
            onChoose : (choice) => {
              if ( choice === 'table' ) {
                delete listesTypeOptions.cours.step[2].props.dataset
                updateStep()
              }
            },
            onImportSuccess : (data) => {
              listesTypeOptions.cours.step[2].props.dataset = data.data.insert
              listesTypeOptions.cours.step[2].title = 'Verifier les champs après importation'
              updateStep()
            },
            importUrl : 'schoolspaces/courses/import'
          },
          components : chooseImportOrNot
        },
        2: {
          title : 'Ajouter des cours',
          props : {
            insertType : 'cours',
            apiUrl : 'schoolspaces/courses/list',
            onsuccess : async (apiResult) => {
              updateStep()
            }
          },
          components : formListInsert
        },
        3: {
          title : 'Et voila ! Toutes les données sont créent',
          components : end
        }
      }
    },

    'classroom' : {
      title : 'Une/des salle(s)',
      stepNumber : 3,
      step : {
        1 : {
          title : 'Choisissez votre méthode',
          props : {
            onChoose : (choice) => {
              if ( choice === 'table' ) {
                delete listesTypeOptions.classroom.step[2].props.dataset
                updateStep()
              }
            },
            onImportSuccess : (data) => {
              listesTypeOptions.classroom.step[2].props.dataset = data.data.insert
              updateStep()
            },
            importUrl : 'schoolspaces/courses/import'
          },
          components : chooseImportOrNot
        },
        2: {
          title : 'Ajouter une/des salle(s)',
          props : {
            insertType : 'classroom',
            apiUrl : 'schoolspaces/classroom/list',
            onsuccess : async (apiResult) => {
              updateStep()
            }
          },
          components : formListInsert
        },
        3: {
          title : 'Et voila ! Toutes les données sont créent',
          components : end
        }
      }
    }

  }

  const initData = {
    currentStep : 1,
    parcours : null,
    titleStep : 'Que-souhaitez vous ajouter ?',
    propsStep : {},
    components : chooseType,
    stepNumber : 4
  }

  // State
  const state = ref(initData)

  watch(() => state.value.parcours, (nv,ov) => {

    if ( nv && nv in listesTypeOptions ) {

      state.value = {
        ...state.value,
        components : listesTypeOptions[nv].step[state.value.currentStep].components,
        titleStep : listesTypeOptions[nv].step[state.value.currentStep].title,
        propsStep : listesTypeOptions[nv].step[state.value.currentStep].props,
        stepNumber : listesTypeOptions[nv].stepNumber
      }

    }

  })

  // *******
  // Helper
  // *******
  function updateStep(customStep = null ) {
    state.value = {
      ...state.value,
      currentStep : (customStep) ? customStep : state.value.currentStep + 1,
      components : listesTypeOptions[state.value.parcours].step[(customStep) ? customStep : state.value.currentStep + 1].components,
      titleStep : listesTypeOptions[state.value.parcours].step[(customStep) ? customStep : state.value.currentStep + 1].title,
      propsStep : listesTypeOptions[state.value.parcours].step[(customStep) ? customStep : state.value.currentStep + 1].props
    }
  }

  function rollbackStep() {
    state.value = {
      ...state.value,
      currentStep : state.value.currentStep - 1,
      components : listesTypeOptions[state.value.parcours].step[state.value.currentStep - 1].components,
      titleStep : listesTypeOptions[state.value.parcours].step[state.value.currentStep - 1].title,
      propsStep : listesTypeOptions[state.value.parcours].step[state.value.currentStep - 1].props
    }
  }

  function reset(){
    state.value = {
      ... initData,
      parcours: null
    }
  }

  return { state, updateStep, rollbackStep, listesTypeOptions, reset }
})