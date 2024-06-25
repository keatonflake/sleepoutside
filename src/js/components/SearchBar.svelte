<script>
    import { createEventDispatcher } from "svelte";
    import { getProductsByCategory } from "../externalServices.mjs";
  
    export let category;
  
    const dispatch = createEventDispatcher();
    let searchTerm = "";
    let suggestions = [];
    let products = [];
  
    async function loadProducts() {
      products = await getProductsByCategory(category);
    }
  
    loadProducts();
  
    function handleInput() {
      dispatch("search", searchTerm);
      updateSuggestions();
    }
  
    function updateSuggestions() {
      if (searchTerm.length > 0) {
        const lowercaseSearch = searchTerm.toLowerCase();
        suggestions = [...new Set(products
          .filter(product => product.Brand.Name.toLowerCase().includes(lowercaseSearch))
          .map(product => product.Brand.Name)
        )].slice(0, 3); // Get unique brand names and limit to top 3
      } else {
        suggestions = [];
      }
    }
  
    function selectSuggestion(suggestion) {
      searchTerm = suggestion;
      dispatch("search", searchTerm);
      suggestions = [];
    }
  </script>
  
  <div class="topnav">
    <div class="search-container">
      <input
        type="text"
        placeholder="Search by brand name"
        id="searchInput"
        name="search"
        bind:value={searchTerm}
        on:input={handleInput}
      />
      <button type="submit"><i class="fa fa-search"></i></button>
      
      {#if suggestions.length > 0}
        <ul class="suggestions">
          {#each suggestions as suggestion}
            <li on:click={() => selectSuggestion(suggestion)}>{suggestion}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  
  <style>
    .topnav {
      overflow: hidden;
      background-color: var(--primary-color);
      padding: 14px 16px;
      position: relative; 
      z-index: 1; 
      margin-top: -17px;
    }
  
    .topnav .search-container {
      float: right;
      position: relative;
    }
  
    .topnav input[type="text"] {
      padding: 6px;
      font-size: 17px;
      border: none;
    }
  
    .topnav .search-container button {
      padding: 6px 10px;
      background: var(--light-grey);
      font-size: 17px;
      border: none;
      cursor: pointer;
    }
  
    .topnav .search-container button:hover {
      background: #ccc;
    }
  
    .suggestions {
      background: white;
      border: 1px solid hsl(0, 58%, 34%);
      border-top: none;
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow-y: none;
      z-index: 1000; 
      width: 100%;
    }
  
    .suggestions li {
      padding: 10px;
      cursor: pointer;
    }
  
    .suggestions li:hover {
      background-color: #f0f0f0;
    }
  
    @media screen and (max-width: 600px) {
      .topnav .search-container {
        float: none;
        width: 100%;
      }
  
      .topnav input[type="text"],
      .topnav .search-container button {
        float: none;
        width: 100%;
        margin: 0;
        padding: 10px;
        box-sizing: border-box;
      }
  
      .topnav input[type="text"] {
        border: 1px solid #ccc;
      }
    }
  </style>
  