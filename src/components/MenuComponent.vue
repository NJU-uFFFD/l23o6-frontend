<script lang="ts" setup>
defineProps<{
    pageIndex: string
}>()

const menuSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}
</script>

<template>
    <el-menu :default-active="pageIndex" mode="horizontal" class="el-menu-demo" @select="menuSelect" :router=true>
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/user">用户</el-menu-item>
    </el-menu>
</template>