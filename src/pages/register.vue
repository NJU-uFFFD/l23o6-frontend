<script setup lang="ts">

</script>

<template>
  <MenuComponent pageIndex="/register" />
  <el-row style="display: flex; justify-content: center; align-content: center; height: 90vh">
    <el-col :span="24" style="display: flex; justify-content: center; align-content: center">
      <el-card shadow="hover" header="注册">
        <RegisterForm></RegisterForm>
      </el-card>
    </el-col>
  </el-row>

</template>

<style scoped>

</style>