<template>
  <input type="checkbox" :id="$uniqueId" class="hidden-checkbox"
    :checked="modelValue" @input="update" v-bind="$attrs">
  <label :for="$uniqueId" class="button" tabindex="0"><slot>Toggle</slot></label>
</template>

<script>
import StyledButton from './StyledButton.vue';
import UniqueId from '../mixins/uniqueId';

export default {
  name: 'ToggleButton',
  extends: [StyledButton],
  mixins: [UniqueId],
  inheritAttrs: false,
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    update(e) {
      this.$emit("update:modelValue", e.target.checked);
    }
  }
}
</script>

<style>
.hidden-checkbox {
  display: none;
}

.hidden-checkbox:checked + label {
  color: var(--space-color);
  background-color: var(--accent-color);
}
</style>