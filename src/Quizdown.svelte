<script lang='ts'> 

import { onMount } from 'svelte';
import { create_app } from 'quizdown'
import 'quizdown/public/build/quizdown.css';
import { create_bidirectional_transition } from 'svelte/internal';

export let code: string;
export let id: string;


let node;

onMount(async () => { 
    node = document.getElementById(id)   
    create_app(code, node)
});

$: {
    if (document.readyState === "complete"){
        create_app(code, node)
    }
}
</script>

<div id={id} class='quizdown-area'></div>

<style>
    .quizdown-area {
        width:90%;   
        padding: 10px;
    }
</style>



