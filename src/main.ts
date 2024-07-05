import {createApp} from 'vue'
import {createPinia, Pinia} from "pinia";
import './style.css'
import App from './App.vue'

// @ts-ignore
const app: App = createApp(App);
const pinia: Pinia = createPinia();

app.use(pinia);

app.mount('#app')
