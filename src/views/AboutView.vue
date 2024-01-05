<template>
  <el-tabs type="border-card">
    <h1>语言预测变化</h1>
    <div ref="TimeLanguageLineContainer" style="width: 100%; height: 600px;"></div>
  </el-tabs>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { ref, onMounted } from "vue";
import * as echarts from 'echarts';

const responseData = ref<any[]>([]);

const fetchData = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "https://mock.apifox.com/m1/3807087-0-default/language_time",
    });
    responseData.value = response.data.data || [];
    renderTimeLanguageLineChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const TimeLanguageLineContainer = ref(null)
const renderTimeLanguageLineChart = () =>{
  const dates = responseData.value.map(item => item.time.split(' ')[0]);
// 提取所有语言
  const languages = Object.keys(responseData.value[0]).filter(key => key !== 'time');

// 为每种语言创建一个系列
  const series = languages.map(language => {
    return {
      name: language,
      type: 'line',
      data: responseData.value.map(item => item[language]),
      smooth:true ,
      symbol: 'circle', // 设置点的形状
      symbolSize: 6, // 设置点的大小
      lineStyle: {
        width: 2, // 设置线条宽度
        type: 'dotted', // 设置线条类型，可以是 'solid', 'dashed', 'dotted' 等
      },
    };
  });

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    dataZoom: {
      type:'inside'
    },
    legend: {
      data: languages
    },
    toolbox: {  // Add the toolbox property here
    feature: {
      saveAsImage: {},
      dataZoom: {},
      restore: {},
    },
  },
    xAxis: {
      type: 'category',
      data: dates ,
      name: '时间',
      axisLabel: {
        rotate: 45, // 设置横轴刻度标签旋转角度
        interval: Math.ceil(dates.length / 10), // 设置横轴刻度标签显示间隔
      },
    },
    yAxis: {
      type: 'value'
    },
    series: series
  };

// 初始化并设置选项
  const lineChart = echarts.init(TimeLanguageLineContainer.value);
  lineChart.setOption(option);

  // 设置定时器，每隔5秒重新渲染图表
  setInterval(() => {    
    // 调用 setOption 方法更新图表
    lineChart.setOption(option);
  }, 5000); // 设置定时器的时间间隔，单位为毫秒，这里设置为5秒
  function getLineStyleByTime(time: string | number | Date) {
    const thresholdTime = new Date('2022-01-01'); // 设置时间阈值
    return new Date(time) < thresholdTime ? 'solid' : 'dashed';   
  }
}

// 语言项目部分结束
onMounted(fetchData);
</script>

<style>
.chart-container {
  width: 600px;
  height: 700px;
  margin: 20px auto;
}
</style>
