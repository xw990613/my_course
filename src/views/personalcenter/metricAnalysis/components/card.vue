<template>
  <div class="metrics-container">
    <div class="metrics-card" v-for="(value, key) in metrics" :key="key">
      <div class="metrics-label">{{ key }}</div>
      <div class="metrics-value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CardMMetrics',
  };
</script>

<script setup lang="ts">
  defineProps<{
    metrics: Record<string, number>;
  }>();
</script>

<style scoped lang="scss">
  .metrics-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    padding: 20px;
    padding-top: 0; /* 去掉顶部间距 */
  }

  .metrics-card {
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    text-align: center;
    transition:
      transform 0.2s ease,
      box-shadow 0.3s ease;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .metrics-card:hover {
    transform: scale(1.03); /* 轻微放大 */
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12); /* 阴影也加强一点 */
  }
  .metrics-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .metrics-label {
    color: #777;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    // text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .metrics-value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
</style>
