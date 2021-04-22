<template>
  <div id="playlist-id">
    <TrackListHeader
      :name="playlist.name"
      :type="playlist.type"
      :description="playlist.description"
      :image="playlist.images[0].url"
      :owner="playlist.owner"
      :followers="playlist.followers.total"
      :tracks="playlist.tracks.items.map(i => i.track)"
    />

    <main>
      <div class="playlist-actions">
        <div class="play">
          <img src="@/assets/icons/play.svg" />
        </div>
      </div>

      <transition name="fade">
        <teleport to="#header-teleport" v-if="fixed">
          <div class="header-actions">
            <div class="play">
              <img src="@/assets/icons/play.svg" />
            </div>
            <span>{{ playlist.name }}</span>
          </div>
        </teleport>
      </transition>

      <div class="track-list">
        <div class="main-list">
          <TrackListTitles @fixed="fixed = $event" />

          <div class="main-list-body">
            <PlaylistTrackItem
              v-for="(item, index) in playlist.tracks.items"
              :key="index"
              :data="item"
            />
          </div>
        </div>

        <div class="recommended-list-body">
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

export default defineComponent({
  components: {
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

    const playlistResponse = await API.playlist.get(
      currentRoute.value.params.playlistId as string
    );

    const artists = playlistResponse.tracks.items.map(i =>
      i.track.artists.map(a => a.id).join(",")
    );
    const tracks = playlistResponse.tracks.items.map(i => i.track.id);

    const recommendedResponse = await API.recommendations.get({
      limit: 10,
      seed_artists: encodeURIComponent(artists[0]),
      seed_genres: "metal",
      seed_tracks: encodeURIComponent(tracks[0])
    });

    recommended.value = recommendedResponse.tracks;
    playlist.value = playlistResponse;

    return {
      playlist,
      recommended,
      fixed
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

    .playlist-actions {
      padding: 24px 0;

      .play {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 32px;
        background-color: var(--green);

        img {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
        }
      }
    }

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

<style lang="scss">
.header-actions {
  display: flex;
  align-items: center;

  .play {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
    background-color: var(--green);
    position: relative;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
    }
  }

  span {
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.04em;
    font-size: 24px;
  }
}
</style>
