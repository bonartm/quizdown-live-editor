<script lang='ts'> 

import { onMount } from 'svelte';
import { create_app } from 'quizdown'

export let code: string;

let quizdown_node: HTMLElement;

onMount(async () => {     
    create_app(code, quizdown_node, {})
});

$: {
    if (document.readyState === "complete"){
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



