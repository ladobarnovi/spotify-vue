<template>
  <div class="item-card" @click="redirect">
    <div class="image-container">
      <img :src="data.images[0].url" />
    </div>

    <div class="titles">
      <p class="name ellipsis">{{ data.name }}</p>

      <div class="additional">
        <span v-if="data.type === 'album'">
          {{ releaseDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Album, Artist, ItemType, Track } from "@/models";
import moment from "moment";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    data: {
      type: Object as () => Album | Artist | Track,
      required: true
    }
  },

  setup(props) {
    const { push } = useRouter();
    const releaseDate = computed(() => {
      return moment((props.data as Album).release_date).format("YYYY");
    });

    function redirect() {
      console.log("redirect", props.data.type);
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

  .image-container {
    width: 100%;
    padding-bottom: 100%;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    margin-bottom: 16px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
}
</style>
