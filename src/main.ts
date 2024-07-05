import { createApp } from 'vue'
import {createPinia, Pinia} from "pinia";
import './style.css'
import App from './App.vue'

const app: App<Element> = createApp(App);
const pinia: Pinia = createPinia();

app.use(pinia);

app.mount('#app')
