<template>
  <div class="sidebar-playlist">
    <RouterLink
      class="ellipsis"
      v-for="(item, index) in playlist"
      :key="index"
      :to="`/playlist/${item.id}`"
    >
      {{ item.name }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { API } from "@/api";
import { Playlist } from "@/models";

export default defineComponent({
  setup() {
    const playlist = ref<Playlist[]>([]);

    onMounted(async () => {
      const { items } = await API.me.playlists();
      playlist.value = items;
    });

    return {
      playlist
    };
  }
});
</script>

<style scoped lang="scss">
.sidebar-playlist {
  padding: 4px 0;
  flex-grow: 1;
  overflow-y: scroll;

  a {
    display: block;
    transition: color 0.3s ease;
    color: #b3b3b3;
    padding: 0 24px;
    line-height: 32px;
    font-size: 14px;

    &:hover {
      color: var(--color-inverted);
    }
  }
}
</style>
