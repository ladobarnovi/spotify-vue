import router from "@/router";
import Artist from "./index.vue";
import ArtistId from "./_artistId/index.vue";
import ArtistMain from "./_artistId/index/index.vue";
import ArtistDiscography from "./_artistId/discography/index.vue";
import ArtistRelated from "./_artistId/related/index.vue";

export default () => {
  router.addRoute({
    path: "/artist",
    component: Artist,
    children: [
      {
        path: "",
        redirect: "/"
      },
      {
        path: ":artistId",
        component: ArtistId,
        children: [
          {
            path: "",
            component: ArtistMain
          },
          {
            path: "discography",
            component: ArtistDiscography
          },
          {
            path: "related",
            component: ArtistRelated
          }
        ]
      }
    ]
  });
};
