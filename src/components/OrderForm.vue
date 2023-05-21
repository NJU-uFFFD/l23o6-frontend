<script setup lang="ts">


import {Right} from "@element-plus/icons-vue";
import {h, reactive, ref} from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import {useUserStore} from "~/stores/user.js";
import {request} from "~/utils/request";
import {AxiosError, AxiosResponse} from "axios/index";
import {useRouter} from "vue-router";


const user = useUserStore()
const router = useRouter()
const orderFormRef = ref<FormInstance>()

const props = defineProps({
  id: Number,
  name: String,
  departure_station_id: Number,
  arrival_station_id: Number,
  departure_time: Date,
  arrival_time: Date,
  duration: String,
  ticket_info: Array
})

let orderForm = reactive({
  name: user.name,
  type: user.type,
  idn: user.idn,
  phone: user.phone,
  seat_type: '',
})

const orderRules = reactive<FormRules>({
  name: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    min: 2, max: 16, message: '姓名长度不符合要求(2-16)', trigger: 'change'
  }, {
    pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: '姓名只能包含中文', trigger: 'change'
  }],
  idn: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    pattern: /^\d{17}(\d|X)$/, message: '身份证号码不符合要求', trigger: 'change'
  }],
  type: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    pattern: /^(身份证|护照|其他)$/, message: '证件类型不符合要求', trigger: 'change'
  }],
  phone: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    pattern: /^1[3456789]\d{9}$/, message: '手机号码不符合要求', trigger: 'change'
  }],
  seat_type: [{ required: true, message: '此字段为必填项', trigger: 'change' }],
})

const submitOrderForm = (formEl: FormInstance | undefined) => {

  if (!formEl) return

  formEl.validate((valid) => {
    console.log(valid)
    if (!valid) return

    console.log('submit!')

    const r = request({
      url: '/v1/order',
      method: 'POST',
      data: {
        trainId: props.id,
        passenger: {
          name: orderForm.name,
          idn: orderForm.idn,
          phone: orderForm.phone,
          type: orderForm.type
        },
        departure_station_id: props.departure_station_id,
        arrival_station_id: props.arrival_station_id,
        seat_type: orderForm.seat_type
      }
    })

    r.then((response: AxiosResponse<any>) => {
      console.log(response)
    }).catch((error: AxiosError<any>) => {
      console.log(error)
      ElNotification({
        offset: 70,
        title: 'postOrder错误',
        message: h('error', {style: 'color: teal'}, error.response?.data.msg),
      })
    })
  })

}

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
        {{ departure_station_id }}
      </el-text>
    </el-col>
    <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
      <el-icon size="15">
        <Right/>
      </el-icon>
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center;">
      <el-text style="text-align: center">
        {{ arrival_station_id }}
      </el-text>
    </el-col>
  </el-row>

  <el-row justify="center">
    <el-col :span="11" style="display: flex; justify-content: right; align-items: center">
      <el-text>
        {{ departure_time }}
      </el-text>
    </el-col>
    <el-col :span="2">
    </el-col>
    <el-col :span="11" style="display: flex; justify-content: left; align-items: center">
      <el-text>
        {{ arrival_time }}
      </el-text>
    </el-col>
  </el-row>

  <br/>
  <br/>

  <el-form
    ref="orderFormRef"
    :model="orderForm"
    :rules="orderRules"
    label-width="120px"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="orderForm.name" disabled/>
    </el-form-item>
    <el-form-item label="证件类型" prop="type">
      <el-select v-model="orderForm.type" placeholder="" disabled>
        <el-option label="身份证" value="身份证" />
        <el-option label="护照" value="护照" />
      </el-select>
    </el-form-item>
    <el-form-item label="证件号" prop="idn">
      <el-input v-model="orderForm.idn" disabled/>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="orderForm.phone" disabled/>
    </el-form-item>
    <el-form-item label="坐席" prop="seat_type">
      <el-radio-group v-model="orderForm.seat_type">
        <el-radio label="Sponsorship" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitOrderForm(orderFormRef)">
        提交
      </el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>

</style>