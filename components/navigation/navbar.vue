<script setup lang="ts">
import Home from "~/components/icones/home.vue";
import Planning from "~/components/icones/planning.vue";
import Listes from "~/components/icones/listes.vue";
import Messagerie from "~/components/icones/messagerie.vue";
import Documentation from "~/components/icones/documentation.vue";
import Support from "~/components/icones/support.vue";
import Arrow from "~/components/icones/arrow.vue";
import Logo from "~/components/icones/logo.vue";
import {useNavBar} from "~/stores/ui/navbar";

const useNavBarStore = useNavBar()

</script>

<template>
  <nav :class="(useNavBarStore.isFullNavBar) ? 'navigation-menu full' : 'navigation-menu'">
    <ul>

      <li class="items logo">
        <logo />
        <span class="f-p-900 fs-m c-primary2">Doriane</span>
      </li>

      <li class="items">
        <NuxtLink to="/">
          <div class="main">
            <Home />
            <span>Dashboard</span>
          </div>

          <span v-show="!useNavBarStore.isFullNavBar" class="toolsTipsWrap">
            <span class="toolsTips">Dashboard</span>
          </span>

          <div class="svg">
            <arrow />
          </div>
        </NuxtLink>
      </li>

      <li class="items">
        <NuxtLink to="/plannings">
          <div class="main">
            <Planning />
            <span>Planning</span>
          </div>

          <span v-show="!useNavBarStore.isFullNavBar" class="toolsTipsWrap">
            <span class="toolsTips">Planning</span>
          </span>

          <div class="svg">
            <arrow />
          </div>
        </NuxtLink>
      </li>

      <li class="items">
        <NuxtLink to="/listes">
          <div class="main">
            <Listes />
            <span>Listes</span>
          </div>

          <span v-show="!useNavBarStore.isFullNavBar" class="toolsTipsWrap">
            <span class="toolsTips">Listes</span>
          </span>

          <div class="svg">
            <arrow />
          </div>
        </NuxtLink>
      </li>

      <li class="items">
        <NuxtLink to="/messagerie">
          <div class="main">
            <Messagerie />
            <span>Messagerie</span>
          </div>

          <span v-show="!useNavBarStore.isFullNavBar" class="toolsTipsWrap">
            <span class="toolsTips">Messagerie</span>
          </span>

          <div class="svg">
            <arrow />
          </div>
        </NuxtLink>
      </li>

      <li class="items title">
        <span>Aides</span>
      </li>

      <li class="items">
        <NuxtLink to="/documentation">
          <div class="main">
            <Documentation />
            <span>Documentation</span>
          </div>

          <span v-show="!useNavBarStore.isFullNavBar" class="toolsTipsWrap">
            <span class="toolsTips">Documentation</span>
          </span>

          <div class="svg">
            <arrow />
          </div>
        </NuxtLink>
      </li>

      <li class="items">
        <NuxtLink to="/support">
          <div class="main">
            <Support />
            <span>Support</span>
          </div>

          <span v-show="!useNavBarStore.isFullNavBar" class="toolsTipsWrap">
            <span class="toolsTips">Support</span>
          </span>

          <div class="svg">
            <arrow />
          </div>
        </NuxtLink>
      </li>

    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navigation-menu {
  padding: 1rem 1.5rem;
  border-right: 1px solid #EAEAEA;
  @include bgColor(primary4);
  height: 100%;
  width: 105px;
  transition: 0.3s ease-in-out width;
  position: fixed;

  .items {
    margin: 0.5rem 0;

    a {
      @include flex(center);
      @include color(light1);
      text-decoration: none;
      padding: 1rem;
      border-radius: 6px;
      transition: 0.3s ease-in-out background;
      position: relative;

      .toolsTipsWrap {
        filter: drop-shadow(0 5px 16px rgba(8, 15, 52, 0.2));
        position: absolute;
        left: 100%;
        width: fit-content;
        height: fit-content;
        display: none;
        @include color(primary4);

        .toolsTips {
          @include bgColor(light1);
          padding: 0.8rem 2rem;
          z-index: 99999999999;
          border-radius: 8px;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%);


          }
      }

      .main {
        @include flex(flex-start);

        span {
          margin-left: 0.5rem;
          font-weight: 400;
          display: none;
          opacity: 0;
          transition: opacity 0.5s linear;

        }

      }

      .svg  {
        width: 23px;
        height: 20px;
        transition: 0.2s ease-in-out transform;
        display: none;
        opacity: 0;

      }

      &:hover {
        @include bgColor(primary1);

        .toolsTipsWrap {
          display: block;

        }

        .svg {
          transform: translateX(50%);

        }

      }

    }

    &.title {
      transform: translateX(-5%);
      margin-top: 2rem;
      @include color(light1);

      span {
        visibility: hidden;
        opacity: 0;

      }

    }

    &.logo {
      margin: .5rem 0 2.5rem;
      @include flex();

      span {
        margin-left: 1rem;
        display: none;

      }

    }

    &:nth-child(2) {
      border-bottom: 1px solid getColor(light1);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;

    }

  }

  &.full {
    width: 260px;

    .items {

      a {
        justify-content: space-between;

        .main {

          span {
            display: block;
            opacity: 1;

          }

        }

        .svg {
          display: block;
          opacity: 1;

        }

      }

      &.title {

        span {
          display: block;
          opacity: 1;

        }

      }

      &.logo {
        justify-content: flex-start;

        span {
          display: block;

        }

      }

    }

  }

}
</style>