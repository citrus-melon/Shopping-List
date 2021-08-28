<template>
  <button class="button" :class="[variant]"><slot>Button</slot></button>
</template>

<script>
export default {
  name: 'StyledButton',
  props: {
    variant: {
      type: String,
      default: 'uncolored',
      validator: value => value === 'colored-light' || value === 'uncolored'
    }
  }
}
</script>

<style>

.button {
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  border: none;
  outline: none;
  font-size: 1em;

  padding: 0.5em 1em;
  box-shadow: var(--shadow-color) 0 3px 6px;
  border-radius: 9999px;
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
  transform: translateZ(0);
}

.button:hover, .button:focus {
  transform: translateZ(0) scale(1.1);
}

.button.uncolored {
  color: var(--accent-color);
  background-color: var(--space-color);
}
.button.uncolored:active {
  color: var(--space-color);
  background-color: var(--accent-color);
}

.button.colored-light {
  background-color: var(--lighter-accent-color);
  color: var(--space-color);
}
.button.colored-light:active {
  color: var(--accent-color);
  background-color: var(--space-color);
}
</style>