import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: 'a',
            name: '你妈死了',
            type: '身份证',
            id: '',
            phone: ''
        }
    }
})