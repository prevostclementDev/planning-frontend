import { defineStore } from 'pinia'
import {useFetch} from "~/stores/Fetch.js";
export const useNavBar = defineStore('navbar', () => {

  const isFullNavBar = ref(true)

  function setNavBar(value) {
    isFullNavBar.value = value
  }

  return { isFullNavBar, setNavBar }
})