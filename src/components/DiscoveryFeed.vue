<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from "vue";
import FeedItem from "./FeedItem.vue";

// Mock data for feed items
const mockDataTypes = {
  default: [
    {
      id: 1,
      title: "【版本前瞻】手游新版本预告——重爪新模型，部分恐龙新",
      image: "https://picsum.photos/400/300?random=1",
      isVideo: false,
      category: "恐龙岛（诺克之岛）",
      user: {
        name: "泡夫云",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      likes: 10,
    },
    {
      id: 2,
      title: "【·若梦﹪🌸☕】落在捕梦网里的小家✧˚ ༘ ⋆｡˚🍓˖°#申请精",
      image: "https://picsum.photos/400/500?random=2",
      isVideo: false,
      category: "来加小镇日常生活",
      user: {
        name: "小鱼蕾伊",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      likes: 79,
    },
    {
      id: 3,
      title: "【推荐地图—醉花酒肆】第三期",
      image: "https://picsum.photos/400/250?random=3",
      isVideo: false,
      category: "达你世界",
      user: {
        name: "我是你的亲爱",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      likes: 9,
    },
    {
      id: 4,
      title: "梅丽莎连招小技巧！用知识害死再上一层楼",
      image: "https://picsum.photos/400/280?random=4",
      isVideo: true,
      category: "决胜荣誉《召唤师下载》",
      user: {
        name: "冷枫蔷薇",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      likes: 23,
    },
    {
      id: 5,
      title: "三角洲行动: 全面战场趣味性升级，夺旗，攻防合集，来玩",
      image: "https://picsum.photos/400/320?random=5",
      isVideo: true,
      category: "三角洲行动",
      user: {
        name: "能猫游戏攻略",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      likes: 644,
    },
    {
      id: 6,
      title: "不挑光线，只重自己看觉的",
      image: "https://picsum.photos/400/260?random=6",
      isVideo: false,
      category: "",
      user: {
        name: "阿辞",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      likes: 38,
    },
    {
      id: 7,
      title: "关注我，随机抽人操礼！",
      image: "https://picsum.photos/400/480?random=7",
      isVideo: false,
      category: "",
      user: {
        name: "青空千绪",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      likes: 51,
    },
    {
      id: 8,
      title: "探险爱好者的天堂：古墓探险实景体验",
      image: "https://picsum.photos/400/420?random=8",
      isVideo: true,
      category: "冒险旅行家",
      user: {
        name: "大橘无情",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      likes: 245,
    },
  ],
  games: [
    {
      id: 15,
      title: "《星际漫游》宇宙探索新玩法详解",
      image: "https://picsum.photos/400/300?random=15",
      isVideo: true,
      category: "星际漫游",
      user: {
        name: "太空探险家",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      likes: 823,
    },
    {
      id: 16,
      title: "《魔法学院》隐藏任务攻略全集",
      image: "https://picsum.photos/400/420?random=16",
      isVideo: false,
      category: "魔法学院",
      user: {
        name: "魔法导师",
        avatar: "https://i.pravatar.cc/150?img=16",
      },
      likes: 765,
    },
    {
      id: 17,
      title: "《荒野求生》极限生存挑战",
      image: "https://picsum.photos/400/280?random=17",
      isVideo: true,
      category: "荒野求生",
      user: {
        name: "荒野专家",
        avatar: "https://i.pravatar.cc/150?img=17",
      },
      likes: 654,
    },
    {
      id: 18,
      title: "《赛车大师》最新赛道抢先体验",
      image: "https://picsum.photos/400/250?random=18",
      isVideo: true,
      category: "赛车大师",
      user: {
        name: "赛道传奇",
        avatar: "https://i.pravatar.cc/150?img=18",
      },
      likes: 589,
    },
    {
      id: 19,
      title: "《模拟城市》城市规划技巧分享",
      image: "https://picsum.photos/400/360?random=19",
      isVideo: false,
      category: "模拟城市",
      user: {
        name: "城市规划师",
        avatar: "https://i.pravatar.cc/150?img=19",
      },
      likes: 512,
    },
    {
      id: 20,
      title: "《怪物猎人》稀有武器收集指南",
      image: "https://picsum.photos/400/320?random=20",
      isVideo: false,
      category: "怪物猎人",
      user: {
        name: "猎人大师",
        avatar: "https://i.pravatar.cc/150?img=20",
      },
      likes: 498,
    },
    {
      id: 21,
      title: "《我的世界》红石机关教程：自动农场",
      image: "https://picsum.photos/400/340?random=21",
      isVideo: true,
      category: "我的世界",
      user: {
        name: "红石工程师",
        avatar: "https://i.pravatar.cc/150?img=21",
      },
      likes: 731,
    },
    {
      id: 22,
      title: "《王者荣耀》新英雄技能解析与玩法详解",
      image: "https://picsum.photos/400/260?random=22",
      isVideo: true,
      category: "王者荣耀",
      user: {
        name: "荣耀解说",
        avatar: "https://i.pravatar.cc/150?img=22",
      },
      likes: 892,
    },
  ],
  search: [
    {
      id: 30,
      title: "热门关键词搜索技巧：如何精准找到想要的内容",
      image: "https://picsum.photos/400/300?random=30",
      isVideo: false,
      category: "搜索技巧",
      user: {
        name: "搜索达人",
        avatar: "https://i.pravatar.cc/150?img=30",
      },
      likes: 345,
    },
    {
      id: 31,
      title: "搜词器使用指南：从新手到专家",
      image: "https://picsum.photos/400/350?random=31",
      isVideo: true,
      category: "搜词器教程",
      user: {
        name: "词语大师",
        avatar: "https://i.pravatar.cc/150?img=31",
      },
      likes: 421,
    },
    {
      id: 32,
      title: "提高搜索效率的10个小技巧",
      image: "https://picsum.photos/400/280?random=32",
      isVideo: false,
      category: "搜索技巧",
      user: {
        name: "效率专家",
        avatar: "https://i.pravatar.cc/150?img=32",
      },
      likes: 278,
    },
    {
      id: 33,
      title: "搜词器与AI的结合：智能推荐系统解析",
      image: "https://picsum.photos/400/310?random=33",
      isVideo: true,
      category: "AI技术",
      user: {
        name: "AI研究员",
        avatar: "https://i.pravatar.cc/150?img=33",
      },
      likes: 566,
    },
  ],
};

const props = defineProps({
  dataType: {
    type: String,
    default: "default",
  },
});

const loading = ref(false);
const refreshing = ref(false);
const feedItems = ref([]);
const feedRef = ref(null);
const pullDistance = ref(0);
const isPulling = ref(false);
const refreshRotation = ref(0);
const loadMoreRotation = ref(0);
let startY = 0;
let scrollerElement = null;
let refreshAnimationFrame = null;
let loadMoreAnimationFrame = null;

// 监听dataType的变化
watch(
  () => props.dataType,
  (newType) => {
    // 当类型切换时，重新加载数据并滚动到顶部
    loadItems();
    setTimeout(() => {
      if (scrollerElement) {
        scrollerElement.scrollTop = 0;
      }
    }, 0);
  },
  { immediate: false }
);

// Split items into left and right columns
const leftColumnItems = computed(() => {
  return feedItems.value.filter((_, index) => index % 2 === 0);
});

const rightColumnItems = computed(() => {
  return feedItems.value.filter((_, index) => index % 2 === 1);
});

// 计算下拉指示器的状态
const pullStatusText = computed(() => {
  if (refreshing.value) return "刷新中...";
  if (pullDistance.value > 50) return "释放立即刷新";
  return "下拉刷新";
});

// 计算下拉指示器的颜色
const pullStatusColor = computed(() => {
  if (refreshing.value) return "#0052d9";
  if (pullDistance.value > 50) return "#0052d9";
  return "#999";
});

onMounted(() => {
  loadItems();
  setupPullToRefresh();
  setupInfiniteScroll();
});

onUnmounted(() => {
  if (scrollerElement) {
    scrollerElement.removeEventListener("scroll", handleScroll);
  }
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("touchend", handleTouchEnd);

  if (refreshAnimationFrame) {
    cancelAnimationFrame(refreshAnimationFrame);
  }
  if (loadMoreAnimationFrame) {
    cancelAnimationFrame(loadMoreAnimationFrame);
  }
});

function loadItems() {
  // In a real app, this would fetch data from an API
  feedItems.value = mockDataTypes[props.dataType] || mockDataTypes.default;
}

function loadMoreItems() {
  if (loading.value) return;

  loading.value = true;
  startLoadMoreAnimation();

  // Simulate network request delay
  setTimeout(() => {
    // Clone existing items and modify them to simulate new content
    const newItems = feedItems.value.map((item, index) => ({
      ...item,
      id: item.id + 100, // Ensure IDs don't duplicate
      title: `新内容: ${item.title}`, // Add marker to distinguish new content
      image: `${item.image}&t=${Date.now()}`, // Add timestamp for different images
    }));

    feedItems.value = [...feedItems.value, ...newItems];
    loading.value = false;
    stopLoadMoreAnimation();
  }, 1500);
}

function startRefreshAnimation() {
  const animate = () => {
    refreshRotation.value = (refreshRotation.value + 3) % 360;
    refreshAnimationFrame = requestAnimationFrame(animate);
  };
  refreshAnimationFrame = requestAnimationFrame(animate);
}

function stopRefreshAnimation() {
  if (refreshAnimationFrame) {
    cancelAnimationFrame(refreshAnimationFrame);
    refreshAnimationFrame = null;
  }
}

function startLoadMoreAnimation() {
  const animate = () => {
    loadMoreRotation.value = (loadMoreRotation.value + 3) % 360;
    loadMoreAnimationFrame = requestAnimationFrame(animate);
  };
  loadMoreAnimationFrame = requestAnimationFrame(animate);
}

function stopLoadMoreAnimation() {
  if (loadMoreAnimationFrame) {
    cancelAnimationFrame(loadMoreAnimationFrame);
    loadMoreAnimationFrame = null;
  }
}

function refreshItems() {
  if (refreshing.value) return;

  refreshing.value = true;
  startRefreshAnimation();

  // Simulate network request delay
  setTimeout(() => {
    loadItems(); // Reload original items
    refreshing.value = false;
    pullDistance.value = 0;
    stopRefreshAnimation();
  }, 1500);
}

function setupPullToRefresh() {
  // 找到滚动容器元素 - 应该是手机内容区域的滚动元素
  // 等待DOM更新后获取正确的元素
  setTimeout(() => {
    scrollerElement = document.querySelector(".content-area");
    if (!scrollerElement) return;

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  }, 100);
}

function handleTouchStart(e) {
  startY = e.touches[0].clientY;
  const scrollTop = scrollerElement ? scrollerElement.scrollTop : 0;

  // 只有在顶部时才启用下拉刷新
  if (scrollTop === 0) {
    isPulling.value = true;
  }
}

function handleTouchMove(e) {
  if (!isPulling.value) return;

  const currentY = e.touches[0].clientY;
  const diff = currentY - startY;

  // 下拉时才触发刷新
  if (diff > 0) {
    // 添加阻尼效果，使拖动感觉更自然
    pullDistance.value = Math.min(80, diff * 0.5);

    // 阻止默认滚动行为，使下拉体验更平滑
    e.preventDefault();
  }
}

function handleTouchEnd() {
  if (!isPulling.value) return;

  // 如果拉动距离足够，触发刷新
  if (pullDistance.value > 50) {
    refreshItems();
  } else {
    // 否则复位，添加过渡动画
    const startValue = pullDistance.value;
    const startTime = Date.now();
    const duration = 300; // 300ms

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用缓动函数，使回弹更自然
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      pullDistance.value = startValue * (1 - easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        pullDistance.value = 0;
      }
    };

    requestAnimationFrame(animate);
  }

  isPulling.value = false;
}

function setupInfiniteScroll() {
  // 等待DOM更新后获取正确的滚动元素
  setTimeout(() => {
    scrollerElement = document.querySelector(".content-area");
    if (scrollerElement) {
      scrollerElement.addEventListener("scroll", handleScroll);
    }
  }, 100);
}

function handleScroll() {
  if (!scrollerElement) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollerElement;

  // 当滚动到距离底部一定距离时加载更多
  if (scrollHeight - scrollTop - clientHeight < 150 && !loading.value) {
    loadMoreItems();
  }
}
</script>

<template>
  <div class="feed-container" ref="feedRef">
    <!-- Pull to refresh indicator -->
    <div
      class="refresh-container"
      :style="{
        height: `${pullDistance}px`,
        opacity: pullDistance / 80,
        color: pullStatusColor,
      }"
      v-show="pullDistance > 0 || refreshing"
    >
      <div class="refresh-content">
        <div class="refresh-icon-wrapper">
          <i
            class="ri-refresh-line"
            :style="{
              transform: refreshing
                ? `rotate(${refreshRotation}deg)`
                : `rotate(${pullDistance * 2}deg)`,
            }"
          ></i>
        </div>
        <span class="refresh-text">{{ pullStatusText }}</span>
      </div>
    </div>

    <!-- Tab content -->
    <transition name="fade" mode="out-in">
      <div class="feed-columns" :key="props.dataType">
        <!-- Left column -->
        <div class="feed-column-left">
          <FeedItem
            v-for="item in leftColumnItems"
            :key="item.id"
            :item="item"
            :style="{
              animationDelay: `${Math.min(
                leftColumnItems.indexOf(item) * 0.05,
                0.5
              )}s`,
            }"
          />
        </div>

        <!-- Right column -->
        <div class="feed-column-right">
          <FeedItem
            v-for="item in rightColumnItems"
            :key="item.id"
            :item="item"
            :style="{
              animationDelay: `${Math.min(
                rightColumnItems.indexOf(item) * 0.05,
                0.5
              )}s`,
            }"
          />
        </div>
      </div>
    </transition>

    <!-- Loading more indicator -->
    <div class="loading-container" v-show="loading">
      <div class="loading-content">
        <div class="loading-icon-wrapper">
          <i
            class="ri-loader-2-line"
            :style="{ transform: `rotate(${loadMoreRotation}deg)` }"
          ></i>
        </div>
        <span class="loading-text">加载更多...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-container {
  width: 100%;
  height: 100%;
  overflow-y: visible;
}

.feed-columns {
  display: flex;
  width: 100%;
  padding: 8px 4px;
  box-sizing: border-box;
}

.feed-column-left,
.feed-column-right {
  width: 50%;
  padding: 0 4px;
  box-sizing: border-box;
}

/* Pull to refresh & infinite scroll */
.refresh-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  transition: color 0.3s ease;
  font-size: 13px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

.refresh-content,
.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.refresh-icon-wrapper,
.loading-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.refresh-text,
.loading-text {
  font-size: 13px;
  transition: color 0.3s ease;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 20px 0 40px; /* 增加底部内边距 */
  margin-bottom: 40px; /* 增加底部外边距 */
  color: #0052d9;
  background-color: transparent;
  position: relative;
  z-index: 5;
}

.loading-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* 增大图标容器 */
  height: 24px;
}

.loading-text {
  font-size: 14px; /* 增大字体 */
  font-weight: 500; /* 加粗字体 */
  transition: color 0.3s ease;
}

.ri-loader-2-line {
  font-size: 24px; /* 增大图标 */
  transition: transform 0.2s ease;
}

/* 加载动画关键帧 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* 应用动画 */
.loading-container {
  animation: fadeInUp 0.3s ease;
}

.loading-container.hide {
  animation: fadeOutDown 0.3s ease forwards;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.refresh-container.active .refresh-icon-wrapper,
.loading-container.active .loading-icon-wrapper {
  animation: pulse 1.5s infinite;
}

/* Tab切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
