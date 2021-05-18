<template>
  <div id="playlist-id">
    <TrackListHeader
      :name="playlist.name"
      :type="playlist.type"
      :description="playlist.description"
      :image="playlist.images[0]?.url"
      :owner="playlist.owner"
      :followers="playlist.followers.total"
      :tracks="playlist.tracks.items.map(i => i.track)"
    />

    <main>
      <ContextTogglePlay
        v-if="playlist.tracks.items.length > 0"
        :context-uri="playlist.uri"
        :context-name="playlist.name"
        :fixed="fixed"
      />

      <div v-if="playlist.tracks.items.length > 0" class="track-list">
        <div class="main-list">
          <TrackListTitles @fixed="fixed = $event" />

          <div class="main-list-body">
            <PlaylistTrackItem
              v-for="(item, index) in playlist.tracks.items"
              :key="index"
              :data="item"
              @play="playPlaylist(playlist.uri, index)"
            />
          </div>
        </div>

        <div v-if="recommended" class="recommended-list-body">
          <div class="recommended-list-title">
            <p>Recommended</p>
            <p>Based on what's in this playlist</p>
          </div>

          <RecommendationTrackItem
            v-for="(track, index) in recommended"
            :key="index"
            :data="{ track }"
          />

          <div class="recommended-list-refresh">
            <span>Refresh</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { API } from "@/api";
import { Playlist, Track } from "@/models";
import TrackListHeader from "@/components/TrackList/TrackListHeader/index.vue";
import PlaylistTrackItem from "@/components/TrackList/TrackItem/PlaylistTrackItem/index.vue";
import RecommendationTrackItem from "@/components/TrackList/TrackItem/RecommendationTrackItem/index.vue";
import TrackListTitles from "@/components/TrackList/TrackListTitles/index.vue";
import { usePlayer } from "@/hooks/player";
import ContextTogglePlay from "@/components/TrackList/ContextTogglePlay.vue";

export default defineComponent({
  components: {
    ContextTogglePlay,
    PlaylistTrackItem,
    TrackListHeader,
    RecommendationTrackItem,
    TrackListTitles
  },
  async setup() {
    const playlist = ref<Playlist>();
    const recommended = ref<Track[]>();
    const fixed = ref(false);
    const { currentRoute } = useRouter();
    const { playPlaylist } = usePlayer();

    const playlistResponse = await API.playlist.get(
      currentRoute.value.params.playlistId as string
    );

    const artists = playlistResponse.tracks.items.map(i =>
      i.track.artists.map(a => a.id).join(",")
    );
    const tracks = playlistResponse.tracks.items.map(i => i.track.id);

    if (artists.length > 0) {
      const recommendedResponse = await API.recommendations.get({
        limit: 10,
        seed_artists: encodeURIComponent(artists[0]),
        seed_genres: "metal",
        seed_tracks: encodeURIComponent(tracks[0])
      });

      recommended.value = recommendedResponse.tracks;
    }

    playlist.value = playlistResponse;

    return {
      playlist,
      recommended,
      fixed,
      playPlaylist
    };
  }
});
</script>

<style scoped lang="scss">
#playlist-id {
  color: white;

  main {
    position: relative;
    z-index: 2;
    padding: 0 32px;

    .track-list {
      .track-list-body {
        padding-bottom: 72px;
      }

      .recommended-list-body {
        margin-top: 48px;

        .recommended-list-title {
          margin-bottom: 24px;

          & > :first-child {
            font-size: 24px;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: -0.04em;
          }

          & > :last-child {
            color: #b3b3b3;
            margin-top: 5px;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
          }
        }

        .recommended-list-refresh {
          padding-top: 24px;
          padding-bottom: 32px;
          text-align: right;

          span {
            font-size: 12px;
            font-weight: 700;
            line-height: 16px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            padding: 8px 34px;

            &:hover {
              transform: scale(1.05);
            }
          }
        }
      }
    }
  }
}
</style>
