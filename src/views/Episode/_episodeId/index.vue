<template>
  <div id="episode-id">
    <TrackListHeader
      :name="episode.name"
      publisher="Host Name Not Available"
      :type="episode.type"
      :image="episode.images[0].url"
    />
    <main>
      <div class="action-bar">
        <div class="date">{{ date }} <span class="dot-separator"></span> {{ duration }} min</div>

        <div class="actions" @click="playPlaylist(episode.uri)">
          <div class="play">
            <img src="@/assets/icons/play.svg" />
          </div>
        </div>
      </div>

      <div class="description">
        <h2 class="description-title">Episode Description</h2>
        <p class="description-body" v-html="episode.description"></p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import TrackListHeader from "@/components/TrackList/TrackListHeader/index.vue";
import { defineComponent, ref } from "vue";
import { Episode } from "@/models";
import { useRoute } from "vue-router";
import { API } from "@/api";
import {usePlayer} from "@/hooks/player";

export default defineComponent({
  components: {
    TrackListHeader
  },
  async setup() {
    const episode = ref<Episode>();
    const date = ref<string>();
    const duration = ref<number>();
    const { params } = useRoute();
    const { playPlaylist } = usePlayer();

    episode.value = await API.episodes.get(params.episodeId as string);

    const currentDate = new Date();
    const releaseDate = new Date(episode.value.release_date);
    const currentYear = currentDate.getFullYear();
    const releaseYear = releaseDate.getFullYear();
    const releaseMonth = releaseDate.toLocaleString("default", {
      month: "short"
    });

    if (currentYear > releaseYear) {
      date.value = `${releaseDate} ${releaseMonth}`;
    } else {
      date.value = `${releaseMonth} ${releaseDate.getDate()}`;
    }

    duration.value = Math.floor(episode.value.duration_ms / 1000 / 60);

    return {
      episode,
      date,
      duration,
      playPlaylist
    };
  }
});
</script>

<style scoped lang="scss">
#episode-id {
  .track-list-header {
    --image-size: 200px;
    --image-border-radius: 8px;
  }

  main {
    padding: 0 32px;
    position: relative;
    z-index: 1;

    .action-bar {
      padding: 24px 0;

      .date {
        color: #b3b3b3;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: normal;
        line-height: 16px;
      }

      .actions {
        margin-top: 16px;

        .play {
          width: 56px;
          height: 56px;
          background-color: #1db954;
          border-radius: 50%;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.06);
          }

          img {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    .description {
      .description-title {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 28px;
        padding: 16px 0;
      }

      .description-body {
        max-width: 672px;
        margin-top: 16px;
        color: #b3b3b3;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: normal;
        line-height: 24px;
      }
    }
  }
}
</style>
