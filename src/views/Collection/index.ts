import router from "@/router";
import Collection from "./index.vue";
import Playlists from "./Playlists/index.vue";
import Artists from "./Artists/index.vue";
import Podcasts from "./Podcasts/index.vue";
import Albums from "./Albums/index.vue";

export default () => {
  router.addRoute({
    path: "/collection",
    component: Collection as any,
    children: [
      {
        path: "",
        redirect: "/collection/playlists"
      },
      {
        path: "playlists",
        component: Playlists as any
      },
      {
        path: "podcasts",
        component: Podcasts as any
      },
      {
        path: "artists",
        component: Artists as any
      },
      {
        path: "albums",
        component: Albums as any
      }
    ]
  });
};
