<template>
  <div class="player-controls">
    <LeftControls />
    <MiddleControls />
    <RightControls />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MiddleControls from "./MiddleControls/index.vue";
import LeftControls from "./LeftControls/index.vue";
import RightControls from "./RightControls/index.vue";

export default defineComponent({
  components: {
    MiddleControls,
    LeftControls,
    RightControls
  },
  setup() {


    return {};
  }
})
</script>

<style scoped lang="scss">
.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
