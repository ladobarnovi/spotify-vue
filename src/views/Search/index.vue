<template>
  <div id="search">
    <RouterView />

    <Teleport to="#header-teleport">
      <div class="search-bar">
        <img src="@/assets/icons/lens.svg" />
        <input
          v-model="keyword"
          placeholder="Artists, songs or podcasts"
          type="text"
        />
      </div>
    </Teleport>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useSearch } from "@/hooks/search";

export default defineComponent({
  setup() {
    const { keyword } = useSearch();

    return {
      keyword
    };
  }
});
</script>

<style scoped lang="scss">
.search-bar {
  width: 364px;
  position: relative;

  input {
    border-radius: 500px;
    color: #000;
    height: 40px;
    padding: 6px 48px;
    text-overflow: ellipsis;
    background-color: white;
    width: 100%;
    font-family: "spotify-circular", arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
  }

  img {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }
}
</style>
