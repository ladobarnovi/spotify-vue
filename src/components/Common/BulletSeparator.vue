<template>
  <span class="bullet-separator"></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
})
</script>

<style scoped lang="scss">
span {
  &:after {
    content: "•";
    margin: 0 4px;
  }
}
</style>
