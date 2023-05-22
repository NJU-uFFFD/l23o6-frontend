<script setup lang="ts">
import {h, onMounted, reactive, ref} from "vue";
import {request} from "~/utils/request";
import {ElNotification} from "element-plus";
import {useSearchStore} from "~/stores/search.js";
import {useRoute} from 'vue-router'

const route = useRoute();
const search = useSearchStore();

let trains = reactive({
  res : []
})

let loading = ref(false)
let empty = ref(false)

onMounted(() => {
  if(route.hash == "#query") {
    submit()
  }
})

const submit = () => {

  loading.value = true
  const r = request({
    url: '/v1/train',
    method: 'GET',
    params: {
      start_station_id: search.start_station_id,
      end_station_id: search.end_station_id,
      date: search.date
    }
  })

  r.then((res) => {
    trains.res = res.data.data
    console.log(res.data)
    console.log("submit")
    empty.value = trains.res.length === 0;
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'search错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
  }).finally(() => {
    loading.value = false
  })
}

</script>


<template>
  <el-container>
    <el-header>
      <MenuComponent pageIndex="/search" />
    </el-header>
    <el-main v-loading="loading" style="height: 90vh">

      <div style="display: flex; justify-content: center; margin-bottom: 5vh">
        <el-card shadow="hover" style="width: 80%;">

          <SearchTicketForm :inline="true" @formUpdated="submit" style="display: flex; justify-content: center"/>
        </el-card>
      </div>
      <el-empty v-if="empty" description="结果为空" style="margin-top: 10%"/>
      <train-description v-for="train in trains.res" v-bind="train"/>
    </el-main>
  </el-container>


<!--  <el-drawer-->
<!--    v-model="table"-->
<!--    direction="rtl"-->
<!--    size="30%"-->
<!--  >-->
<!--    <TrainDetail :trainId="id"/>-->
<!--  </el-drawer>-->
</template>

<style scoped>

</style>