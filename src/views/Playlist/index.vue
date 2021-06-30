<template>
  <div id="playlist" class="page">
    <SuspenseLoader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SuspenseLoader from "@/components/SuspenseLoader.vue";

export default defineComponent({
  components: {
    SuspenseLoader
  }
});
</script>
