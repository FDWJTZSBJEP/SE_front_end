<template>
  <el-tabs type="border-card">
    <el-tab-pane label="语言时间">
      <div class="employee-info" v-for="time_language in responseData" :key="time_language.time">
        <p>actionScript: {{ time_language.actionScript }}</p>
        <p>assembly: {{ time_language.assembly }}</p>
        <p>batchfile: {{ time_language.batchfile}}</p>
        <p>c: {{ time_language.c }}</p>
        <p>c_Plus: {{ time_language.c_Plus }}</p>
        <p>c_Sharp: {{ time_language.c_Sharp }}</p>
        <p>cmake: {{ time_language.cmake }}</p>
        <hr />
      </div>
      <div v-if="responseData.length === 0" class="loading-message">暂无数据</div>
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
import { ref, onMounted } from "vue";
import * as echarts from 'echarts';
const pieChartInstance = ref<echarts.ECharts | null>(null);
const barChartInstance = ref<echarts.ECharts | null>(null);

// 使用 ref 存储获取到的数据
const responseData = ref<any[]>([]);

// 获取语言时间的url
const fetchData1 = async () => {
  try {
    const response = await request({
      method: "GET",
      //
      url: "https://mock.apifox.com/m1/3807087-0-default/language_time?apifoxApiId=137839746",
    });
    console.log(response);

    // 将获取到的数据存储在 ref 中
    responseData.value = response.data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 获取国家用户的url
const fetchData2 = async () => {
  try {
    const response = await request({
      method: "GET",
      //
      url: "https://mock.apifox.com/m1/3807087-0-default/country_user",
    });
    console.log(response);

    // 将获取到的数据存储在 ref 中
    responseData.value = response.data.data || [];
    renderPieChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 绘制国家用户的饼图
const renderPieChart = () => {
  const legendData = responseData.value.map((data) => data.location);
  const seriesData = responseData.value.map((data) => ({ name: data.location, value: data.followers }));

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

// 获取语言项目的url
const fetchData3 = async () => {
  try {
    const response = await request({
      method: "GET",
      //
      url: "https://mock.apifox.com/m1/3807087-0-default/language_projectNum",
    });
    console.log(response);

    // 将获取到的数据存储在 ref 中
    responseData.value = response.data.data || [];
    renderBarChart();
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 绘制国家用户的条形图
const renderBarChart = () => {
  // 提取横坐标和纵坐标数据
  const xAxisData = responseData.value.map((data) => data.language);
  const seriesData = responseData.value.map((data) => ({ name: data.language, value: data.project_num }));

  // 配置项
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

  // 初始化并设置图表
  barChartInstance.value = echarts.init(document.getElementById('bar-chart'))!;
  barChartInstance.value.setOption(option);
};




// 在组件挂载后立即获取数据
onMounted(fetchData1);
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
