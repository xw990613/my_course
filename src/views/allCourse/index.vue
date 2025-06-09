<template>
  <div class="all_course">
    <div class="left">
      <p class="filter">{{ $t('common.CourseFilter') }}</p>
      <leftSearch></leftSearch>
    </div>
    <div class="result">
      <p class="search_result">{{ $t('common.CourseResult', { total }) }}</p>
      <rightReault @send-value="handleValue"></rightReault>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import leftSearch from './components/leftSearch.vue';
  import rightReault from './components/rightReault.vue';
  export default {
    name: 'all_course',
    components: {
      leftSearch,
      rightReault,
    },
  };
</script>

<script setup lang="ts">
  const total = ref<number>(0);
  function handleValue(value: number) {
    total.value = value as number;
  }
</script>

<style scoped lang="scss">
  .all_course {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .left {
      margin: 0 38px 0 0;
      width: 230px;
      .filter {
        margin-bottom: 20px;
      }
    }
    .result {
      width: 810px;
    }
    .resultListCon {
      border: 1px solid #fff;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
      padding: 20px 20px 20px 306px;
      position: relative;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
    .search_result {
      margin-bottom: 20px;
      color: #999;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>
