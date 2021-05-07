import router from "@/router";
import Playlist from "./index.vue";
import PlaylistId from "./_playlistId/index.vue";

export default () => {
  router.addRoute({
    path: "/playlist",
    component: Playlist,
    children: [
      {
        path: "",
        redirect: "/"
      },
      {
        path: ":playlistId",
        component: PlaylistId
      }
    ]
  });
}
