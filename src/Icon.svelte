<script lang="ts">
  export let name;
  export let color = 'black';
  import feather from 'feather-icons';
</script>

<span class="icon">
  {@html feather.icons[name].toSvg({
    width: '1em',
    height: 'auto',
    color: color
  })}
</span>

<style>
  .icon {
    vertical-align: text-top;
  }
</style>
