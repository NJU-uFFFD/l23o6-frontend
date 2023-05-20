<script setup lang="ts">
import {h, onMounted, reactive, ref} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {useStationsStore} from "~/stores/stations.js";

let routeName = ref('')

const stations = useStationsStore()
let routes;
let routesFiltered = reactive({
  data: []
})

let toAdd = {
  name: '',
  station_ids: []
}

let toChange= {
  id: 0,
  name: '',
  station_ids: []
}


let change = ref(false)
let add = ref(false)


const addRoute = (route) => {
  request({
    url: '/v1/route',
    method: 'POST',
    data: {
      name: route.name,
      station_ids: route.station_ids
    }
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    routeName.value = ''
    refreshData()
    filter()
    add.value = false
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'postRoute错误',
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
    refreshData()
    filter()
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'deleteRoute错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const changeRoute = (route) => {
  request({
    url: `/v1/route/${toChange.id}`,
    method: 'PUT',
    data: {
      name: route.name,
      station_ids: route.station_ids
    }
  }).then((res) => {
    console.log(res.data)
    ElNotification({
      offset: 70,
      title: '成功',
      message: h('success', {style: 'color: teal'}, res.data.msg),
    })
    routeName.value = ''
    refreshData()
    filter()
    change.value = false
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'putRoute错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}


const refreshData = () => {
  stations.fetch()
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
      title: 'getRoute错误',
      message: h('error', {style: 'color: teal'}, error.response?.data.msg),
    })
  })
}

const filter = () => {
  routesFiltered.data = routes.filter((routes) => {
    return routes.name.includes(routeName.value)
  })
}


onMounted(() => {
  refreshData()
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
            <el-button @click="change=true; toChange=route;">
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

  <el-dialog v-model="change" title="更改路线" width="50%" draggable >
    <div>请输入更改后的路线信息</div>
    <br/>
    <div>
      <RouteDetailForm  v-bind="toChange" @formSubmitted="changeRoute" :key="toChange.id"/>
      <!--      <el-space>-->
      <!--        <el-input v-model="toChangeName"/>-->
      <!--        <el-button type="primary" @click="changeRoute">-->
      <!--          确定-->
      <!--        </el-button>-->
      <!--      </el-space>-->
<!--      <RouteDetailForm :stations-prop="stations" :station-ids-prop=""/>-->
    </div>
  </el-dialog>

  <el-dialog v-model="add" title="添加路线" width="50%" draggable>
    <div>请输入新的路线信息</div>
    <br/>
    <div>
      <RouteDetailForm  v-bind="toAdd" @formSubmitted="addRoute"/>
<!--      <el-space>-->
<!--        <el-input v-model="toAddName"/>-->
<!--        <el-button type="primary" @click="addRoute">-->
<!--          确定-->
<!--        </el-button>-->
<!--      </el-space>-->
    </div>
  </el-dialog>
</template>

<style scoped>

</style>