<template>
  <div class="search-bar">
    <input
      v-model="query"
      @keyup.enter="onSearch"
      placeholder="Найти видео..."
      class="search-bar__input"
    />
    
    <select v-model="order" class="search-bar__select">
      <option value="">Сортировка</option>
      <option value="date">По дате</option>
      <option value="viewCount">По просмотрам</option>
      <option value="rating">По рейтингу</option>
    </select>

    <select v-model="videoDuration" class="search-bar__select">
      <option value="">Длительность</option>
      <option value="short">Короткие (&lt; 4 мин)</option>
      <option value="medium">Средние (4–20 мин)</option>
      <option value="long">Длинные (&gt; 20 мин)</option>
    </select>

    <button class="search-bar__btn" @click="onSearch">Поиск</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVideoStore } from '@/store/videos';

const store = useVideoStore();
const query = ref('');
const order = ref('');
const videoDuration = ref('');

function onSearch() {
  if (query.value) {
    store.searchVideos(query.value, '', {
      order: order.value,
      videoDuration: videoDuration.value
    });
  }
}
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 10;

  &__input,
  &__select {
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
    min-width: 180px;
    background-color: #f9f9f9;
    transition: border 0.2s;
  }

  &__input:focus,
  &__select:focus {
    border-color: #999;
    outline: none;
  }

  &__btn {
    padding: 8px 16px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>
