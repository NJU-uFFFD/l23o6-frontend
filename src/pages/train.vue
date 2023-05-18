<script setup lang="ts">
import {h, onMounted, reactive, watch} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {useSearchStore} from "~/stores/search.js";
import { useRoute } from 'vue-router'

const route = useRoute();
const search = useSearchStore();

let trains = reactive({
  res : []
})

onMounted(() => {
  if(route.hash == "#query") {
    submit()
  }
})

const submit = () => {
  const r = request({
    url: '/v1/train',
    method: 'GET',
    params: {
      startStation: search.startStation,
      endStation: search.endStation,
      date: search.date
    }
  })

  r.then((res) => {
    trains.res = res.data.data.items
    console.log(res.data)
    console.log("submit")
  }).catch((error) => {
    console.log(error)
    ElNotification({
      title: '错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
  })
}

</script>


<template>
  <Menu pageIndex="/train" />
  <div style="height: 5vh">
  </div>

  <div style="display: flex; justify-content: center">
    <el-card shadow="hover" style="width: 70vh; height: auto">
      <SearchForm @formUpdated="submit"/>
    </el-card>
  </div>


  <div style="height: 5vh">
  </div>

  <train-description v-for="train in trains.res" v-bind="train"/>

</template>

<style scoped>

</style>