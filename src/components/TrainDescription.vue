<script setup lang="ts">

let size = "default"
defineProps({
  trainName: String,
  startStation: String,
  endStation: String,
  departureTime: Date,
  arrivalTime: Date,
  duration: String,
  tickets: Array
})


import {
  SwitchFilled
} from '@element-plus/icons-vue'

</script>

<template>
  <div style="margin: 0 200px">
    <el-descriptions
      :column="4"
      :size="size"
      border
    >
      <el-descriptions-item span="2" width="25%" align="center">
        <template #label>
          <el-text type="primary" tag="b" size="large">
            车次
          </el-text>
        </template>
        <el-text type="primary" tag="b" size="large">
          {{trainName}}
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item label="历时" span="2" width="25%" align="center">
        {{ duration }}
      </el-descriptions-item>
      <el-descriptions-item label="出发站" span="2" width="25%" align="center">
        {{ startStation }}
      </el-descriptions-item>
      <el-descriptions-item label="到达站" span="2" width="25%" align="center">
        {{ endStation }}
      </el-descriptions-item>
      <el-descriptions-item label="出发时间" span="2" width="25%" align="center">
        {{ departureTime }}
      </el-descriptions-item>
      <el-descriptions-item label="到达时间" span="2" width="25%" align="center">
        {{ arrivalTime }}
      </el-descriptions-item>
      <el-descriptions-item v-for="ticket in tickets" :label="ticket.seatType" width="25%">
        {{ ticket.count }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider>
      <el-icon><SwitchFilled /></el-icon>
    </el-divider>
  </div>




</template>

<style scoped>
</style>