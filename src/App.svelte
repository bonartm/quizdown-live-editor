<script lang="ts">
	import Editor from './Editor.svelte'
    import Quizdown from './Quizdown.svelte';
    import Options from './Options.svelte'
    import { default_code } from './default_quiz.js'

    let code = default_code()
</script>


<div class="container" style="margin: auto; width: 80%; max-width:1200px;">
    <h1>Quizdown Live Editor</h1>   

    <div class="flex three grow">
        <div>
            <div class="title"><span>Code Editor</span></div>
            <Editor bind:code id="quizdown-editor"></Editor>
            <div class="title"><span>Options</span></div>
            <Options quizdown_app_id="quizdown-app"></Options>
        </div>
        <div>
            <div class="title"><span>App Preview</span></div>
            <Quizdown bind:code id="quizdown-app"></Quizdown>
        </div>       
    </div>

    <div class="flex two grow">
        <div class="title"><span>About</span></div>
        <p class="description">
            <a href="https://github.com/bonartm/quizdown-js">quizdown-js</a> 
            is a javascript library that takes markdown formatted text and 
            converts it into a modular quiz application inside any website. quizdown 
            is best used in combination with existing static site generators like 
            hugo or sphinx. 
            Check out  <a href="https://github.com/bonartm/hugo-quiz">hugo-quiz</a> 
            and <a href="https://github.com/bonartm/sphinxcontrib-quizdown">sphinxcontrib-quizdown</a>.
        </p>
        <p class="description">    
            Please note: The quizzes are intended for fun and self-learning, 
            not for serious assessment. As everything is rendered on the 
            client side, the hints and solutions to the questions will 
            be visible if Javascript is disabled in the browser.
        </p>
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
        margin-top:1em;
    }

    p.description {
        font-size: larger;
    }

    .title span {
        padding-left:0.1em;
        padding-top:0.25em;
        vertical-align: middle;
    }
</style>
