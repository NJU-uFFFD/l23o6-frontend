<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  id: Number,
  name: String,
  start_station: String,
  end_station: String,
  departure_time: Date,
  arrival_time: Date,
  duration: String,
  ticket_info: Array
})

let drawer = ref(false)
let dialog = ref(false)


import {SwitchFilled} from '@element-plus/icons-vue'
</script>

<template>
  <div style="margin: 0 40vh">
    <el-descriptions
      :column="4"
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
        {{ start_station }}
      </el-descriptions-item>
      <el-descriptions-item label="到达站" span="2" width="25%" align="center">
        {{ end_station }}
      </el-descriptions-item>
      <el-descriptions-item label="出发时间" span="2" width="25%" align="center">
        {{ departure_time }}
      </el-descriptions-item>
      <el-descriptions-item label="到达时间" span="2" width="25%" align="center">
        {{ arrival_time }}
      </el-descriptions-item>
      <el-descriptions-item v-for="ticket in ticket_info" :label="ticket.type" span="2" width="25%" align="center">
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
  </el-dialog>


</template>

<style scoped>
</style>