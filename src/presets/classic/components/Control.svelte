<script lang="ts">
  import type { ClassicPreset } from "rete";

  export let data: ClassicPreset.InputControl<"number" | "text">;

  function change(event: Event) {
    const target = event.target as HTMLInputElement;
    const val = data.type === "number" ? +target.value : target.value;
    data.setValue(val);
  }
</script>

<input
  type={data.type}
  value={data.value}
  readonly={data.readonly}
  on:input={change}
  on:pointerdown|stopPropagation={() => false}
/>

<style>
  input {
    width: 100%;
    border-radius: 30px;
    background-color: white;
    padding: 2px 6px;
    border: 1px solid #999;
    font-size: 110%;
    box-sizing: border-box;
  }
</style>
