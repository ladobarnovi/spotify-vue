import router from "@/router";
import Search from "./index.vue";
import Index from "./Index/index.vue";

export default () => {
  router.addRoute({
    path: "/search",
    component: Search,
    name: "Search",
    children: [
      {
        path: "",
        component: Index
      }
    ]
  });
};
