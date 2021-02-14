<template>
  <Suspense :key="currentRoute.fullPath">
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loader from "@/components/Common/Loader.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  components: {
    Loader
  },
  setup() {
    const { currentRoute } = useRouter();
    return {
      currentRoute
    };
  }
});
</script>

<style scoped lang="scss"></style>
