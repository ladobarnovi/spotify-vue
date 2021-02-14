<template>
  <div class="cards-row">
    <ItemCard
      v-for="(item, index) in items"
      :key="index"
      :data="item"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, ref, computed} from "vue";
import ItemCard from "./ItemCard.vue";
import { Album, Artist, Track } from "@/models";

export default defineComponent({
  components: {
    ItemCard
  },
  props: {
    data: {
      type: Array as () => Artist[] | Track[] | Album[],
      required: true
    }
  },
  setup(props) {
    const itemCount = ref(0);

    function resizeHandler() {
      if (window.innerWidth > 1900) {
        itemCount.value = 8;
      } else if (window.innerWidth > 1700) {
        itemCount.value = 7;
      } else if (window.innerWidth > 1500) {
        itemCount.value = 6;
      } else if (window.innerWidth > 1300) {
        itemCount.value = 5;
      } else if (window.innerWidth > 1100) {
        itemCount.value = 4;
      } else if (window.innerWidth > 850) {
        itemCount.value = 3;
      } else {
        itemCount.value = 2;
      }
    }

    const items = computed(() => props.data.slice(0, itemCount.value));

    onMounted(() => {
      resizeHandler();
      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    return {
      itemCount,
      items
    };
  }
});
</script>

<style scoped lang="scss">
.cards-row {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
  grid-auto-rows: 0;
  grid-template-rows: 1fr;
}
</style>
