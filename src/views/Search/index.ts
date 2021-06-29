import router from "@/router";
import Search from "./index.vue";
import Index from "./Index/index.vue";
import Keyword from "./_keyword/index.vue";
import KeywordIndex from "./_keyword/Index/index.vue";
import Category from "./_keyword/_category.vue";

export default () => {
  router.addRoute({
    path: "/search",
    component: Search,
    name: "Search",
    children: [
      {
        path: "",
        component: Index
      },
      {
        path: ":keyword",
        component: Keyword,
        children: [
          {
            path: "",
            component: KeywordIndex
          },
          {
            path: ":category",
            component: Category
          }
        ]
      }
    ]
  });
};
