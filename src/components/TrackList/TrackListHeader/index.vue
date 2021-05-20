<template>
  <header class="track-list-header" :style="style">
    <div class="content">
      <div class="image-container">
        <img v-if="image" :src="image" />
        <img v-else src="@/assets/icons/note.svg" class="blank-image" />
      </div>
      <div class="info">
        <p class="type">{{ type }}</p>
        <p
          class="name"
          :class="{
            small: name.length > 16,
            medium: name.length > 12
          }"
        >
          {{ name }}
        </p>
        <p class="description" v-if="description" v-html="description"></p>

        <div class="group">
          <div v-if="type === 'playlist'" class="owner">
            <img v-if="owner.images?.length > 0" :src="owner.images[0].url" alt="">
            <LinkUnderline to="/">
              {{ owner?.display_name }}
            </LinkUnderline>
          </div>
          <div
            class="artist"
            v-else-if="type === 'album' || type === 'single' || type === 'ep'"
          >
            <template v-if="artists.length === 1">
              <LinkUnderline :to="`/artist/${artists[0].id}`">{{
                artists[0].name
              }}</LinkUnderline>
            </template>
          </div>

          <template v-if="followers">
            <BulletSeparator />
            <p class="likes">{{ followers }} likes</p>
          </template>

          <template v-if="tracks.length > 0">
            <BulletSeparator />
            <p class="songs">{{ duration }}</p>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";
import BulletSeparator from "@/components/Common/BulletSeparator.vue";
import { imageColor } from "@/utils/image";
import { ItemType } from "@/models/Common";
import { PlaylistOwner, Track, Album, Artist } from "@/models";
import { useTrackList } from "@/hooks/trackList";

export default defineComponent({
  components: {
    LinkUnderline,
    BulletSeparator
  },
  props: {
    name: {
      type: String
    },
    description: {
      type: String
    },
    type: {
      type: String as () => ItemType
    },
    image: {
      type: String
    },
    owner: {
      type: Object as () => PlaylistOwner
    },
    tracks: {
      type: Array as () => Track[]
    },
    followers: {
      type: Number
    },
    artists: {
      type: Array as () => Artist[]
    }
  },
  setup(props) {
    const style = ref<any>();
    const { getFullDuration } = useTrackList();

    imageColor(props.image as string).then(rgb => {
      if (rgb) {
        style.value = {
          "background-color": `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          "box-shadow": `0px 13px 120px 120px rgba(${rgb.r}, ${rgb.g}, ${rgb.b},0.5)`
        };
      } else {
        style.value = {
          "background-color": `rgb(83, 83, 83)`,
          "box-shadow": `0px 13px 120px 120px rgba(83, 83, 83, 0.25)`
        };
      }
    });

    const duration = computed<string>(() => {
      if (props.tracks) {
        return getFullDuration(props.tracks);
      } else {
        return "";
      }
    });

    return {
      style,
      duration
    };
  }
});
</script>

<style scoped lang="scss">
header {
  padding: 84px 32px 24px;
  min-height: 340px;
  position: relative;

  &:after {
    content: "";
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    position: relative;
    z-index: 1;

    .image-container {
      width: 232px;
      height: 232px;
      margin-right: 24px;
      flex-shrink: 0;
      box-shadow: 0 4px 60px 0 rgba(0, 0, 0, 0.5);
      background-color: #282828;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;

        &.blank-image {
          opacity: 0.5;
          width: 128px;
          height: 128px;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      flex-grow: 1;

      .type {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 700;
      }

      .name {
        font-size: 96px;
        margin: 8px 0 0;
        font-weight: 900;
        letter-spacing: -0.04em;
        padding: 0.08em 0;

        &.medium {
          padding: 0.08em 0;
          font-size: 72px;
          line-height: 72px;
        }

        &.small {
          font-size: 48px;
          line-height: 48px;
        }
      }

      .description {
        font-weight: 500;
        color: hsla(0, 0%, 100%, 0.7);
        margin-top: 8px;
        line-height: 18px;

        & /deep/ a {
          color: white;
        }
      }

      .group {
        display: flex;
        align-items: center;
        color: hsla(0, 0%, 100%, 0.7);
        margin-top: 8px;
        font-weight: 500;
        line-height: 20px;

        .link {
          color: white;
          font-weight: 700;
        }

        .owner {
          display: flex;
          align-items: center;

          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
