<svelte:options accessors />

<script lang="ts">
  import type { ComponentType } from "svelte";
  import { afterUpdate, onMount } from "svelte";

  export let component: ComponentType;
  export let props: Record<string, unknown> = {};
  export let onRendered: () => void;

  onMount(() => {
    onRendered();
  });
  afterUpdate(() => {
    onRendered();
  });
</script>

<svelte:component this={component} {...props} />
