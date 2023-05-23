<script setup lang="ts">

import {useRoute} from "vue-router";
import {h, onMounted, reactive} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";

const route = useRoute()

let orderDetail = reactive({
  data: Object
})

const getOrderDetail = () => {
  request({
    url: `/v1/order/${route.params['orderId']}`,
    method: 'GET',
  }).then(res => {
    orderDetail.data = res.data.data
  }).catch(err => {
    console.log(err)
    ElNotification({
      offset: 70,
      title: 'getOrder错误',
      message: h('i', {style: 'color: teal'}, err.response?.data.msg),
    })
  })
}

onMounted(() => {
    getOrderDetail()
  }
)



</script>

<template>
<el-container>
  <el-header style="position: fixed; width: 100%">
    <MenuComponent pageIndex="/order"/>
  </el-header>
  <el-main style="margin-top: 10vh">
    <div>
      <el-text size="large" type="primary" style="display: flex;justify-content: center">
        <h1>订单详情</h1>
      </el-text>
      <br/>
    </div>

    <div style="margin-bottom: 2vh; margin-right: 25%">
      <el-button style="float:right" @click="getOrderDetail">
        刷新
      </el-button>
    </div>

    <div style="display: flex; justify-content: center; margin-top: 5vh">
      <OrderDetail v-bind="orderDetail.data" style="width: 50%"/>
    </div>



  </el-main>
</el-container>
</template>

<style scoped>

</style>