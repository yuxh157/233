<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

// 接收从路由传递的帖子ID
const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
});

const route = useRoute();

// 随机内容数据库
const titlePrefixes = [
  "《星际探险》",
  "《荒野求生》",
  "《王者对决》",
  "《三角洲行动》",
  "《模拟城市》",
  "《赛车大师》",
  "《魔法学院》",
  "《怪物猎人》",
  "【新手攻略】",
  "【高级技巧】",
  "【版本前瞻】",
  "【隐藏彩蛋】",
  "盘点最强",
  "震惊！这个",
  "新版本里的",
  "玩家必知",
];

const titleSuffixes = [
  "全面解析",
  "实用技巧大全",
  "你不知道的秘密",
  "最强玩法攻略",
  "新手入门指南",
  "玩家必备知识",
  "内部消息提前看",
  "隐藏关卡详解",
  "最佳装备搭配",
  "终极战术指南",
  "竞技场制胜法则",
  "完美通关方法",
];

const descriptionTemplates = [
  "这款游戏的最新版本增加了全新的地图和模式，今天给大家带来全面的攻略，让你快速上手成为高手！",
  "很多玩家都不知道的隐藏技巧，掌握这些技巧可以让你的游戏体验提升一个档次，一起来看看吧！",
  "作为一个有着多年经验的资深玩家，我来分享一些绝对实用的小窍门，帮助你在这个游戏中取得更好的成绩。",
  "新赛季已经开始，这篇攻略将帮助你了解最新的游戏平衡性调整和最佳的策略选择，让你在排位赛中脱颖而出！",
  "这些鲜为人知的游戏彩蛋和隐藏关卡，开发者藏得很深，但今天我会一一为你揭秘，带你体验不一样的游戏乐趣。",
];

const tagCategories = {
  strategy: ["战略", "策略", "战术", "布局", "规划"],
  action: ["动作", "格斗", "技巧", "连招", "反应"],
  rpg: ["角色", "属性", "技能树", "装备", "升级"],
  simulation: ["模拟", "建造", "经营", "管理", "发展"],
  adventure: ["冒险", "探索", "收集", "解谜", "发现"],
};

const gameCategories = [
  "星际探险",
  "荒野求生",
  "王者对决",
  "三角洲行动",
  "模拟城市",
  "赛车大师",
  "魔法学院",
  "怪物猎人",
  "我的世界",
  "决胜荣耀",
];

const timeAgo = [
  "刚刚",
  "5分钟前",
  "10分钟前",
  "半小时前",
  "1小时前",
  "2小时前",
  "今天",
  "昨天",
];

const userNames = [
  "游戏达人",
  "电竞小王子",
  "资深玩家",
  "战术大师",
  "攻略专家",
  "游戏解说员",
  "顶尖玩家",
  "游戏探险家",
  "数据分析师",
  "游戏博主",
];

// 随机生成内容函数
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomTitle() {
  return getRandomElement(titlePrefixes) + getRandomElement(titleSuffixes);
}

function generateRandomDescription() {
  return getRandomElement(descriptionTemplates);
}

function generateRandomTags() {
  const categories = Object.keys(tagCategories);
  const selectedCategories = [];

  // 随机选择2-3个类别
  const numCategories = getRandomNumber(2, 3);
  while (selectedCategories.length < numCategories) {
    const category = getRandomElement(categories);
    if (!selectedCategories.includes(category)) {
      selectedCategories.push(category);
    }
  }

  // 从每个选中的类别中选择一个标签
  const tags = [];
  selectedCategories.forEach((category) => {
    tags.push(getRandomElement(tagCategories[category]));
  });

  // 添加游戏类别标签
  tags.push(getRandomElement(gameCategories));

  return tags;
}

function generateRandomComments(count) {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: i + 1,
      user: {
        name: getRandomElement(userNames),
        avatar: `https://i.pravatar.cc/150?img=${getRandomNumber(1, 70)}`,
      },
      content: getRandomElement(descriptionTemplates),
      time: getRandomElement(timeAgo),
      likes: getRandomNumber(0, 500),
    });
  }
  return comments;
}

// 模拟帖子详情数据
const post = ref({
  id: props.postId,
  title: "",
  description: "",
  image: "",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  isVideo: Math.random() > 0.5, // 50%的概率是视频
  category: "",
  createdAt: "",
  tags: [],
  likes: 0,
  comments: 0,
  user: {
    name: "",
    avatar: "",
    isFollowing: false,
  },
});

// 评论数据
const comments = ref([]);

// 评论输入
const commentText = ref("");

// 下拉刷新相关状态
const refreshing = ref(false);
const pullDistance = ref(0);
const isPulling = ref(false);
const refreshRotation = ref(0);
let startY = 0;
let scrollerElement = null;
let refreshAnimationFrame = null;

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

// 随机生成帖子详情
function generateRandomPostDetail() {
  const randomId = props.postId;
  const isVideoPost = Math.random() > 0.5;
  const randomCategory = getRandomElement(gameCategories);
  const randomTags = generateRandomTags();
  const commentCount = getRandomNumber(3, 8);

  post.value = {
    id: randomId,
    title: generateRandomTitle(),
    description: generateRandomDescription(),
    image: `https://picsum.photos/800/600?random=${randomId}`,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    isVideo: isVideoPost,
    category: randomCategory,
    createdAt: getRandomElement(timeAgo),
    tags: randomTags,
    likes: getRandomNumber(10, 2000),
    comments: commentCount,
    user: {
      name: getRandomElement(userNames),
      avatar: `https://i.pravatar.cc/150?img=${getRandomNumber(1, 70)}`,
      isFollowing: Math.random() > 0.7, // 30%的概率已关注
    },
  };

  comments.value = generateRandomComments(commentCount);
}

// 获取帖子详情
const fetchPostDetail = () => {
  console.log(`Fetching post with ID: ${props.postId}`);
  generateRandomPostDetail();
};

// 页面加载时获取数据
onMounted(() => {
  fetchPostDetail();
  setupPullToRefresh();
});

onUnmounted(() => {
  if (scrollerElement) {
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  }

  if (refreshAnimationFrame) {
    cancelAnimationFrame(refreshAnimationFrame);
  }
});

// 返回上一页
const goBack = () => {
  window.history.back();
};

// 切换关注状态
const toggleFollow = () => {
  post.value.user.isFollowing = !post.value.user.isFollowing;
};

// 提交评论
const submitComment = () => {
  if (!commentText.value.trim()) return;

  // 在实际应用中，这里应当调用API提交评论
  comments.value.unshift({
    id: comments.value.length + 1,
    user: {
      name: "当前用户",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    content: commentText.value,
    time: "刚刚",
    likes: 0,
  });

  commentText.value = "";
};

// 设置下拉刷新
function setupPullToRefresh() {
  // 等待DOM更新后获取正确的元素
  setTimeout(() => {
    scrollerElement = document.querySelector(".post-detail-container");
    if (!scrollerElement) {
      console.log(
        "Could not find .post-detail-container element for pull-to-refresh"
      );
      return;
    }

    console.log(
      "PostDetailPage: Pull-to-refresh initialized with scroller element:",
      scrollerElement
    );

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  }, 100);
}

function handleTouchStart(e) {
  startY = e.touches[0].clientY;
  const scrollTop = scrollerElement ? scrollerElement.scrollTop : 0;

  console.log("PostDetailPage: Touch start, scrollTop:", scrollTop);

  // 只有在顶部时才启用下拉刷新
  if (scrollTop <= 5) {
    // 给一些容差
    isPulling.value = true;
    console.log("PostDetailPage: Pull started at top position");
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
    console.log("PostDetailPage: Pulling, distance:", pullDistance.value);

    // 阻止默认滚动行为，使下拉体验更平滑
    e.preventDefault();
  }
}

function handleTouchEnd() {
  if (!isPulling.value) return;

  // 如果拉动距离足够，触发刷新
  if (pullDistance.value > 50) {
    refreshPost();
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

function refreshPost() {
  if (refreshing.value) return;

  refreshing.value = true;
  startRefreshAnimation();
  console.log("PostDetailPage: Refresh started");

  // 模拟网络请求延迟
  setTimeout(() => {
    fetchPostDetail(); // 重新获取帖子详情
    refreshing.value = false;
    pullDistance.value = 0;
    stopRefreshAnimation();
    console.log("PostDetailPage: Refresh completed");
  }, 1500);
}
</script>

<template>
  <div class="post-detail-container">
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

    <!-- Header -->
    <div class="app-header">
      <div class="header-left">
        <i class="ri-arrow-left-line back-icon" @click="goBack"></i>
        <div class="header-title">帖子详情</div>
      </div>
      <div class="header-right">
        <i class="ri-more-line more-icon"></i>
      </div>
    </div>

    <!-- Post Content -->
    <div class="post-content">
      <div class="user-info">
        <img
          class="user-avatar"
          :src="post.user.avatar"
          :alt="post.user.name"
        />
        <div class="user-details">
          <div class="user-name">{{ post.user.name }}</div>
          <div class="post-meta">
            {{ post.category }} · {{ post.createdAt }}
          </div>
        </div>
        <button
          class="follow-button"
          :class="{ 'is-following': post.user.isFollowing }"
          @click="toggleFollow"
        >
          {{ post.user.isFollowing ? "已关注" : "关注" }}
        </button>
      </div>

      <div class="post-title">
        {{ post.title }}
      </div>

      <div class="post-description">
        {{ post.description }}
      </div>

      <div class="post-media">
        <video
          v-if="post.isVideo"
          class="post-video"
          controls
          :poster="post.image"
        >
          <source :src="post.videoUrl" type="video/mp4" />
          您的浏览器不支持视频标签。
        </video>
        <img v-else class="post-image" :src="post.image" :alt="post.title" />
      </div>

      <div class="post-tags">
        <span v-for="(tag, index) in post.tags" :key="index" class="tag">
          #{{ tag }}
        </span>
      </div>

      <div class="interaction-bar">
        <div class="interaction-item">
          <i class="interaction-icon ri-thumb-up-line"></i>
          <span>{{ post.likes }}</span>
        </div>
        <div class="interaction-item">
          <i class="interaction-icon ri-chat-1-line"></i>
          <span>{{ post.comments }}</span>
        </div>
        <div class="interaction-item">
          <i class="interaction-icon ri-star-line"></i>
          <span>收藏</span>
        </div>
        <div class="interaction-item">
          <i class="interaction-icon ri-share-forward-line"></i>
          <span>分享</span>
        </div>
      </div>
    </div>

    <!-- Comment Section -->
    <div class="comment-section">
      <div class="comment-header">评论 ({{ comments.length }})</div>

      <div class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-user">
            <img
              class="comment-avatar"
              :src="comment.user.avatar"
              :alt="comment.user.name"
            />
            <div class="comment-user-info">
              <div class="comment-user-name">{{ comment.user.name }}</div>
              <div class="comment-time">{{ comment.time }}</div>
            </div>
          </div>
          <div class="comment-content">
            {{ comment.content }}
          </div>
          <div class="comment-footer">
            <div class="comment-like">
              <i class="ri-thumb-up-line"></i>
              <span>{{ comment.likes }}</span>
            </div>
            <div class="comment-reply">回复</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment Input -->
    <!-- <div class="comment-input-area">
      <input
        type="text"
        class="comment-input"
        placeholder="写评论..."
        v-model="commentText"
        @keyup.enter="submitComment"
      />
      <div class="comment-actions">
        <i class="ri-emotion-line comment-action-icon"></i>
        <i class="ri-image-line comment-action-icon"></i>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.post-detail-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px; /* 为底部评论框留出空间 */
  position: relative; /* 确保子元素可以使用绝对定位 */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* 增强iOS滚动体验 */
  touch-action: pan-y; /* 优化触摸体验 */
  overscroll-behavior-y: contain; /* 防止过度滚动 */
}

/* Pull to refresh styles */
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
  position: relative;
  z-index: 200;
}

.refresh-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.refresh-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.refresh-text {
  font-size: 13px;
  transition: color 0.3s ease;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  padding: 12px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.back-icon {
  font-size: 22px;
  margin-right: 16px;
  cursor: pointer;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
}

.more-icon {
  font-size: 22px;
  cursor: pointer;
}

.post-content {
  background-color: white;
  padding: 16px;
  margin-bottom: 8px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
}

.post-meta {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.follow-button {
  background-color: #e6f3ff;
  color: #0066cc;
  padding: 6px 12px;
  border-radius: 16px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.follow-button.is-following {
  background-color: #f0f0f0;
  color: #666;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
}

.post-description {
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.5;
}

.post-media {
  width: 100%;
  margin-bottom: 16px;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
}

.post-video,
.post-image {
  width: 100%;
  max-height: 50vh;
  object-fit: contain;
  background-color: #000;
  display: block;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
}

.interaction-bar {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.interaction-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  font-size: 12px;
}

.interaction-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.comment-section {
  background-color: white;
  padding: 16px;
}

.comment-header {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.comment-item {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-user {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
}

.comment-user-info {
  display: flex;
  flex-direction: column;
}

.comment-user-name {
  font-size: 14px;
  font-weight: 500;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 8px;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-like {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 12px;
}

.comment-like i {
  margin-right: 4px;
}

.comment-reply {
  color: #999;
  font-size: 12px;
  cursor: pointer;
}

.comment-input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 12px 16px;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  z-index: 99;
}

.comment-input {
  flex: 1;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  padding: 8px 16px;
  margin-right: 12px;
  font-size: 14px;
  background-color: #f5f5f5;
  outline: none;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.comment-action-icon {
  font-size: 20px;
  color: #999;
  margin-left: 12px;
  cursor: pointer;
}
</style>
