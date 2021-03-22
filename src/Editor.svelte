<script lang='ts'>
    import { onMount } from 'svelte';
    import {CodeJar } from 'codejar';
    import {withLineNumbers} from 'codejar/linenumbers'
    import {debounce} from './debounce.js'
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github.css'
    import markdown from 'highlight.js/lib/languages/markdown';
    hljs.registerLanguage('markdown', markdown);



    export let id: string;
    export let code: string;

    const highlight = (editor: HTMLElement) => {
        const code = editor.textContent
        const highlightedCode = hljs.highlight('markdown', code).value
        editor.innerHTML = highlightedCode
    }

    let jar = undefined;

    onMount(async () => {		
        let node = document.getElementById(id)
        jar = CodeJar(node, withLineNumbers(highlight), {tab: '    '});
        jar.updateCode(code)
        jar.onUpdate(debounce((update => {code = update}), 1500, false));
	});

    $: {
        if (document.readyState === "complete"){
            jar.updateCode(code)      
        }                
    }

  
</script>

<div id="{id}" class="editor-area"></div>

<style>

    :global(.codejar-linenumbers){
        mix-blend-mode: normal !important;
        color: gray !important;
    } 

    .editor-area{
        width:90%;
        border-radius: 6px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        font-family: 'Source Code Pro', monospace;
        font-size: 14px;
        font-weight: 400;
        height:100%;
        letter-spacing: normal;
        line-height: 20px;
        padding: 10px;
        tab-size: 2;
    }
</style>



