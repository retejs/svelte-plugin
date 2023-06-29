<script lang="ts">
  import { onMount } from "svelte";
  import type { Item as ItemType } from "../types";
  import { debounce } from "../utils/debounce";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let subitems: ItemType[] | undefined;
  export let delay: number;

  let visibleSubitems = false;
  let hide: ReturnType<typeof debounce>;

  onMount(() => {
    hide = debounce(delay, hideSubitems);
  });

  function hideSubitems() {
    visibleSubitems = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={"block " + (subitems ? "hasSubitems" : "")}
  on:click={(event) => {
    dispatch("select", event);
    dispatch("hide");
  }}
  on:wheel|stopPropagation={() => null}
  on:pointerover={() => {
    hide.cancel();
    visibleSubitems = true;
  }}
  on:pointerleave={hide.call}
  on:pointerdown|stopPropagation={() => null}
  data-testid="context-menu-item"
>
  <slot />
  {#if subitems && visibleSubitems}
    <div class="subitems">
      {#each subitems as item (item.key)}
        <svelte:self
          {item}
          on:select={() => item.handler()}
          {delay}
          on:hide={() => dispatch("hide")}
          subitems={item.subitems}
        >
          {item.label}
        </svelte:self>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../block";
  @import "../context-vars";

  .hasSubitems:after {
    content: "►";
    position: absolute;
    opacity: 0.6;
    right: 5px;
    top: 5px;
  }

  .subitems {
    position: absolute;
    top: 0;
    left: 100%;
    width: $width;
  }
</style>
