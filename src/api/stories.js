import api from './axiosConfig';

export const getStories = async () => {
  try {
    const response = await api.get("/stories/getStories", { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}