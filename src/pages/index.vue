<script lang="ts" setup>

let stations = {
  1: "fdsf",
  2: "dfgdfg",
  3: "dfgdfdfgg",
  4: "dfgdfgdfgsdf",
}

let stationIds = [1, 2, 3, 4]

// let train = {
//     trainName: "G1234",
//     startStation: "北京",
//     endStation: "上海",
//     departureTime: Date(),
//     arrivalTime: Date(),
//     duration: "0s",
//     tickets: [
//         {
//             seatType: "无座",
//             price: 50,
//             remain: 100
//         },
//         {
//             seatType: "二等座",
//             price: 100,
//             remain: 100
//         },
//         {
//             seatType: "一等座",
//             price: 200,
//             remain: 100
//         },
//         {
//             seatType: "商务座",
//             price: 300,
//             remain: 100
//         }
//     ]
// }
</script>

<template>

<!--    <el-container>-->
<!--      <el-header>-->
<!--        <MenuComponent pageIndex="/" />-->
<!--      </el-header>-->
<!--      <el-main>-->
<!--        <el-row justify="center" style="display: flex; align-content: center;height: 85vh;">-->
<!--          <el-col :span="12" style="display: flex; align-items: center">-->
<!--            <el-card class="search-ticket-card" shadow="hover" header="车票查询">-->
<!--              <SearchTicketForm @formUpdated="() => {this.$router.push('/search#query');}"></SearchTicketForm>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--          <el-col :span="12" style="display: flex; align-items: center">-->
<!--            <Title style="margin: 0 auto 20vh"></Title>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-main>-->
<!--    </el-container>-->


<!--<draggabletest/>-->
<!--<RouteDetailForm :station-ids-prop="stationIds" :stations-prop="stations"/>-->
  <!--<OrderDetail>-->
  <!--</OrderDetail>-->
  <!--<user/>-->
  <!--    <Title />-->
  <!--    <train-detail train-id="1" />-->
  <!--    <login></login>-->
</template>

<style scoped>
.search-ticket-card {
  width: 500px;
  height: 300px;
  margin: 0 auto 20vh;
}
</style>

