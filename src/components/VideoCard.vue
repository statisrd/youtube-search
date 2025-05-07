<template>
  <div class="video-card">
    <img :src="video.thumbnail" alt="preview" class="video-card__thumbnail" />
    <div class="video-card__info">
      <h3 class="video-card__title">{{ video.title }}</h3>
      <p class="video-card__channel">{{ video.channel }}</p>
      <p class="video-card__views">Просмотров: {{ formatViews(video.views) }}</p>
      <button @click="toggleFav" class="video-card__btn">
        {{ isFavorite ? 'Убрать из избранного' : 'В избранное' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVideoStore } from '@/store/videos';
import { computed, defineProps } from 'vue';

const props = defineProps<{ video: any }>();
const store = useVideoStore();

const isFavorite = computed(() =>
  store.favorites.some((v: any) => v.id === props.video.id)
);

function toggleFav() {
  store.toggleFavorite(props.video);
}

function formatViews(views: number | undefined | null): string {
  if (!views && views !== 0) return '—';
  if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(1) + ' млрд';
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + ' млн';
  if (views >= 1_000) return (views / 1_000).toFixed(1) + ' тыс';
  return views.toString();
}
</script>

<style scoped lang="scss">
.video-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 400px;
  
  .video-card__thumbnail {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .video-card__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    padding: 10px;
  }

  .video-card__title {
    font-size: 18px;
    font-weight: bold;
  }

  .video-card__channel {
    font-size: 14px;
    color: #555;
  }

  .video-card__views {
    font-size: 14px;
    color: #888;
  }

  .video-card__btn {
    margin-top: auto;
    padding: 8px 16px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .video-card__btn--active {
    background-color: #cc0000;
  }
}

</style>
