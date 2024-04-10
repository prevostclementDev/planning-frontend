import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3ColorPicker);
});
