<template>
  <div class="actionStrip" :class="{secondary, inverted}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ActionStrip',
  props: {
    secondary: { type: Boolean, default: false },
    inverted: { type: Boolean, default: false }
  }
}
</script>

<style>
.actionStrip {
  display: flex;
  flex-flow: row wrap;
  margin: 1em 0;
  gap: 0.5em;
}

.actionStrip.secondary {
  padding: 1em;
  border-radius: 1em;
  background-color: var(--accent-color);
}
.actionStrip.secondary.inverted {
  background-color: var(--darker-accent-color);
}

.actionStrip .selected-count {
  color: var(--space-color);
  padding: 0.5em 0;
}
</style>