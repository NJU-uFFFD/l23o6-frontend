<script setup lang="ts">
import {useUserStore} from "~/stores/user.js";
import {useRouter} from "vue-router";

const router = useRouter()
const user = useUserStore()

if(user.username === ''){
  router.push('/login')
}

</script>

<template>
  <el-container>
    <el-header>
      <MenuComponent pageIndex="/user"/>
    </el-header>
    <el-main style="display: flex; justify-content: center; align-items: center; height: 80vh">
      <div>
        <el-text size="large" type="primary" style="display: flex;justify-content: center">
          <h1>个人信息</h1>
        </el-text>
        <br/>
        <UserInfoComponent style="width: 40vh; margin: 0 auto"/>
      </div>

    </el-main>
  </el-container>

</template>

<style scoped>

</style>