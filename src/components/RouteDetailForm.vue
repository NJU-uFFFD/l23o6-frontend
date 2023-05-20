<script setup lang="ts">
import {reactive, ref} from 'vue'
import {VueDraggable} from 'vue-draggable-plus'
import {CloseBold, Expand} from "@element-plus/icons-vue";
import {useStationsStore} from "~/stores/stations.js";

const stations = useStationsStore()

const props = defineProps({
  name: String,
  station_ids: Array
})


let route = reactive({
  name: '',
  station_ids: []
})
let add = ref(false)
let toAddId = ref(1)


console.log(props.station_ids)
console.log('nmsl')
for (let i = 0; i < props.station_ids?.length; i++) {
  route.station_ids.push(props.station_ids?.[i])
}
route.name = <string>props.name;

console.log(route.station_ids)


const addStation = () => {
  route.station_ids.push(toAddId.value)
  add.value = false;
}


const onEnd = () => {
  // refreshIndex()
}

const deleteStation = (index) => {
  route.station_ids.splice(index, 1)
}

</script>

<template>
  <div>
    <div style="display: flex; width: 70%">
      <el-text tag="b">
        路线名
      </el-text>
      <el-input v-model="route.name"/>
    </div>





    <el-button @click="add=true">
      添加站点
    </el-button>
    <VueDraggable ref="el" v-model="route.station_ids" :animation="100" handle=".handle" @end="onEnd">
      <div v-for="station in route.station_ids" :key="station">
        <el-card style="margin-bottom: 0.25%">
          <el-icon class="handle">
            <Expand/>
          </el-icon>
          {{ route.station_ids.indexOf(station) + 1 }}
          {{ stations.idToName[station] }}
          <el-icon @click="deleteStation(route.station_ids.indexOf(station))">
            <CloseBold/>
          </el-icon>
        </el-card>
      </div>
    </VueDraggable>

    <el-button @click="this.$emit('formSubmitted', route)" style="margin-top: 2vh" type="primary">
      确认
    </el-button>


    <!--    <pre>-->
    <!--      {{ route.station_ids }}-->
    <!--    </pre>-->
  </div>


  <el-dialog v-model="add" title="添加站点" width="30%" draggable @close="toAddId=1">
    <div>请选择新的站点</div>
    <br/>
    <div style="display: flex;">
      <el-space>
        <el-select v-model="toAddId">
          <el-option
            v-for="item in stations.rawData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="addStation">
          确定
        </el-button>
      </el-space>
    </div>
  </el-dialog>

</template>
