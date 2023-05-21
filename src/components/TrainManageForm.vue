<script setup lang="ts">
import {h, reactive, ref, watch} from 'vue'
import {CloseBold, SwitchFilled, WarnTriangleFilled} from "@element-plus/icons-vue";
import {useStationsStore} from "~/stores/stations.js";
import {ElNotification} from "element-plus";
import {request} from "~/utils/request";

const stations = useStationsStore()

const props = defineProps({
  name: String,
  route_id: Number,
  date: String,
  departure_times: Array,
  arrival_times: Array,
  extra_infos: Array,
  train_type: String
})

let train = reactive({
  name: props.name,
  train_type: props.train_type,
  route_id: props.route_id,
  date: props.date,
  departure_times: props.departure_times,
  arrival_times: props.arrival_times,
  extra_infos: props.extra_infos
})



let route = reactive({
  id: 0,
  name: '',
  station_ids: []
})

let routes = ref([])

const getRoutes = () => {
  console.log("getRoutes")
  request({
    url: `/v1/admin/route`,
    method: 'GET'
  }).then((res) => {
    console.log(res.data.data)
    routes.value = res.data.data
  }).catch((error) => {
    ElNotification({
      offset: 70,
      title: 'getRoutes错误(trainManage)',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
    console.log(error)
  })
  console.log("end")
}

getRoutes()


const getRoute = () => {
  if(train.route_id === undefined) return
  console.log("manage")
  console.log(props.route_id)
  request({
    url: `/v1/admin/route/${train.route_id}`,
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

watch(() => train.route_id, () => {
  train.departure_times = []
  train.arrival_times = []
  train.extra_infos = []
  getRoute()
})
getRoute()

</script>

<template>
  <div style="display: flex;flex-direction: column">
    <el-form-item>
      <template #label>
        <el-text tag="b" type="primary">
          车次名
        </el-text>
      </template>
      <el-input v-model="train.name" style="margin-right: 60%"/>
    </el-form-item>

    <el-date-picker type="datetime" v-model="train.date" value-format="YYYY-MM-DD"/>

    <el-select v-model="train.route_id">
      <el-option
        v-for="singleRoute in routes"
        :key="singleRoute.id"
        :label="singleRoute.name"
        :value="singleRoute.id"
      />
    </el-select>


    <div v-for="(station, index) in route.station_ids" :key="station">
      <el-card style="margin-bottom: 0.25%" shadow="hover" class="container">
        <div style="display: flex; align-items: center;">
          <el-icon class="handle" size="large">
            <SwitchFilled/>
          </el-icon>
          <strong style="margin-left: 5%; margin-right: 5%">
            {{ index + 1 }}
          </strong>
          <div style="width: 80%">
            {{ stations.idToName[station] }}
          </div>

          <el-date-picker
            v-model="train.arrival_times[index]"
            type="datetime"
            placeholder="Select date and time"
          />

          <el-date-picker
            v-model="train.departure_times[index]"
            type="datetime"
            placeholder="Select date and time"
          />

        </div>
      </el-card>
    </div>

    <el-button @click="this.$emit('formSubmitted', train)" style="margin-top: 2vh" type="primary">
      确认
    </el-button>


        <pre>
          {{ train.arrival_times }}
          {{train.departure_times }}
        </pre>
  </div>

</template>

<style scoped>
.change {
  visibility: hidden
}

.container:hover .change {
  visibility: visible
}
</style>
