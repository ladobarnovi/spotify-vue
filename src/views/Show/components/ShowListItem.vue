<template>
  <RouterLink tag="div" class="show-list-item" :to="`/episode/${episode.id}`">
    <div class="wrapper">
      <img :src="episode.images[1].url" :alt="episode.name" />
      <div class="info-wrapper">
        <LinkUnderline class="name" :to="`/episode/${episode.id}`">{{
          episode.name
        }}</LinkUnderline>
        <p class="description">{{ episode.description }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Episode } from "@/models";
import LinkUnderline from "@/components/Common/LinkUnderline.vue";

export default defineComponent({
  components: { LinkUnderline },
  props: {
    episode: {
      type: Object as () => Episode,
      required: true
    }
  },
  setup() {
    return {
      //
    };
  }
});
</script>

<style scoped lang="scss">
.show-list-item {
  border-radius: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;

  .wrapper {
    padding: 16px;
    margin: 0 -16px;
    display: flex;
    border-radius: 4px;

    img {
      width: 112px;
      height: 112px;
      object-fit: cover;
      object-position: center;
      border-radius: 8px;
      margin-right: 24px;
      flex-shrink: 0;
    }

    .info-wrapper {
      flex-grow: 1;

      .name {
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        letter-spacing: normal;
      }

      .description {
        margin: 8px 0 16px;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        color: #b3b3b3;
      }
    }
  }

  &:hover {
    border-top-color: transparent;

    .wrapper {
      background-color: hsla(0, 0%, 100%, 0.1);
    }
  }
}
</style>
