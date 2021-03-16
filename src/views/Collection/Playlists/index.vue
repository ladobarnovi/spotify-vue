<template>
  <div id="collection-playlists">
    <CardsRow title="Playlists" :single-line="false" :data="playlists">
      <RouterLink to="/collection/tracks" class="liked-songs">
        <div class="top">
          <p>
            <span v-for="(track, index) in likedSongs" :key="index">
              <span class="artist">{{ track.artists[0].name }}</span>
              <span class="track">{{ track.name }}</span>
              <i class="dot-separator"></i>
            </span>
          </p>
        </div>
        <div class="bottom">
          <p class="ellipsis">Liked Songs</p>
          <p class="ellipsis">{{ likedSongs.length }} liked songs</p>
        </div>
        <div class="play">
          <img src="@/assets/icons/play.svg" />
        </div>
      </RouterLink>
    </CardsRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CardsRow from "@/components/Cards/CardsRow.vue";
import { Playlist, Track } from "@/models";
import { API } from "@/api";

export default defineComponent({
  components: { CardsRow },
  async setup() {
    const playlists = ref<Playlist[]>();
    const likedSongs = ref<Track[]>();

    likedSongs.value = (await API.me.tracksGet()).items.map(i => i.track);
    playlists.value = (await API.me.playlists()).items;

    console.log(likedSongs.value);

    return {
      playlists,
      likedSongs
    };
  }
});
</script>

<style scoped lang="scss">
.liked-songs {
  grid-column-start: 1;
  grid-column-end: 3;
  background: linear-gradient(149.46deg, #450af5, #8e8ee5 99.16%);
  padding: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  color: white;

  .top {
    flex-grow: 1;
    display: flex;
    align-items: center;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 16px;
      line-height: 24px;

      .artist {
        margin-right: 4px;
      }

      .track {
        opacity: 0.7;
      }

      .dot-separator {
        &:before {
          width: 5px;
          height: 5px;
        }
      }
    }
  }

  .bottom {
    color: white;

    p:first-child {
      font-size: 32px;
      font-weight: 700;
      line-height: 36px;
      letter-spacing: -0.04em;
    }

    p:last-child {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: normal;
      margin-top: 4px;
    }
  }

  .play {
    width: 48px;
    height: 48px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #1db954;
    border-radius: 50%;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    transform: translateY(10%);

    img {
      width: 24px;
      height: 24px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      transform: scale(1.08) !important;
    }
  }

  &:hover {
    .play {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
