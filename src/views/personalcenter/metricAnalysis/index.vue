<template>
  <div class="metricAnalysis">
    <CardMMetrics style="margin-bottom: 30px" :metrics="metrics"></CardMMetrics>
    <BarChart
      style="margin-bottom: 30px"
      :xAxisData="xAxisData"
      :yAxisData="yAxisData"
    ></BarChart>
    <LineChart :legendData="legendData" :seriesData="seriesData"></LineChart>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'metricAnalysis',
  };
</script>

<script setup lang="ts">
  import BarChart from '@/views/personalcenter/metricAnalysis/components/barChart.vue';
  import LineChart from '@/views/personalcenter/metricAnalysis/components/lineChart.vue';
  import CardMMetrics from '@/views/personalcenter/metricAnalysis/components/card.vue';
  import { get_evaluation } from '@/api/avaluation';
  import { ref, type Ref } from 'vue';
  const xAxisData = ref<string[]>([]);
  const yAxisData = ref<number[]>([]);
  const legendData = ref<string[]>([]);
  const metrics = ref<Record<string, number>>({});
  const seriesData: Ref<
    Array<{
      name: string;
      type: string;
      data: (number | null)[];
    }>
  > = ref([]);
  async function getData() {
    try {
      const { data } = await get_evaluation();
      metrics.value = data.averageValue;
      xAxisData.value = Object.keys(data.averageValue);
      yAxisData.value = Object.values(data.averageValue);
      legendData.value = Object.keys(data.indicators).filter(
        key => key !== 'srl_dimensions',
      );
      seriesData.value = Object.entries(data.indicators)
        .filter(([key]) => key !== 'srl_dimensions')
        .map(([key, value]) => ({
          name: key,
          type: 'line',
          data: value as (number | null)[],
        }));
    } catch (error) {
      console.error('Error fetching evaluation data:', error);
    }
  }
  getData();
</script>

<style scoped lang="scss"></style>
