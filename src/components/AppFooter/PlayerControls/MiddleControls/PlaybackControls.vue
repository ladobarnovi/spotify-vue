<template>
  <div class="playback-controls" onmousedown="return false">
    <div
      class="toggle-shuffle"
      @click="toggleShuffle"
      :class="{ active: isShuffle }"
    >
      <svg
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
        ></path>
      </svg>
    </div>
    <div class="prev-track" @click="playPrev" title="Previous">
      <img src="@/assets/icons/prev-track.svg" />
    </div>
    <div class="toggle-play" @click="togglePlay">
      <div v-if="isPlaying" class="pause">
        <svg
          height="32"
          width="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="5" y="3" width="4" height="18" fill="#fff"></rect>
          <rect x="15" y="3" width="4" height="18" fill="#fff"></rect>
        </svg>
      </div>
      <div v-else class="play">
        <svg
          height="28"
          width="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="#fff"
          ></polygon>
        </svg>
      </div>
    </div>
    <div class="next-track" @click="playNext" title="Next">
      <img src="@/assets/icons/next-track.svg" />
    </div>
    <div class="toggle-repeat" :class="{ active: isRepeat > 0 }" @click="toggleRepeat">
      <svg
        v-if="isRepeat === 1 || isRepeat === 0"
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"
        ></path>
      </svg>
      <svg
        v-if="isRepeat === 2"
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5v-.5V4c-2.2.3-4 2.2-4 4.5 0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.7 3.3 5.3 5 5zM10.5 12H6v-1.5l-3.5 2 3.5 2V13h4.5c1.9 0 3.5-1.2 4.2-2.8-.5.3-1 .5-1.5.6-.7.7-1.6 1.2-2.7 1.2zM11.5 0C9 0 7 2 7 4.5S9 9 11.5 9 16 7 16 4.5 14 0 11.5 0zm.9 7h-1.3V3.6H10v-1h.1c.2 0 .3 0 .4-.1.1 0 .3-.1.4-.2.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.1h1.1V7z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePlayer } from "@/hooks/player";

export default defineComponent({
  setup() {
    const {
      togglePlay,
      isPlaying,
      playNext,
      playPrev,
      toggleShuffle,
      toggleRepeat,
      isShuffle,
      isRepeat
    } = usePlayer();

    return {
      togglePlay,
      isPlaying,
      playPrev,
      playNext,
      toggleShuffle,
      toggleRepeat,
      isShuffle,
      isRepeat
    };
  }
});
</script>

<style scoped lang="scss">
.playback-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 224px;

  .toggle-play {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: white;
    position: relative;

    &:active {
      transform: scale(0.95);
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 50%;

      & > * {
        fill: black;
      }
    }
  }

  .prev-track,
  .next-track,
  .toggle-shuffle,
  .toggle-repeat {
    opacity: 0.6;
    width: 32px;
    height: 32px;

    svg,
    img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover,
    &:active {
      opacity: 1;
    }

    &.active {
      opacity: 1;
      position: relative;

      svg {
        & > * {
          fill: #1db954;
        }
      }

      &:after {
        content: "";
        width: 4px;
        height: 4px;
        background-color: #1db954;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
