import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();


const productId = getParam("product");
console.log(productId);
productDetails(productId, ".product-detail");

