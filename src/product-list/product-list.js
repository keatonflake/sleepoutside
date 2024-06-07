import ProductList from "../js/components/ProductList.svelte";
import { loadHeaderFooter, getParam} from "../js/utils.mjs";

loadHeaderFooter();

let category = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: category },
});
