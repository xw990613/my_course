<template>
  <div ref="chartRef" style="width: 100%; height: 500px"></div>
</template>

<script lang="ts">
  export default {
    name: 'LineChart',
  };
</script>

<script setup lang="ts">
  import { ref, onMounted, getCurrentInstance, defineProps, watch } from 'vue';

  const chartRef = ref<HTMLDivElement | null>(null);
  let chart: any = null;

  const props = defineProps<{
    legendData: string[];
    seriesData: Array<{
      name: string;
      type: string;
      data: (number | null)[];
    }>;
  }>();

  // 获取 echarts 实例
  const { appContext } = getCurrentInstance()!;
  const echarts = appContext.config.globalProperties.$echarts;

  // ✅ 初始化图表
  function initChart() {
    if (!chartRef.value || !echarts) return;
    chart = echarts.init(chartRef.value);
    setOption();
  }

  // ✅ 设置图表配置项
  function setOption() {
    if (!chart) return;
    const allValues = props.seriesData.flatMap(
      s => s.data.filter(v => v !== null) as number[],
    );
    const maxValue = Math.max(...allValues);
    const yAxisMax = maxValue <= 1 ? 1 : 'dataMax';

    chart.setOption({
      title: {
        text: 'Trends of Evaluation Metrics Across SRL Dimensions',
        left: 'center',
        top: 0, // 标题往上移
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any[]) => {
          const recordId = params[0]?.axisValue;
          let result = `<b>Record ID: ${recordId}</b><br/>`;
          result += params
            .map(p => {
              return `${p.marker} ${p.seriesName}: <strong>${p.data}</strong>`;
            })
            .join('<br/>');
          return result;
        },
      },
      legend: {
        top: 30, // 图例往下移，避免与标题重叠
        left: 'center',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 12,
          color: '#333',
        },
        data: props.legendData,
      },
      grid: {
        bottom: 100,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Array.from(
          { length: props.seriesData[0]?.data.length || 0 },
          (_, i) => (i + 1).toString(),
        ), // ⬅ 自动计算横轴标签
        name: 'User ID',
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
        max: yAxisMax, // ✅ 动态设置 max
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
      series: props.seriesData,
    });
  }

  // 初始加载
  onMounted(() => {
    initChart();
  });

  // ✅ 监听 props 变化（自动更新图表）
  watch(
    () => [props.legendData, props.seriesData],
    () => {
      if (chart) {
        setOption(); // 更新图表配置
      }
    },
    { deep: true },
  );
</script>

<style scoped lang="scss"></style>
