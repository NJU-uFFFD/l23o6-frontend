<script setup lang="ts">

import {useRoute} from "vue-router";
import {h, onMounted, reactive} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";

const route = useRoute()

let orderDetail = reactive({
  data: Object
})

onMounted(() => {
  request({
    url: `/order/${route.params['orderId']}`,
    method: 'GET',
  }).then(res => {
    orderDetail.data = res.data
  }).catch(err => {
    console.log(err)
    ElNotification({
      offset: 70,
      title: 'getOrder错误',
      message: h('i', { style: 'color: teal' }, err.response?.data.msg),
    })
  })
})



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

<!--<el-descriptions>-->
<!--      :column="4"-->
<!--      border-->
<!--    >-->
<!--      <el-descriptions-item span="2" width="25%" align="center">-->
<!--        <template #label>-->
<!--          <el-text type="primary" tag="b" size="large">-->
<!--            车次-->
<!--          </el-text>-->
<!--        </template>-->
<!--        <el-text type="primary" tag="b" size="large">-->
<!--          {{name}}-->
<!--        </el-text>-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="历时" span="2" width="25%" align="center">-->
<!--        {{ duration }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="出发站" span="2" width="25%" align="center">-->
<!--        {{ start_station }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="到达站" span="2" width="25%" align="center">-->
<!--        {{ end_station }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="出发时间" span="2" width="25%" align="center">-->
<!--        {{ departure_time }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="到达时间" span="2" width="25%" align="center">-->
<!--        {{ arrival_time }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item v-for="ticket in ticket_info" :label="ticket.type" span="2" width="25%" align="center">-->
<!--        {{ ticket.count }}-->
<!--      </el-descriptions-item>-->
<!--    </el-descriptions>&ndash;&gt;-->

  </el-main>
</el-container>
</template>

<style scoped>

</style>