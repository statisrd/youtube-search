import { defineStore } from 'pinia';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';

export const useVideoStore = defineStore('videos', {
  state: () => ({
    videos: [] as any[],
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    nextPageToken: '',
    query: '',
    filters: {} as Record<string, string>,
    error: '',
    loading: false
  }),
  actions: {
    async searchVideos(query: string, pageToken = '', filters = {}) {
      this.loading = true;
      this.error = '';
      this.query = query;
      this.filters = filters;

      try {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v)
        );

        const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: API_KEY,
            q: query,
            part: 'snippet',
            maxResults: 10,
            type: 'video',
            pageToken,
            ...cleanFilters
          }
        });

        const videoIds = searchRes.data.items.map((item: any) => item.id.videoId);

        const videoRes = await axios.get(BASE_URL, {
          params: {
            key: API_KEY,
            id: videoIds.join(','),
            part: 'snippet,statistics'
          }
        });

        const newVideos = videoRes.data.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: item.snippet.channelTitle,
          views: +item.statistics.viewCount
        }));

        this.videos = pageToken ? [...this.videos, ...newVideos] : newVideos;
        this.nextPageToken = searchRes.data.nextPageToken || '';
      } catch (e: any) {
        this.error = e?.response?.data?.error?.message || 'Ошибка загрузки видео';
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      if (this.nextPageToken) {
        this.searchVideos(this.query, this.nextPageToken, this.filters);
      }
    },

    toggleFavorite(video: any) {
      const index = this.favorites.findIndex((v: any) => v.id === video.id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(video);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
});
