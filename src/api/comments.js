import api from "./axiosConfig";

export const getComments = async (postId) => {
  try {    
    const response = await api.get("/comments/getComments", { params: { postId }, requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const addComment = async (data) => {
  try {    
    const response = await api.post("/comments/addComment", data, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/comments/deleteComment/${id}`, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}