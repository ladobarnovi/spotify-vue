<template>
  <div class="right-controls">
    <div class="volume-control">
      <div
        class="toggle-mute"
        @mouseover="active = true"
        @mouseout="active = false"
        @click="toggleVolume"
      >
        <img v-if="vol > MIN_VOLUME" src="@/assets/icons/volume-on.svg" />
        <img v-else src="@/assets/icons/volume-off.svg" />
      </div>
      <RangeSlider
        :class="{ active }"
        :max-value="MAX_VOLUME"
        :min-value="MIN_VOLUME"
        :value="vol"
        v-model:position="vol"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import RangeSlider from "@/components/Common/RangeSlider.vue";
import {
  usePlayer,
  usePlayerStatus,
  MIN_VOLUME,
  MAX_VOLUME
} from "@/hooks/player";

export default defineComponent({
  components: { RangeSlider },
  setup() {
    const active = ref(false);
    const vol = ref(0);

    const { volume } = usePlayerStatus();
    const { setVolume, toggleVolume } = usePlayer();

    watch(vol, () => {
      setVolume(vol.value);
    });

    watch(
      volume,
      () => {
        if (vol.value !== volume.value) {
          vol.value = volume.value;
        }
      },
      { immediate: true }
    );

    return {
      active,
      toggleVolume,
      setVolume,
      vol,
      MIN_VOLUME,
      MAX_VOLUME
    };
  }
});
</script>

<style scoped lang="scss">
.right-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  min-width: 180px;

  .volume-control {
    display: flex;
    align-items: center;

    .toggle-mute {
      font-size: 0;
      opacity: 0.7;
      margin-right: 8px;

      img {
        width: 16px;
        height: 16px;
      }

      &:hover {
        opacity: 1;
      }
    }

    .range-slider {
      width: 94px;
    }
  }
}
</style>
