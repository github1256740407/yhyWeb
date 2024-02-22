<!-- 顶部导航栏 -->
<script setup lang="ts" name="HeaderNavigation"></script>
<template>
  <div id="HeaderNavigation">
    <!-- Logo -->
    <img src="@/assets/images/baseViewImg/avatar.jpg" alt="logo" />
    <!-- 竖线 -->
    <div class="verticalLine"></div>
    <!-- 导航菜单项 -->
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      text-color="#999"
      active-text-color="#ffd04b"
      background-color="#232323"
      default-active="1"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">剑网三</el-menu-item>
      <el-menu-item index="3">番剧</el-menu-item>
      <el-menu-item index="4">博客</el-menu-item>
      <el-menu-item index="5">项目</el-menu-item>
      <el-menu-item index="6">友链</el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
#HeaderNavigation {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 300px;
  background-color: rgb(35, 35, 35);
  img {
    width: 40px;
    border-radius: 6px;
  }
  .verticalLine {
    width: 1px;
    height: 20px;
    background-color: #999;
    margin: 0 20px;
  }
  .el-menu--horizontal.el-menu {
    border-bottom: none
  }
}
</style>
