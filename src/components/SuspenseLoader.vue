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
import Loader from "@/components/Common/Loader.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Loader },
  setup() {
    const { currentRoute } = useRouter();
    return {
      currentRoute
    };
  }
});
</script>
