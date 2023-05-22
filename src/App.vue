<script lang="ts" setup>
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user.js";
import {useSearchStore} from "~/stores/search.js";

onMounted(() => {
  const userStore = useUserStore()
  const searchStore = useSearchStore()
  userStore.fetch()
  let date = new Date()
  searchStore.date = `${date.getFullYear()}-${String(date.getMonth()+ 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

})

</script>

<template>
  <router-view />
</template>