import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import VueTheMask from 'vue-the-mask';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App).use(plugin, defaultConfig).use(ToastPlugin).use(VueTheMask).mount('#app')