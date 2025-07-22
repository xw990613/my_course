<template>
  <div ref="chartRef" style="width: 100%; height: 800px"></div>
</template>

<script lang="ts">
  export default {
    name: 'SrlSurveyComparisonChart',
  };
</script>

<script setup lang="ts">
  import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';

  // Props: 接收外部传入的两个数据数组
  const props = defineProps({
    preScores: {
      type: Array,
      required: true,
    },
    postScores: {
      type: Array,
      required: true,
    },
  });

  const chartRef = ref(null);
  let chartInstance: echarts.ECharts | null = null;

  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return;

    chartInstance = echarts.init(chartRef.value);
    const option = getChartOptions(props.preScores, props.postScores);
    chartInstance.setOption(option);
  };

  // 图表配置生成函数
  function getChartOptions(preScores: any, postScores: any) {
    return {
      // title: {
      //   text: 'SRL Survey Comparison (Pre vs Post)',
      //   left: 'center',
      // },
      title: {
        text: 'SRL Survey Comparison (Pre vs Post)',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
        },
      },

      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'shadow',
      //   },
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params: any) {
          const preItem = params.find(
            (p: { seriesName: string }) => p.seriesName === 'Pre-SRLSurvey',
          );
          const postItem = params.find(
            (p: { seriesName: string }) => p.seriesName === 'Post-SRLSurvey',
          );
          const pre = preItem?.value || 0;
          const post = postItem?.value || 0;
          const diff = (post - pre).toFixed(2);
          const percent =
            pre === 0 ? 'N/A' : (((post - pre) / pre) * 100).toFixed(1) + '%';
          const dimension = params[0].name;

          const arrow =
            post > pre
              ? `<span style="color:#67C23A;">▲</span>`
              : post < pre
                ? `<span style="color:#F56C6C;">▼</span>`
                : `<span style="color:#909399;">—</span>`;

          return `
        <div style="font-size: 14px; line-height: 1.6;">
          <strong>${dimension}</strong><br/>
          <span style="display:inline-block;margin-right:6px;border-radius:10px;width:10px;height:10px;background-color:${preItem.color};"></span>
          Pre-SRLSurvey: <strong>${pre}</strong><br/>
          <span style="display:inline-block;margin-right:6px;border-radius:10px;width:10px;height:10px;background-color:${postItem.color};"></span>
          Post-SRLSurvey: <strong>${post}</strong><br/>
          <div style="margin-top: 5px; color: #333;">
            ${arrow} <span style="font-weight: 500;">Change:</span> <span style="color:#409EFF;">${diff}</span>
            (<span style="color:#409EFF;">${percent}</span>)
          </div>
        </div>
      `;
        },
      },

      legend: {
        top: '6%',
        left: 'center',
        itemWidth: 14,
        itemHeight: 14,
        data: ['Pre-SRLSurvey', 'Post-SRLSurvey'],
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true,
      },
      // xAxis: {
      //   type: 'value',
      //   min: 0,
      //   max: 5,
      // },
      xAxis: {
        type: 'value',
        min: 0,
        max: 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#999',
          },
        },
        axisLabel: {
          fontSize: 12,
        },
      },

      yAxis: {
        type: 'category',
        data: [
          'Motivation Regulation',
          'Goal Setting',
          'Time Management',
          'Self-Monitoring',
          'Help Seeking',
          'Task Strategy Use',
          'Self-Reflection',
        ],
      },
      // series: [
      //   {
      //     name: 'Pre-SRLSurvey',
      //     type: 'bar',
      //     data: preScores,
      //     itemStyle: {
      //       color: '#5470C6',
      //     },
      //   },
      //   {
      //     name: 'Post-SRLSurvey',
      //     type: 'bar',
      //     data: postScores,
      //     itemStyle: {
      //       color: '#91CC75',
      //     },
      //   },
      // ],
      series: [
        {
          name: 'Pre-SRLSurvey',
          type: 'bar',
          data: preScores,
          itemStyle: {
            color: '#5470C6',
            borderRadius: [4, 4, 0, 0], // 圆角柱状图
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            fontSize: 14,
            color: '#333',
          },
          barGap: '30%',
        },
        {
          name: 'Post-SRLSurvey',
          type: 'bar',
          data: postScores,
          itemStyle: {
            color: '#91CC75',
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            fontSize: 14,
            color: '#333',
          },
        },
      ],
    };
  }

  // 初始化和响应式更新
  onMounted(() => {
    initChart();
  });

  watch(
    () => [props.preScores, props.postScores],
    () => {
      if (chartInstance) {
        const option = getChartOptions(props.preScores, props.postScores);
        chartInstance.setOption(option);
      }
    },
  );

  // 组件卸载时销毁图表实例
  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.dispose();
    }
  });
</script>

<style scoped lang="scss"></style>
