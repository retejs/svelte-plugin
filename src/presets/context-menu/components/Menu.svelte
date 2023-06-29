<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { Item as ItemType } from "../types";
  import Search from "./Search.svelte";
  import Item from "./Item.svelte";
  import { debounce } from "../utils/debounce";

  export let items: ItemType[];
  export let delay: number;
  export let searchBar: boolean;
  export let onHide: () => void;

  let filter = "";
  let hide: ReturnType<typeof debounce>;

  const getItems = (items: ItemType[], filter: string) => {
    const filterRegexp = new RegExp(filter, "i");
    const filteredList = items.filter((item) => item.label.match(filterRegexp));

    return filteredList;
  };

  $: filteredList = getItems(items, filter);

  onMount(() => {
    hide = debounce(delay, onHide);
  });

  onDestroy(() => {
    if (hide) hide.cancel();
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  class="menu"
  on:mouseover={hide.cancel}
  on:mouseleave={hide.call}
  data-testid="context-menu"
>
  {#if searchBar}
    <div class="block">
      <Search text={filter} on:change={(event) => (filter = event.detail)} />
    </div>
  {/if}

  {#each filteredList as item (item.key)}
    <Item
      on:select={() => item.handler()}
      {delay}
      on:hide={onHide}
      subitems={item.subitems}
    >
      {item.label}
    </Item>
  {/each}
</div>

<style lang="scss">
  @use "sass:math";
  @import "../block";
  @import "../context-vars";

  .menu {
    padding: 10px;
    width: $width;
    margin-top: -20px;
    margin-left: -(math.div($width, 2));
  }
</style>
