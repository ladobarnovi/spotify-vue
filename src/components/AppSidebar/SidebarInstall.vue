<template>
  <RouterLink to="/download" class="sidebar-install">
    <img src="@/assets/icons/download.svg" />
    <span>Install App</span>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.sidebar-install {
  margin: 0 8px;
  padding: 0 16px;
  background-color: transparent;
  border-radius: 4px;
  opacity: 0.7;
  color: white;
  transition: opacity 0.3s ease;
  height: 40px;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }

  span {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: initial;
  }

  &:hover {
    opacity: 1;
  }

  &.router-link-active {
    background-color: #282828;
    opacity: 1;
  }
}
</style>
