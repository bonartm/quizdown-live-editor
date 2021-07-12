<script lang='ts'> 

import { onMount } from 'svelte';
import quizdownHighlight from 'quizdown/public/build/extensions/quizdownHighlight.js'
import quizdownKatex from 'quizdown/public/build/extensions/quizdownKatex.js'
import quizdown from 'quizdown'


export let mounted: boolean;
export let code: string;

let quizdown_node: HTMLElement;

$: {
    if (mounted){
        quizdown.register(quizdownHighlight).register(quizdownKatex).createApp(code, quizdown_node, {})
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



