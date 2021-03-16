import router from "@/router";
import Collection from "./index.vue";

export default () => {
  router.addRoute({
    path: "/collection",
    component: Collection as any,
    children: [
      {
        path: "",
        component: Collection
      }
    ]
  })
}
