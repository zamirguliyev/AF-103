import axios from "axios";
const BASE_URL ='https://656c3961e1e03bfd572e13c4.mockapi.io'

export const getAllProducts = async()=>{
    let products;
    await axios.get(`${BASE_URL}/products`)
    .then((response)=>{
        products = response.data;
    })
    return products;
}

export const getProductByID = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error; 
    }
  };
  

export const deleteProduct= async(id)=>{
    let product;
    await axios.delete(`${BASE_URL}/products/${id}`)
    .then((response)=>{
        product = response.data;
    })
    return product;
}
export const updateProduct = async (id, payload) => {
    try {
      const response = await axios.patch(`${BASE_URL}/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error; 
    }
  };
  
  

export const postProduct = async(payload)=>{
    let newProduct;
    await axios.post(`${BASE_URL}/products`,payload)
    .then((response)=>{
        newProduct = response.data;
    })
    return newProduct;
}


export const getAllUsers = async()=>{
    let users;
    await axios.get(`${BASE_URL}/users`)
    .then((response)=>{
        users = response.data;
    })
    return users;
}

export const getUserByID = async(id)=>{
    let user;
    await axios.patch(`${BASE_URL}/users/${id}`)
    .then((response)=>{
        user = response.data;
    })
    return user;
}

export const updateUser = async (id, payload) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  };

export const deleteUser= async(id)=>{
    let user;
    await axios.delete(`${BASE_URL}/users/${id}`)
    .then((response)=>{
        user = response.data;
    })
    return user;
}

export const postUser = async(payload)=>{
    let newUser;
    await axios.post(`${BASE_URL}/users`,payload)
    .then((response)=>{
        newUser = response.data;
    })
    return newUser;
}