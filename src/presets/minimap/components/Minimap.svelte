<script lang="ts">
  import MiniNode from "./MiniNode.svelte";
  import MiniViewport from "./MiniViewport.svelte";
  import { px } from "../utils";
  import type { Rect, Translate } from "../types";

  export let size: number;
  export let ratio: number;
  export let nodes: Rect[];
  export let viewport: Rect;
  export let translate: Translate;
  export let point: (x: number, y: number) => void;

  let container: HTMLElement;

  function dblclick(event: MouseEvent) {
    if (!container) return;
    const box = container.getBoundingClientRect();
    const x = (event.clientX - box.left) / (size * ratio);
    const y = (event.clientY - box.top) / (size * ratio);

    point(x, y);
  }

  function scale(value: number) {
    if (!container) return 0;
    return value * container.clientWidth;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="minimap"
  bind:this={container}
  style="width: {px(size * ratio)}; height: {px(size)}"
  on:pointerdown|stopPropagation|preventDefault={() => null}
  on:dblclick|stopPropagation|preventDefault={dblclick}
  data-testid="minimap"
>
  {#each nodes as node}
    <MiniNode
      left={scale(node.left)}
      top={scale(node.top)}
      width={scale(node.width)}
      height={scale(node.height)}
    />
  {/each}
  <MiniViewport
    left={viewport.left}
    top={viewport.top}
    width={viewport.width}
    height={viewport.height}
    containerWidth={container && container.clientWidth}
    {translate}
  />
</div>

<style>
  .minimap {
    position: absolute;
    right: 24px;
    bottom: 24px;
    background: rgba(229, 234, 239, 0.65);
    padding: 20px;
    overflow: hidden;
    border: 1px solid #b1b7ff;
    border-radius: 8px;
    box-sizing: border-box;
  }
</style>
