import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import CustomHeader from "./components/CustomHeader.vue";
import PostCard from "./components/PostCard.vue";
import PostList from "./components/PostList.vue";
import store from "./store";
import axios from "axios";
import VueTailwind from "vue-tailwind";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});
Vue.component("custom-header", CustomHeader);
Vue.component("post-card", PostCard);
Vue.component("post-list", PostList);
Vue.use(VueTailwind);

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
  store,
});
