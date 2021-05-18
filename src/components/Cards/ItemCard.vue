<template>
  <div class="item-card" :class="data.type" @click="redirect">
    <div class="image-container">
      <img v-if="data.images.length > 0" :src="data.images[0].url" />
      <img v-else class="blank-image" src="@/assets/icons/note.svg" />
    </div>

    <div class="titles">
      <p class="name ellipsis">{{ data.name }}</p>

      <div class="additional">
        <span v-if="data.type === 'album'">
          {{ releaseDate }}<i class="dot-separator"></i
          ><span class="cap">{{ data.album_type }}</span>
        </span>
        <span v-else-if="data.type === 'artist'">
          <span class="cap">{{ data.type }}</span>
        </span>
        <span v-else-if="data.type === 'playlist'">
          <span v-if="data.description" v-html="data.description"></span>
          <span v-else>By {{ data.owner.display_name }}</span>
        </span>
        <span v-else-if="data.type === 'show'">
          <span>{{ data.publisher }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Album, Artist, ItemType, Track, Playlist, Podcast } from "@/models";
import moment from "moment";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    data: {
      type: Object as () => Album | Artist | Track | Playlist | Podcast,
      required: true
    }
  },

  setup(props) {
    const { push } = useRouter();
    const releaseDate = computed(() => {
      return moment((props.data as Album).release_date).format("YYYY");
    });

    console.log(props.data)

    function redirect() {
      switch (props.data.type as ItemType) {
        case "album":
          push(`/album/${props.data.id}`);
          break;
        case "artist":
          push(`/artist/${props.data.id}`);
          break;
        case "playlist":
          push(`/playlist/${props.data.id}`);
          break;
        default:
          break;
      }
    }

    return {
      releaseDate,
      redirect
    };
  }
});
</script>

<style scoped lang="scss">
.item-card {
  position: relative;
  padding: 16px;
  background: #181818;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #282828;
  }

  &.artist {
    .image-container {
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .image-container {
    width: 100%;
    background-color: #333;
    padding-bottom: 100%;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    margin-bottom: 16px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.5);

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;

      &.blank-image {
        opacity: 0.6;
      }
    }
  }

  .titles {
    min-height: 62px;

    .name {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: normal;
    }

    .additional {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-top: 4px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #b3b3b3;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: normal;
    }
  }

  .cap {
    text-transform: capitalize;
  }
}
</style>
