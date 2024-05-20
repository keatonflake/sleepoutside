
import ProductList from "./components/ProductList.svelte"

// new ProductList({ target: document.querySelector(".product") })

new ProductList({
    target: document.querySelector(".products"),
    props: { category: "tents" },
    
});





