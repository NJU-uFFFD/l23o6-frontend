<script setup lang="ts">

import {Right} from "@element-plus/icons-vue";
import {h, reactive, watch} from "vue";
import {request} from "~/utils/request";
import {useStationsStore} from "~/stores/stations.js";
import {ElNotification} from "element-plus";


const stations = useStationsStore()

const props = defineProps({
  id: Number,
  name: String,
  route_id: Number,
  date: String,
  departure_times: Array,
  arrival_times: Array,
  extraInfos: Array
})

let route = reactive({
  id: 0,
  name: '',
  station_ids: []
});

const getRoute = () => {
  console.log("manage")
  console.log(props.route_id)
  request({
    url: `/v1/admin/route/${props.route_id}`,
    method: 'GET'
  }).then((res) => {
    console.log(res.data.data)
    route.id = res.data.data.id
    route.name = res.data.data.name
    route.station_ids = res.data.data.station_ids
  }).catch((error) => {
    ElNotification({
      offset: 70,
      title: 'getRoute错误(trainManage)',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
    console.log(error)
  })
  console.log("end")
}

watch(() => props.route_id, () => {
  getRoute()
})
getRoute()


</script>

<template>
  <el-text>
    路线名:   {{ route.name }}
  </el-text>

  <br/>
  <br/>


  <el-row justify="center" class="el-row">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ route.station_ids.length > 0 ? stations.idToName[route.station_ids?.[0]] : '' }}
      </el-text>
    </el-col>
    <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
      <el-icon size="15">
        <Right/>
      </el-icon>
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center;">
      <el-text style="text-align: center">
        {{ route.station_ids?.length > 0 ? stations.idToName[route.station_ids?.[route.station_ids?.length - 1]] : '' }}
      </el-text>
    </el-col>
  </el-row>

  <el-row justify="center">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ props.departure_times?.[0] }}
      </el-text>
    </el-col>
    <el-col :span="2">
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center">
      <el-text>
        {{ props.arrival_times?.[props.arrival_times?.length - 1] }}
      </el-text>
    </el-col>
  </el-row>

  <br/>

  <el-card v-for="(stationId, index) in route.station_ids" style="margin-bottom: 0.35%">
    {{ stations.idToName[stationId] }}
    {{ props.departure_times[index] }}
    {{ props.arrival_times[index] }}
  </el-card>


</template>

<style scoped>

</style>