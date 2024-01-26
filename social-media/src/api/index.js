import axios from 'axios';

// const API_URL = 'https://656e9ed36529ec1c62366544.mockapi.io/api';
const API_URL = 'https://npm.dashgin.com/zamir/'
// const API_URL = 'http://localhost:3000/api';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçilər alinmadi.');
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadəçi tapilmadi.');
  }
};

export const postUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci əlavə edilmədi.');
  }
};

// export const updateUser = async (userId, updatedUserData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${userId}`, updatedUserData);
//     return response.data;
//   } catch (error) {
//     throw new Error('Istifadeci yenilənmədi.');
//   }
// };

export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.patch(`${API_URL}${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci yenilənmədi.');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Istifadeci silinmedi.');
  }
};
