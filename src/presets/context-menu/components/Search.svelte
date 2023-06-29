<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let text: string;

  const dispatch = createEventDispatcher();

  function handleChange(event: Event) {
    dispatch("change", (event.target as HTMLInputElement).value);
  }
</script>

<input
  class="search"
  value={text}
  on:input={handleChange}
  data-testid="context-menu-search-input"
/>

<style>
  .search {
    color: white;
    padding: 1px 8px;
    border: 1px solid white;
    border-radius: 10px;
    font-size: 16px;
    font-family: serif;
    width: 100%;
    box-sizing: border-box;
    background: transparent;
  }
</style>
