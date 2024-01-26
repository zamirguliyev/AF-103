let API_URL = "https://6548d90bdd8ebcd4ab23bacd.mockapi.io";

export async function getAllData() {
  let getData;
  await axios.get(API_URL + "/sliders").then((res) => {
    getData = res.data;
  });
  return getData;
}
// slider get data with id
export async function getDataID(id) {
  let getData;
  await axios.get(API_URL + `/sliders/${id}`).then((res) => {
    getData = res.data;
  });
  return getData;
}
// delete slider
export async function deleteSlider(id) {
  await axios.delete(API_URL + `/sliders/${id}`);
}
//POST Slider
export async function postSlider(title, imageURL) {
  await axios.post(API_URL + `/sliders`, {
    title: title,
    imageURL: imageURL,
  });
}
// EDIT Slider
export async function editSlider(id, data) {
  await axios.put(API_URL + `/sliders/${id}`, data);
}
