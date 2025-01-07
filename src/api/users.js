import api from './axiosConfig';

export const createUser = async (nameSurname, username, email, password, passwordConfirm) => {
  try {
    await api.post("/users/createUser", { nameSurname, username, email, password, passwordConfirm }, { successMessage: 'Kayıt başarılı! Bilgilerinizle giriş yapabilirsiniz.' }); 
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}