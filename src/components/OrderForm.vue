<script setup lang="ts">


import {Right} from "@element-plus/icons-vue";
import {h, reactive, ref} from "vue";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import {useUserStore} from "~/stores/user.js";
import {request} from "~/utils/request";
import {AxiosError, AxiosResponse} from "axios/index";


const user = useUserStore()
const orderFormRef = ref<FormInstance>()

const props = defineProps({
  id: Number,
  name: String,
  departureStationId: Number,
  arrivalStationId: Number,
  departureTime: Date,
  arrivalTime: Date,
  duration: String,
  ticketInfo: Array
})

let orderForm = reactive({
  passenger: {
    name: user.name,
    type: user.type,
    idn: user.idn,
    phone: user.phone,
  },
  seatType: '',
})

const rules = reactive<FormRules>({
  name:[{required: true, message: '此字段为必填项', trigger: 'change'}, {
    min: 2, max: 16, message: '姓名长度不符合要求(2-16)', trigger: 'change'
  }, {
    pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: '姓名只能包含中文', trigger: 'change'
  }],
  idn:[{required: true, message: '此字段为必填项', trigger: 'change'}, {
    pattern: /^\d{17}(\d|X)$/, message: '身份证号码不符合要求', trigger: 'change'
  }],
  type: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    pattern: /^(身份证|护照|其他)$/, message: '证件类型不符合要求', trigger: 'change'
  }],
  phone: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    pattern: /^1[3456789]\d{9}$/, message: '手机号码不符合要求', trigger: 'change'
  }],
  seatType: [{ required: true, message: '此字段为必填项', trigger: 'change' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return

    console.log('submit!')

    const r = request({
      url: '/v1/order',
      method: 'POST',
      data: {
        trainId: props.id,
        passenger: {
          name: orderForm.passenger.name,
          idn: orderForm.passenger.idn,
          phone: orderForm.passenger.phone,
          type: orderForm.passenger.type
        },
        departureStationId: props.departureStationId,
        arrivalStationId: props.arrivalStationId,
        seatType: orderForm.seatType
      }
    })

    r.then((response: AxiosResponse<any>) => {
      console.log(response)
      ElNotification({
        offset: 70,
        title: '注册成功',
        message: h('info', { style: 'color: teal' }, response.data.msg),
      })
      router.push('/login')
    }).catch((error: AxiosError<any>) => {
      console.log(error)
      ElNotification({
        offset: 70,
        title: 'register错误',
        message: h('error', { style: 'color: teal' }, error.response?.data.msg),
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

  <el-form
    ref="orderFormRef"
    :model="orderForm"
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="orderForm.passenger.name" />
    </el-form-item>
    <el-form-item label="证件类型" prop="type">
      <el-select v-model="orderForm.passenger.type" placeholder="">
        <el-option label="身份证" value="身份证" />
        <el-option label="护照" value="护照" />
      </el-select>
    </el-form-item>
    <el-form-item label="证件号" prop="idn">
      <el-input v-model="orderForm.passenger.idn"/>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="orderForm.passenger.phone"/>
    </el-form-item>
    <el-form-item label="坐席" prop="seatType">
      <el-radio-group v-model="orderForm.seatType">
        <el-radio label="Sponsorship" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(orderFormRef)">
        提交
      </el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>

</style>