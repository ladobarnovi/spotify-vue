<template>
  <div class="track-title">
    <img
      v-if="track.album"
      class="album-image"
      :src="track.album.images[2].url"
    />

    <div class="titles">
      <div class="name">{{ track.name }}</div>
      <div class="artist">
        <LinkUnderline
          v-for="(artist, index) in track.artists"
          :key="index"
          :to="`/artist/${artist.id}`"
        >{{ artist.name }}</LinkUnderline>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Track } from "@/models";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";

export default defineComponent({
  components: {
    LinkUnderline
  },
  props: {
    track: {
      type: Object as () => Track
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.track-item {
  .track-title {
    display: flex;
    overflow: hidden;

    .album-image {
      width: 40px;
      height: 40px;
      margin-right: 16px;
    }

    .titles {
      overflow: hidden;
      text-overflow: ellipsis;

      .name {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: normal;
        color: white;
      }

      .artist {
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;

        .link {
          color: #b3b3b3;
          letter-spacing: normal;

          &:not(:last-child) {
            &:after {
              content: ",";
              margin-right: 3px;
            }
          }
        }
      }

      div {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  &:hover {
    .track-title {
      .titles {
        .link {
          color: white;
        }
      }
    }
  }
}
</style>
