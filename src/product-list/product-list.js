import ProductList from "../js/components/ProductList.svelte";
<<<<<<< HEAD
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
=======
import { loadHeaderFooter, getParam } from "../js/utils.mjs";

loadHeaderFooter();

let category = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: category },
});
>>>>>>> 778a4bff565eb70838e584d7a3eed263a6cb570f
