<script lang='ts'>
    import ColorPicker from './ColorPicker.svelte'    
    import { onMount } from 'svelte';
    export let quizdown_app_id: string;   
    let primary_color = '#FF851B';  
    let secondary_color = '#DDDDDD';

    let node: HTMLElement;

    onMount(async () => { 
        node = document.getElementById(quizdown_app_id)        
    });

    $: {
        if (document.readyState === "complete"){
            let app_node = node.getElementsByClassName("quizdown-content")[0] as HTMLElement
            app_node.style.setProperty('--quizdown-color-primary', primary_color);
            app_node.style.setProperty('--quizdown-color-secondary', secondary_color);            
        }                
    }
</script>

<h3>Color theme:</h3>

<ColorPicker bind:color={primary_color} id='pickr_1'></ColorPicker>
<ColorPicker bind:color={secondary_color} id='pickr_2'></ColorPicker>






