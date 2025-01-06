import api from './axiosConfig';

export const login = async (userNameOrEmail, password) => {
  try {
    const response = await api.post('auth/login', { userNameOrEmail, password })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const refreshTokenLogin = async (refreshToken) => {
  try {
    const response = await api.post('auth/refreshTokenLogin', { refreshToken })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};