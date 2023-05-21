import {defineStore} from "pinia";

export const useSearchStore = defineStore('search', {
    state: () => {
      return {
          start_station: '',
          end_station: '',
          date: ''
      }
    }
})