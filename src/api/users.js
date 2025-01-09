import api from './axiosConfig';

export const createUser = async (nameSurname, username, email, password, passwordConfirm) => {
  try {
    await api.post("/users/createUser", { nameSurname, username, email, password, passwordConfirm }, { successMessage: 'Kayıt başarılı! Bilgilerinizle giriş yapabilirsiniz.' }); 
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const getUserByUsername = async (username) => {
  try {
    const response = await api.get("/users/getUserByUsername", { params: { username }, requiresAuth: true });    
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const uploadCoverPic = async (formData) => {
  try {
    const response = await api.put("/users/uploadCoverPic", formData, {
      requiresAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      }});
      return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};

export const uploadProfilePic = async (formData) => {
  try {
    const response = await api.put("/users/uploadProfilePic", formData, {
      requiresAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      }});
      return response.data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
  }
};

export const followUser = async (username) => {
  try {
    await api.post("/users/followUser", { username }, { requiresAuth: true }); 
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const unfollowUser = async (username) => {
  try {
    await api.delete(`/users/unfollowUser/${username}`, { requiresAuth: true }); 
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const updateUser = async (data) => {
  try {    
    await api.put("/users/updateUser", data, { requiresAuth: true }); 
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}