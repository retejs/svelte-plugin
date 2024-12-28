<script lang="ts">
  import { Component, onMount } from "svelte";
  import type { ClassicScheme } from "../types";
  import type { Position } from "../../../types";
  type PositionWatcher = (cb: (value: Position) => void) => () => void;

  export let component: Component;
  export let data: ClassicScheme["Connection"] & { isLoop?: boolean };
  export let start: Position | PositionWatcher;
  export let end: Position | PositionWatcher;
  export let path: (start: Position, end: Position) => Promise<string>;

  let observedStart = { x: 0, y: 0 };
  let observedEnd = { x: 0, y: 0 };
  let observedPath = "";

  $: startPosition = start && "x" in start ? start : observedStart;
  $: endPosition = end && "x" in end ? end : observedEnd;
  $: {
    fetchPath(startPosition, endPosition);
  }

  async function fetchPath(start: Position, end: Position) {
    observedPath = await path(start, end);
  }

  onMount(() => {
    const unwatch1 =
      typeof start === "function" && start((pos) => (observedStart = pos));

    const unwatch2 =
      typeof end === "function" && end((pos) => (observedEnd = pos));

    return () => {
      unwatch1 && unwatch1();
      unwatch2 && unwatch2();
    };
  });
</script>

<svelte:component
  this={component}
  {...data}
  start={observedStart}
  end={observedEnd}
  path={observedPath}
/>
