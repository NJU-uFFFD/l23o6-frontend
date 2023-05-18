<script setup lang="ts">

import {reactive} from "vue";
import {useSearchStore} from "~/stores/search.js";

const search = useSearchStore()

const form = reactive({
  startStation: search.startStation,
  endStation: search.endStation,
  date: search.date
})

const disabledDate = (time: Date) => {
  let now = new Date();
  return time.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
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
        :disabled-date="disabledDate"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="this.$emit('formUpdated', form); search.$patch(form)">
        查询
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>