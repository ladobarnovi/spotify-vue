<template>
  <header id="app-header">
    <div class="bg" :style="{ opacity }"></div>
    <HeaderNavigation />
    <div id="header-teleport"></div>



    <HeaderUserProfile v-if="isAuthorised" :data="me" />
    <HeaderAuthButtons v-else />
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HeaderAuthButtons from "@/components/AppHeader/HeaderAuthButtons.vue";
import HeaderUserProfile from "@/components/AppHeader/HeaderUserProfile.vue";
import HeaderNavigation from "@/components/AppHeader/HeaderNavigation.vue";
import {useMainScroll} from "@/hooks/scrollListener";
import { me, isAuthorised } from "@/hooks/auth";

export default defineComponent({
  name: "AppHeader",
  components: { HeaderAuthButtons, HeaderUserProfile, HeaderNavigation },
  setup() {
    const opacity = ref<number>(0);

    function scrollHandler() {
      const scrollElement = document.querySelector(".os-viewport") as HTMLElement;

      opacity.value = Math.min(1, scrollElement.scrollTop / 340);
    }

    useMainScroll(scrollHandler);

    return {
      opacity,
      me,
      isAuthorised
    };
  }
});
</script>

<style scoped lang="scss">
#app-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 32px;
  z-index: 1;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: rgb(56, 64, 56);

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
  }
}
</style>
