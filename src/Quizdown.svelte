<script lang='ts'> 

import { onMount } from 'svelte';
import quizdownHighlight from 'quizdown/public/build/extensions/quizdownHighlight.js'
import quizdownKatex from 'quizdown/public/build/extensions/quizdownKatex.js'
import quizdown from 'quizdown'
import type App from './App.svelte';


export let editorReady: boolean;
export let code: string;

let quizdown_node: HTMLElement;
let app: App; 

$: {
    if (editorReady){
        if (app) app.$destroy();       
        app = quizdown.register(quizdownHighlight).register(quizdownKatex).createApp(code, quizdown_node, {})



        
       
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



