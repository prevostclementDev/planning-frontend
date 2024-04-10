import {useModal} from "~/stores/ui/modal.js";

export default defineNuxtPlugin((nuxtApp) => {

  const useModalStore = useModal()

  nuxtApp.hook('app:beforeMount', () => {
    useModalStore.action[useModalStore.actionType.OPEN_MODAL]('loading')
  })

  nuxtApp.hook('page:loading:end', () => {
    useModalStore.action[useModalStore.actionType.CLOSE_MODAL]()
  })
})
