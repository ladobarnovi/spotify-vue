<template>
  <div id="show-id">
    <TrackListHeader
      :name="show.name"
      :image="show.images[0].url"
      :type="show.type"
      :publisher="show.publisher"
    />

    <main>
      <div class="follow">Follow</div>

      <div class="main-wrapper">
        <div class="episode-list">
          <p class="episode-list-title">All Episodes</p>
          <ShowListItem
            v-for="(episode, index) of episodes"
            :episode="episode"
            :key="index"
          />
        </div>
        <div class="description">
          <p class="description-title">About</p>
          <MoreLessText :text="show.description" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import TrackListHeader from "@/components/TrackList/TrackListHeader/index.vue";
import { API } from "@/api";
import { Podcast, Episode } from "@/models";
import ShowListItem from "@/views/Show/components/ShowListItem.vue";
import MoreLessText from "@/components/Common/MoreLessText.vue";

export default defineComponent({
  components: {
    MoreLessText,
    TrackListHeader,
    ShowListItem
  },
  async setup() {
    const { params } = useRoute();
    const show = ref<Podcast>(null);
    const episodes = ref<Episode[]>(null);

    show.value = await API.shows.index(params.showId as string);
    episodes.value = (await API.shows.episodes(params.showId as string)).items;

    return {
      show,
      episodes,
      showId: params.showId
    };
  }
});
</script>

<style scoped lang="scss">
main {
  padding: 0 32px;
  z-index: 1;
  position: relative;

  .main-wrapper {
    display: flex;
    max-width: 1536px;
  }

  .follow {
    height: 84px;
  }

  .episode-list {
    margin-right: 16px;
    flex-grow: 1;

    .episode-list-title {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 28px;
      padding: 16px 0;
    }
  }

  .description {
    flex-basis: 32%;
    margin-left: 4%;
    flex-shrink: 0;

    .description-title {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 28px;
      padding: 16px 0;
    }

    .description-body {
      color: #b3b3b3;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}
</style>
