<script setup lang="ts">
import AppAside from "./AppAside.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
       <!-- 顶部导航栏 -->
       <el-header class="el-header">开源社区分析</el-header>  

      <el-container>
        <!-- 左侧导航栏 -->
        <AppAside />     
        <el-main>
          <RouterView />
        </el-main>        
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  font-family: 'Arial', sans-serif;
  width:250%;
  margin-left: 0;

  .el-container {
    height: 100%;
    
  }

  .el-header {
    background-color: #F0F2F5;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    width: 250%;

  }

  .el-aside {
    background-color: #F0F2F5;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  .el-main {
    padding: 20px;
  }
}
</style>
