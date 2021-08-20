<template>
  <styled-button class="archive-tab" @click="open=true">Archive</styled-button>
  <div class="archive-overlay" v-if="open">
    <h1>Archive</h1>
    <styled-button class="archive-close" @click="open=false">Close</styled-button>
    <slot></slot>
  </div>
</template>

<script>
import StyledButton from './StyledButton.vue'

export default {
  name: 'ArchiveWrapper',
  components: { StyledButton },
  data() {
    return { open: false }
  }
}
</script>

<style>
  .archive-overlay {
    background: var(--accent-color);
    color: var(--space-color);

    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 80%;

    padding: 1em;
    border-radius: 2em 2em 0 0;
  }

  .archive-overlay h1 {
    color: var(--space-color);
  }

  .archive-overlay .actionStrip.secondary {
    background-color: var(--darker-accent-color);
  }

  .archive-overlay .selected .label {
    background: var(--space-color);
    color: var(--accent-color);
  }
  .archive-overlay .label:focus {
    background: var(--lighter-accent-color);
    color: var(--space-color);
  }

  .archive-overlay .button {
    background-color: var(--lighter-accent-color);
    color: var(--space-color);
  }
  .archive-overlay .button:active {
    color: var(--accent-color);
    background-color: var(--space-color);
  }
  .archive-overlay .hidden-checkbox:checked + label {
    color: var(--accent-color);
    background-color: var(--space-color);
  }

  .button.archive-tab {
    position: absolute;
    bottom: 0;
    padding-bottom: 0.5em;
    border-radius: 1em 1em 0 0;

    background: var(--accent-color);
    color: var(--space-color);

    transform: none;
  }
  .button.archive-tab:hover {
    transform: translateY(-10%) scale(1.1);
  }
</style>