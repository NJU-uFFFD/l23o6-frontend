<script setup lang="ts">

import {onMounted, reactive} from "vue";
import {useSearchStore} from "~/stores/search.js";
import {useStationsStore} from "~/stores/stations.js";

const search = useSearchStore()
const stations = useStationsStore()

const form = reactive({
  start_station: search.start_station,
  end_station: search.end_station,
  date: search.date
})

const disabledDate = (time: Date) => {
  let now = new Date();
  return time.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

onMounted(() => {
  stations.fetch()
})


</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="出发站">
      <el-select v-model="form.start_station" filterable>
        <el-option
          v-for="item in stations.rawData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="到达站">
      <el-select v-model="form.end_station" filterable>
        <el-option
          v-for="item in stations.rawData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="选择 日期"
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