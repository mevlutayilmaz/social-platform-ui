import api from "./axiosConfig";

export const getAllPosts = async (pageCount = 1, itemCount = 2, username = null) => {
  try {
    const response = await api.get("/posts/getAllPosts", { params: { pageCount, itemCount, username }, requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const createPost = async (formData) => {
  try {
    const response = await api.post("/posts/createPost", formData, {
      requiresAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      }});
      return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/deletePost/${postId}`, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}