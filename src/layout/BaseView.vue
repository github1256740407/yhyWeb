<script setup lang="ts" name="BaseView"></script>

<template>
  <div id="BaseView">
    <div class="header">
      <HeaderNavigation />
    </div>
    <div class="body">
      <el-scrollbar height="100%">
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#BaseView {
  height: 100vh;
  // 顶部
  .header {
    width: 100vw;
    height: 60px;
  }
  // 内容
  .body {
    width: 100vw;
    height: calc(100vh - 60px);
  }
}
</style>
