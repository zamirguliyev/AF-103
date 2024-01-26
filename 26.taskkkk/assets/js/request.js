let API_URL = "http://localhost:3000";

// SINGER SECTION START
// singer get data
export async function getAllData() {
  let getData;
  await axios.get(API_URL + "/singers").then((res) => {
    getData = res.data;
  });
  return getData;
}
// singet get data with id
export async function getDataID(id) {
  let getData;
  await axios.get(API_URL + `/singers/${id}`).then((res) => {
    getData = res.data;
  });
  return getData;
}
// delete singer card
export async function deleteSinger(id) {
  await axios.delete(API_URL + `/singers/${id}`);
}
//POST SINGER CART
export async function postSinger(name, nationality, imageLink, age, genre) {
  await axios.post(API_URL + `/singers`, {
    name: name,
    nationality: nationality,
    imageLink: imageLink,
    age: age,
    genre: genre,
  });
}
// EDIT SINGER
export async function editSinger(id, data) {
  await axios.patch(API_URL + `/singers/${id}`, data);
}
//SINGER SECTION END

// MEALS SECTION START
// meal get data
export async function getAllDataMeal() {
  let getData;
  await axios.get(API_URL + "/meals").then((res) => {
    getData = res.data;
  });
  return getData;
}
// meal get data with id
export async function getDataIDMeal(id) {
  let getData;
  await axios.get(API_URL + `/meals/${id}`).then((res) => {
    getData = res.data;
  });
  return getData;
}
// delete meal card
export async function deleteMeal(id) {
  await axios.delete(API_URL + `/meals/${id}`);
}
//POST meal CART
export async function postMeal(name, price, imageLink, ingredients) {
  await axios.post(API_URL + `/meals`, {
    name: name,
    price: price,
    imageLink: imageLink,
    ingredients: ingredients,
  });
}
// EDIT meal
export async function editMeal(id, data) {
  await axios.patch(API_URL + `/meals/${id}`, data);
}
// MEALS SECTION END

//USERS SECTION START

export async function registerUser(username, password, email, balance) {
  await axios.post(API_URL + `/users`, {
    username: username,
    password: password,
    email: email,
    balance: balance,
  });
}

export async function getAllUser() {
  let getData;
  await axios.get(API_URL + `/users`).then((res) => {
    getData = res.data;
  });
  return getData;
}

export async function patchUser(id) {
  await axios.patch(API_URL + `/users/${id}`, data);
}
