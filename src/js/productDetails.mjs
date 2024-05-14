import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage} from "./utils.mjs";

let currentProducts = getLocalStorage("so-cart") || [];

export default async function productDetails(productId, selector) {
  let newProduct = await findProductById(productId);
  //get current pruducts in local storage and add it to a new array with the new product
  currentProducts.push(newProduct);
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(newProduct));
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  setLocalStorage("so-cart", currentProducts);
  console.log("clicked");
}

function productDetailsTemplate(newProduct) {
  return `<h3>${newProduct.Brand.Name}</h3>
  <h2 class="divider">${newProduct.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${newProduct.Image}"
    alt="${newProduct.Name}"
  />
  <p class="product-card__price">$${newProduct.FinalPrice}</p>
  <p class="product__color">${newProduct.Colors[0].ColorName}</p>
  <p class="product__description">
  ${newProduct.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${newProduct.Id}">Add to Cart</button>
  </div>`;
}