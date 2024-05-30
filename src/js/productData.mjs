// Function to convert response to JSON and handle errors
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

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
}

// Function to find a product by ID in backpacks data
export async function findBackpackById(id) {
  const products = await getBackpackData();
  return products.find((item) => item.Id === id);
}
