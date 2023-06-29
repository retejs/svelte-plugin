<script lang="ts">
  import type { Position } from "../../../types";
  import type { Pin as PinType, Translate } from "../types";
  import Pin from "./Pin.svelte";

  export let pins: PinType[];
  export let menu: (id: string) => void;
  export let translate: Translate;
  export let down: (id: string) => void;
  export let getPointer: () => Position;
</script>

<div class="pins">
  {#each pins as pin (pin.id)}
    <Pin
      position={pin.position}
      selected={pin.selected}
      {getPointer}
      on:menu={() => {
        menu(pin.id);
      }}
      on:translate={(event) =>
        translate(pin.id, event.detail.dx, event.detail.dy)}
      on:down={() => down(pin.id)}
    />
  {/each}
</div>
