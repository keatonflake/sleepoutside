<<<<<<< HEAD
// Function to convert response to JSON and handle errors
=======
const baseURL = import.meta.env.VITE_SERVER_URL;

>>>>>>> 778a4bff565eb70838e584d7a3eed263a6cb570f
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

<<<<<<< HEAD
// Function to fetch data based on category
export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

// Function to fetch backpack data
export function getBackpackData(category = "backpacks") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}


const baseURL = import.meta.env.VITE_SERVER_URL
export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}


// Function to find a product by ID in tents data
export async function findTentById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
=======
export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  console.log(response);
  const product = await convertToJson(response);
  return product.Result;
>>>>>>> 778a4bff565eb70838e584d7a3eed263a6cb570f
}

// Function to find a product by ID in backpacks data
export async function findBackpackById(id) {
  const products = await getBackpackData();
  return products.find((item) => item.Id === id);
}
