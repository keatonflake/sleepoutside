<script>
  import { getProductsByCategory } from "../externalServices.mjs";
  import { onMount } from 'svelte';
  import { getDiscountedPrice } from '../utils.mjs';

  export let category;

  let promise = getProductsByCategory(category);
  console.log("Promise getProductsByCategory:", promise);

  // Function to capitalize the first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Alert/Promotions
  let alerts = [];

  onMount(async () => {
    const response = await fetch('../json/alerts.json');
    alerts = await response.json();
    console.log('Alert/s:', alerts);
  });
</script>

{#each alerts as { message, backgroundColor }}
  <div class="alert" style="background-color: {backgroundColor}">
    {message}
  </div>
{/each}

<section class="products-container">
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
            <img
              src={product.Images.PrimaryMedium}
              alt={product.Brand["Name"]} />
            <h3 class="card__brand">{product.Brand["Name"]}</h3>
            <h2 class="card__name">{product.NameWithoutBrand}</h2>
            <!-- <p>${product.IsClearance ? (product.FinalPrice * 0.2).toFixed(2) : "No"}</p>  -->
            <p class="product-card__price list_price">List Price: ${product.ListPrice}</p>
            <p class="product-card__price discount">Discount: ${product.IsClearance ? (product.FinalPrice * 0.2).toFixed(2) : "0.00"}</p> <!-- Display the discount amount -->
            <p class="product-card__price final_price">Final Price: ${getDiscountedPrice(product).finalPrice}</p> 
          </a>
        </li>
      {/each}
    </ul>
  {:catch error}
    {#if error.message === 'No project found'}
      {console.log('No project is found for that item')}
      <p>No project is found for that item</p>
    {:else}
      {console.log('Error:', error)}
      <p>Error loading products: {error.message}</p>
    {/if}
  {/await}
</section>
