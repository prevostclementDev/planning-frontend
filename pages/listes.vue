<script setup>
import Ariane from "~/components/navigation/ariane.vue";
import Folder from "~/components/icones/folder.vue";
import {useNavBar} from "~/stores/ui/navbar";
import {useRouting} from "~/stores/routing.js";
import {useUsers} from "~/stores/entity/users.js";
import Tooltips from "~/components/tooltips.vue";
import Info from "~/components/icones/info.vue";

const useRoutingStore = useRouting()
const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(false)

useHead(() => ({
  title : 'Mes listes'
}))
</script>

<template>
  <div>
    <ariane :links="[
        { text : 'Dashboard', url : useRoutingStore.url.dashboard },
        {text : 'Mes listes'}]"
    />
    <div class="title">
      <h2>Mes listes</h2>
      <nuxt-link to="/creer-des-donnees">
        Ajouter des données
      </nuxt-link>
    </div>

    <div class="hub">

      <div class="shape">
        <svg xmlns="http://www.w3.org/2000/svg" width="203" height="158" viewBox="0 0 203 158" fill="none">
          <path d="M4.61981 114.696C14.8957 134.129 41.3622 137.431 56.089 121.109L74.6297 100.572C91.1948 82.2225 121.452 89.0882 128.471 112.793L134.974 134.748C140.46 153.283 161.139 162.615 178.666 154.459L183.827 152.057C200.617 144.243 207.151 123.752 197.975 107.665L146.038 16.5958C136.456 -0.206994 114.18 -4.55444 98.9816 7.40143L13.0445 75.0153C1.02226 84.4718 -2.51629 101.177 4.63166 114.699L4.61981 114.696Z" fill="#537CB4"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="125" height="123" viewBox="0 0 125 123" fill="none">
          <path d="M58.1696 5.28791C57.2306 8.78462 56.2915 12.2813 55.3525 15.778C54.4135 19.2748 51.0148 21.5249 47.442 20.9887C39.7008 19.8247 31.9093 18.9769 24.0994 18.4453C18.3096 18.0511 14.4895 24.3617 17.5355 29.3066C20.5816 34.2515 23.7788 39.4576 26.9073 44.5721C29.5411 48.8799 26.9898 54.5077 22.0061 55.328C16.4362 56.2491 10.8846 57.2894 5.4154 58.6231C-0.612603 60.0941 -1.97307 68.0637 3.19379 71.4963C9.87681 75.9371 17.0408 79.6904 24.4613 82.7792C28.3823 84.4107 29.9809 89.1219 27.9105 92.8294C27.6173 93.3564 27.3241 93.8835 27.0264 94.4105C23.6689 100.428 29.9259 107.21 36.2104 104.383C40.2001 102.586 44.1439 100.694 48.0282 98.7184C51.4453 96.9815 55.609 98.2692 57.4825 101.61C61.0278 107.939 64.9121 114.075 69.1033 119.987C72.7311 125.102 80.715 123.388 81.9197 117.233C83.9123 107.078 85.9506 96.9723 88.1264 87.0184C88.699 84.4016 90.6823 82.3164 93.2703 81.6335C100.269 79.7821 107.268 77.9306 114.268 76.0745C120.689 74.3743 121.505 65.5844 115.504 62.7385C115.39 62.6835 115.28 62.6331 115.165 62.5781C109.573 59.9154 109.792 51.8588 115.532 49.5307C117.277 48.8204 119.013 48.0871 120.74 47.3309C126.896 44.6271 126.223 35.6997 119.737 33.917C115.422 32.73 111.144 31.4376 106.907 30.0353C103.141 28.7887 101.103 24.6917 102.409 20.9429C103.054 19.0869 103.65 17.2079 104.195 15.3152C106.018 8.93585 98.9411 3.72058 93.4078 7.38227C90.8289 9.08709 88.2592 10.7919 85.685 12.4967C82.2725 14.7652 77.6278 13.7203 75.5848 10.1641C74.1511 7.66183 72.5388 5.24209 70.789 2.89567C67.2162 -1.8934 59.7086 -0.49563 58.1558 5.27417L58.1696 5.28791Z" fill="#93C0FF"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="114" viewBox="0 0 132 114" fill="none">
          <path d="M74.7929 81.3935C74.7929 81.3935 78.5972 97.7026 62.4265 101.404C46.254 105.103 24.2255 98.2423 24.7513 77.0566C25.2766 55.8974 70.8083 56.6105 74.7912 81.3899L74.7929 81.3935Z" fill="#E55D5D"/>
          <path d="M39.8814 27.1307C39.8814 27.1307 42.4448 38.5141 30.791 41.2844C19.1404 44.0618 3.38053 39.4681 3.9725 24.6299C4.56775 9.79868 37.2816 9.82033 39.885 27.129L39.8814 27.1307Z" fill="#E55D5D"/>
          <path d="M122.874 38.32C122.874 38.32 127.639 59.2814 106.376 64.2957C85.0937 69.3061 56.2723 60.7357 57.2446 33.4479C58.2279 6.14654 117.993 6.42818 122.879 38.3306L122.874 38.32Z" fill="#E55D5D"/>
        </svg>
      </div>

      <nuxt-link :to="useRoutingStore.url.listeSingle('mes-cours')" class="folder">
        <div class="tooltipsContainer">
          <tooltips text="Séance d'enseignement, les intervenants peuvent être liés"><info /></tooltips>
        </div>
        <folder />
        <h3>Mes cours</h3>
      </nuxt-link>

      <nuxt-link :to="useRoutingStore.url.listeSingle('mes-programmes')" class="folder w-75">
        <div class="tooltipsContainer">
          <tooltips text="Programme annuel d'enseignement, les cours sont liés"><info /></tooltips>
        </div>
        <folder />
        <h3>Mes maquettes pédagogiques</h3>
      </nuxt-link>


      <nuxt-link :to="useRoutingStore.url.listeSingle('mes-intervenants')" class="folder">
        <div class="tooltipsContainer">
          <tooltips text="Professeurs/enseignants, peut être liés à un cours"><info /></tooltips>
        </div>
        <folder />
        <h3>Mes intervenants</h3>
      </nuxt-link>

      <nuxt-link :to="useRoutingStore.url.listeSingle('mes-classes')" class="folder">
        <div class="tooltipsContainer">
          <tooltips text="Groupe d'élèves"><info /></tooltips>
        </div>
        <folder />
        <h3>Mes classes</h3>
      </nuxt-link>

      <nuxt-link :to="useRoutingStore.url.listeSingle('mes-eleves')" class="folder">
        <div class="tooltipsContainer">
          <tooltips text="Apprenants inscrits, liés à une classe" ><info /></tooltips>
        </div>
        <folder />
        <h3>Mes élèves</h3>
      </nuxt-link>

      <nuxt-link :to="useRoutingStore.url.listeSingle('mes-salles')" class="folder">
        <div class="tooltipsContainer">
          <tooltips text="Espace où les élèves suivent les cours" ><info /></tooltips>
        </div>
        <folder />
        <h3>Mes salles</h3>
      </nuxt-link>

    </div>

  </div>
</template>

<style scoped lang="scss">

.title {
  @include flex(space-between);

  a {
    @include interaction(button-primary);
    text-decoration: none;
    margin: 0;

  }

}

.hub {
  margin: 2rem auto;
  @include flex(flex-start,flex-start,row,wrap,20px,20px);
  max-width: 70%;
  position: relative;

  .folder {
    @include flex(center,center,column,10px,10px);
    @include effect(blur);
    height: 200px;
    width: calc(100% / 4 - 20px);
    border-radius: 8px;
    text-decoration: none;
    transition: 0.3s ease-in-out background;
    text-align: center;
    position: relative;
    z-index: 0;

    &.w-75 {
      width: calc(75% - 20px);
      @include flex(flex-start,center,row,10px,10px);
      padding: 0 3rem;

      h3 {
        margin-left: 1rem;

      }

    }

    &:hover {
      @include bgColor(light2);

    }

    .tooltipsContainer {
      z-index: 1;
      position: absolute;
      display: inline-block;
      right: 8px;
      top: 8px;

    }

  }

  .shape {
    position: absolute;
    width: 100%;
    height: 100%;

    svg {

      &:first-child {
        position: absolute;
        right: 0;
        transform: translate(0,-30%);

      }

      &:nth-child(2) {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(30%,30%);

      }

      &:last-child {
        position: absolute;
        bottom: -10%;
        left: 20%;

      }

    }

  }

}

</style>