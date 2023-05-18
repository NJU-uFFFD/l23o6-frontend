import {createApp} from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/dist/index.css'
import "~/styles/index.scss";
import "uno.css";
import routes from '~pages'
import App from './App.vue'


const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia =createPinia();
const app = createApp(App)

app.use(pinia);
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)


app.mount('#app')