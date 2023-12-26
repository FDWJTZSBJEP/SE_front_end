<template>
  <div>
    <h1>员工薪水折线图</h1>
    <div id="line-chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import request from '@/utils/request';

const lineChartInstance = ref<echarts.ECharts | null>(null);
const responseData = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await request({
      method: 'GET',
      url: 'https://mock.apifox.com/m1/3058331-0-default/administrator/staff-info/message',
    });

    responseData.value = response.data.data;
    renderLineChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const renderLineChart = () => {
  const xAxisData = responseData.value.map((employee) => employee.username);
  const seriesData = responseData.value.map((employee) => employee.salary);

  const option = {
    title: {
      text: '员工薪水折线图',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: seriesData,
      type: 'line',
    }],
  };

  lineChartInstance.value = echarts.init(document.getElementById('line-chart'))!;
  lineChartInstance.value.setOption(option);
};
</script>

<style>
/* 样式可以根据需要自行调整 */
</style>
