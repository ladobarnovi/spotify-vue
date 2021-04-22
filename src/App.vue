<template>
  <div id="app">
    <AppSidebar />
    <div class="router-container">
      <AppHeader />
      <div class="scroll" id="scroll">
        <div class="router-wrapper">
          <Suspense>
            <template #default>
              <RouterView />
            </template>
            <template #fallback>
              <Loader />
            </template>
          </Suspense>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import AppSidebar from "@/components/AppSidebar/index.vue";
import AppHeader from "@/components/AppHeader/index.vue";
import AppFooter from "@/components/AppFooter/index.vue";
import OverlayScrollbars from "overlayscrollbars";
import { mainScroll } from "@/hooks/scrollListener";
import Loader from "@/components/Common/Loader.vue";
import {API} from "@/api";

export default defineComponent({
  name: "App",
  components: {
    Loader,
    AppHeader,
    AppSidebar,
    AppFooter
  },
  setup() {
    onMounted(() => {
      mainScroll.value = OverlayScrollbars(
        document.getElementById("scroll") as HTMLElement,
        {
          resize: "both"
        }
      );

      API.player.recentlyPlayed();
    });

    return {};
  }
});
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  min-width: 768px;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  .router-container {
    width: calc(100% - 232px);
    height: calc(100% - 90px);
    position: relative;

    #scroll {
      height: 100%;
      position: relative;

      .os-scrollbar-corner {
        display: none;
        visibility: hidden;
      }

      .os-scrollbar-vertical {
        bottom: 0;

        .os-scrollbar-handle {
          width: 12px;
          background-color: hsla(0, 0%, 100%, 0.3);
          right: 0;
          border-radius: 0;
        }
      }
    }
  }

  .content {
    flex-grow: 1;
    height: 100%;
  }
}

@import "./assets/scss/root";
@import "./assets/scss/classes/classes";
@import "./assets/scss/fonts/fonts";
@import "./assets/scss/global/global";

@import "../node_modules/overlayscrollbars/css/OverlayScrollbars.css";
</style>
