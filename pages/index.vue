<script setup>
import {useNavBar} from "~/stores/ui/navbar";
import VueDatePicker from '@vuepic/vue-datepicker';
import {useRouting} from "~/stores/routing.js";
import {useModal} from "~/stores/ui/modal.js";
import Lists from "~/components/notifications/lists.vue";
import {useFetch} from "~/stores/Fetch.js";

const modalStore = useModal()
const routingStore = useRouting()
const fetchStore = useFetch()
const useNavBarStore = useNavBar()
useNavBarStore.setNavBar(true)

useHead(() => ({
  title : 'Dashboard'
}))

const openPlanningModal = () => {
  modalStore.action[modalStore.actionType.OPEN_MODAL]('planningModal', {
    modalTitle : 'Ajouter un planning'
  })
}

onMounted(() => {

  fetchStore.action[fetchStore.actionType.FETCH_DATA]('schoolspaces/users/recently-view')

})

const linkToRecentlyView = (type,id) => {

  switch (type) {

    case 'planning':
      return routingStore.url.planningSingle(id)
    case 'teachers':
      return routingStore.url.listeSingle('mes-intervenants')
    case 'courses':
      return routingStore.url.listeSingle('mes-cours')
    case 'class':
      return routingStore.url.listeSingle('mes-classes')
    case 'students':
      return routingStore.url.listeSingle('mes-eleves')
    case 'programs':
      return routingStore.url.listeSingle('mes-programmes')

  }

}

const nameRecentlyView = ( type, name ) => {

  switch (type) {

    case 'planning':
      return 'Planning : '+name
    case 'teachers':
      return 'Liste des intervenants'
    case 'courses':
      return 'Liste des cours'
    case 'class':
      return 'Liste des classes'
    case 'students':
      return 'Liste des élèves'
    case 'programs':
      return 'Liste des maquettes pédagogiques'

  }

}

</script>

<template>
  <div class="containerDashboard">

    <svg class="svg-top-left" xmlns="http://www.w3.org/2000/svg" width="208" height="210" viewBox="0 0 208 210" fill="none">
      <path d="M200.839 88.7614L172.032 87.7581C164.592 87.4995 162.254 77.5826 168.795 74.0246L192.384 61.1899C196.618 58.8877 197.504 53.1876 194.168 49.7096L170.642 25.1482C167.681 22.0581 162.721 22.1566 159.884 25.3637L145.951 41.1224C141.194 46.5025 132.351 42.5197 133.219 35.3914L136.351 9.70367C136.874 5.39467 133.557 1.57809 129.219 1.50422L94.2082 0.900976C89.8388 0.827107 86.3802 4.57596 86.8048 8.92804L88.4295 25.4315C89.1988 33.237 78.8045 36.6102 74.8413 29.839L64.8779 12.8C62.4717 8.68184 56.8346 7.93686 53.4376 11.2794L24.5689 39.7127C21.2457 42.9876 21.7934 48.4969 25.7012 51.0453L36.9139 58.3646C43.1541 62.4396 40.0094 72.1532 32.5691 71.79L8.96832 70.6513C4.8328 70.4543 1.35578 73.7292 1.30655 77.872L0.851119 116.948C0.801887 121.067 4.16817 124.415 8.28523 124.348L22.2734 124.114C30.009 123.984 32.6184 134.394 25.7381 137.933L11.1961 145.4C6.82671 147.641 5.86668 153.47 9.28218 156.991L37.0985 185.701C40.3602 189.069 45.9111 188.539 48.4712 184.606L53.9607 176.179C58.3054 169.512 68.6627 173.599 67.2842 181.436L63.924 200.586C63.1425 205.024 66.5334 209.105 71.0382 209.161L113.36 209.659C117.594 209.709 120.984 206.163 120.744 201.934L119.329 177.059C118.898 169.487 128.855 166.348 132.843 172.793L147.822 197.003C150.284 200.98 155.792 201.657 159.14 198.395L183.639 174.523C186.771 171.469 186.544 166.366 183.147 163.609L163.349 147.524C157.54 142.802 161.73 133.439 169.121 134.628L198.802 139.411C203.196 140.118 207.197 136.77 207.277 132.319L207.892 96.1975C207.96 92.2086 204.821 88.9029 200.839 88.7614Z" fill="#D04848"/>
    </svg>

    <svg class="svg-top-right" width="147" height="278" viewBox="0 0 147 278" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M128.733 106.31C127.053 111.419 116.394 115.543 111.539 113.493C105.058 109.96 106.541 94.3429 105.84 87.6085C106.461 74.4661 107.237 61.2005 109.391 48.2243C110.142 44.4262 116.019 44.2231 116.215 48.3536C125.853 50.9574 125.754 67.3562 127.077 75.5126C127.847 85.7064 129.828 96.1403 128.751 106.303H128.733V106.31Z" fill="#74A4E6"/>
      <path d="M23.9973 224.536C18.4648 225.515 13.4862 220.412 9.43066 217.229C-2.60052 207.965 0.605655 191.295 0.722583 177.956C1.03029 170.415 1.50418 162.979 2.29806 155.5C3.35655 151.8 1.85494 138.529 8.58132 141.933C24.9265 141.114 20.5448 162.437 23.8003 173.05C26.385 184.61 26.6312 196.528 27.5482 208.316C27.7082 213.677 29.7267 221.489 23.9973 224.567V224.536Z" fill="#74A4E6"/>
      <path d="M92.3685 171.905C86.9345 174.952 79.4082 174.232 74.3496 170.729C70.374 167.374 70.0479 161.662 70.0171 156.805C70.2756 135.112 72.6264 113.555 75.5003 92.0468C76.7065 88.3472 75.3834 73.9552 81.2113 75.5249C83.9929 73.3273 88.3622 74.8231 91.6177 75.2787C100.633 77.6363 98.7688 92.8963 99.5566 100.259C99.6243 118.085 100.96 135.962 98.9042 153.727C98.0549 160.012 98.1841 167.971 92.3747 171.911L92.3685 171.905Z" fill="#A51313"/>
      <path d="M76.8052 67.461C68.9711 72.3117 57.0076 68.6859 56.6322 58.4921C54.9583 48.883 54.5336 39.0955 54.712 29.351C54.8597 23.1214 55.0568 16.9164 55.4322 10.7053C55.2537 7.92911 56.2322 2.91837 60.0108 4.29724C63.7401 -0.0609969 69.845 -0.233358 75.119 0.44377C80.0545 0.44377 82.0053 5.07286 81.4514 9.40648C80.9775 23.0722 83.0515 36.7194 82.4484 50.3542C81.6792 56.1652 82.0731 63.6752 76.8175 67.4794L76.799 67.461H76.8052Z" fill="#658785"/>
      <path d="M70.1958 275.154C64.2879 277.383 55.1368 279.457 50.8044 273.449C42.7179 256.81 46.1518 230.901 45.2041 212.225C45.321 204.118 47.3335 194.773 55.5614 191.271C58.1338 190.193 60.8661 188.094 63.7647 188.537C72.9281 184.438 75.5805 249.3 75.9559 256.927C75.8267 263.182 76.0852 271.35 70.1773 275.148H70.1958V275.154Z" fill="#658785"/>
      <path d="M145.324 199.113C144.672 209.873 133.262 213.407 124.653 208.821C119.071 204.942 117.797 197.931 116.363 191.726C112.388 177.63 112.616 163.084 114.886 148.741C116.16 144.235 115.717 116.571 121.545 118.879C126.001 113.819 134.881 113.592 140.235 117.347C145.866 123.515 143.441 137.199 144.992 145.417C144.746 163.342 148.691 181.305 145.318 199.113H145.324Z" fill="#F3B95F"/>
      <path d="M54.5026 175.524C48.8716 179.236 39.7882 176.503 36.3358 170.895C31.2772 158.682 32.4402 144.894 32.231 131.917C32.4894 115.198 34.2126 98.5842 35.665 81.933C37.5666 69.4431 33.4372 64.1061 49.4993 67.3809C58.3673 68.4582 57.2842 75.9743 57.4135 82.7825C57.4135 88.6304 57.9365 94.4414 57.9549 100.302C57.4134 118.375 59.8873 136.38 59.4565 154.423C58.7057 161.409 59.8812 170.218 54.478 175.524H54.4964H54.5026Z" fill="#FFD99E"/>
    </svg>

    <div class="row">

      <div class="card">
        <h2>Plannings</h2>

        <div class="actionCard">
          <a href="" @click.prevent="openPlanningModal" class="rm-underline">Créer un nouveau planning</a>
          <nuxt-link :to="routingStore.url.planningsList" class="rm-underline">Consulter les plannings </nuxt-link>
        </div>
      </div>

      <div class="card">
        <h2>Listes</h2>

        <div class="actionCard">
          <nuxt-link :to="routingStore.url.createData" class="rm-underline">Créer une nouvelle liste</nuxt-link>
          <nuxt-link :to="routingStore.url.dataList" class="rm-underline">Consulter les listes </nuxt-link>
        </div>
      </div>

      <div class="card">
        <h2>Notifications</h2>
        <lists />
      </div>

      <div class="card clear w2-3" v-if="fetchStore.state.data['schoolspaces/users/recently-view'] && fetchStore.state.data['schoolspaces/users/recently-view'].data.recentlyView">
        <h2>Récemment utilisé</h2>

        <div class="row smallgap">

          <svg class="svg-recentlyUse" xmlns="http://www.w3.org/2000/svg" width="196" height="113" viewBox="0 0 196 113" fill="none">
            <path d="M44.0986 25.6437C51.6913 36.9209 46.6271 73.6045 62.1708 70.1552C70.1828 67.2324 73.8474 49.1085 78.2696 40.4877C82.3046 31.1912 86.3973 21.781 92.6656 14.6813C96.2249 10.3004 99.5453 5.17524 104.241 2.83265C118.741 -4.05297 124.147 8.12167 127.408 24.4713C132.522 43.0342 129.278 66.0929 139.603 81.8573C147.712 88.9319 155.837 54.699 159.725 48.0359C164.727 35.4221 179.914 19.2623 189.575 33.1247C192.833 38.8316 193.571 46.1048 194.385 52.9295C194.789 56.8941 195.265 60.8396 195.693 64.8079C194.267 65.012 192.843 65.2009 191.417 65.405C189.776 65.6364 188.119 65.7884 186.486 66.0671C185.332 66.2682 184.167 66.4675 183.015 66.6535C182.284 66.768 181.564 67.0072 180.836 67.2142C180.789 66.439 180.719 65.66 180.637 64.8792C180.363 61.0427 179.874 54.7917 175.817 58.034C170.12 62.2605 168.663 71.1668 166.813 78.6751C165.586 83.5331 163.484 87.8837 161.498 92.2529C156.565 106.69 142.394 119.248 131.184 107.843C128.833 105.382 127.357 101.892 125.625 98.7462C123.014 93.5872 119.835 88.8143 118.049 83.0488C115.572 74.1178 115.033 64.4191 114.966 54.9947C114.531 45.3278 117.47 28.6706 107.831 25.6229C102.637 27.7329 100.626 37.519 97.1551 42.605C91.578 53.116 87.5117 64.6804 83.3345 76.1657C79.4587 83.8595 74.4697 91.9606 67.3187 94.3902C59.9438 96.17 51.6536 95.9467 45.3684 89.9904C41.3121 86.9213 40.4396 80.8552 40.1512 75.2504C39.2087 65.7026 38.9638 55.8969 36.7025 46.6776C35.2741 42.0285 33.3494 35.3197 28.5312 37.3204C24.0432 38.5596 20.762 42.6159 18.3401 47.4842C17.5323 47.1412 16.7361 46.8 15.9181 46.44C15.0986 46.0952 14.2736 45.8109 13.45 45.5114C12.6599 45.2327 11.8624 44.9067 11.0565 44.6714C9.15899 44.0943 7.26288 43.5021 5.34954 42.9685C3.70141 42.5077 2.05327 42.0469 0.405138 41.5861C9.15266 20.3824 29.2366 2.14218 44.1116 25.6304L44.0986 25.6437Z" fill="#FECB7D"/>
          </svg>

          <nuxt-link
              v-for="data in fetchStore.state.data['schoolspaces/users/recently-view'].data.recentlyView"
              :to="linkToRecentlyView(data.type,data.id)"
              class="card rm-underline blur"
          >
            <h3>{{ nameRecentlyView(data.type, data?.name) }} </h3>
          </nuxt-link>

        </div>

      </div>

<!--      <div class="card">-->
<!--        <h2>Memo</h2>-->
<!--      </div>-->

    </div>

  </div>
</template>

<style scoped lang="scss">
.containerDashboard {
  padding: 1.5rem;

  .row {
    @include flex(flex-start,flex-start,row,wrap,4rem,1.4rem);
    position: relative;

    &.smallgap {
      row-gap: 1.4rem;

    }

    .card {
      border-radius: 1rem;
      padding: 1.4rem;
      width: calc(100% / 3 - 1.4rem);
      align-self: stretch;

      &:not(.clear) {
        @include bgColor(light3);
        @include effect(shadow);

      }

      &.w2-3 {
        width: calc( calc(100% / 3) * 2 - 1.4rem);

      }

      &.blur {
        @include effect(blur);
        transition: .35s ease-in-out all;

        &:hover {
          @include bgColor(light3);

        }

      }

      h2 {
        margin-bottom: 1rem;

      }

      .actionCard {
        @include flex(flex-start,flex-start,column, nowrap,.8rem,.8rem);
        margin: 2rem 0;

      }

    }

  }

  .svg-recentlyUse {
    position: absolute;
    z-index: 0;
    left: 50%;
    transform: translateY(-50%);

  }

  .svg-top-right {
    position: absolute;
    z-index: 0;
    right: 0;
    top: 0;
    transform: rotate(20deg);

  }

  .svg-top-left {
    position: absolute;
    z-index: 0;
    left: 10px;
    top: 10px;
    transform: rotate(-20deg);

  }

}
</style>