<template>
  <styled-button class="archive-tab" @click="open=true">Archive</styled-button>
  <transition name="slide">
    <div class="archive-overlay" v-if="open">
      <div class="archive-header">
        <h1>Archive</h1>
        <button class="material-icons-round archive-close" @click="open=false">close</button>
      </div>
      <list v-bind="$attrs" :inverted="true"/>
    </div>
  </transition>
</template>

<script>
import List from './List.vue'
import StyledButton from './StyledButton.vue'

export default {
  name: 'Archive',
  components: { StyledButton, List },
  inheritAttrs: false,
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
    overflow: auto;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(100%);
  }

  .archive-overlay h1 {
    color: var(--space-color);
  }

  .archive-close {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    border: none;
    outline: none;
    
    background: none;
    font-size: 36px;
    color: var(--space-color);
    
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .button.archive-tab {
    position: absolute;
    left: 1em;
    bottom: 0;
    padding-bottom: 0.75em;
    border-radius: 1em 1em 0 0;

    background: var(--accent-color);
    color: var(--space-color);

    transform: translateY(0.25em);
  }
  .button.archive-tab:hover {
    transform: none;
  }
</style>