import router from "@/router";
import Show from "./index.vue";
import ShowId from "./_showId/index.vue";

export default () => {
  router.addRoute({
    path: "/show",
    component: Show,
    children: [
      {
        path: "",
        redirect: "/"
      },
      {
        path: ":showId",
        component: ShowId
      }
    ]
  });
};
