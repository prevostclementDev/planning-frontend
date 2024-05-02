import { defineStore } from 'pinia'
import {useFetch} from "~/stores/Fetch.js";
export const useNotice = defineStore('notice', () => {

  const actionType = {
    OPEN_NOTICE : 'OPEN_NOTICE',
    CLOSE_ALL_NOTICE : 'CLOSE_ALL_NOTICE'
  }

  const initialeState = {
    notification : false,
    user : false,
  }

  const notice = ref({ ...initialeState })

  const action = ({

    [actionType.OPEN_NOTICE](noticeName){
      notice.value = {
        ...notice.value,
        [noticeName] : true
      }
    },

    [actionType.CLOSE_ALL_NOTICE](){
      notice.value = {
        ...initialeState
      }
    }

  })

  return { notice, action, actionType }
})