<template>
  <div>
    <!-- 折线图容器 -->
    <div id="line-chart" style="width: 400px; height: 300px;"></div>

    <!-- 饼状图容器 -->
    <div id="pie-chart" style="width: 400px; height: 300px;"></div>

    <!-- 柱状图容器 -->
    <div id="bar-chart" style="width: 400px; height: 300px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from 'echarts';
import request from "@/utils/request";
const fetchData = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "https://mock.apifox.com/m1/3058331-0-default/administrator/staff-info/message",
    });
    console.log(response);

    // 将获取到的数据存储在 ref 中
    responseData.value = response.data.data; // 注意这里取得的是 response.data.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const responseData = ref<any[]>([]);

onMounted(() => {
  fetchData();
  // 折线图数据
  const lineChartData = {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [10,20,40,30,20,40,12,1],
  };

  // 饼状图数据
  const pieChartData = {
    legendData: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
    seriesData: [
      { value: 335, name: 'Category A' },
      { value: 310, name: 'Category B' },
      { value: 234, name: 'Category C' },
      { value: 135, name: 'Category D' },
      { value: 1548, name: 'Category E' },
    ],
  };

  // 柱状图数据
  const barChartData = {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [120, 200, 150, 80, 70, 110, 130],
  };

  // 初始化图表实例
  const lineChart = echarts.init(document.getElementById('line-chart'));
  const pieChart = echarts.init(document.getElementById('pie-chart'));
  const barChart = echarts.init(document.getElementById('bar-chart'));

  // 渲染折线图
  renderLineChart(lineChart, lineChartData);

  // 渲染饼状图
  renderPieChart(pieChart, pieChartData);

  // 渲染柱状图
  renderBarChart(barChart, barChartData);
});

// 渲染折线图
const renderLineChart = (chart: echarts.ECharts, data: { xAxis: string[]; series: number[] }) => {
  const option = {
    title: {
      text: 'Line Chart',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: data.series,
      type: 'line',
    }],
  };

  chart.setOption(option);
};

// 渲染饼状图
const renderPieChart = (chart: echarts.ECharts, data: { legendData: string[]; seriesData: { value: number; name: string }[] }) => {
  const option = {
    title: {
      text: 'Pie Chart',
      left: 'center',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data.legendData,
    },
    series: [{
      data: data.seriesData,
      type: 'pie',
      radius: '50%',
      center: ['50%', '60%'],
    }],
  };

  chart.setOption(option);
};

// 渲染柱状图
const renderBarChart = (chart: echarts.ECharts, data: { xAxis: string[]; series: number[] }) => {
  const option = {
    title: {
      text: 'Bar Chart',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: data.series,
      type: 'bar',
    }],
  };

  chart.setOption(option);
};
</script>

<style>
/* 在这里添加样式 */
</style>
