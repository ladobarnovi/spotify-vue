<template>
  <div class="range-slider" :class="{ active: mouseDown }" onmousedown="return false">
    <div
      class="slider-wrapper"
      ref="progressBar"
    >
      <div class="track"></div>
      <div class="fill" :style="{ width: fillWidth }"></div>
    </div>
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

export default defineComponent({
  props: {
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const mouseDown = ref(false);
    const progressBar = ref<HTMLDivElement>();
    const position = ref<number>();

    const fillWidth = computed(() => {
      if (mouseDown.value) {
        return (position.value / props.maxValue) * 100 + "%";
      }

      return (props.value / props.maxValue) * 100 + "%";
    });

    function setPosition(x: number) {
      const p =
        ((x - progressBar.value.offsetLeft) / progressBar.value.clientWidth) *
        props.maxValue;

      if (p < props.minValue) {
        position.value = props.minValue;
      } else if (p > props.maxValue) {
        position.value = props.maxValue;
      } else {
        position.value = p;
      }

      emit("seeking", position.value);
      emit("update:position", position.value);
    }

    function mouseDownHandler(e: MouseEvent) {
      if (!e.composedPath().includes(progressBar.value)) return;
      emit("slideStart");

      mouseDown.value = true;
      setPosition(e.clientX);
    }

    function mouseUpHandler() {
      mouseDown.value = false;

      if (position.value) {
        emit("slideEnd", position.value);
        position.value = null;
      }
    }

    function mouseMoveHandler(e: MouseEvent) {
      if (!mouseDown.value) return;
      emit("slideMove");
      setPosition(e.clientX);
    }

    onMounted(() => {
      window.addEventListener("mousedown", mouseDownHandler);
      window.addEventListener("mouseup", mouseUpHandler);
      window.addEventListener("mousemove", mouseMoveHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    });

    return {
      mouseDown,
      progressBar,
      fillWidth
    };
  }
});
</script>

<style scoped lang="scss">
.range-slider {
  .slider-wrapper {
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
  }

  &:hover,
  &.active {
    .slider-wrapper {
      .fill {
        background-color: #1db954;

        &:after {
          display: block;
        }
      }
    }
  }
}
</style>
