<template>
  <div ref="chartRef" style="width: 100%; height: 500px"></div>
</template>

<script lang="ts">
  export default {
    name: 'BarChart',
  };
</script>

<script setup lang="ts">
  import { ref, onMounted, getCurrentInstance, defineProps, watch } from 'vue';
  let chart: any;

  const chartRef = ref<HTMLDivElement | null>(null);

  const props = defineProps<{
    xAxisData: string[];
    yAxisData: number[];
  }>();

  // ✅ 初始化图表并渲染空图
  onMounted(() => {
    const { appContext } = getCurrentInstance()!;
    const echarts = appContext.config.globalProperties.$echarts;
    if (!chartRef.value || !echarts) return;

    chart = echarts.init(chartRef.value);

    updateChart(props.xAxisData, props.yAxisData); // ✅ 显式调用
  });

  watch(
    [() => props.xAxisData, () => props.yAxisData],
    ([xData, yData]) => updateChart(xData, yData),
    { deep: true },
  );

  function updateChart(xData: string[], yData: number[]) {
    if (!chart) return;
    console.log('✅ UpdateChart Triggered: yData.length =', yData.length);
    chart.clear();
    const coloredData = [
      { value: yData[0], itemStyle: { color: '#5470C6' } }, // precision → 蓝色
      { value: yData[1], itemStyle: { color: '#91CC75' } }, // recall → 绿色
      { value: yData[2], itemStyle: { color: '#FAC858' } }, // f1_score → 橙黄色
      { value: yData[3], itemStyle: { color: '#EE6666' } }, // precision_at_3 → 红色
      { value: yData[4], itemStyle: { color: '#73C0DE' } }, // precision_at_5 → 青蓝色
    ];
    chart.setOption({
      title: {
        text: 'Average Distribution of Evaluation Metrics',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis', // ✅ 鼠标悬浮在轴上时显示
        axisPointer: {
          type: 'shadow', // ✅ 默认为 shadow，适合柱状图
        },
        formatter: (params: any) => {
          console.log('✅ Tooltip Formatter Triggered:', params);
          const { name, value } = params[0];
          return `${name}: ${value}`;
        },
      },
      xAxis: {
        type: 'category',
        data: xData,
        name: 'Metrics',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333',
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1,
        name: 'Rate',
        nameLocation: 'middle',
        nameGap: 50,
        nameRotate: 0,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333',
        },
      },
      series: [{ type: 'bar', data: coloredData }],
      graphic:
        coloredData.length === 0
          ? [
              {
                type: 'text',
                left: 'center',
                top: 'middle',
                style: {
                  text: 'No Data Available',
                  fontSize: 20,
                  fill: '#888',
                },
              },
            ]
          : [],
    });
  }
</script>

<style scoped lang="scss"></style>
