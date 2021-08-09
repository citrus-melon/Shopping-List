<template>
  <div class="option-switcher">
    <div class="sliding-background"></div>
    <template v-for="option in options" :key="option">
      <input 
        type="radio"
        :name="$uniqueId"
        :id="$uniqueId+option"
        :checked="option===modelValue"
        @change="onChange(option)"
      >
      <label :for="$uniqueId+option"
        tabindex="0"
        @keydown.enter="onChange(option)"
      > {{ option }} </label>
    </template>
  </div>
</template>

<script>
import UniqueId from '../mixins/uniqueId';

export default {
  name: 'OptionSwitcher',
  mixins: [UniqueId],
  props: ['options', 'modelValue'],
  emits: ['update:modelValue'],
  methods: {
    onChange(option) {
      this.$emit('update:modelValue', option);
    }
  }
}
</script>

<style>
  .option-switcher {
    background: var(--space-color);
    color: var(--accent-color);
    box-shadow: var(--shadow-color) 0 3px 6px;

    display: inline-block;
    border-radius: 9999px;
  }

  .option-switcher input {
    display: none;
  }

  .option-switcher label {
    display: inline-block;
    border-radius: 9999px;
    padding: 0.5em 1em;
  }

  .option-switcher label:hover {
    background-color: var(--shadow-color);
  }
  
  .option-switcher input:checked + label {
    box-shadow: var(--shadow-color) 0 3px 6px;
    background-color: var(--accent-color);
    color: var(--space-color);
  }
</style>