<template>
  <div class="header-navigation">
    <button @click="$router.go(-1)">
      <img src="@/assets/icons/chevron-left.svg" alt="Chevron" />
    </button>
    <button @click="$router.go(1)">
      <img src="@/assets/icons/chevron-right.svg" alt="Chevron" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const { currentRoute } = useRouter();

    watch(currentRoute, () => {
      //
    });

    return {};
  }
});
</script>

<style scoped lang="scss">
.header-navigation {
  button {
    all: unset;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.7);
    position: relative;
    margin-right: 16px;
    cursor: pointer;

    img,
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 22px;
      height: 22px;
    }
  }
}
</style>
