<template>
  <div class="cards-row" :class="{ singleLine }">
    <header>
      <p class="title">{{ title }}</p>
      <LinkUnderline v-if="hasMore && to && singleLine" :to="to" class="see-all">
        <span>See All</span>
      </LinkUnderline>
    </header>
    <div class="grid-container">
      <slot />
      <ItemCard v-for="(item, index) in items" :key="index" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  computed
} from "vue";
import ItemCard from "./ItemCard.vue";
import { Album, Artist, Track } from "@/models";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";

export default defineComponent({
  components: {
    ItemCard,
    LinkUnderline
  },
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String
    },
    data: {
      type: Array as () => Artist[] | Track[] | Album[],
      required: true
    },
    singleLine: {
      type: Boolean,
      default: true
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

    const items = computed(() => {
      if (props.singleLine) {
        return props.data.slice(0, itemCount.value);
      } else {
        return props.data;
      }
    });
    const hasMore = computed(() => props.data.length > itemCount.value);

    onMounted(() => {
      resizeHandler();
      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    return {
      itemCount,
      items,
      hasMore
    };
  }
});
</script>

<style scoped lang="scss">
.cards-row {
  &.singleLine {
    .grid-container {
      grid-auto-rows: 0 !important;
    }
  }

  .grid-container {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-auto-rows: auto;
    grid-template-rows: 1fr;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 16px;

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.04em;
    }

    .see-all {
      color: #b3b3b3;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
  }
}
</style>
