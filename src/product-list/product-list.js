import ProductList from "../js/components/ProductList.svelte";
import BackpackProducts from "../js/components/BackpackProducts.svelte";
import { loadHeaderFooter} from "../js/utils.mjs";

loadHeaderFooter();

new ProductList({
  target: document.querySelector(".products"),  // tents
  props: { category: "tents" },
});

new BackpackProducts({
    target: document.querySelector(".products-backpacks"),  // backpack
    props: { category: "backpacks" },
  });
