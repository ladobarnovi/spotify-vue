<template>
  <div class="track-status">
    <div class="track-index"></div>
    <div class="play">
      <img src="@/assets/icons/play.svg" alt="Play" />
    </div>
    <div class="pause">
      <img src="@/assets/icons/pause.svg" alt="Pause" />
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

<style lang="scss">
.track-item {
  counter-increment: itemIndex;

  .track-status {
    position: relative;

    .track-index {
      color: #b3b3b3;
      font-variant: tabular-nums;
      font-size: 16px;
      font-weight: 400;
      top: -7px;
      right: 3px;
      position: absolute;

      &:after {
        content: counter(itemIndex);
      }
    }

    .play,
    .pause {
      display: none;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);

    .track-status {
      .play {
        display: block;
      }

      .track-index {
        display: none;
      }
    }
  }

  &.active {
    background-color: hsla(0, 0%, 100%, 0.3);
  }

  &.playing {
    background-color: hsla(0, 0%, 100%, 0.1);

    .play,
    .track-index {
      display: none !important;
    }

    .pause {
      display: block;
    }
  }
}
</style>
