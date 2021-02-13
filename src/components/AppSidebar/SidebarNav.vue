<template>
  <div class="sidebar-nav">
    <ul class='nav-list'>
      <li>
        <RouterLink to='/' exact>
          <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z" fill="currentColor"></path></svg>
          <p>Home</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to='/search'>
          <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor"></path></svg>
          <p>Search</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to='/collections'>
          <svg viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z" fill="currentColor"></path></svg>
          <p>Your Library</p>
        </RouterLink>
      </li>
    </ul>

    <div class="playlist">
      <p class="title">Playlists</p>

      <ul class="actions">
        <li class="create-playlist action">
          <svg class="_28160026e8be14060f22ead8e2af36f5-scss" shape-rendering="crispEdges" viewBox="0 0 36 36"><path d="m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"></path></svg>
          <p>Create Playlist</p>
        </li>
        <RouterLink tag="li" to="/collection/tracks" class="liked-songs action">
          <div class="icon heart">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
          </div>
          <p>Liked Songs</p>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  setup() {


    return {};
  }
})
</script>

<style scoped lang="scss">
.sidebar-nav {
  .nav-list {
    padding: 0 8px;

    a {
      display: flex;
      align-items: center;
      color: var(--color-inverted-70);
      letter-spacing: 0.15px;
      padding: 8px 16px;
      transition: background-color 0.3s ease;
      font-family: "Bold";
      border-radius: 4px;

      &.router-link-exact-active {
        background-color: var(--color-inverted-14);

        svg path {
          fill: var(--color-inverted);
        }

        p {
          color: var(--color-inverted);
        }
      }
    }

    svg {
      width: 24px;
      height: 24px;
      margin-right: 16px;

      path {
        fill: var(--color-inverted-70);
      }
    }
  }

  .playlist {
    padding: 0 22px 0 24px;

    .title {
      text-transform: uppercase;
      font-size: 11px;
      color: #b3b3b3;
      letter-spacing: 0.16em;
      padding: 26px 0 19px;
    }

    .actions {
      margin-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
      padding-bottom: 14px;
      width: 100%;

      .action {
        display: flex;
        cursor: pointer;
        align-items: center;
        color: var(--color-inverted);
        opacity: 0.6;
        transition: opacity .3s ease;

        &:hover {
          opacity: 1;
        }

        p {
          margin-left: 16px;
          font-family: 'Bold';
          font-size: 14px;
          letter-spacing: 0.015em;
        }
      }

      .create-playlist {
        margin-bottom: 10px;

        svg {
          background-color: var(--color-inverted);
          width: 32px;
          height: 32px;
          padding: 4px;
          box-sizing: border-box;

          path {
            fill: #181818;
          }
        }
      }

      .liked-songs {
        .icon {
          background-image: linear-gradient(135deg, #450af5, #c4efd9);
          width: 32px;
          height: 32px;

          svg {
            width: 14px;
            height: 14px;
            fill: white;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
