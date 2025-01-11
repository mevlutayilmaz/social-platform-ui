import api from './axiosConfig';

export const getStories = async () => {
  try {
    const response = await api.get("/stories/getStories", { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const getUserStories = async (username) => {
  try {
    const response = await api.get("/stories/getUserStories", { params: { username }, requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const createStory = async (formData) => {
  try {
    const response = await api.post("/stories/createStory", formData, {
      requiresAuth: true,
      successMessage: "The story was created successfully.",
      headers: {
        "Content-Type": "multipart/form-data",
      }});
      return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};