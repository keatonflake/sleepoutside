<script>
  import { getData } from "../productData.mjs";

  // this is how we make a prop in svelte
  export let category;

  let promise = getData(category);
  console.log("Promise getData:", promise);

  // Function to capitalize the first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<section class="products-container">
  <!-- <h2>Top Products: {category}</h2> -->
  <h2>Top Products: {capitalizeFirstLetter(category)}</h2>

  {#await promise}
    <p>Loading data...</p>
    <img
      class="loadingImage"
      src="../images/loading_image.gif"
      alt="loading page gif"
    />
  {:then products}
    <ul class="product-list-Home">
      {#each products as product}
        <li class="product-card">
          <a href={`../../product_pages/index.html?product=${product.Id}`}>
            <!-- <a href="../../product_pages/index.html"> -->
            <img
              src={product.Images.PrimaryMedium}
              alt={product.Brand["Name"]}
            />
            <h3 class="card__brand">{product.Brand["Name"]}</h3>
            <h2 class="card__name">{product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.ListPrice}</p>
          </a>
        </li>
      {/each}
    </ul>
  {:catch error}
    {console.log("Error:", error)}
    <p>Error loading products: {error.message}</p>
  {/await}
</section>
