<template>
  <div>
    <!-- 输入框用于编辑数据 -->
    <textarea v-model="data"></textarea>

    <!-- 预测按钮 -->
    <button @click="predictData">预测数据</button>

    <!-- 显示结果 -->
    <div v-if="showResults">
      <h2>Predicted Values:</h2>
      <div>
        <p v-for="(value, index) in predictedValues" :key="index">
          {{ new Date(value.timestamp).toLocaleString() }} - {{ value.value }}
        </p>
      </div>
    </div>

    <!-- ECharts 图表容器 -->
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: `2014-02-14 00:00:00,76.0
2014-02-14 00:20:00,81.0
// ... (你的数据继续)`,
      showResults: false,
      predictedValues: null,
      myChart: null,
    };
  },
  methods: {
    // 预测数据
    predictData() {
      const lines = this.data.trim().split('\n');
      const parsedData = lines.map(line => {
        const [timestamp, value] = line.split(',');
        return { timestamp, value: parseFloat(value) };
      });

      const sevenDaysAgo = new Date(parsedData[parsedData.length - 1].timestamp);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // 过滤出前七天同一时间的数据
      const pastData = parsedData.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate > sevenDaysAgo && entryDate < new Date(entry.timestamp) && entryDate < new Date();
      });

      // 检查是否有足够的过去数据进行平均值的计算
      if (pastData.length >= 7) {
        // 计算平均值
        const averageValue = pastData.reduce((sum, entry) => sum + entry.value, 0) / pastData.length;

        // 预测后面同一时间的数据
        const predictedValues = parsedData.map(entry => {
          const predictedValue = (entry.value + averageValue) / 2; // 简单平均值预测
          return { timestamp: entry.timestamp, value: predictedValue };
        });

        // 将处理后的结果存储到组件的 data 中
        this.predictedValues = predictedValues;
        this.showResults = true;
      } else {
        // 不足七天的情况，输出原数据
        this.predictedValues = parsedData;
        this.showResults = true;
      }
    },
    
  },
};
</script>

<style>
/* 样式可以根据需要自行添加 */
textarea {
  width: 100%;
  height: 200px;
}
</style>
