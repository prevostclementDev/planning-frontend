<script setup>
import {useFetch} from "~/stores/Fetch";
import Input from "~/components/form/interaction/Input.vue";
import Button from "~/components/form/interaction/Button.vue";
import {helpers, maxLength, minLength, numeric, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useRouting} from "~/stores/routing.js";

const routingStore = useRouting()
const useFetchStore = useFetch()
const { $toast } = useNuxtApp()

useHead(() => ({
  title : 'Verification du code'
}))

definePageMeta({
  layout: false,
});

// *************************************
// Validation rules for authentification
// *************************************
const rules = computed(() => {
  return {
    code : {
      required : helpers.withMessage('Le code est obligatoire', required),
      lenghtMin : helpers.withMessage('Longueur minimum 4 chiffres', minLength(4)),
      lenghtMax : helpers.withMessage('Longueur maximum 4 chiffres', maxLength(4)),
      numeric : helpers.withMessage('Valeur numérique uniquement', numeric),
    },
  }
})

const formData = ref({
  code : ''
})

// ****************
// setup validation
// ****************
const v$ = useVuelidate(rules,formData)

async function submit() {

  await v$.value.$validate();

  if ( ! v$.value.$error ) {

    const idToast = $toast.loading('Vérification en cours...');

    await useFetchStore.action[useFetchStore.actionType.FETCH_DATA]('confirm-email', 'POST', {
      code : formData.value.code
    })

    if ( useFetchStore.state.error['confirm-email'] ) {
      $toast.update(idToast, {
        render: ( useFetchStore.state.data['confirm-email']?.data?.details ) ? useFetchStore.state.data['confirm-email'].data.details : 'Une erreur est survenu pendant la vérification',
        autoClose: true,
        type: 'error',
        isLoading: false,
      });
    } else {
      navigateTo(routingStore.url.dashboard)
    }

  }

}

const isSendCode = ref(false)

async function resendCode() {

  isSendCode.value = true
  const idToast = $toast.loading('Envoi du mail en cours...');

  await useFetchStore.action[useFetchStore.actionType.FETCH_DATA]('send-code-email-check', 'POST')
  useFetchStore.mutation[useFetchStore.mutationType.RESET_API_URL]('send-code-email-check')

  $toast.update(idToast, {
    render: 'Email avec le code envoyé',
    autoClose: true,
    type: 'success',
    isLoading: false,
  });

  isSendCode.value = false

}

</script>

<template>
  <div class="checkCode">
    <div class="container-form">

      <svg width="147" height="278" viewBox="0 0 147 278" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M128.733 106.31C127.053 111.419 116.394 115.543 111.539 113.493C105.058 109.96 106.541 94.3429 105.84 87.6085C106.461 74.4661 107.237 61.2005 109.391 48.2243C110.142 44.4262 116.019 44.2231 116.215 48.3536C125.853 50.9574 125.754 67.3562 127.077 75.5126C127.847 85.7064 129.828 96.1403 128.751 106.303H128.733V106.31Z" fill="#74A4E6"/>
        <path d="M23.9973 224.536C18.4648 225.515 13.4862 220.412 9.43066 217.229C-2.60052 207.965 0.605655 191.295 0.722583 177.956C1.03029 170.415 1.50418 162.979 2.29806 155.5C3.35655 151.8 1.85494 138.529 8.58132 141.933C24.9265 141.114 20.5448 162.437 23.8003 173.05C26.385 184.61 26.6312 196.528 27.5482 208.316C27.7082 213.677 29.7267 221.489 23.9973 224.567V224.536Z" fill="#74A4E6"/>
        <path d="M92.3685 171.905C86.9345 174.952 79.4082 174.232 74.3496 170.729C70.374 167.374 70.0479 161.662 70.0171 156.805C70.2756 135.112 72.6264 113.555 75.5003 92.0468C76.7065 88.3472 75.3834 73.9552 81.2113 75.5249C83.9929 73.3273 88.3622 74.8231 91.6177 75.2787C100.633 77.6363 98.7688 92.8963 99.5566 100.259C99.6243 118.085 100.96 135.962 98.9042 153.727C98.0549 160.012 98.1841 167.971 92.3747 171.911L92.3685 171.905Z" fill="#A51313"/>
        <path d="M76.8052 67.461C68.9711 72.3117 57.0076 68.6859 56.6322 58.4921C54.9583 48.883 54.5336 39.0955 54.712 29.351C54.8597 23.1214 55.0568 16.9164 55.4322 10.7053C55.2537 7.92911 56.2322 2.91837 60.0108 4.29724C63.7401 -0.0609969 69.845 -0.233358 75.119 0.44377C80.0545 0.44377 82.0053 5.07286 81.4514 9.40648C80.9775 23.0722 83.0515 36.7194 82.4484 50.3542C81.6792 56.1652 82.0731 63.6752 76.8175 67.4794L76.799 67.461H76.8052Z" fill="#658785"/>
        <path d="M70.1958 275.154C64.2879 277.383 55.1368 279.457 50.8044 273.449C42.7179 256.81 46.1518 230.901 45.2041 212.225C45.321 204.118 47.3335 194.773 55.5614 191.271C58.1338 190.193 60.8661 188.094 63.7647 188.537C72.9281 184.438 75.5805 249.3 75.9559 256.927C75.8267 263.182 76.0852 271.35 70.1773 275.148H70.1958V275.154Z" fill="#658785"/>
        <path d="M145.324 199.113C144.672 209.873 133.262 213.407 124.653 208.821C119.071 204.942 117.797 197.931 116.363 191.726C112.388 177.63 112.616 163.084 114.886 148.741C116.16 144.235 115.717 116.571 121.545 118.879C126.001 113.819 134.881 113.592 140.235 117.347C145.866 123.515 143.441 137.199 144.992 145.417C144.746 163.342 148.691 181.305 145.318 199.113H145.324Z" fill="#F3B95F"/>
        <path d="M54.5026 175.524C48.8716 179.236 39.7882 176.503 36.3358 170.895C31.2772 158.682 32.4402 144.894 32.231 131.917C32.4894 115.198 34.2126 98.5842 35.665 81.933C37.5666 69.4431 33.4372 64.1061 49.4993 67.3809C58.3673 68.4582 57.2842 75.9743 57.4135 82.7825C57.4135 88.6304 57.9365 94.4414 57.9549 100.302C57.4134 118.375 59.8873 136.38 59.4565 154.423C58.7057 161.409 59.8812 170.218 54.478 175.524H54.4964H54.5026Z" fill="#FFD99E"/>
      </svg>

      <div class="content">
        <h1>Vous avez reçu <br> un code par email</h1>
        <form action="" @submit.prevent="submit">
          <Input
              title="Veuillez saisir le code"
              placeholder="0000"
              v-model="formData.code"
              :errors="v$.code.$errors"
              :is-error="v$.code.$error"
          />

          <div class="action end">
            <Button type="submit">Vérifier</Button>
          </div>

        </form>
        <p>Vous n'avez pas reçu de mail ? <a @click.prevent="resendCode" href="">Renvoyer un code</a> </p>
      </div>

    </div>

    <svg xmlns="http://www.w3.org/2000/svg" width="416" height="232" viewBox="0 0 416 232" fill="none">
      <path d="M415.142 231.58H0.980469C11.5408 174.184 41.1172 86.6684 88.0911 104.914C95.1929 108.65 100.935 115.126 106.806 121.337C110.221 97.958 114.547 74.8556 120.96 52.3934C149.915 -31.712 191.332 -3.19876 217.209 65.068C228.145 85.9667 233.253 109.968 236.379 134.504C241.462 160.42 245.918 186.465 249.395 212.805C249.666 214.461 249.943 216.111 250.22 217.767C251.272 213.704 252.244 209.647 253.174 205.597C261.857 169.9 274.319 133.883 298.117 110.473C325.022 82.5318 367.891 99.9647 382.23 138.635C397.646 167.019 407.53 198.788 415.142 231.58Z" fill="#93C0FF"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="362" height="150" viewBox="0 0 362 150" fill="none">
      <path d="M361.691 149.158C361.568 145.803 361.438 142.454 361.34 139.099C361.217 132.833 361.34 126.542 361.488 120.287C361.789 106.96 362.091 93.6086 359.912 80.4231C355.832 50.888 342.742 19.8447 318.668 4.10454C298.926 -5.1598 275.048 5.97592 261.509 22.8426C235.256 52.8455 235.668 60.3677 223.052 97.5974C217.52 67.0959 216.64 63.6795 185.58 52.0575C174.921 48.3456 158.952 53.9473 150.065 60.2939C123.812 78.8164 115.756 87.2805 108.648 118.539C100.088 98.6501 101.288 99.401 85.0968 84.812C65.5761 66.4865 32.7688 72.4575 17.9991 95.7569C8.61414 111.996 3.80782 130.266 0.958496 149.133H361.654L361.679 149.164L361.691 149.158Z" fill="#C4581C"/>
    </svg>

  </div>
</template>

<style scoped lang="scss">
.checkCode {
  height: 100svh;
  @include flex();
  position: relative;

  .container-form {
    position: relative;

    svg {
      position: absolute;
      z-index: 0;
      transform: translate(-50%,-50%);

    }

    .content {
      @include effect(blur);
      @include effect(shadow);
      padding: 3rem 3rem;
      border-radius : 20px;
      text-align: center;

      h1 {
        margin-bottom: 2rem;

      }

    }

  }

  & > svg {
    position: absolute;

    &:nth-child(2) {
      bottom: 0;
      left: 0;

    }

    &:last-child {
      top: 0;
      right: 0;
      transform-origin: top right;
      transform: rotate(-90deg) translate(0,-100%);

    }

  }

}
</style>