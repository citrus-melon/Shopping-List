<template>
  <li @click="handleClick" :class="{completed: completed}" class="todo-item">
    <span
      ref="text"
      id="text"
      :contenteditable="contenteditable"
      @input="handleInput"
      @keydown.tab.exact.prevent="handleNext"
      @keyup.enter="handleNext"
      @blur="handleBlur"
      >{{ label }}</span
    ><span v-if="!last">, </span>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["label", "completed", "editing", "last"],
  emits: ["update:label", "update:completed", "remove", "next"],
  methods: {
    handleClick(e) {
      if (this.editing) return;
      this.$emit("update:completed", !this.completed);
    },
    handleInput(e) {
      this.$emit("update:label", e.target.innerText);
    },
    handleBlur() {
      if (this.label == "") {
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
 .todo-item {
  display: inline;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.todo-item.completed #text {
  text-decoration: line-through;
  opacity: 50%;
}
.todo-item #text:focus {
  outline: none;
  text-decoration: unset;
  opacity: unset;

  color: var(--accent-color);
  background-color: var(--space-color);
  box-shadow: var(--shadow-color) 0 3px 6px;
  border-radius: 0.3em;
}
</style>
