<template>
  <div class="playback-bar" onmousedown="return false">
    <p class="current">{{ positionFormatted }}</p>
    <RangeSlider
      :max-value="trackDuration"
      :current-value="trackPosition"
      @click="seeking = true"
      @seeking="seekingAt"
      @submit="setPosition"
    />
    <p class="duration">{{ durationFormatted }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useTimer } from "@/hooks/timer";
import { usePlayer, usePlayerTrackData } from "@/hooks/player";
import RangeSlider from "@/components/Common/RangeSlider.vue";

export default defineComponent({
  components: { RangeSlider },
  setup() {
    const { millisecondToTimer } = useTimer();
    const { seek } = usePlayer();
    const { trackPosition, trackDuration } = usePlayerTrackData();

    const seeking = ref(false);
    const seekPosition = ref<number>();

    const durationFormatted = computed(() =>
      millisecondToTimer(trackDuration.value)
    );
    const positionFormatted = computed(() => {
      if (seeking.value) {
        return millisecondToTimer(seekPosition.value);
      }

      return millisecondToTimer(trackPosition.value);
    });

    function setPosition(x: number) {
      seeking.value = false;
      seek(x);
      trackPosition.value = x;
    }

    function seekingAt(x: number) {
      seekPosition.value = x;
    }

    return {
      durationFormatted,
      positionFormatted,
      seeking,
      trackDuration,
      trackPosition,
      setPosition,
      seekingAt
    };
  }
});
</script>

<style scoped lang="scss">
.playback-bar {
  width: 100%;
  display: flex;
  align-items: center;

  .range-slider {
    flex-grow: 1;
  }

  p {
    min-width: 40px;
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;
    letter-spacing: normal;
    color: rgb(179, 179, 179);
    text-align: center;
    user-select: none;
    pointer-events: none;
  }
}
</style>
