<script lang="ts">
  import { px } from "../utils";

  export let left: number;
  export let top: number;
  export let width: number;
  export let height: number;
</script>

<div
  class="mini-node"
  style:left={px(left)}
  style:top={px(top)}
  style:width={px(width)}
  style:height={px(height)}
  data-testid="minimap-node"
/>

<style>
  .mini-node {
    position: absolute;
    background: rgba(110, 136, 255, 0.8);
    border: 1px solid rgb(192 206 212 / 60%);
  }
</style>
