import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  console.log("the token from currentOrders function is: " + token);
  try {
    const orders = await getOrders(token);
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders
  .map((order) => {
    return `
      <tr>
        <td>${order.id}</td>
        <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
        <td>${order.items ? order.items.length : 0}</td>
        <td>${order.orderTotal}</td>
      </tr>
    `;
  })
  .join("");
    // const parent = document.querySelector(`${selector} tbody`);
    // parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

// function orderTemplate(order) {
//   return `<tr><td>${order.id}</td>
//   <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
//   <td>${order.items.length}</td>
//   <td>${order.orderTotal}</td></tr>`;
// }