<template>
  <div class="track-list-header" ref="el" :class="{ fixed }">
    <p class="sharp">#</p>
    <p class="name">Title</p>
    <p class="album-title">Album</p>
    <p class="date">Date Added</p>
    <img class="clock" src="@/assets/icons/clock.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useMainScroll } from "@/hooks/scrollListener";

export default defineComponent({
  setup(_, { emit }) {
    const el = ref<HTMLDivElement>();
    const fixed = ref<boolean>(false);

    function scrollHandler() {
      const yDist = el.value?.getBoundingClientRect().y as number;
      fixed.value = yDist <= 60;
    }

    useMainScroll(scrollHandler);

    watch(fixed, () => emit("fixed", fixed.value));

    return {
      el,
      fixed
    };
  }
});
</script>

<style scoped lang="scss">
.track-list-header {
  position: sticky;
  top: 60px;
  display: grid;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(
      120px,
      1fr
    );
  grid-column-gap: 16px;
  padding: 0 16px;
  margin-bottom: 16px;
  color: #b3b3b3;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  z-index: 2;

  &.fixed {
    background-color: #181818;
    padding: 0 48px;
    margin-left: -32px;
    margin-right: -32px;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    &.sharp {
      text-align: right;
      font-size: 14px;
    }
  }

  .clock {
    align-self: center;
    justify-self: flex-end;
    margin-right: 32px;
  }

  &.album {
    grid-template-columns: [index] 16px [first] 4fr [last] minmax(120px, 1fr);

    .album-title,
    .date {
      display: none;
    }
  }
}
</style>
