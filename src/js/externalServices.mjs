const baseURL = import.meta.env.VITE_SERVER_URL;
const baseUrl = import.meta.env.baseUrl;  // getting a 401 error your the webserver link


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };

  const response = await fetch(baseUrl + "checkout/", options);
  console.log("Request URL:", baseUrl + "checkout/");
  console.log("Request Options:", options);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  console.log(response);
  const product = await convertToJson(response);
  return product.Result;
}
