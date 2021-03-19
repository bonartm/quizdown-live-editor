<script lang='ts'>
    import { onMount } from 'svelte';
    import Pickr from '@simonwep/pickr';
    import '@simonwep/pickr/dist/themes/nano.min.css';

    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return ('_'+S4()+S4());
    }

    export let id: string;
    export let color: string;

    let random_id = guidGenerator();

    onMount(async () => {
		const pickr = Pickr.create({
            el: '#'+id,
            theme: 'nano',
            lockOpacity: false,
            comparison: false,
            default: color,
            components: {
                preview: true,
                hue: true,
                interaction: {
                }
            }
        });
       
        pickr.on('change', (new_color, source, instance) => {                
                color = new_color.toHEXA()                
            }        
        )
	});    
   
</script>


<div id="{id}"></div>





