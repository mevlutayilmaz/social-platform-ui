import api from "./axiosConfig";

export const likePost = async (postId) => {
  try {
    const response = await api.post("/likes/likePost", { postId }, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};

export const undoLikePost = async (postId) => {
  try {
    const response = await api.delete("/likes/undoLikePost", { params: { postId }, requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};

export const likeComment = async (commentId) => {
  try {
    const response = await api.post("/likes/likeComment", { commentId }, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};

export const undoLikeComment = async (commentId) => {
  try {
    const response = await api.delete("/likes/undoLikeComment", { params: { commentId }, requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};
