<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { useDrag } from "../../../shared/drag";
  import type { Position } from "../../../types";

  export let position: Position;
  export let selected: boolean | undefined;
  export let getPointer: () => Position;

  const pinSize = 20;
  const dispatch = createEventDispatcher();

  let drag: ReturnType<typeof useDrag>;

  function onDrag(dx: number, dy: number) {
    dispatch("translate", { dx, dy });
  }

  $: top = `${position.y - pinSize / 2}px`;
  $: left = `${position.x - pinSize / 2}px`;

  onMount(() => {
    drag = useDrag(onDrag, getPointer);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="pin {selected ? 'selected' : ''}"
  style:position="absolute"
  style:top
  style:left
  data-testid="pin"
  on:contextmenu|stopPropagation|preventDefault={() => {
    dispatch("menu");
  }}
  on:pointerdown|stopPropagation|preventDefault={(event) => {
    drag.start(event);
    dispatch("down");
  }}
/>

<style lang="scss">
  $size: 20px;

  .pin {
    width: $size;
    height: $size;
    box-sizing: border-box;
    background: steelblue;
    border: 2px solid white;
    border-radius: $size;
  }

  .pin.selected {
    background: #ffd92c;
  }
</style>
