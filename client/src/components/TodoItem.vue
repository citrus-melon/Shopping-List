<template>
  <li>
    <span
      ref="text"
      :contenteditable="contenteditable"
      @input="handleInput"
      @keydown.tab.exact.prevent="handleNext"
      @keyup.enter="handleNext"
      @blur="handleBlur"
      >{{ modelValue }}</span
    ><span v-if="!last">, </span>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["modelValue", "editing", "last"],
  emits: ["update:modelValue", "remove", "next"],
  methods: {
    handleInput(e) {
      this.$emit("update:modelValue", e.target.innerText);
    },
    handleBlur() {
      if (this.modelValue == "") {
        this.$emit("remove");
      }
    },
    handleNext() {
      this.$emit("next");
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.text.focus();
      });
    },
  },
  computed: {
    contenteditable() {
      return this.editing ? "plaintext-only" : "false";
    },
  },
};
</script>

<style>
/*LIST ITEM*/
#main-list li {
  display: inline;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
#main-list li span:focus {
  outline: none;

  color: var(--accent-color);
  background-color: var(--space-color);
  box-shadow: var(--shadow-color) 0 3px 6px;
  border-radius: 0.3em;
}
</style>
