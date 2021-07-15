<template>
  <li @click="handleClick" :class="{completed: completed}" class="list-item">
    <span
      ref="text"
      class="label"
      :contenteditable="contenteditable"
      @input="handleInput"
      @keydown.tab.exact.prevent="handleNext"
      @keydown.enter.prevent="handleNext"
      @keydown.,.prevent="handleNext"
      @blur="handleBlur"
      @paste.prevent="handlePaste"
      >{{ label }}</span
    ><span v-if="!last">, </span>
  </li>
</template>

<script>
const itemDelimiterRegex = /\r?\n|\r|,|\uFF0C/;
const itemDelimiterGlobalRegex= /\r?\n|\r|,|\uFF0C/g;

export default {
  name: "ListItem",
  props: ["label", "completed", "editing", "last"],
  emits: ["update:label", "update:completed", "remove", "next"],
  methods: {
    handleClick(e) {
      if (this.editing) return;
      this.$emit("update:completed", !this.completed);
    },
    handleInput(e) {
      if (itemDelimiterRegex.test(e.target.innerText)) {
        e.target.innerText = e.target.innerText.replace(itemDelimiterGlobalRegex, '');
        this.handleNext();
      }

      this.$emit("update:label", e.target.innerText);
    },
    handleBlur() {
      if (this.label == "") {
        this.$emit("remove");
      }
    },
    handlePaste(e) {
      // Get the copied text from the clipboard
      let text = e.clipboardData
        ? (e.originalEvent || e).clipboardData.getData("text/plain")
        : // For IE
        window.clipboardData
        ? window.clipboardData.getData("Text")
        : "";
      
      text = text.replace(itemDelimiterGlobalRegex, ' ');

      if (document.queryCommandSupported("insertText")) {
        document.execCommand("insertText", false, text);
      } else {
        // Insert text at the current position of caret
        const range = document.getSelection().getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
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
 .list-item {
  display: inline;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.list-item.completed .label {
  text-decoration: line-through;
  opacity: 50%;
}
.list-item .label:focus {
  outline: none;
  text-decoration: unset;
  opacity: unset;

  color: var(--accent-color);
  background-color: var(--space-color);
  box-shadow: var(--shadow-color) 0 3px 6px;
  border-radius: 0.3em;
}
</style>