import axios from "axios";
import { BASE_URL } from "../base_url";

export async function getAllProducts() {
    let products;
    await axios.get(`${BASE_URL}/categories`)
    .then((res)=>{
        products = res.data;
    })

    return products;
}

export async function getProductByID(id) {
    let product;
    await axios.get(`${BASE_URL}/categories/${id}`)
    .then((res)=>{
        product = res.data;
    })

    return product;
}

export async function postProduct(payload) {
    let newProduct;
    await axios.post(`${BASE_URL}/categories`,payload)
    .then((res)=>{
        newProduct = res.data;
    })

    return newProduct;
}