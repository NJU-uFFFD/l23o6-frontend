<script setup lang="ts">

</script>

<template>
  <el-container>
    <el-header>
      <MenuComponent pageIndex="/train"/>
    </el-header>
    <el-main>
      <el-row justify="center" style="display: flex; align-content: center;height: 85vh;">
        <el-col :span="12" style="display: flex; align-items: center">
          <el-card class="search-ticket-card" shadow="hover" header="车次查询">
            <SearchTrainForm @formUpdated="() => {this.$router.push('/search#query');}"></SearchTrainForm>
          </el-card>
        </el-col>
        <el-col :span="12" style="display: flex; align-items: center">
          <Title style="margin: 0 auto 20vh"></Title>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<style scoped>

</style>