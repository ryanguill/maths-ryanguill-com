import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import TitleScreen from "./routes/TitleScreen.vue";
import QuestionScreen from "./routes/QuestionScreen.vue";
import OptionsScreen from "./routes/OptionsScreen.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/", component: TitleScreen },
  { path: "/q", component: QuestionScreen },
  { path: "/options", component: OptionsScreen }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");