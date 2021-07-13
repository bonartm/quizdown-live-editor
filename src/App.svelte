<script lang="ts">
import Editor from './Editor.svelte';
import Quizdown from './Quizdown.svelte';
import { default_code, add_to_code } from './default_quiz.js';
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';
import Loading from './Loading.svelte';

let code = '';
let editorReady = false;
let node: HTMLElement;

function set_code_url(code: string) {
  let urlcode = encodeURIComponent(code);
  if (!!urlcode) {
    history.replaceState(null, '', './?code=' + urlcode);
  } else {
    history.replaceState(null, '', './');
  }
}

onMount(async () => {
  let params = new URLSearchParams(window.location.search);
  if (!!params.get('code')) {
    // set code from url
    code = decodeURIComponent(params.get('code'));
  } else {
    code = default_code(true);
  }
});

$: if (editorReady) set_code_url(code);
$: if (editorReady) node.classList.remove('hidden');
</script>

<div class="container" style="margin: auto; width: 90%; max-width:1400px;">
  <h1>Quizdown Live Editor</h1>

  {#if !editorReady}
    <Loading />
  {/if}

  <div bind:this="{node}" class="flex three grow hidden">
    <div>
      <div class="title"><span>Code Editor </span></div>

      <div id="input-buttons" class="flex two">
        <button on:click="{() => (code = add_to_code(code, 'multiple-choice'))}"
          >➕ Multiple Choice</button>
        <button on:click="{() => (code = add_to_code(code, 'single-choice'))}"
          >➕ Single Choice</button>
        <button on:click="{() => (code = add_to_code(code, 'sequence'))}"
          >➕ Sequence</button>
        <button on:click="{() => (code = '')}">🗑️ Clear</button>
      </div>
      <Editor bind:editorReady bind:code />
    </div>
    <div>
      <div class="title"><span>App Preview</span></div>
      <Quizdown bind:code editorReady="{editorReady}" />
    </div>
  </div>

  <div class="flex two grow">
    <div class="title"><span>About</span></div>
    <p class="description">
      <a href="https://github.com/bonartm/quizdown-js">quizdown-js</a>
      is a javascript library that takes markdown formatted text and converts it
      into a modular quiz application inside any website. quizdown is best used in
      combination with existing static site generators like hugo or sphinx. Check
      out <a href="https://github.com/bonartm/hugo-quiz">hugo-quiz</a>
      and
      <a href="https://github.com/bonartm/sphinxcontrib-quizdown"
        >sphinxcontrib-quizdown</a
      >.
    </p>
    <p class="description">
      Please note: The quizzes are intended for fun and self-learning, not for
      serious assessment. As everything is rendered on the client side, the
      hints and solutions to the questions will be visible if Javascript is
      disabled in the browser.
    </p>
  </div>
</div>

<style>
.hidden {
  display: none;
}

#input-buttons {
  padding-right: 1em;
  padding-left: 1em;
  width: 90%;
  padding-bottom: 1em;
}

#input-buttons button {
  background-color: unset;
  text-align: left;
}

#input-buttons button:hover {
  background-color: lightgray;
}

.title {
  background-color: lightgray;
  width: 90%;
  height: 1.5em;
  font-size: 1.5em;
  display: inline-block;
  border-radius: 6px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-top: 1em;
}

p.description {
  font-size: larger;
}

.title span {
  padding-left: 0.1em;
  padding-top: 0.25em;
  vertical-align: middle;
}
</style>
