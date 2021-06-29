<template>
  <div id="show">
    <Suspense>
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
  components: {Loader},
  setup() {
    const { currentRoute } = useRouter();
    return {
      currentRoute
    };
  }
});
</script>

<style scoped lang="scss"></style>
