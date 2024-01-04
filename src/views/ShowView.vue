<template>
  <div class="hot-ranking">
    <h2 class="ranking-title">热门排名</h2>

    <!-- 热门语言排名 -->
    <div class="ranking-section">
      <h3 class="section-title">热门语言</h3>
      <ul class="ranking-list">
        <li v-for="(language, index) in languageRanking" :key="language.id" class="ranking-item">
          <span class="rank">{{ index + 1 }}</span>
          <span class="name">{{ language.name }}</span>
          <span class="score">{{ language.score }}</span>
        </li>
      </ul>
    </div>

    <!-- 热门项目排名 -->
    <div class="ranking-section">
      <h3 class="section-title">热门项目</h3>
      <ul class="ranking-list">
        <li v-for="(project, index) in projectRanking" :key="project.id" class="ranking-item">
          <span class="rank">{{ index + 1 }}</span>
          <span class="name">{{ project.name }}</span>
          <span class="score">{{ project.score }}</span>
        </li>
      </ul>
    </div>

    <!-- 热门协议排名 -->
    <div class="ranking-section">
      <h3 class="section-title">热门协议</h3>
      <ul class="ranking-list">
        <li v-for="(protocol, index) in protocolRanking" :key="protocol.id" class="ranking-item">
          <span class="rank">{{ index + 1 }}</span>
          <span class="name">{{ protocol.name }}</span>
          <span class="score">{{ protocol.score }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RankingItem {
  id: number;
  name: string;
  score: number;
}

const languageRanking: RankingItem[] = [
  { id: 1, name: 'JavaScript', score: 1200 },
  { id: 2, name: 'Python', score: 1100 },
  { id: 3, name: 'Java', score: 1000 },
  // Add more languages as needed
];

const projectRanking: RankingItem[] = [
  { id: 1, name: 'Project A', score: 1500 },
  { id: 2, name: 'Project B', score: 1400 },
  { id: 3, name: 'Project C', score: 1300 },
  // Add more projects as needed
];

const protocolRanking: RankingItem[] = [
  { id: 1, name: 'HTTP', score: 800 },
  { id: 2, name: 'WebSocket', score: 750 },
  { id: 3, name: 'GraphQL', score: 700 },
  // Add more protocols as needed
];
</script>

<style scoped>
.hot-ranking {
  max-width: 800px;
  margin: 20px auto;
}

.ranking-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.ranking-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.ranking-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ranking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.rank,
.score {
  flex: 0 0 60px;
  font-size: 16px;
  text-align: center;
}

.name {
  flex: 1;
  font-size: 16px;
}
</style>
