import VueDragscroll from "vue-dragscroll";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDragscroll);
  nuxtApp.vueApp.component('VueDragscroll',VueDragscroll);

  // return {
  //   provide: {
  //     toast,
  //   },
  // };
});
