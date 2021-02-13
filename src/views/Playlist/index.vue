<template>
  <div id="playlist" class="page">
    <Suspense :key="currentRoute.fullPath">
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useRouter} from "vue-router";
import Loader from "@/components/Common/Loader.vue";

export default defineComponent({
  components: {
    Loader
  },
  setup() {
    const { currentRoute } = useRouter()
    return {
      currentRoute
    };
  }
});
</script>
