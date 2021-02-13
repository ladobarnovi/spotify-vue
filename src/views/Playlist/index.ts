import router from "@/router";
import Playlist from "./index.vue";
import PlaylistId from "./_playlistId/index.vue";

export default () => {
  router.addRoute({
    path: "/playlist",
    component: Playlist as any,
    children: [
      {
        path: "",
        redirect: "/",
      },
      {
        path: ":playlistId",
        component: PlaylistId as any
      }
    ]
  });

  router.addRoute({
    path: "/artist",
    component: Playlist as any,
    children: [
      {
        path: "",
        redirect: "/",
      },
      {
        path: ":id",
        redirect: "/"
      }
    ]
  });
}