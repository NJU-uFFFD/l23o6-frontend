<script setup lang="ts">
import {request} from "~/utils/request";
import {onMounted, reactive, watch} from "vue";
import {Right} from "@element-plus/icons-vue";
import {useStationsStore} from "~/stores/stations.js";

const stations = useStationsStore()

const props = defineProps({
  trainId: Number
})

let data = reactive({
  data: {
    id: 0,
    name: "",
    start_station_id: 0,
    end_station_id: 0,
    departure_time: "",
    arrival_time: "",
    ticket_info: [
      {
        type: "",
        count: 0,
        price: 0
      }
    ]
  }
});

// watch(props, () => {
//   data.data = {
//     id: 0,
//     name: "",
//     start_station_id: "",
//     end_station_id: "",
//     departure_time: "",
//     arrival_time: "",
//     ticket_info: [
//       {
//         type: "",
//         count: 0,
//         price: 0
//       }
//     ]
//   }
//   console.log(props.trainId)
//   refreshData()
// })

const refreshData = () => {
  const r = request({
    url: `/v1/train/${props.trainId}`,
    method: 'GET'
  }).then((res) => {
    data.data = res.data.data
    console.log(data)
    console.log("submit")
  }).catch((error) => {
    console.log(error)
  })
}


onMounted(() => {
  refreshData()
})



</script>

<template>
  <el-row class="el-row">
    <el-col :span="24">
      <br>
    </el-col>
  </el-row>

  <el-row class="el-row">
    <el-col :span="24" style="display: flex; justify-content: center; align-items: center">
      <el-text type="primary" size="large" tag="b">
        {{ data.data.name }}
      </el-text>
    </el-col>
  </el-row>





  <el-row justify="center" class="el-row">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ stations.idToName[data.data.start_station_id] }}
      </el-text>
    </el-col>
    <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
      <el-icon size="15">
        <Right/>
      </el-icon>
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center;">
      <el-text style="text-align: center">
        {{ stations.idToName[data.data.end_station_id] }}
      </el-text>
    </el-col>
  </el-row>

  <el-row justify="center">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ data.data.departure_time }}
      </el-text>
    </el-col>
    <el-col :span="2">
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center">
      <el-text>
        {{ data.data.arrival_time }}
      </el-text>
    </el-col>
  </el-row>

  <!--    <el-space alignment="center" size="large">-->
  <!--      <el-text style="float: right">-->
  <!--        {{data.data.start_station_id}}-->
  <!--      </el-text>-->


  <!--      <el-icon size="15">-->
  <!--        <Right />-->
  <!--      </el-icon>-->

  <!--      <el-text>-->
  <!--        {{data.data.end_station_id}}-->
  <!--      </el-text>-->
  <!--    </el-space>-->


  <!--  <el-table :data="tableData" height="250" style="width: 100%">-->
  <!--    <el-table-column prop="date" label="站序" width="180" />-->
  <!--    <el-table-column prop="name" label="车站" width="180" />-->
  <!--    <el-table-column prop="address" label="出发时间" />-->
  <!--    <el-table-column prop="address" label="到达时间" />-->
  <!--    <el-table-column prop="address" label="历时" />-->
  <!--    <el-table-column prop="address" label="停留时间" />-->
  <!--  </el-table>-->

</template>

<style scoped>
.el-row{
    height: 36px;
}
</style>