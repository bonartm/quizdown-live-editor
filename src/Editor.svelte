<script lang='ts'>
    import { onMount } from 'svelte';
    import {debounce} from './debounce.js'
    import loader from '@monaco-editor/loader';

    export let code: string;
    
    loader.config({ 
        paths: { vs: 'monaco-editor/min/vs' }
    });

    let editor_node: HTMLElement;
    let editor;
    export let editorReady: boolean;

    onMount(async () => {
        editorReady = false;
        let monaco = await loader.init()
        editor = monaco.editor.create(editor_node, {
            value: code,
            language: 'markdown',
            automaticLayout: true,
            fontSize: 13
        });
        editor.onDidChangeModelContent(debounce((e => {
            code = editor.getValue()
        }), 500, false));   
        editorReady = true;              
    }); 

    $: if (editorReady && editor.getValue() !== code) editor.setValue(code)
  
</script>

<div class='editor-container' bind:this={editor_node}></div>

<style>
    .editor-container {
        height:600px;
        max-height:900px;
        width:90%;
    }
</style>
