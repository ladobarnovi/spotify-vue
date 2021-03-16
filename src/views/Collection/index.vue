<template>
  <div id="collection">
    <teleport to="#header-teleport">
      <div class="header-links">
        <RouterLink to="/collection/playlists">Playlists</RouterLink>
        <RouterLink to="/collection/podcasts">Podcasts</RouterLink>
        <RouterLink to="/collection/artists">Artists</RouterLink>
        <RouterLink to="/collection/albums">Albums</RouterLink>
      </div>
    </teleport>

    <Suspense :key="currentRoute.fullPath">
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loader from "@/components/Common/Loader.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Loader },
  setup() {
    const { currentRoute } = useRouter();
    return {
      currentRoute
    };
  }
});
</script>

<style scoped lang="scss">
#collection {
  padding: 76px 32px 32px;
}

.header-links {
  display: flex;
  padding-left: 24px;

  a {
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: normal;
    border-radius: 4px;
    padding: 12px 16px;
    color: white;

    &.router-link-exact-active {
      background-color: #333;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
