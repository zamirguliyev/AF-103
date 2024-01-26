import axios from "axios";

let API_URL = "https://6559d2736981238d054cddea.mockapi.io";

export async function getAllData() {
  let getData;
  await axios.get(API_URL + "/albums").then((res) => {
    getData = res.data;
  });
  return getData;
}

export async function postData(albumData) {
  try {
    const response = await axios.post(API_URL + '/albums', albumData);
    return response.data;
  } catch (error) {
    console.error('Error posting album:', error);
    throw error;
  }
}


export async function editData(id, data) {
  await axios.put(API_URL + `/albums/${id}`, data);
}
export async function deleteData(id) {
  try {
    const response = await axios.delete(API_URL + `/albums/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting data:', error);
    throw new Error('Error deleting data');
  }
}

export async function getAllUser() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  
  export async function postUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error posting user:', error);
      throw error;
    }
  }