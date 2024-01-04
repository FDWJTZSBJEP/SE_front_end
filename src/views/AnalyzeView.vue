<template>
  <el-tabs type="border-card">
    <el-tab-pane label="语言时间">
      <div v-if="TimeLanguageData.length === 0" class="loading-message">暂无数据</div>
      <div id="language-time-bar-chart" style="width: 1400px; height: 700px;"></div>

    </el-tab-pane>

    <el-tab-pane label="国家用户">
      <div>
        <h1>国家用户分析图</h1>
        <div id="pie-chart" style="width: 800%; height: 400px;"></div>
      </div>
    </el-tab-pane>

    <el-tab-pane label="语言项目">
      <div id="bar-chart" style="width: 600px; height: 400px;"></div>
    </el-tab-pane>

    <el-tab-pane label="国家粉丝">
      <!-- 社区成员的内容 -->
    </el-tab-pane>

    <el-tab-pane label="时间段操作数">
      <!-- 社区成员的内容 -->
    </el-tab-pane>

    <el-tab-pane label="语言收藏量">
      <!-- 社区成员的内容 -->
    </el-tab-pane>

    <el-tab-pane label="提交数量与时间">
      <!-- 社区成员的内容 -->
    </el-tab-pane>

    <el-tab-pane label="语言查阅量">
      <!-- 社区成员的内容 -->
    </el-tab-pane>
  </el-tabs>
</template>



<script setup lang="ts">
import request from "@/utils/request";
import {ref, onMounted, watch} from "vue";
import * as echarts from 'echarts';

const pieChartInstance = ref<echarts.ECharts | null>(null);
const barChartInstance = ref<echarts.ECharts | null>(null);

const responseData2 = ref<any[]>([]);
const responseData3 = ref<any[]>([]);



//时间语言相关开始
const languageTimeBarChartInstance = ref<echarts.ECharts | null>(null);
const TimeLanguageData = ref<any[]>([]);
const getTimeLanguageData = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "https://mock.apifox.com/m1/3807087-0-default/language_time1",
    });
    TimeLanguageData.value = response.data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const renderLanguageTimeBarChart = () => {
  if (TimeLanguageData.value.length === 0) return;
  const combinedData = Object.entries(TimeLanguageData.value[0])
      .filter(([key]) => key !== 'time')
      .map(([language, value]) => ({ language, value: Number(value) }));

  // 按照数量从小到大排序
  combinedData.sort((a, b) => b.value - a.value);

  // 分离语言和数量到各自的数组
  const languages = combinedData.map(item => item.language);
  const data = combinedData.map(item => item.value);

  const option = {
    title: {
      text: `语言使用情况 (${TimeLanguageData.value[0].time})`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis', // 或者 'item' 根据需要选择
      axisPointer: {
        type: 'shadow' // 'shadow'为阴影指示器
      }
    },
    xAxis: {
      type: 'category',
      data: languages,
      axisLabel: {
        rotate: 45, // 旋转标签
        interval: 0, // 显示所有标签
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data,
      type: 'bar',
      barWidth : '80%',
      barGap: '10%', // 设置条形图之间的间隙
      label: {
        show: true, // 显示标签
        position: 'top', // 标签位置
        formatter: '{c}' // 标签格式，{c}代表数据值
      }
    }]
  };

  const chartDom = document.getElementById('language-time-bar-chart');
  if (chartDom) {
    languageTimeBarChartInstance.value = echarts.init(chartDom);
    languageTimeBarChartInstance.value.setOption(option);
  }
};

const sortAndUpdateChart = (index) => {
  // 获取当前数据点并进行排序
  const currentData = TimeLanguageData.value[index];
  const sortedData = Object.entries(currentData)
      .filter(([key]) => key !== 'time') // 排除'time'
      .map(([language, value]) => ({ language, value: Number(value) })) // 转换为对象数组
      .sort((a, b) => b.value - a.value); // 排序

  // 提取排序后的语言和数量
  const languages = sortedData.map(item => item.language);
  const values = sortedData.map(item => item.value);

  // 更新图表
  languageTimeBarChartInstance.value?.setOption({
    title: {
      text: `语言使用情况 (${TimeLanguageData.value[index].time})`,
      left: 'center'
    },
    xAxis: {
      data: languages
    },
    series: [{
      data: values
    }]
  });
};

let currentIndex = 0;
const startAutoPlay = () => {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % TimeLanguageData.value.length;
    sortAndUpdateChart(currentIndex);
  }, 3000); //每三秒变化
};

onMounted(() => {
  getTimeLanguageData();
  startAutoPlay();
});

watch(TimeLanguageData, () => {
  renderLanguageTimeBarChart();
});

//时间语言相关结束



const fetchData2 = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "https://mock.apifox.com/m1/3807087-0-default/country_user",
    });
    responseData2.value = response.data.data || [];
    renderPieChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const renderPieChart = () => {
  const legendData = responseData2.value.map((data) => data.location);
  const seriesData = responseData2.value.map((data) => ({ name: data.location, value: data.followers }));

  const option = {
    title: {
      text: '国家用户饼图',
      left: 'center',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: legendData,
    },
    series: [{
      name: '国家用户',
      type: 'pie',
      radius: '55%',
      center: ['60%', '70%'],
      data: seriesData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }],
  };

  pieChartInstance.value = echarts.init(document.getElementById('pie-chart'))!;
  pieChartInstance.value.setOption(option);
};

const fetchData3 = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "https://mock.apifox.com/m1/3807087-0-default/language_projectNum",
    });
    responseData3.value = response.data.data || [];
    renderBarChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



const renderBarChart = () => {
  const xAxisData = responseData3.value.map((data) => data.language);
  const seriesData = responseData3.value.map((data) => ({ name: data.language, value: data.project_num }));

  const option = {
    title: {
      text: '国家用户条形图',
      left: 'center',
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: seriesData
      }
    ]
  };

  barChartInstance.value = echarts.init(document.getElementById('bar-chart'))!;
  barChartInstance.value.setOption(option);
};


onMounted(fetchData2);
onMounted(fetchData3);

</script>

<style>
.el-tabs__item {
  font-size: 18px;
  font-weight: bold;
}

.employee-info {
  margin-top: 20px;
}

.employee-info p {
  margin-bottom: 8px;
}

.employee-info hr {
  margin: 16px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.loading-message {
  font-size: 18px;
  color: #888;
  margin-top: 20px;
}
</style>
