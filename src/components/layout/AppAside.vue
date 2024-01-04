<script setup lang="ts">
</script>

<template>
  <el-aside class="aside">
    <el-menu router class="menu">
      <el-menu-item index="/dashboard">
        <el-icon><IEpSetting /></el-icon><span>社区发展趋势</span>
      </el-menu-item>
      <el-menu-item index="/analyze">
        <el-icon><IEpSetting /></el-icon><span>交叉数据分析</span>
      </el-menu-item>
      <el-menu-item index="/show">
        <el-icon><IEpSetting /></el-icon><span>社区排名展示</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><IEpSetting /></el-icon><span>关于我们</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.aside {
  background-color: #f0f2f5;
  height: 100vh;
  width: 200px;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  .menu {
    background-color: #f0f2f5;
    width: 180px;

    .el-menu-item {
      display: flex;
      align-items: center;
      padding: 10px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e6e6f5;
      }

      .el-icon {
        margin-right: 10px;
        font-size: 18px;
        color: #409eff;
      }

      span {
        font-size: 14px;
        color: #606266;
      }
    }
  }
}
</style>
