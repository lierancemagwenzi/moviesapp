import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import 'bootstrap'


import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import BootstrapVue3 from 'bootstrap-vue-3'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret)


createApp(App).use(store).use(BootstrapVue3).use(router).mount('#app')
