<script lang="ts" setup>
import {toggleDark} from '~/composables';

defineProps<{
    pageIndex: string
}>()

const menuSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}
</script>

<template>
    <el-menu :default-active="pageIndex" mode="horizontal" class="el-menu-demo" @select="menuSelect" :router=true :ellipsis="false">
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/train">查询车次</el-menu-item>
        <el-menu-item h="full" @click="toggleDark()">
            <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--el-menu-item-height)">
                <i inline-flex i="dark:ep-moon ep-sunny"/>
            </button>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
    </el-menu>
</template>


<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>