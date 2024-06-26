import { findProductById } from "./externalServices.mjs";
import { cartCount } from "./stores.mjs";
import { setLocalStorage, getLocalStorage, getCartCount, getDiscountedPrice } from "./utils.mjs";

export default async function productDetails(productId, selector) {
  // Get current product object
  const newProduct = await findProductById(productId);
  
  // Render the product details
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(newProduct));

  // Add event listener for adding to cart
  el.addEventListener("click", function (event) {
    if (event.target && event.target.id === "addToCart") {
      addToCart(newProduct);
    }
  });
}

function addToCart(newProduct) {
  // Get array from local storage
  let currentProducts = getLocalStorage("so-cart") || [];

  // Check if product is in array
  const existingProductIndex = currentProducts.findIndex(product => product.Id === newProduct.Id);
  
  if (existingProductIndex !== -1) {
    // If it is, increment quantity
    currentProducts[existingProductIndex].Quantity += 1;
  } else {
    // If not, add it with quantity = 1
    newProduct.Quantity = 1;
    currentProducts.push(newProduct);
  }

  // Update local storage
  setLocalStorage("so-cart", currentProducts);

  // update the count
  cartCount.set(getCartCount());

  growAndShrink();

  console.log("Product added to cart, check local storage");
}

function growAndShrink() {
  const image = document.getElementById("cart_icon");
  image.classList.remove("animate");
  
  // Force reflow to ensure the animation can restart
  void image.offsetWidth;

  requestAnimationFrame(() => {
    image.classList.add("animate");
  });
}

function productDetailsTemplate(newProduct) {
  return `  <div class="product-card-detail">
  <h3 class="product-card__brand">${newProduct.Brand.Name}</h3>
  <h2 class="divider">${newProduct.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${newProduct.Images.PrimaryLarge}"
    alt="${newProduct.Name}"
  />

  <p class="product-card__price"> Listed Price: $${newProduct.FinalPrice}</p>
  <p class="product-card__price discount">Discount: ${newProduct.IsClearance ? (newProduct.FinalPrice * 0.2).toFixed(2) : "0.00"}</p> <!-- Display the discount amount -->
  <p class="product-card__price final_price">Final Price: ${getDiscountedPrice(newProduct).finalPrice}</p> 

  <p class="product__color">${newProduct.Colors[0].ColorName}</p>
  <p class="product__description">
    ${newProduct.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${newProduct.Id}">Add to Cart</button>
  </div>
</div>`;
}

