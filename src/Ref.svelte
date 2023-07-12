<script lang="ts">
  type RefUpdate = (ref: HTMLElement) => void;

  import { onMount } from "svelte";

  export let init: RefUpdate;
  export let unmount: RefUpdate;

  let ref: HTMLElement;

  $: {
    // trigger 'rendered' on update
    if (ref) init(ref);
  }

  onMount(() => {
    init(ref);
    return () => {
      unmount(ref);
    };
  });
</script>

<span {...$$restProps} bind:this={ref} />
