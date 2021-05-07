import router from "@/router";
import Album from "@/views/Album/index.vue";
import AlbumId from "@/views/Album/_albumId/index.vue";

export default () => {
  router.addRoute({
    path: "/album",
    component: Album,
    children: [
      {
        path: "",
        redirect: "/"
      },
      {
        path: ":albumId",
        component: AlbumId
      }
    ]
  });
}
