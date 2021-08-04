<template>
  <li @click="toggleCompletion" :class="{completed: completed}" class="list-item">
    <span
      ref="text"
      class="label"
      :contenteditable="contenteditable"
      @input="onInput"
      @keydown.tab.exact.prevent="focusNextItem"
      @keydown.enter.prevent="insertItemAfter"
      @keydown.,.prevent="insertItemAfter"
      @focus="androidCaretFix"
      @blur="onBlur"
      @paste.prevent="onPaste"
    >{{ label }}</span>
    <span v-if="!last">, </span>
  </li>
</template>

<script>
const itemDelimiterRegex = /\r?\n|\r|,|\uFF0C/;
const itemDelimiterGlobalRegex= /\r?\n|\r|,|\uFF0C/g;

export default {
  name: "ListItem",
  props: ["id", "label", "completed", "editing", "last"],
  emits: ["update:label", "update:completed", "remove", "focusNext", "insertAfter"],
  methods: {
    toggleCompletion(e) {
      if (this.editing) return;
      this.$emit("update:completed", !this.completed);
    },
    onInput(e) {
      if (itemDelimiterRegex.test(e.target.innerText)) {
        e.target.innerText = e.target.innerText.replace(itemDelimiterGlobalRegex, '');
        this.focusNextItem();
      }
    },
    onBlur(e) {
      if (e.target.innerText == "") {
        this.$emit("remove");
      } else {
        this.$emit("update:label", e.target.innerText);
      }
    },
    onPaste(e) {
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
    focusNextItem() {
      this.$emit("focusNext");
    },
    insertItemAfter() {
      this.$emit("insertAfter");
    },
    androidCaretFix(e) {
      const selection = window.getSelection();
      const selectionRange = new Range();

      const originalContent = e.target.textContent;

      // Clear the content and select in the empty element
      e.target.textContent = '';
      selectionRange.selectNodeContents(e.target);
      selection.removeAllRanges();
      selection.addRange(selectionRange);
      
      // Re-insert the content and set the cursor at the end
      const textNode = document.createTextNode(originalContent);
      selectionRange.insertNode(textNode);
      selectionRange.selectNodeContents(textNode);
      selectionRange.collapse(false);
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