<template>
  <SuspenseLoader />
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