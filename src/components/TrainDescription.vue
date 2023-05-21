<script setup lang="ts">

import {ref} from "vue";

let size = "default"
const props = defineProps({
  id: Number,
  name: String,
  startStation: String,
  endStation: String,
  departureTime: Date,
  arrivalTime: Date,
  duration: String,
  ticketInfo: Array
})

let drawer = ref(false)
let dialog = ref(false)


import {SwitchFilled} from '@element-plus/icons-vue'
</script>

<template>
  <div style="margin: 0 40vh">
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
          {{name}}
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
      <el-descriptions-item v-for="ticket in ticketInfo" :label="ticket.type" span="2" width="25%" align="center">
        {{ ticket.count }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="display: flex; justify-content: flex-end; margin-top: 3vh;">
      <el-button @click="drawer=true">
        查看详情
      </el-button>
      <el-button type="primary" @click="dialog=true">
        购买
      </el-button>
    </div>


    <el-divider>
      <el-icon>
        <SwitchFilled/>
      </el-icon>
    </el-divider>
  </div>

  <el-drawer
    v-model="drawer"
    direction="rtl"
    size="30%"
  >
    <TrainDetail :trainId="id"/>
  </el-drawer>


  <el-dialog v-model="dialog" title="Tips" width="50%" draggable>
    <OrderForm v-bind="props"></OrderForm>
    <template #footer>
      <span>
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialog = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<style scoped>
</style>