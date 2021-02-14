import router from "@/router";
import Artist from "./index.vue";
import ArtistId from "./_artistId/index.vue";
import ArtistMain from "./_artistId/index/index.vue";
import ArtistDiscography from "./_artistId/discography/index.vue";
import ArtistRelated from "./_artistId/related/index.vue";

export default () => {
  router.addRoute({
    path: "/artist",
    component: Artist as any,
    children: [
      {
        path: "",
        redirect: "/",
      },
      {
        path: ":artistId",
        component: ArtistId as any,
        children: [
          {
            path: "",
            component: ArtistMain as any
          },
          {
            path: "discography",
            component: ArtistDiscography as any
          },
          {
            path: "related",
            component: ArtistRelated as any
          }
        ]
      }
    ]
  })
}
