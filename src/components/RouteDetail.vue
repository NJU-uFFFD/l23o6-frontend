<template>

  <VueDraggable ref="el" v-model="list" :animation="100" @end="onEnd">
    <div v-for="item in list" :key="item.id">
      <el-card style="margin-bottom: 0.25%">
        {{ item.name }}
        {{item.id}}
      </el-card>
    </div>
  </VueDraggable>


  <pre>
    {{list}}
  </pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const list = ref([
  {
    name: 'aaaa',
    id: 1
  },
  {
    name: 'bbbb',
    id: 2
  },
  {
    name: 'cccc',
    id: 3
  },
  {
    name: 'dddd',
    id: 4
  }
])

const onEnd = () => {
  for(let i = 0; i < list.value.length; i++){
    list.value[i].id = i + 1
  }
}
</script>