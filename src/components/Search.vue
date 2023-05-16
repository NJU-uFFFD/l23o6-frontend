<script setup lang="ts">

import {request} from "~/utils/request"
import {ElNotification} from "element-plus";
import {h, reactive} from "vue";
import {trains} from "~/store/store.js";

const form = reactive({
  startStation: '',
  endStation: '',
  date: ''
})
const onSubmit = () => {
  const r = request({
    url: '/v1/train',
    method: 'GET',
    params: {
      startStation: form.startStation,
      endStation: form.endStation,
      date: form.date
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
  <el-form :model="form" label-width="120px">
    <el-form-item label="出发站">
      <el-input v-model="form.startStation" />
    </el-form-item>
    <el-form-item label="到达站">
      <el-input v-model="form.endStation" />
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">
        查询
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>