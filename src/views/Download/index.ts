import router from "@/router";
import Download from "./index.vue";

export default () => {
  router.addRoute({
    path: "/download",
    component: Download
  });
};
