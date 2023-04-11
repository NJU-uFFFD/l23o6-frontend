<script lang="ts" setup>
import LoginFrame from "~/components/LoginFrame.vue"
import RegisterFrame from "~/components/RegisterFrame.vue"
import MenuComponent from "~/components/MenuComponent.vue"
import { ref } from "vue";

const activeName = ref('登录')
</script>

<template>
    <MenuComponent pageIndex="/user"   />
    <el-card class="demo-tabs box-card" shadow="hover">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="登录" name="登录">
                <LoginFrame />
            </el-tab-pane>
            <el-tab-pane label="注册" name="注册">
                <RegisterFrame />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<style scoped>
.box-card {
    width: 480px;
    height: 270px;
    margin: 20vh auto 0;
}
</style>