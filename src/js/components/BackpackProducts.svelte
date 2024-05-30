<script>
  import { getBackpackData } from "../productData.mjs";
  
  export let category;
  let promise = getBackpackData(category);
  console.log('Promise getBackpackData:', promise);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function ensure_array_like_dev(arg) {
    if (typeof arg !== "string" && !(arg && typeof arg === "object" && "length" in arg) && !(typeof Symbol === "function" && arg && Symbol.iterator in arg)) {
      throw new Error("{#each} only works with iterable values.");
    }
  }
</script>

<section class="products-container">
  <h2>Top Products: {capitalizeFirstLetter(category)}</h2>
  {#await promise}
    <p>Loading data...</p>
    <img class="loadingImage" src="../images/loading_image.gif" alt="loading page gif" />
  {:then data}
    {#if data && Array.isArray(data.Result)}
      {ensure_array_like_dev(data.Result)}
      <ul class="product-list-Home">
        {#each data.Result as product}
          <li class="product-card">
            <!-- <a href="/product_pages/index.html?product={product.Id}"> -->
              <a href="/product_pages/index.html?{category}=backpacks&product={product.Id}">
              <img src="{product.Images.PrimaryMedium}" alt="{product.Brand.Name}" />
              <h3 class="card__brand">{product.Brand.Name}</h3>
              <h2 class="card__name">{product.NameWithoutBrand}</h2>
              <p class="product-card__price">${product.ListPrice}</p>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No products found.</p>
    {/if}
  {:catch error}
    {console.log('Error:', error)}
    <p>Error loading products: {error.message}</p>
  {/await}
</section>
