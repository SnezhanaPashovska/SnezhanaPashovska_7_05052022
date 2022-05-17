import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import signupPage from './js/signupPage'
import ProfilePage from './components/ProfilePage'
import Header from './components/Header'
import NewsFeed from './components/NewsFeed'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();


const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);




createApp(App).use(store).use(router).mount('#app')
