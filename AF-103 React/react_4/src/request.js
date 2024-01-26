import axios from "axios";

let API_URL = "https://6555d0c584b36e3a431e6433.mockapi.io/products";

export async function getAllData() {
  let getData;
  await axios.get(API_URL + "/products").then((res) => {
    getData = res.data;
  });
  return getData;
}

export async function postData(Data) {
  try {
    const response = await axios.post(API_URL + "products", Data);
    return response.data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
  }


export async function editData(id, data) {
  await axios.put(API_URL + `/products/${id}`, data);
}
export async function deleteData(id) {
  await axios.delete(API_URL + `/products/${id}`);
}


export async function getAllUser() {
    let getData;
    await axios.get(API_URL + "/users").then((res) => {
      getData = res.data;
    });
    return getData;
  }

  export async function postUser(userData) {
    try {
      const response = await axios.post(API_URL + "users", userData);
      return response.data;
    } catch (error) {
      console.error("Error posting user:", error);
      throw error;
    }
  }