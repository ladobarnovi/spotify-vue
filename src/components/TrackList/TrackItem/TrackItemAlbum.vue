<template>
  <div class="track-album">
    <LinkUnderline :to="`/album/${album.id}`">{{ album.name }}</LinkUnderline>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";
import { Album } from "@/models";

export default defineComponent({
  components: {
    LinkUnderline
  },
  props: {
    album: {
      type: Object as () => Album,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss">
.track-item {
  .track-album {
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      color: #b3b3b3;
      white-space: nowrap;
      line-height: 1.2;
    }
  }

  &:hover {
    .track-album {
      a {
        color: white;
      }
    }
  }
}
</style>
