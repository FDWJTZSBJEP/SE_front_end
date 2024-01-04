<template>
  <div class="community-trends">
    <h1>社区发展趋势</h1>
    <div>
      <canvas ref="trendChart"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'CommunityTrends',
  setup() {
    const trendChart = ref<Chart>();

    onMounted(() => {
      // 模拟社区发展趋势数据
      const trendData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: '用户增长',
          data: [100, 150, 200, 250],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      };

      // 获取趋势图表的 DOM 元素
      const trendChartCanvas = document.getElementById('trendChart') as HTMLCanvasElement;

      // 创建趋势图表
      trendChart.value = new Chart(trendChartCanvas, {
        type: 'line',
        data: trendData,
      });
    });

    return {
      trendChart,
    };
  },
});
</script>

<style scoped>
.community-trends {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

#trendChart {
  height: 300px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
