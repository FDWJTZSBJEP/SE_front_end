<script setup lang="ts">
import request from "@/utils/request";
import { ref, onMounted } from "vue";

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

// 使用 ref 存储获取到的数据
const responseData = ref<any[]>([]);

// 在组件挂载后立即获取数据
onMounted(fetchData);
</script>

<template>
  <div class="about">

    <h1>展示数据页面</h1>
    <!-- 使用 v-if 判断 responseData 是否有数据 -->
    <div v-if="responseData.length">
      <!-- 使用 v-for 遍历 responseData 中的每个员工信息 -->
      <div v-for="employee in responseData" :key="employee.employee_id">
        <p>员工ID: {{ employee.employee_id }}</p>
        <p>用户名: {{ employee.username }}</p>
        <p>手机号码: {{ employee.phone_number }}</p>
        <p>职位名称: {{ employee.station_name }}</p>
        <p>性别: {{ employee.gender }}</p>
        <p>薪水: {{ employee.salary }}</p>
        <p>职位ID: {{ employee.station_id }}</p>
        <hr />
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style>
/* 在这里添加样式 */
.buttons {
  margin-bottom: 20px;
}

.buttons button {
  margin-right: 10px;
}
</style>
