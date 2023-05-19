<script lang="ts" setup>
import {onMounted} from "vue";
import {getUser} from "~/utils/user.js";

onMounted(getUser)

</script>

<template>
  <router-view />
</template>