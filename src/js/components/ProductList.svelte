<script>
  import { getProductsByCategory } from "../externalServices.mjs";
  import { onMount } from "svelte";
  import { getDiscountedPrice } from "../utils.mjs";
  import SearchBar from "./SearchBar.svelte";
  // export let product;
  // const baseURL = import.meta.env.VITE_BASE_URL;

  export let category;

  let products = [];
  let filteredProducts = [];
  let searchTerm = "";

  onMount(async () => {
    products = await getProductsByCategory(category);
    filteredProducts = sortProducts(products);
  });

  function handleSearch(event) {
    searchTerm = event.detail;
    if (searchTerm) {
      filteredProducts = sortProducts(products.filter(product => 
        product.Brand.Name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      filteredProducts = sortProducts(products);
    }
  }

  function sortProducts(products) {
    return products.slice().sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<SearchBar {category} on:search={handleSearch} />

<section class="products-container">
  <h2>Top Products: {capitalizeFirstLetter(category)}</h2>

<!-- 
  {#await promise}
    <p>Loading data...</p>
    <img
      class="loadingImage"
      src="../images/loading_image.gif"
      alt="loading page gif"
    />
    {:then products} 
    {:then products}
    <ul class="product-list-Home">
      < Sort the products by NameWithoutBrand in alphabetical order (A-Z) -->
      <!-- {#each products as product} -->


  {#if filteredProducts.length > 0}
    <ul class="product-list-Home">
      {#each filteredProducts as product}
        <li class="product-card">
          <a href={`../product_pages/index.html?product=${product.Id}`}>
            <!-- <a href={`../../product_pages/index.html?product=${product.Id}`}> -->

            <picture>
              <source media="(max-width: 460px)" srcset={product.Images.PrimarySmall} />
              <source media="(max-width: 500px)" srcset={product.Images.PrimaryMedium} />
              <source media="(min-width: 501px)" srcset={product.Images.PrimaryLarge} />
              <!-- <img src={product.Images.PrimaryMedium} alt={product.Brand.Name} /> -->
              <img src={'../images/sleepoutside/' + product.Images.PrimaryMedium} alt={product.Brand.Name} />
            </picture>

            <!-- <picture>
              <source media="(max-width: 460px)" srcset={`${baseURL}images/sleepoutside/${product.Images.PrimarySmall}`} />
              <source media="(max-width: 500px)" srcset={`${baseURL}images/sleepoutside/${product.Images.PrimaryMedium}`} />
              <source media="(min-width: 501px)" srcset={`${baseURL}images/sleepoutside/${product.Images.PrimaryLarge}`} />
              <img src={`/images/sleepoutside/${product.Images.PrimaryMedium}`} alt={product.Brand.Name} />
            </picture> -->

            <h3 class="card__brand">{product.Brand.Name}</h3>
            <h2 class="card__name">{product.NameWithoutBrand}</h2>
            <p class="product-card__price list_price">
              List Price: ${product.ListPrice}
            </p>
            <p class="product-card__price discount">
              Discount: ${product.IsClearance
                ? (product.FinalPrice * 0.2).toFixed(2)
                : "0.00"}
            </p>
            <p class="product-card__price final_price">
              Final Price: ${getDiscountedPrice(product).finalPrice}
            </p>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No products found matching your search.</p>
  {/if}
</section>
