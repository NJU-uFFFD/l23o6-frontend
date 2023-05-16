<script lang="ts" setup>


import SearchPage from "~/pages/searchPage.vue";

let train = {
    trainName: "G1234",
    startStation: "北京",
    endStation: "上海",
    departureTime: Date(),
    arrivalTime: Date(),
    duration: "0s",
    tickets: [
        {
            seatType: "无座",
            price: 50,
            remain: 100
        },
        {
            seatType: "二等座",
            price: 100,
            remain: 100
        },
        {
            seatType: "一等座",
            price: 200,
            remain: 100
        },
        {
            seatType: "商务座",
            price: 300,
            remain: 100
        }
    ]
}
</script>

<template>
    <Menu pageIndex="/" />
    <Title />
<!--    <Train v-bind="train"/>-->
<!--    <Search />-->
    <SearchPage/>
</template>
