<template>
  <div v-if="!favorites.length" class="favorite-videos__message">У вас нет избранных видео.</div>
  <div v-else>
    <div class="favorite-videos__video-list">
      <VideoCard v-for="video in favorites" :key="video.id" :video="video" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVideoStore } from '@/store/videos';
import VideoCard from '@/components/VideoCard.vue';

const store = useVideoStore();
const favorites = store.favorites;
</script>

<style scoped lang="scss">
.favorite-videos__message {
  font-size: 18px;
  text-align: center;
  color: #555;
}

.favorite-videos__video-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
