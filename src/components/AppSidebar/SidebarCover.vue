<template>
  <div class="sidebar-cover">
    <transition name="slide-up">
      <div v-if="contextUri && isExpanded" class="inner">
        <RouterLink :to="albumUrl" class="img-container">
          <ToggleExpand class="collapse" @click="isExpanded = !isExpanded" />
          <img :src="albumImage" :alt="albumName" />
        </RouterLink>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { usePlayerStatus, usePlayerTrackData } from "@/hooks/player";
import ToggleExpand from "@/components/Common/ToggleExpand.vue";

export default defineComponent({
  components: {ToggleExpand},
  setup() {
    const { isExpanded } = usePlayerStatus();
    const { trackAlbum, contextUri } = usePlayerTrackData();

    const albumId = computed(() => trackAlbum.value.uri.split(":")[2]);
    const albumName = computed(() => trackAlbum.value.name);
    const albumImage = computed(() => trackAlbum.value.images[0].url);
    const albumUrl = computed(() => `/album/${albumId.value}`);

    return {
      albumUrl,
      albumImage,
      albumName,
      contextUri,
      isExpanded
    };
  }
});
</script>

<style scoped lang="scss">
.sidebar-cover {
  width: 100%;

  .inner {
    height: 240px;
    position: relative;
    overflow: hidden;
  }

  .img-container {
    top: 0;
    position: relative;
    display: block;

    .collapse {
      position: absolute;
      top: 4px;
      right: 4px;
      opacity: 0;
      transform: rotate(180deg);
    }

    &:hover {
      .collapse {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.slide-up-enter-from,
.slide-up-leave-to {
  &.inner {
    height: 0;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: height 0.2s ease;
}
</style>
