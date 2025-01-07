import api from './axiosConfig';

export const getAllPosts = async (pageCount = 1, itemCount = 5) => {
  try {
    const response = await api.get("/posts/getAllPosts", { params: { pageCount, itemCount }, requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}