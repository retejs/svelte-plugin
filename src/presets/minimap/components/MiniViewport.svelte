<script lang="ts">
  import { px } from "../utils";
  import { useDrag } from "../../../shared/drag";
  import type { Translate } from "../types";

  export let left: number;
  export let top: number;
  export let width: number;
  export let height: number;
  export let containerWidth: number;
  export let translate: Translate;

  let drag: ReturnType<typeof useDrag>;

  function scale(value: number, width: number) {
    return value * width;
  }

  function invert(value: number) {
    return value / containerWidth;
  }

  function onDrag(dx: number, dy: number) {
    translate(invert(-dx), invert(-dy));
  }

  $: {
    drag = useDrag(onDrag, (e) => ({ x: e.pageX, y: e.pageY }));
  }
</script>

<div
  class="mini-viewport"
  on:pointerdown|stopPropagation={drag.start}
  style:left={px(scale(left, containerWidth))}
  style:top={px(scale(top, containerWidth))}
  style:width={px(scale(width, containerWidth))}
  style:height={px(scale(height, containerWidth))}
  data-testid="minimap-viewport"
/>

<style>
  .mini-viewport {
    position: absolute;
    background: rgba(255, 251, 128, 0.32);
    border: 1px solid #ffe52b;
  }
</style>
