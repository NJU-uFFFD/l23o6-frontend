<script setup>
import LoginFrame from "@/components/LoginFrame.vue";
import RegisterFrame from "@/components/RegisterFrame.vue";
import {ref} from "vue";
import TitleComponent from "@/components/TitleComponent.vue";

const activeName = ref('登录')
</script>

<template>
  <main>
    <TitleComponent/>
    <el-card class="box-card" shadow="hover">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" name="登录">
          <LoginFrame/>
        </el-tab-pane>
        <el-tab-pane label="注册" name="注册">
          <RegisterFrame/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </main>
</template>

<style scoped>
.box-card {
    width: 480px;
    height: 270px;
    margin: 20vh auto 0;
}
</style>
