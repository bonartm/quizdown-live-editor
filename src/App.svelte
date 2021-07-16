<script lang="ts">
  import Editor from './Editor.svelte';
  import Quizdown from './Quizdown.svelte';
  import { default_code, add_to_code } from './default_quiz.js';
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';
  import Icon from './Icon.svelte';
  import Panel from './Panel.svelte';

  let code = '';
  let editorReady = false;
  let node: HTMLElement;
  let seeAbout = false;
  let navHeight = 30;

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

<nav bind:clientHeight="{navHeight}">
  <h1 class="brand">Quizdown Editor</h1>

  <!-- responsive-->
  <input id="bmenub" type="checkbox" class="show" />
  <label for="bmenub" class="burger pseudo button">Menu</label>

  <div class="menu">
    <a
      title="About"
      class="button pseudo"
      class:selected="{seeAbout}"
      on:click="{() => (seeAbout = !seeAbout)}"
      href="#about"><Icon name="help-circle" /> About</a>
    <a
      title="Visit the quizdown-js project"
      class="button pseudo"
      target="_blank"
      href="https://github.com/bonartm/quizdown-js"
      ><Icon name="github" /> GitHub</a>
  </div>
</nav>

<div class="container">
  {#if !editorReady}
    <Loading />
  {/if}

  <Panel isOpen="{seeAbout}" top="{navHeight}">
    <h2>About</h2>
    <p>
      <a href="https://github.com/bonartm/quizdown-js">quizdown-js</a>
      is a javascript library that takes markdown formatted text and converts it
      into a modular quiz application inside any website. quizdown is best used in
      combination with existing static site generators like hugo or sphinx. Check
      out
      <a href="https://github.com/bonartm/hugo-quiz">hugo-quiz</a>
      and
      <a href="https://github.com/bonartm/sphinxcontrib-quizdown"
        >sphinxcontrib-quizdown</a
      >.
    </p>
    <p>
      The quizzes are intended for fun and self-learning, not for serious
      assessment. As everything is rendered on the client side, the hints and
      solutions to the questions will be visible if Javascript is disabled in
      the browser.
    </p>
  </Panel>

  <div bind:this="{node}" class="hidden">
    <!-- two column layout >900 -->
    <div class="flex one two-900">
      <!-- 4 buttons in a row -->
      <aside class="full">
        <div class="4">
          <button
            title="Add a multiple choice question"
            class="icon pseudo"
            on:click="{() => (code = add_to_code(code, 'multiple-choice'))}"
            ><Icon name="grid" /> Multiple Choice</button>
          <button
            title="Add single choice question"
            class="icon pseudo"
            on:click="{() => (code = add_to_code(code, 'single-choice'))}"
            ><Icon name="check" /> Single Choice</button>
          <button
            title="Add a sequence question"
            class="icon pseudo"
            on:click="{() => (code = add_to_code(code, 'sequence'))}"
            ><Icon name="list" /> Sequence</button>
          <button
            title="Remove everything"
            class="icon pseudo"
            on:click="{() => (code = '')}"
            ><Icon name="trash-2" color="indianred" /></button>
        </div>
      </aside>
      <!-- one column below 900 -->
      <!-- hide editor when <600 -->
      <div class="none full-600 half-900">
        <Editor bind:editorReady bind:code />
      </div>
      <div>
        <Quizdown bind:code editorReady="{editorReady}" />
      </div>
    </div>
  </div>
</div>

<style>
  .selected {
    background-color: lightgray;
  }

  button.icon {
    text-align: left;
  }
  nav .button {
    box-shadow: inset 0 0 0 99em rgba(17, 17, 17, 0.1);
  }

  nav .button:hover {
    box-shadow: inset 0 0 0 99em lightgray;
  }

  .container {
    padding-top: 3em;
    margin: auto;
    width: 90%;
  }

  .hidden {
    display: none;
  }
</style>
