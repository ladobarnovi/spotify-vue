<template>
  <div class="playback-bar" onmousedown="return false">
    <p class="current">{{ position }}</p>
    <div class="progress-bar" ref="progressBar" :class="{ active: mouseDown }">
      <div class="track"></div>
      <div class="fill" :style="{ width: fillWidth }"></div>
    </div>
    <p class="duration">{{ duration }}</p>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";
import { useTimer } from "@/hooks/timer";
import { usePlayer } from "@/hooks/player";

export default defineComponent({
  setup() {
    const { millisecondToTimer } = useTimer();
    const { trackPosition, trackDuration, seek } = usePlayer();

    const mouseDown = ref(false);
    const progressBar = ref<HTMLDivElement>();
    const selectedPosition = ref<number>();

    const duration = computed(() => millisecondToTimer(trackDuration.value));
    const position = computed(() => {
      if (mouseDown.value) {
        return millisecondToTimer(selectedPosition.value);
      }

      return millisecondToTimer(trackPosition.value);
    });
    const fillWidth = computed(() => {
      if (mouseDown.value) {
        return (selectedPosition.value / trackDuration.value) * 100 + "%";
      }

      return (trackPosition.value / trackDuration.value) * 100 + "%";
    });

    function setPosition(x: number) {
      const position =
        ((x - progressBar.value.offsetLeft) / progressBar.value.clientWidth) *
        trackDuration.value;

      if (position < 0) {
        selectedPosition.value = 0;
      } else if (position > trackDuration.value) {
        selectedPosition.value = trackDuration.value;
      } else {
        selectedPosition.value = position;
      }
    }

    function mouseDownHandler(e: MouseEvent) {
      if (!e.composedPath().includes(progressBar.value)) return;

      mouseDown.value = true;
      setPosition(e.clientX);
    }

    function mouseMoveHandler(e: MouseEvent) {
      if (!mouseDown.value) return;
      setPosition(e.clientX);
    }

    function mouseUpHandler() {
      mouseDown.value = false;
      if (selectedPosition.value) {
        trackPosition.value = selectedPosition.value;
        seek(selectedPosition.value);
        selectedPosition.value = null;
      }
    }

    onMounted(() => {
      window.addEventListener("mousedown", mouseDownHandler);
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    });

    return {
      duration,
      position,
      fillWidth,
      progressBar,
      mouseDown
    };
  }
});
</script>

<style scoped lang="scss">
.playback-bar {
  display: flex;
  align-items: center;

  .progress-bar {
    flex-grow: 1;
    padding: 2px 0;
    position: relative;

    .track {
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: #535353;
      pointer-events: none;
    }

    .fill {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 4px;
      border-radius: 2px;
      background-color: #b3b3b3;
      pointer-events: none;

      &:after {
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translate(-50%, -50%);
        display: none;
      }
    }

    &:hover,
    &.active {
      .fill {
        background-color: #1db954;

        &:after {
          display: block;
        }
      }
    }
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
