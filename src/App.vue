<script setup lang="ts" name="app">
// Element-Plus中文化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "element-plus/dist/index.css";
const locale = ref(zhCn);
</script>

<template>
  <el-config-provider :locale="locale">
      <router-view></router-view>
  </el-config-provider>
</template>
