<script lang="ts" setup>
import {toggleDark} from '~/composables';
import {useUserStore} from "~/stores/user.js";
import {request} from "~/utils/request";
import {AxiosError, AxiosResponse} from "axios";
import {ElNotification} from "element-plus";
import {h} from "vue";
defineProps<{
  pageIndex: string
}>()

const user = useUserStore()

const menuSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}

const logout = () =>
{
  request({
    url: '/v1/session',
    method: 'DELETE'
  }).then((response: AxiosResponse<any>) => {
    console.log(response)
    ElNotification({
      offset: 70,
      title: '登出成功',
      message: h('info', { style: 'color: teal' }, response.data.msg),
    })
    user.$reset()
  }).catch((error: AxiosError<any>) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: '错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
  });
}


</script>

<template>
  <el-menu :default-active="pageIndex" mode="horizontal" class="el-menu-demo" @select="menuSelect" :router=true
           :ellipsis="false">
    <el-menu-item index="/">主页</el-menu-item>
    <el-menu-item index="/search">车票购买</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--el-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny"/>
      </button>
    </el-menu-item>
    <div class="flex-grow"/>

    <el-row v-if="user.username === ''">
      <el-menu-item index="/login">登录</el-menu-item>
      <el-menu-item index="/register">注册</el-menu-item>
    </el-row>
    <el-row v-else>
      <el-menu-item index="/user">用户中心</el-menu-item>
      <el-menu-item @click="logout">登出</el-menu-item>
    </el-row>

  </el-menu>
</template>


<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>