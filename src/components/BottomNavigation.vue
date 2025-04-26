<script setup>
defineProps({
  activeNav: {
    type: String,
    default: "首页",
  },
});
</script>

<template>
  <div class="bottom-nav">
    <div class="nav-item" :class="{ active: activeNav === '首页' }">
      <i class="nav-icon ri-home-5-line"></i>
      <span>首页</span>
    </div>
    <div class="nav-item" :class="{ active: activeNav === '社区' }">
      <i class="nav-icon ri-planet-line"></i>
      <span>社区</span>
    </div>
    <div class="nav-item" :class="{ active: activeNav === '创作' }">
      <i class="nav-icon ri-video-add-line"></i>
      <span>创作</span>
    </div>
    <div class="nav-item" :class="{ active: activeNav === '找游戏' }">
      <i class="nav-icon ri-gamepad-line"></i>
      <span>找游戏</span>
    </div>
    <div class="nav-item" :class="{ active: activeNav === '我的' }">
      <i class="nav-icon ri-user-3-line"></i>
      <span>我的</span>
    </div>
  </div>

  <!-- <div class="create-post">
    <i class="ri-add-line text-2xl"></i>
  </div> -->
</template>

<style scoped>
/* Bottom navigation bar */
.bottom-nav {
  position: relative;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 8px 0 20px;
  border-top: 1px solid #eee;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.nav-item.active {
  color: #ff4c3b;
}

.nav-icon {
  font-size: 24px;
  margin-bottom: 2px;
}

/* Create post button */
.create-post {
  position: fixed;
  bottom: 80px;
  right: 16px;
  width: 48px;
  height: 48px;
  background-color: #ff4c3b;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 76, 59, 0.4);
  z-index: 99;
}
</style>
