<template>
  <div class="toggle-expand" @click="isExpanded = !isExpanded">
    <div class="inner">
      <img src="@/assets/icons/chevron-left.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.toggle-expand {
  .inner {
    width: 24px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;

    img {
      transform: rotate(90deg);
      width: 20px;
      height: 20px;
      opacity: 0.7;
    }
  }

  &:hover {
    .inner {
      transform: scale(1.1);
      background-color: rgba(0, 0, 0, 0.8);

      img {
        opacity: 1;
      }
    }
  }
}
</style>
