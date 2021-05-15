<script lang='ts'> 

import { onMount } from 'svelte';
import { create_app } from 'quizdown'


export let mounted: boolean;
export let code: string;

let quizdown_node: HTMLElement;

$: {
    if (mounted){
        create_app(code, quizdown_node, {})
    }
}
</script>

<div bind:this={quizdown_node} class='quizdown-area'></div>

<style>
    .quizdown-area {
        width:90%;   
        padding: 10px;
    }
</style>



