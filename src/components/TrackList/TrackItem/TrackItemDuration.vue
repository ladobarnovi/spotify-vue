<template>
  <div class="track-duration">
    <div class="like" @click="heartClick">
      <img v-if="isLiked" class="filled" src="@/assets/icons/heart-filled.svg" />
      <img v-else class="hollow" src="@/assets/icons/heart.svg" />
    </div>
    <div class="duration">{{ duration }}</div>
    <div class="ellipsis">
      <img src="@/assets/icons/ellipsis.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Track } from "@/models";
import { useLibrary } from "@/hooks/library";

export default defineComponent({
  props: {
    track: {
      type: Object as () => Track,
      required: true
    }
  },
  setup(props) {
    const { likedSongs, toggleLikeSong } = useLibrary();

    const isLiked = computed<boolean>(() => {
      return likedSongs.value.some(i => i.track.id === props.track.id);
    });

    const duration = (() => {
      const minutes = Math.floor(props.track.duration_ms / 1000 / 60) + "";
      const seconds = (
        Math.floor((props.track.duration_ms / 1000) % 60) + ""
      ).padStart(2, "0");

      return `${minutes}:${seconds}`;
    })();

    function heartClick() {
      toggleLikeSong(props.track.id, isLiked.value);
    }

    return {
      duration,
      isLiked,
      heartClick
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
        &:hover,
        &:active {
          --opacity: 1;
        }

        &.hollow {
          opacity: var(--opacity);
        }
      }
    }

    .ellipsis {
      img {
        opacity: var(--opacity);
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
