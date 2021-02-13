<template>
  <div class="track-duration">
    <div class="like">
      <img src="@/assets/icons/heart.svg" />
    </div>
    <div class="duration">{{ minutes }}:{{ seconds }}</div>
    <div class="ellipsis">
      <img src="@/assets/icons/ellipsis.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Track } from "@/models";

export default defineComponent({
  props: {
    track: {
      type: Object as () => Track,
      required: true
    }
  },
  setup(props) {
    const minutes = (
      Math.floor(props.track.duration_ms / 1000 / 60) + ""
    )
    const seconds = (
      Math.floor((props.track.duration_ms / 1000) % 60) + ""
    ).padStart(2, "0");

    return {
      minutes,
      seconds
    };
  }
});
</script>

<style scoped lang="scss">
.track-item {
  .track-duration {
    --opacity: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .duration {
      font-variant-numeric: tabular-nums;
      margin-right: 16px;
      margin-left: 16px;
    }

    .like,
    .ellipsis {
      img {
        opacity: var(--opacity);

        &:hover,
        &:active {
          --opacity: 1;
        }
      }
    }
  }

  &:hover {
    .track-duration {
      --opacity: 0.6;
    }
  }
}
</style>
