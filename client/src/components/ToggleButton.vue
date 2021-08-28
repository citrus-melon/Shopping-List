<template>
  <input type="checkbox" :id="$uniqueId" class="hidden-checkbox"
    :checked="modelValue" @input="update" v-bind="$attrs">
  <label :for="$uniqueId" class="button" :class="[variant]" tabindex="0"><slot>Toggle</slot></label>
</template>

<script>
import StyledButton from './StyledButton.vue';
import UniqueId from '../mixins/uniqueId';

export default {
  name: 'ToggleButton',
  extends: [StyledButton],
  mixins: [UniqueId],
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'uncolored',
      validator: value => value === 'colored-light' || value === 'uncolored'
    },
    modelValue: { type: Boolean }
  },
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

.hidden-checkbox:checked + label.uncolored {
  color: var(--space-color);
  background-color: var(--accent-color);
}
.hidden-checkbox:checked + label.colored-light {
  color: var(--accent-color);
  background-color: var(--space-color);
}
</style>