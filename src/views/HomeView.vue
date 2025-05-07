<template>
    <div class="app-container">
      <SearchBar />
  
      <div class="tabs">
        <button
          @click="currentTab = 'search'"
          :class="['tabs__btn', { 'tabs__btn--active': currentTab === 'search' }]"
        >
          Поиск
        </button>
        <button
          @click="currentTab = 'favorites'"
          :class="['tabs__btn', { 'tabs__btn--active': currentTab === 'favorites' }]"
        >
          Избранное
        </button>
      </div>
  
      <div class="content">
        <div v-if="store.error" class="error">{{ store.error }}</div>
        <div v-else-if="!store.videos.length && !store.loading && currentTab === 'search'">
          Ничего не найдено
        </div>
  
        <div v-if="currentTab === 'search'">
          <div class="app-container__video-list">
            <VideoCard v-for="video in store.videos" :key="video.id" :video="video" />
          </div>
          <div v-if="store.loading">Загрузка...</div>
          <button class="app-container__btn" v-if="store.nextPageToken && !store.loading" @click="store.loadMore">
            Загрузить ещё
          </button>
        </div>
  
        <div v-else-if="currentTab === 'favorites'">
          <FavoriteVideos />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import SearchBar from '@/components/SearchBar.vue';
  import VideoCard from '@/components/VideoCard.vue';
  import { useVideoStore } from '@/store/videos';
  import FavoriteVideos from '@/components/FavoriteVideos.vue';
  
  const store = useVideoStore();
  const currentTab = ref('search');
  </script>
  <style scoped lang="scss">
  
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 70px;

   &__btn {
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 6px;
    background-color: #ff0000;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  &__btn--hover {
    background-color: #cc0000;
  }

  &__video-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 0;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 80px;
  z-index: 9;

  &__btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
  }

  &__btn--active {
    border-color: #ff0000;
    font-weight: bold;
    color: #ff0000;
  }

  &__btn--hover {
    background-color: #eee;
  }
}

.content {
  padding: 20px;
}
  </style>