<script setup>
import { ref } from "vue";

// 接收从路由传递的帖子ID
const props = defineProps({
  postId: {
    type: [Number, String],
    required: true,
  },
});

// 模拟帖子详情数据
const post = ref({
  id: props.postId,
  title: "三角洲行动: 全面战场趣味性升级，夺旗，攻防合集，来玩",
  description:
    "最新版本的三角洲行动增加了全新的地图和游戏模式，今天给大家带来全面的攻略，让你快速上手新玩法，成为战场之王！",
  image: "https://picsum.photos/400/320?random=5",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  isVideo: true,
  category: "三角洲行动",
  createdAt: "2小时前",
  tags: ["游戏攻略", "三角洲行动", "FPS", "战术竞技"],
  likes: 644,
  comments: 128,
  user: {
    name: "能猫游戏攻略",
    avatar: "https://i.pravatar.cc/150?img=5",
    isFollowing: false,
  },
});

// 评论数据
const comments = ref([
  {
    id: 1,
    user: {
      name: "战术大师",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    content:
      "非常详细的攻略，特别是夺旗模式的战术分析很有帮助，我已经用这套战术连赢好几局了，感谢分享！",
    time: "1小时前",
    likes: 42,
  },
  {
    id: 2,
    user: {
      name: "游戏发烧友",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    content:
      "请问新地图的隐藏通道在哪里？我找了好久都没发现，视频里似乎有提到但没看清楚",
    time: "52分钟前",
    likes: 15,
  },
  {
    id: 3,
    user: {
      name: "能猫游戏攻略",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    content:
      "@游戏发烧友 隐藏通道在中央建筑物的西北角，那里有一个可以破坏的墙壁，需要使用炸药或者特殊的角色技能才能打开",
    time: "45分钟前",
    likes: 28,
  },
  {
    id: 4,
    user: {
      name: "新手玩家",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    content:
      "非常感谢这个攻略，作为一个刚入坑的新手，这些基础知识对我帮助很大，期待更多这样的教程！",
    time: "30分钟前",
    likes: 8,
  },
]);

// 评论输入
const commentText = ref("");

// 获取帖子详情（实际项目中应从API获取）
const fetchPostDetail = () => {
  // 这里应当根据props.postId从API获取帖子详情
  console.log(`Fetching post with ID: ${props.postId}`);
  // 这里使用的是模拟数据，实际开发时应当替换为API调用
};

// 页面加载时获取数据
fetchPostDetail();

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
</script>

<template>
  <div class="post-detail-container">
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
    <div class="comment-input-area">
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
    </div>
  </div>
</template>

<style scoped>
.post-detail-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding-bottom: 60px; /* 为底部评论框留出空间 */
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
