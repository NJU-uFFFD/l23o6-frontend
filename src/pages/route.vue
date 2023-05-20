<script setup lang="ts">
import {reactive, ref} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {h, onMounted} from "vue";

let routeName = ref('')


let stations;
let routes;
let routesFiltered = reactive({
  data: []
})


let toAddName = ref('')
let toAddStationIds = ref([])
let toChangeName = ref('')
let toChangeId = ref(0)
let toChangeStationIds = ref([])
let change = ref(false)
let add = ref(false)


const addRoute = () => {
  if (toAddName.value === '') return
  request({
    url: '/v1/station',
    method: 'POST',
    data: {
      name: toAddName,
      stationIds: toAddStationIds
    }
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    routeName.value = ''
    refreshStation()
    refreshData()
    filter()
    toAddName.value = ''
    toAddStationIds.value = []
    add.value = false
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: '错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const delRoute = (id) => {
  request({
    url: `/v1/route/${id}`,
    method: 'DELETE'
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    routeName.value = ''
    refreshStation()
    refreshData()
    filter()
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: '错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const changeRoute = () => {
  request({
    url: `/v1/route/${toChangeId.value}`,
    method: 'PUT',
    data: {
      name: toChangeName.value,
      stationIds: toChangeStationIds.value
    }
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    routeName.value = ''
    refreshStation()
    refreshData()
    filter()
    toChangeName.value = ''
    toChangeStationIds.value = []
    change.value = false
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: '错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}


const refreshData = () => {
  request({
    url: '/v1/route',
    method: 'GET'
  }).then((res) => {
    routes = res.data.data
    console.log(routes)
    routesFiltered.data = [...routes]
    console.log(res.data)
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: '错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const filter = () => {
  routesFiltered.data = routes.filter((routes) => {
    return routes.name.includes(routeName.value)
  })
}

const refreshStation = () => {
  request({
    url: '/v1/station',
    method: 'GET'
  }).then((res) => {
    stations = res.data.data
    console.log(stations)
    console.log(res.data)
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: '错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

onMounted(() => {
  refreshData()
  refreshStation()
})


</script>

<template>
  <el-container>
    <el-header>
      <MenuComponent pageIndex="/route"/>
    </el-header>
    <el-main>
      <div style="display: flex; justify-content: center">
        <el-card shadow="hover" style="width: 70vh; height: auto; ">
          <el-form inline style="display: flex; " @submit.native.prevent>
            <el-form-item label="路线名" style="display: flex; flex-grow: 1">
              <el-input v-model="routeName" autofocus @keyup.enter.native="filter"/>
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
          <el-collapse-item v-for="route in routesFiltered.data" :title="route.name">
            <el-button @click="change=true; toChangeId=route.id">
              更改
            </el-button>
            <el-button type="danger" @click="delRoute(route.id)">
              删除
            </el-button>
          </el-collapse-item>

        </el-collapse>
      </div>

    </el-main>
  </el-container>

  <el-dialog v-model="change" title="更改路线" width="30%" draggable @close="toChangeId=0; toChangeName=''; toChangeStationIds=[];">
    <div>请输入更改后的路线信息</div>
    <br/>
    <div style="display: flex;">
      <el-space>
        <el-input v-model="toChangeName"/>
        <el-button type="primary" @click="changeRoute">
          确定
        </el-button>
      </el-space>
    </div>
  </el-dialog>

  <el-dialog v-model="add" title="添加路线" width="30%" draggable @clos="toAddName=''; toAddStationIds=[];">
    <div>请输入新的路线信息</div>
    <br/>
    <div style="display: flex;">
      <el-space>
        <el-input v-model="toAddName"/>
        <el-button type="primary" @click="addRoute">
          确定
        </el-button>
      </el-space>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>