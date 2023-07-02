import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPhone,
  faBars,
  faEye,
  faUser,
  faLightbulb,
  faGlasses,
  faCheck,
  faPerson,
  faHeadset,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faPhone,
  faBars,
  faEye,
  faUser,
  faLightbulb,
  faGlasses,
  faCheck,
  faPerson,
  faHeadset,
  faEdit
);
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
// createApp(App).use(store).use(router).mount("#app");
