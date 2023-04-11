import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Vue(),
        Pages(),
    ],
    resolve: {
        alias: {
            '~/': `${pathSrc}/`,
        },
    },
})
