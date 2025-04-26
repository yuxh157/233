<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: "发现",
  },
});

const emit = defineEmits(["tab-change"]);

function switchTab(tab) {
  if (tab !== props.activeTab) {
    emit("tab-change", tab);
  }
}
</script>

<template>
  <div class="app-header">
    <div class="header-content">
      <div class="tabs">
        <div
          :class="activeTab === '发现' ? 'tab-active' : 'tab-inactive'"
          @click="switchTab('发现')"
        >
          发现
        </div>
        <div
          :class="activeTab === '游戏圈' ? 'tab-active' : 'tab-inactive'"
          @click="switchTab('游戏圈')"
        >
          游戏圈
        </div>
        <!-- <div
          :class="activeTab === '搜词器' ? 'tab-active' : 'tab-inactive'"
          @click="switchTab('搜词器')"
        >
          <span class="mr-1">搜词器</span>
          <span class="indicator"></span>
        </div> -->
      </div>
      <div class="actions">
        <i class="ri-search-line text-xl"></i>
        <i class="ri-message-3-line text-xl"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  padding: 12px 16px 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabs {
  display: flex;
  align-items: center;
}

.tabs > div {
  margin-right: 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.tab-active {
  color: #000;
  font-weight: 600;
  position: relative;
}

.tab-inactive {
  color: #4b5563;
  font-size: 1rem;
}

.tab-inactive:hover {
  color: #000;
}

.tab-active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: #ff4c3b;
  border-radius: 1.5px;
}

.actions {
  display: flex;
  align-items: center;
}

.actions > i {
  margin-left: 0.75rem;
}

.indicator {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: #fcdef0;
  border-radius: 9999px;
  margin-left: 0.25rem;
}
</style>
