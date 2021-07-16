<script lang="ts">
  import { slide } from 'svelte/transition';
  export let isOpen = false;
  export let top = 30;
</script>

{#if isOpen}
  <div
    class="panel"
    style="position: {top}px;"
    transition:slide="{{ duration: 300 }}">
    <slot />
  </div>
{/if}

<style>
  .panel {
    position: fixed;
    width: 30%;
    right: 2em;
    z-index: 99;
    background-color: whitesmoke;
    border-radius: 5px;

    padding: 2em;
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
