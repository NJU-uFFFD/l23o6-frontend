<script setup lang="ts">
import { trains } from "~/store/store.js";
// let train = {
//   trainName: "G1234",
//   startStation: "北京",
//   endStation: "上海",
//   departureTime: Date(),
//   arrivalTime: Date(),
//   duration: "0s",
//   tickets: [
//     {
//       seatType: "无座",
//       price: 50,
//       remain: 100
//     },
//     {
//       seatType: "二等座",
//       price: 100,
//       remain: 100
//     },
//     {
//       seatType: "一等座",
//       price: 200,
//       remain: 100
//     },
//     {
//       seatType: "商务座",
//       price: 300,
//       remain: 100
//     }
//   ]
// }
</script>

<template>
<!--  <Menu pageIndex="/train" />-->
  <Search />


  <Train v-for="train in trains.res" v-bind="train"/>

</template>

<style scoped>

</style>