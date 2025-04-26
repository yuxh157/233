<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// 跳转到帖子详情页
function navigateToDetail() {
  router.push({
    name: "PostDetail",
    params: { postId: props.item.id },
  });
}
</script>

<template>
  <div class="feed-item" @click="navigateToDetail">
    <div class="feed-image">
      <img :src="item.image" :alt="item.title" loading="lazy" />
      <div v-if="item.isVideo" class="video-indicator">
        <i class="ri-play-fill"></i>
      </div>
    </div>
    <div class="feed-content">
      <div class="item-title">
        {{ item.title }}
      </div>
      <div v-if="item.category" class="item-category">
        {{ item.category }}
      </div>
      <div v-else class="item-category"></div>
      <div class="user-info">
        <div class="user-profile">
          <img
            class="user-avatar"
            :src="item.user.avatar"
            :alt="item.user.name"
          />
          <span class="user-name">{{ item.user.name }}</span>
        </div>
        <div class="like-count">
          <i class="ri-thumb-up-line mr-1"></i>
          <span>{{ item.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  transition: all 0.3s ease;
  transform-origin: center;
  height: auto;
  contain: content;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feed-item:active {
  transform: scale(0.98);
}

.feed-image {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1.33 / 1;
}

.feed-image::before {
  content: "";
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ddd;
  border-top-color: #999;
  animation: spin 1s linear infinite;
  z-index: 0;
}

.feed-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.video-indicator {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feed-content {
  padding: 8px;
}

.item-title {
  font-size: 0.875rem;
  font-weight: 500;
  min-height: 2.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-category {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  min-height: 1rem;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.25rem;
}

.user-name {
  font-size: 0.75rem;
  color: #4b5563;
}

.like-count {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 12px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
