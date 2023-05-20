<!--<template>-->
<!--  <div style="width:800px">-->

<!--    <el-table :data="tableData"-->
<!--              border-->
<!--              row-key="id"-->
<!--              align="left" id="nmsl">-->
<!--      <el-table-column v-for="(item, index) in col"-->
<!--                       :key="`col_${index}`"-->
<!--                       :prop="dropCol[index].prop"-->
<!--                       :label="item.label">-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <pre style="text-align: left">-->
<!--      {{dropCol}}-->
<!--    </pre>-->
<!--    <hr>-->
<!--    <pre style="text-align: left">-->
<!--      {{tableData}}-->
<!--    </pre>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import Sortable from 'sortablejs'-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      col: [-->
<!--        {-->
<!--          label: '姓名',-->
<!--          prop: 'name'-->
<!--        },-->
<!--        {-->
<!--          label: '地址',-->
<!--          prop: 'address'-->
<!--        },-->
<!--        {-->
<!--          label: 'date',-->
<!--          prop: 'date'-->
<!--        }-->
<!--      ],-->
<!--      dropCol: [-->
<!--        {-->
<!--          label: '姓名',-->
<!--          prop: 'name'-->
<!--        },-->
<!--        {-->
<!--          label: '地址',-->
<!--          prop: 'address'-->
<!--        },-->
<!--        {-->
<!--          label: 'date',-->
<!--          prop: 'date'-->
<!--        }-->
<!--      ],-->
<!--      tableData: [-->
<!--        {-->
<!--          id: '1',-->
<!--          date: '1',-->
<!--          name: '王小虎1',-->
<!--          address: '上海市普陀区金沙江路 100 弄'-->
<!--        },-->
<!--        {-->
<!--          id: '2',-->
<!--          date: '2',-->
<!--          name: '王小虎2',-->
<!--          address: '上海市普陀区金沙江路 200 弄'-->
<!--        },-->
<!--        {-->
<!--          id: '3',-->
<!--          date: '3',-->
<!--          name: '王小虎3',-->
<!--          address: '上海市普陀区金沙江路 300 弄'-->
<!--        },-->
<!--        {-->
<!--          id: '4',-->
<!--          date: '4',-->
<!--          name: '王小虎4',-->
<!--          address: '上海市普陀区金沙江路 400 弄'-->
<!--        }-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.rowDrop()-->
<!--  },-->
<!--  methods: {-->
<!--    //行拖拽-->
<!--    rowDrop() {-->
<!--      const tbody = document.querySelector('.el-table__body-wrapper tbody')-->
<!--      const _this = this-->
<!--      Sortable.create(tbody, {-->
<!--        onEnd({ newIndex, oldIndex }) {-->
<!--          const currRow = _this.tableData.splice(oldIndex, 1)[0]-->
<!--          _this.tableData.splice(newIndex, 0, currRow)-->
<!--          console.log(oldIndex)-->
<!--          console.log(newIndex)-->
<!--          console.log('\n')-->
<!--          // _this.sortDate()-->
<!--        },-->
<!--      })-->
<!--    },-->

<!--    sortDate(){-->
<!--      for(let i = 0; i < this.tableData.length; i++){-->
<!--        this.tableData[i].date = i + 1-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->


<template>
  <div style="width:800px">

    <!--    <el-table :data="tableData"-->
    <!--              border-->
    <!--              row-key="id"-->
    <!--              align="left" id="nmsl">-->
    <!--      <el-table-column v-for="(item, index) in col"-->
    <!--                       :key="`col_${index}`"-->
    <!--                       :prop="dropCol[index].prop"-->
    <!--                       :label="item.label">-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->
    <div id="nmsl">
      <el-card v-for="item in tableData" :key="item.name">
        {{item.name}}
        {{item.address}}
        {{item.date}}
      </el-card>
    </div>
    <pre style="text-align: left">
      {{dropCol}}
    </pre>
    <hr>
    <pre style="text-align: left">
      {{tableData}}
    </pre>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      col: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: 'date',
          prop: 'date'
        }
      ],
      dropCol: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: 'date',
          prop: 'date'
        }
      ],
      tableData: [
        {
          id: '1',
          date: '1',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄'
        },
        {
          id: '2',
          date: '2',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄'
        },
        {
          id: '3',
          date: '3',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄'
        },
        {
          id: '4',
          date: '4',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄'
        }
      ]
    }
  },
  mounted() {
    this.rowDrop()
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.getElementById('nmsl')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          console.log(currRow)
          console.log(_this.tableData)
          _this.tableData.splice(newIndex, 0, currRow)
          console.log(_this.tableData)

          console.log(oldIndex)
          console.log(newIndex)
          console.log('\n')
          _this.sortDate()
        },
      })
    },

    sortDate(){
      for(let i = 0; i < this.tableData.length; i++){
        this.tableData[i].date = i + 1
      }
    }
  }
}
</script>