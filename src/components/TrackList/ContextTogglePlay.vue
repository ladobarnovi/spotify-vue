<template>
  <div class="context-toggle-play">
    <div class="playlist-actions">
      <div class="toggle-play" @click="toggleContextPlay">
        <img v-if="isContextPlaying" src="@/assets/icons/pause.svg" />
        <img v-else src="@/assets/icons/play.svg" />
      </div>
    </div>

    <transition name="fade">
      <teleport to="#header-teleport" v-if="fixed">
        <div class="header-actions">
          <div class="toggle-play" @click="toggleContextPlay">
            <img v-if="isContextPlaying" src="@/assets/icons/pause.svg" />
            <img v-else src="@/assets/icons/play.svg" />
          </div>
          <span>{{ contextName }}</span>
        </div>
      </teleport>
    </transition>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {usePlayer, usePlayerStatus, usePlayerTrackData} from "@/hooks/player";

export default defineComponent({
  props: {
    contextUri: {
      type: String,
      required: true
    },
    contextName: {
      type: String,
      required: true
    },
    fixed: {
      type: Boolean
    }
  },

  setup(props) {
    const { togglePlay, playPlaylist } = usePlayer();
    const { contextUri: activeContext } = usePlayerTrackData();
    const { isPlaying } = usePlayerStatus();

    const isCurrentContext = computed(
      () => props.contextUri === activeContext.value
    );

    const isContextPlaying = computed(
      () => props.contextUri === activeContext.value && isPlaying.value
    );

    function toggleContextPlay() {
      if (isCurrentContext.value) {
        togglePlay();
      } else {
        playPlaylist(props.contextUri);
      }
    }

    return {
      toggleContextPlay,
      isContextPlaying
    };
  }
})
</script>

<style scoped lang="scss">
.context-toggle-play {
  .playlist-actions {
    padding: 24px 0;

    .toggle-play {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin-right: 32px;
      background-color: var(--green);

      img {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
      }
    }
  }
}
</style>


<style lang="scss">
.header-actions {
  display: flex;
  align-items: center;

  .toggle-play {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
    background-color: var(--green);
    position: relative;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
    }
  }

  span {
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.04em;
    font-size: 24px;
  }
}
</style>
