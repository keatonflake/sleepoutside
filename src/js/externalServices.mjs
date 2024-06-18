const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    // throw new Error("Bad Response");
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  console.log(response);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(order) {
  const response = await fetch(baseURL + "checkout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  // const data = await convertToJson(response);
  // return data;
  if (!response.ok) {
    throw { name: "servicesError", message: await response.json() };
  }
  return response.json();
}