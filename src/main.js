import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";

// 导入组件
import DiscoveryPage from "./components/DiscoveryPage.vue";
import PostDetailPage from "./components/PostDetailPage.vue";

// 定义路由
const routes = [
  { path: "/", component: DiscoveryPage },
  {
    path: "/discover",
    component: DiscoveryPage,
  },
  {
    path: "/detail/:postId",
    name: "PostDetail",
    component: PostDetailPage,
    props: true,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 创建Vue实例
const app = createApp(App);

// 使用路由
app.use(router);

// 挂载应用
app.mount("#app");
