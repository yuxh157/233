<script setup>
import { ref } from "vue";
import DiscoveryHeader from "./DiscoveryHeader.vue";
import DiscoveryFeed from "./DiscoveryFeed.vue";
import BottomNavigation from "./BottomNavigation.vue";

const activeTab = ref("发现");

function handleTabChange(tab) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="app-container">
    <!-- Header -->
    <DiscoveryHeader :activeTab="activeTab" @tab-change="handleTabChange" />

    <!-- Content area -->
    <div class="content-area" id="content-area">
      <DiscoveryFeed :dataType="activeTab === '游戏圈' ? 'games' : 'default'" />
      <div class="bottom-spacer"></div>
    </div>

    <!-- Bottom navigation -->
    <BottomNavigation activeNav="首页" />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* 增强iOS滚动体验 */
}

.bottom-spacer {
  height: 80px; /* 为底部导航提供足够的空间 */
}
</style>
