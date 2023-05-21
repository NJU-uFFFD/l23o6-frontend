<script setup lang="ts">

import {h, onMounted, reactive, ref, watch} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {useStationsStore} from "~/stores/stations.js";
import {Right} from "@element-plus/icons-vue";
import TrainManageDetail from "~/components/TrainManageDetail.vue";
import TrainManageForm from "~/components/TrainManageForm.vue";

let trainName = ref('')
const stations = useStationsStore()

let trains;
let trainsFiltered = reactive({
  data: []
})

let toAdd = reactive({
    name: '',
    route_id: 0,
    date: '',
    departure_times: [],
    arrival_times: [],
    extra_infos: []
})

let toChange= reactive({
    id: 0,
    name: '',
    route_id: 0,
    date: '',
    departure_times: [],
    arrival_times: [],
    extra_infos: []
})

let add = ref(false)
let change = ref(false)

const addTrain = (train) => {
  request({
    url: '/v1/admin/train',
    method: 'POST',
    data: {
      name: toAdd.name,
      route_id: toAdd.route_id,
      date: toAdd.date,
      departure_times: toAdd.departure_times,
      arrival_times: toAdd.arrival_times,
      extra_infos: toAdd.extra_infos
    }
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    trainName.value = ''
    refreshData()
    filter()
    add.value = false
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'postTrain错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const delTrain = (id) => {
  request({
    url: `/v1/train/${id}`,
    method: 'DELETE'
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    trainName.value = ''
    refreshData()
    filter()
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'deleteTrain错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const changeTrain = (train) => {
  request({
    url: `/v1/station/${toChange.id}`,
    method: 'PUT',
    data: {
      name: toChange.name,
      route_id: toChange.route_id,
      date: toChange.date,
      departure_times: toChange.departure_times,
      arrival_times: toChange.arrival_times,
      extra_infos: toChange.extra_infos
    }
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    trainName.value = ''
    refreshData()
    filter()
    change.value = false
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'putTrain错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}


const refreshData = () => {
  stations.fetch()
  request({
    url: '/v1/admin/train',
    method: 'GET'
  }).then((res) => {
    trains = res.data.data
    trainsFiltered.data = [...trains]
    console.log(trainsFiltered.data)
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'getTrain错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const filter = () => {
  trainsFiltered.data = trains.filter((train) => {
    return train.name.includes(trainName.value)
  })
}

onMounted(() => {
  refreshData()
})
</script>

<template>
  <el-container>
    <el-header>
      <MenuComponent pageIndex="/train"/>
    </el-header>
    <el-main>
      <div style="display: flex; justify-content: center">
        <el-card shadow="hover" style="width: 70vh; height: auto; ">
          <el-form inline style="display: flex; " @submit.native.prevent>
            <el-form-item label="车次名" style="display: flex; flex-grow: 1">
              <el-input v-model="trainName" autofocus @keyup.enter.native="filter"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="filter">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <br/>
      <br/>


      <div style="display: flex; justify-content: center">
        <div style="display: flex; width: 80vh; justify-content: flex-end">
          <el-space>
            <el-button type="primary" @click="add=true">
              添加
            </el-button>
          </el-space>
        </div>
      </div>


      <br/>
      <br/>

      <div style="display: flex; justify-content: center">
        <el-collapse style="width: 80vh; display: flex;flex-direction: column;">
          <el-collapse-item v-for="train in trainsFiltered.data" :title="train.name">
            <div style="margin-bottom: 5%">
              <el-button @click="change=true; toChange=train;">
                更改
              </el-button>
              <el-button type="danger" @click="delTrain(train.id)">
                删除
              </el-button>
            </div>


            <div>
              <TrainManageDetail v-bind="train"/>

            </div>

          </el-collapse-item>

        </el-collapse>
      </div>

    </el-main>
  </el-container>

  <el-dialog v-model="change" title="更改车次" width="50%" draggable >
    <div>请输入更改后的车次信息</div>
    <br/>
    <div>
      <TrainManageForm  v-bind="toChange" @formSubmitted="changeTrain" :key="toChange.id"/>
    </div>
  </el-dialog>

  <el-dialog v-model="add" title="添加车次" width="50%" draggable>
    <div>请输入新的路线信息</div>
    <br/>
    <div>
      <TrainManageForm  v-bind="toAdd" @formSubmitted="addTrain"/>
    </div>
  </el-dialog>

</template>

<style scoped>

</style>