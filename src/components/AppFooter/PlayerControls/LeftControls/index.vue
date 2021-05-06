<template>
  <div class="left-controls" :class="{ expanded: isExpanded }">
    <div v-if="contextUri" class="inner">
      <RouterLink :to="contextUrl" class="img-container context-url">
        <ToggleExpand @click="isExpanded = !isExpanded" />
        <img :src="albumImage" :alt="albumName" />
      </RouterLink>
      <div class="info-container">
        <LinkUnderline class="name" :to="albumUrl">
          {{ trackName }}
        </LinkUnderline>
        <p class="artist">
          <LinkUnderline
            v-for="(artist, index) in artists"
            :key="index"
            :to="artist.url"
          >
            {{ artist.name }}
          </LinkUnderline>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { usePlayerStatus, usePlayerTrackData } from "@/hooks/player";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";
import ToggleExpand from "@/components/Common/ToggleExpand.vue";

export default defineComponent({
  components: { ToggleExpand, LinkUnderline },
  setup() {
    const {
      trackAlbum,
      trackName,
      trackArtists,
      contextUri
    } = usePlayerTrackData();
    const { isExpanded } = usePlayerStatus();

    const contextType = computed(() => contextUri.value.split(":")[1]);
    const contextId = computed(() => contextUri.value.split(":")[2]);
    const contextUrl = computed(
      () => `/${contextType.value}/${contextId.value}`
    );

    const albumId = computed(() => trackAlbum.value.uri.split(":")[2]);
    const albumName = computed(() => trackAlbum.value.name);
    const albumImage = computed(() => trackAlbum.value.images[0].url);
    const albumUrl = computed(() => `/album/${albumId.value}`);

    const artists = computed(() =>
      trackArtists.value.map((a: any) => ({
        name: a.name,
        url: `/artist/${a.uri.split(":")[2]}`
      }))
    );

    return {
      trackAlbum,
      albumName,
      albumId,
      contextUrl,
      albumImage,
      contextUri,
      trackName,
      albumUrl,
      artists,
      isExpanded
    };
  }
});
</script>

<style scoped lang="scss">
.left-controls {
  width: 30%;
  min-width: 180px;
  transition: transform 0.3s ease;

  .inner {
    display: flex;
    align-items: center;
  }

  &.expanded {
    transform: translateX(-72px);
  }

  .img-container {
    margin-right: 16px;
    flex-shrink: 0;
    position: relative;

    .toggle-expand {
      position: absolute;
      top: 4px;
      right: 4px;
      opacity: 0;
    }

    &:hover {
      .toggle-expand {
        opacity: 1;
      }
    }

    img {
      width: 56px;
      height: 56px;
    }
  }

  .info-container {
    font-weight: 400;
    line-height: 16px;
    letter-spacing: initial;
    .name {
      font-size: 14px;
    }

    .artist {
      font-size: 11px;

      .link-underline {
        color: rgb(179, 179, 179);

        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>
