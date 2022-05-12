import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import header from './components/Header'
import footer from './components/Footer'


/* Vue.component('Header', header)
Vue.component('Footer', footer)
 */



createApp(App).use(store).use(router).mount('#app')
