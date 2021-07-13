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

  <div class="menu buttons">
    <button
      title="Add a multiple choice question"
      class="pseudo"
      on:click="{() => (code = add_to_code(code, 'multiple-choice'))}"
      ><Icon name="check" /><Icon name="check" /> Multiple Choice</button>
    <button
      title="Add single choice question"
      class="pseudo"
      on:click="{() => (code = add_to_code(code, 'single-choice'))}"
      ><Icon name="check" /> Single Choice</button>
    <button
      title="Add a sequence question"
      class="pseudo"
      on:click="{() => (code = add_to_code(code, 'sequence'))}"
      ><Icon name="list" /> Sequence</button>
    <button
      title="Remove everything"
      class="pseudo"
      on:click="{() => (code = '')}"
      ><Icon name="trash-2" color="indianred" /></button>
  </div>
</nav>

<Panel isOpen="{seeAbout}" top="{navHeight}">
  <h2>About</h2>
  <p>
    <a href="https://github.com/bonartm/quizdown-js">quizdown-js</a>
    is a javascript library that takes markdown formatted text and converts it into
    a modular quiz application inside any website. quizdown is best used in combination
    with existing static site generators like hugo or sphinx. Check out
    <a href="https://github.com/bonartm/hugo-quiz">hugo-quiz</a>
    and
    <a href="https://github.com/bonartm/sphinxcontrib-quizdown"
      >sphinxcontrib-quizdown</a
    >.
  </p>
  <p>
    The quizzes are intended for fun and self-learning, not for serious
    assessment. As everything is rendered on the client side, the hints and
    solutions to the questions will be visible if Javascript is disabled in the
    browser.
  </p>
</Panel>

<div class="container" style="padding-top:{navHeight}px;">
  {#if !editorReady}
    <Loading />
  {/if}

  <div bind:this="{node}" class="hidden">
    <div class="flex two">
      <div>
        <Editor bind:editorReady bind:code />
      </div>
      <div><Quizdown bind:code editorReady="{editorReady}" /></div>
    </div>
  </div>
</div>

<style>
  nav {
    height: unset;
    min-height: 3em;
    padding-top: 2em;
  }
  .selected {
    background-color: lightgray;
  }

  nav .buttons {
    float: left;
    margin-left: 1em;
  }

  nav .button {
    box-shadow: inset 0 0 0 99em rgba(17, 17, 17, 0.1);
  }

  nav .button:hover {
    box-shadow: inset 0 0 0 99em lightgray;
  }

  .container {
    margin: auto;
    width: 90%;
    max-width: 1400px;
  }

  .hidden {
    display: none;
  }
</style>
