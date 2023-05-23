<script setup lang="ts">

import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {h, onMounted, reactive, watch} from "vue";
import {useStationsStore} from "~/stores/stations";
import {parseDate} from "~/utils/date";

const stations = useStationsStore()

const props = defineProps({
  id: Number,
})

let orderDetail = reactive({
  data: {
    id: undefined,
    train_id: undefined,
    seat: '',
    status: '',
    created_at: '',
    start_station_id: undefined,
    end_station_id: undefined
  }
})

let train = reactive({
  data: null
});

const getOrderDetail = () => {
  request({
    url: `/v1/order/${props.id}`,
    method: 'GET',
  }).then(res => {
    orderDetail.data = res.data.data
    console.log(orderDetail.data)
  }).catch(err => {
    console.log(err)
    ElNotification({
      offset: 70,
      title: 'getOrder错误',
      message: h('i', {style: 'color: teal'}, err.response?.data.msg),
    })
  })
}

const getTrain = () => {
  console.log("getTrain")
  request({
    url: `/v1/train/${orderDetail.data.train_id}`,
    method: 'GET'
  }).then((res) => {
    train.data = res.data.data
    console.log(train)
  }).catch((error) => {
    ElNotification({
      offset: 70,
      title: 'getTrain错误(orderDetail)',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
    console.log(error)
  })
}


const pay = (id) => {
  request({
    url: `/v1/order/${id}`,
    method: 'PUT',
    data: {
      status: '已支付'
    }
  }).then((res) => {
    ElNotification({
      offset: 70,
      title: '支付成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    console.log(res)
  }).catch((error) => {
    ElNotification({
      offset: 70,
      title: '支付失败',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
    console.log(error)
  })
}

const cancel = (id) => {
  request({
    url: `/v1/order/${id}`,
    method: 'PUT',
    data: {
      status: '已取消'
    }
  }).then((res) => {
    ElNotification({
      offset: 70,
      title: '取消成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    console.log(res)
  }).catch((error) => {
    ElNotification({
      offset: 70,
      title: '取消失败',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
    console.log(error)
  })
}

watch(orderDetail, () => {
  getTrain()
})

onMounted(() => {
  stations.fetch()
  getOrderDetail()
})

getOrderDetail()

</script>

<template>

  <div style="display: flex; flex-direction: column">

    <div style="margin-bottom: 2vh;">
      <el-button style="float:right" @click="getOrderDetail">
        刷新
      </el-button>
    </div>

    <div style="display: flex; justify-content: space-between;">
      <div>
        <el-text size="large" tag="b" type="primary">
          订单号:&nbsp;&nbsp;
        </el-text>
        <el-text size="large" tag="b">
          {{ props.id }}
        </el-text>
      </div>
      <div>
        <el-text size="large" tag="b" type="primary">
          创建日期:&nbsp;&nbsp;
        </el-text>
        <el-text size="large" tag="b">
          {{ parseDate(orderDetail.data.created_at) }}
        </el-text>
      </div>
    </div>

    <div>
      <el-text size="large" tag="b" type="primary">
        订单状态:&nbsp;&nbsp;
      </el-text>
      <el-text size="large" tag="b">
        {{ orderDetail.data.status }}
      </el-text>
    </div>
    <div style="margin-bottom: 2vh">
      <el-text size="large" tag="b" type="primary">
        车次信息:
      </el-text>
    </div>

    <el-descriptions
      :column="4"
      border
    >
      <el-descriptions-item span="2" width="25%" align="center">
        <template #label>
          <el-text type="primary" tag="b" size="large">
            车次
          </el-text>
        </template>
        <el-text type="primary" tag="b" size="large">
          {{ train?.data?.name }}
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item label="席位信息" span="2" width="25%" align="center">
        {{ orderDetail.data.seat }}
      </el-descriptions-item>
      <el-descriptions-item label="出发站" span="2" width="25%" align="center">
        {{ stations.idToName[orderDetail.data.start_station_id] }}
      </el-descriptions-item>
      <el-descriptions-item label="到达站" span="2" width="25%" align="center">
        {{ stations.idToName[orderDetail.data.end_station_id] }}
      </el-descriptions-item>
      <el-descriptions-item label="出发时间" span="2" width="25%" align="center">
        {{ parseDate(orderDetail.data.departure_time) }}
      </el-descriptions-item>
      <el-descriptions-item label="到达时间" span="2" width="25%" align="center">
        {{ parseDate(orderDetail.data.arrival_time) }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 2vh" v-if="orderDetail.data.status==='等待支付'">
      <div style="float:right;">
        <el-button type="danger" @click="cancel(id)">
          取消订单
        </el-button>
        <el-button type="primary" @click="pay(id)">
          支付订单
        </el-button>
      </div>
    </div>
    <div v-else-if="orderDetail.data.status==='已支付'">
      <div style="float:right;">
        <el-button>
          取消订单
        </el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>