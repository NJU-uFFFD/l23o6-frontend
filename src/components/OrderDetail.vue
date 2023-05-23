<script setup lang="ts">

import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {h, reactive, watch} from "vue";
import {useStationsStore} from "~/stores/stations";
import {parseDate} from "../utils/date";


const stations = useStationsStore()

const props = defineProps({
  id: Number,
  train_id: Number,
  arrival_time: Number,
  departure_time: Number,
  start_station_id: Number,
  end_station_id: Number,
  status: String,
  created_at: Number,
  seat: String
})

let train = reactive({
  data: null
});
const getTrain = () => {
  console.log("getTrain")
  request({
    url: `/v1/train/${props.train_id}`,
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

watch(props, () => {
  getTrain()
})

</script>

<template>

  <div style="display: flex; flex-direction: column">

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
        <el-text size="large">
          {{ parseDate(props.created_at) }}
        </el-text>
      </div>
    </div>

    <div>
      <el-text size="large" tag="b" type="primary">
        订单状态:&nbsp;&nbsp;
      </el-text>
      <el-text size="large" tag="b">
        {{ props.status }}
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
        {{ props.seat }}
      </el-descriptions-item>
      <el-descriptions-item label="出发站" span="2" width="25%" align="center">
        {{ stations.idToName[start_station_id] }}
      </el-descriptions-item>
      <el-descriptions-item label="到达站" span="2" width="25%" align="center">
        {{ stations.idToName[end_station_id] }}
      </el-descriptions-item>
      <el-descriptions-item label="出发时间" span="2" width="25%" align="center">
        {{ parseDate(departure_time) }}
      </el-descriptions-item>
      <el-descriptions-item label="到达时间" span="2" width="25%" align="center">
        {{ parseDate(arrival_time) }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 2vh">
      <div style="float:right;">
        <el-button>
          取消
        </el-button>
        <el-button type="primary">
          支付
        </el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>