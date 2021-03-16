<template>
  <div class="track-title">
    <img v-if="image" class="album-image" :src="image" />

    <div class="titles">
      <div class="name">{{ name }}</div>
      <div class="artist" v-if="artists">
        <div v-if="explicit" class="explicit">E</div>
        <LinkUnderline
          v-for="(artist, index) in artists"
          :key="index"
          :to="`/artist/${artist.id}`"
          >{{ artist.name }}</LinkUnderline
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Artist, Track } from "@/models";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";

export default defineComponent({
  components: {
    LinkUnderline
  },
  props: {
    image: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    artists: {
      type: Array as () => Artist[]
    },
    explicit: {
      type: Boolean
    }
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
      display: flex;
      flex-direction: column;
      justify-content: center;

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
        display: flex;
        align-items: center;

        .explicit {
          width: 16px;
          height: 16px;
          background-color: hsla(0, 0%, 100%, 0.6);
          color: #121212;
          border-radius: 2px;
          text-align: center;
          line-height: 16px;
          font-size: 9px;
          margin-right: 8px;
        }

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
