<template>
  <div id="app-footer">
    <PlayerControls />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PlayerControls from "./PlayerControls/index.vue";

export default defineComponent({
  components: {
    PlayerControls
  },
  setup() {
    return {};
  }
})
</script>

<style scoped lang="scss">
#app-footer {
  height: 90px;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
}
</style>
