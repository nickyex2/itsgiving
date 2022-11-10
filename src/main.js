import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";
import "aos/dist/aos.css";
import "add-to-calendar-button/assets/css/atcb.css";

//THIS PAGE IS FOR MOUNTING ONLY - DO NOT ADD ANYTHING HERE
createApp(App).use(store).use(router).mount("#app");
