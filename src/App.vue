<script lang="ts" setup>
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user.js";

onMounted(() => {
  const userStore = useUserStore()
  userStore.fetch()
})

</script>

<template>
  <router-view />
</template>