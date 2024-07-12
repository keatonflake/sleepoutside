// const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = "/api/";

async function convertToJson(res) {
  try {
    const jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  } catch (error) {
    const textResponse = await res.text();
    console.error("Response was not JSON:", textResponse);
    throw { name: "servicesError", message: textResponse };
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

// get orders
export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

// login
// export async function loginRequest(creds) {
//   console.log("The creds in the external services fuction are:" + creds);
//   const response = await fetch(baseURL + "login/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(creds),
//   });
//   return convertToJson(response);
// }

export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don"t include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  response.forEach(element => {
    console.log(element);
  });
  return response;
}
