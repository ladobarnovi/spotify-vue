import router from "@/router";
import Episode from "./index.vue";
import EpisodeId from "./_episodeId/index.vue";

export default () => {
  router.addRoute({
    path: "/episode",
    component: Episode,
    children: [
      {
        path: "",
        redirect: "/"
      },
      {
        path: ":episodeId",
        component: EpisodeId
      }
    ]
  });
};
