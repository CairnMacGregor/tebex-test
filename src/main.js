import { createApp } from 'vue'
import App from './App.vue'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { plugin, defaultConfig } from '@formkit/vue'
import VueTheMask from 'vue-the-mask';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

app.use(plugin, defaultConfig({
  plugins: [
    createAutoAnimatePlugin(
      {
        duration: 250,
        easing: 'ease-in-out',
        delay: 0,
      },
      {
        global: ['outer', 'inner'],
        form: ['form'],
        repeater: ['items'],
      }
    )
  ]
}))
  .use(ToastPlugin)
  .use(VueTheMask)
  .use(createPinia())
  .use(router);

app.mount('#app')