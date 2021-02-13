<template>
  <RouterLink class="link-underline link" :to="to">
    <slot />
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup() {


    return {};
  }
})
</script>

<style scoped lang="scss">
.link-underline {
  color: white;

  &:hover {
    text-decoration: underline;
  }
}
</style>
