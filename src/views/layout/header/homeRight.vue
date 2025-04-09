<template>
  <el-input v-model="input" style="width: 240px" placeholder="请输入" :suffix-icon="Search" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input = ref('')
</script>
