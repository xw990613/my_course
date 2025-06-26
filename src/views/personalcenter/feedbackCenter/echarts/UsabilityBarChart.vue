<template>
  <div ref="chartRef" style="width: 100%; height: 600px"></div>
</template>

<script lang="ts">
  export default {
    name: 'UsabilityBarChart',
  };
</script>

<script setup lang="ts">
  import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';

  const props = defineProps({
    scores: {
      type: Array,
      required: true,
      default: () => [], // 8 个平均分数组，例如：[3.5, 4.0, 3.8, 4.2, 3.7, 3.9, 4.1, 4.0]
    },
  });

  const chartRef = ref(null);
  let chartInstance: echarts.ECharts | null = null;

  const dimensionLabels = [
    '1. Interface',
    '2. Smooth Operation',
    '3. Clarity of Explanation',
    '4. Course Relevance',
    '5. Independent Usage',
    '6. Loading Speed',
    '7. Reuse Willingness',
    '8. Recommendation Intention',
  ];

  const renderChart = () => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value);

    const option = {
      title: {
        text: 'System Usability – Average Scores',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      xAxis: {
        type: 'category',
        data: dimensionLabels,
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
      grid: {
        bottom: 100, // 增加为 100px，比如默认可能只有 40~60
      },
      yAxis: {
        type: 'value',
        min: 1,
        max: 5,
        name: 'Score',
      },
      series: [
        {
          type: 'bar',
          name: 'Average Score',
          data: props.scores,
          itemStyle: {
            color: '#73C0DE',
          },
          label: {
            show: true,
            position: 'top',
          },
        },
      ],
    };

    chartInstance.setOption(option);
  };

  onMounted(() => {
    renderChart();
  });

  watch(
    () => props.scores,
    () => {
      renderChart();
    },
    { deep: true },
  );

  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.dispose();
    }
  });
</script>

<style scoped lang="scss"></style>
