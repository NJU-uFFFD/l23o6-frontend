<script setup lang="ts">

import {reactive, ref} from "vue";
import {useUserStore} from "~/stores/user.js";
import {FormInstance} from "element-plus";

const ruleFormRef = ref<FormInstance>()

const user = useUserStore()
let edit = ref(false);
let form = reactive({
  username: '',
  name: '',
  type: '',
  id: '',
  phone: ''
});

const setForm = () => {
  form.username = user.username;
  form.name = user.name;
  form.type = user.type;
  form.id = user.id;
  form.phone = user.phone;
}

setForm();

const rules = reactive({
  username: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    min: 4, max: 16, message: '用户名长度不符合要求(4-16)', trigger: 'change'
  }, {
    pattern: /^[a-z\d-_]*$/, message: '用户名只能包含小写字母,数字,下划线和连字符', trigger: 'change'
  }],
  name: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    min: 2, max: 16, message: '姓名长度不符合要求(2-16)', trigger: 'change'
  }, {
    pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: '姓名只能包含中文', trigger: 'change'
  }],
  id: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    pattern: /^\d{18}$/, message: '身份证号码不符合要求', trigger: 'change'
  }],
  type: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    pattern: /^(身份证|护照|其他)$/, message: '证件类型不符合要求', trigger: 'change'
  }],
  phone: [{required: true, message: '此字段为必填项', trigger: 'change'}, {
    pattern: /^1[3456789]\d{9}$/, message: '手机号码不符合要求', trigger: 'change'
  }],
})


</script>

<template>
  <!--  <el-descriptions-->
  <!--    :column="1"-->
  <!--    border-->
  <!--    size="large"-->
  <!--  >-->
  <!--    <template #extra>-->
  <!--      <div v-if="edit">-->
  <!--        <el-button @click="edit=false;">取消</el-button>-->
  <!--        <el-button type="primary">提交</el-button>-->
  <!--      </div>-->
  <!--      <div v-else>-->
  <!--        <el-button type="primary" @click="edit=true;setForm()">编辑</el-button>-->
  <!--      </div>-->
  <!--    </template>-->
  <!--    <el-descriptions-item label-align="right" width="150">-->
  <!--      <template #label>-->
  <!--        <el-text style="height: 20vh ">-->
  <!--          <strong>用户名</strong>-->
  <!--        </el-text>-->
  <!--      </template>-->
  <!--      <div style="height: 4vh; display: flex; align-items: center">-->
  <!--        <div v-if="edit" style="display: flex; flex-grow: 1">-->
  <!--          <el-form-item :rules="rules.username" prop="username"-->
  <!--                        style="display: flex; justify-content: center; align-items: center; margin: 0 0 0 0;flex-grow: 1">-->
  <!--            <el-input v-model="form.username"/>-->
  <!--          </el-form-item>-->
  <!--        </div>-->
  <!--        <div v-else>-->
  <!--          {{ user.username }}-->
  <!--        </div>-->
  <!--      </div>-->

  <!--    </el-descriptions-item>-->
  <!--    <el-descriptions-item label-align="right">-->
  <!--      <template #label>-->
  <!--        <el-text>-->
  <!--          <strong>姓名</strong>-->
  <!--        </el-text>-->
  <!--      </template>-->
  <!--      <div style="height: 4vh; display: flex; align-items: center">-->
  <!--        <div v-if="edit" style="display: flex; flex-grow: 1">-->
  <!--          <el-form-item :rules="rules.name" prop="name"-->
  <!--                        style="display: flex; justify-content: center; align-items: center; margin: 0 0 0 0;flex-grow: 1">-->
  <!--            <el-input v-model="form.name"/>-->
  <!--          </el-form-item>-->
  <!--        </div>-->
  <!--        <div v-else>-->
  <!--          {{ user.name }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </el-descriptions-item>-->
  <!--    <el-descriptions-item label-align="right">-->
  <!--      <template #label>-->
  <!--        <el-text>-->
  <!--          <strong>证件类型</strong>-->
  <!--        </el-text>-->
  <!--      </template>-->
  <!--      <div style="height: 4vh; display: flex; align-items: center">-->
  <!--        <div v-if="edit" style="display: flex; flex-grow: 1">-->
  <!--          <el-form-item :rules="rules.type" prop="type"-->
  <!--                        style="display: flex; justify-content: center; align-items: center; margin: 0 0 0 0;flex-grow: 1">-->
  <!--            <el-select v-model="form.type">-->
  <!--              <el-option value="身份证"/>-->
  <!--              <el-option value="护照"/>-->
  <!--              <el-option value="其他"/>-->
  <!--            </el-select>-->
  <!--          </el-form-item>-->
  <!--        </div>-->
  <!--        <div v-else>-->
  <!--          {{ user.type }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </el-descriptions-item>-->
  <!--    <el-descriptions-item label-align="right">-->
  <!--      <template #label>-->
  <!--        <el-text>-->
  <!--          <strong>证件号码</strong>-->
  <!--        </el-text>-->
  <!--      </template>-->
  <!--      <div style="height: 4vh; display: flex; align-items: center">-->
  <!--        <div v-if="edit" style="display: flex; flex-grow: 1">-->
  <!--          <el-form-item :rules="rules.id" prop="id"-->
  <!--                        style="display: flex; justify-content: center; align-items: center; margin: 0 0 0 0;flex-grow: 1">-->
  <!--            <el-input v-model="form.id"/>-->
  <!--          </el-form-item>-->
  <!--        </div>-->
  <!--        <div v-else>-->
  <!--          {{ user.id }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </el-descriptions-item>-->
  <!--    <el-descriptions-item label-align="right">-->
  <!--      <template #label>-->
  <!--        <el-text>-->
  <!--          <strong>手机号码</strong>-->
  <!--        </el-text>-->
  <!--      </template>-->
  <!--      <div style="height: 4vh; display: flex; align-items: center">-->
  <!--        <div v-if="edit" style="display: flex; flex-grow: 1">-->
  <!--          <el-form-item :rules="rules.phone" prop="phone"-->
  <!--                        style="display: flex; justify-content: center; align-items: center; margin: 0 0 0 0;flex-grow: 1">-->
  <!--            <el-input v-model="form.phone"/>-->
  <!--          </el-form-item>-->
  <!--        </div>-->
  <!--        <div v-else>-->
  <!--          {{ user.phone }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </el-descriptions-item>-->
  <!--  </el-descriptions>-->

  <div v-if="edit" style="display: flex; flex-direction: row-reverse; justify-content: flex-start">
    <el-space>
      <el-button @click="edit=false;">取消</el-button>
      <el-button type="primary">提交</el-button>
    </el-space>


  </div>
  <div v-else style="display: flex; flex-direction: row-reverse; justify-content: flex-start">
    <el-space>
      <el-button type="primary" @click="edit=true;setForm()">编辑</el-button>
    </el-space>
  </div>

  <br>

  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="7vh"
    class="demo-ruleForm"
    label-position="right"
    hide-required-asterisk
    :disabled="!edit"
    size="large"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" style="width: 25vh"/>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" style="width: 25vh"/>
    </el-form-item>
    <el-form-item label="证件类型" prop="type">
      <el-select v-model="form.type" placeholder=" " style="width: 25vh">
        <el-option value="身份证"/>
        <el-option value="护照"/>
        <el-option value="其他"/>
      </el-select>
    </el-form-item>
    <el-form-item label="证件号码" prop="id">
      <el-input v-model="form.id" type="text" style="width: 25vh"/>
    </el-form-item>

    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" style="width: 25vh"/>
    </el-form-item>
  </el-form>


</template>

<style scoped>
</style>