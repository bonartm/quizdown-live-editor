<script lang="ts">
	import Editor from './Editor.svelte'
    import Quizdown from './Quizdown.svelte';
    import { default_code } from './default_quiz.js'

    let code = default_code()
</script>


<div class="container" style="margin: auto; width: 80%; max-width:1200px;">
    <h1>Quizdown Live Editor</h1>

    <div class="flex three grow">
        <div>
            <div class="title">Code Editor</div>
            <Editor bind:code id="quizdown-editor"></Editor>
        </div>
        <div>
            <div class="title"> App Preview</div>
            <Quizdown bind:code id="quizdown-app"></Quizdown>
        </div>       
    </div>
</div>

<style>
    .title {
        background-color: lightgray;
        width:90%;
        height:1.5em;
        font-size: 1.5em;
        display:inline-block;
        border-radius: 6px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
</style>
