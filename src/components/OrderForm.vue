<script setup lang="ts">


import {Right} from "@element-plus/icons-vue";
import {reactive} from "vue";

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

let orderForm = reactive({
  trainId:String,
  startStation: Number,
  endStation: Number,
  name: String,
  type: String,
  idn: String,
  phone: String,
  seatType: String,
})
</script>

<template>
  <div>
    <el-text size="large" type="primary" style="display: flex;justify-content: center">
      <h1>订单确认</h1>
    </el-text>
    <br/>
  </div>


  <el-row class="el-row">
    <el-col :span="24" style="display: flex; justify-content: center; align-items: center">
      <el-text type="primary" size="large" tag="b">
        {{ name }}
      </el-text>
    </el-col>
  </el-row>


<br/>


  <el-row justify="center" class="el-row">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ startStation }}
      </el-text>
    </el-col>
    <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
      <el-icon size="15">
        <Right/>
      </el-icon>
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center;">
      <el-text style="text-align: center">
        {{ endStation }}
      </el-text>
    </el-col>
  </el-row>

  <el-row justify="center">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ departureTime }}
      </el-text>
    </el-col>
    <el-col :span="2">
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center">
      <el-text>
        {{ arrivalTime }}
      </el-text>
    </el-col>
  </el-row>

  <br/>
  <br/>

<!--  <el-form :model="form" label-width="120px">-->
<!--    <el-form-item label="Activity name">-->
<!--      <el-input v-model="form.name" />-->
<!--    </el-form-item>-->
<!--    <el-form-item label="Activity zone">-->
<!--      <el-select v-model="form.region" placeholder="please select your zone">-->
<!--        <el-option label="Zone one" value="shanghai" />-->
<!--        <el-option label="Zone two" value="beijing" />-->
<!--      </el-select>-->
<!--    </el-form-item>-->

<!--    <el-form-item label="Resources">-->
<!--      <el-radio-group v-model="form.resource">-->
<!--        <el-radio label="Sponsor" />-->
<!--        <el-radio label="Venue" />-->
<!--      </el-radio-group>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="Activity form">-->
<!--      <el-input v-model="form.desc" type="textarea" />-->
<!--    </el-form-item>-->
<!--  </el-form>-->

</template>

<style scoped>

</style>