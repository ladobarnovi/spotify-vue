import router from "@/router";
import Collection from "./index.vue";
import Playlists from "./Playlists/index.vue";
import Artists from "./Artists/index.vue";
import Podcasts from "./Podcasts/index.vue";
import Albums from "./Albums/index.vue";
import Tracks from "./Tracks/index.vue";

export default () => {
  router.addRoute({
    path: "/collection",
    component: Collection,
    children: [
      {
        path: "",
        redirect: "/collection/playlists"
      },
      {
        path: "playlists",
        component: Playlists
      },
      {
        path: "podcasts",
        component: Podcasts
      },
      {
        path: "artists",
        component: Artists
      },
      {
        path: "albums",
        component: Albums
      },
      {
        path: "tracks",
        component: Tracks
      }
    ]
  });
};
