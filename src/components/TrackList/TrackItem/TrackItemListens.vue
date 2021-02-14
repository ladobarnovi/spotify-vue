<template>
  <div class="track-listens">
    <p>{{ listens }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const listens = Math.floor(Math.random() * 100000 + 20000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;


    return {
      listens
    };
  }
});
</script>

<style scoped lang="scss">
.track-listens {
  p {
    width: 11ch;
    text-align: right;
  }
}
</style>
