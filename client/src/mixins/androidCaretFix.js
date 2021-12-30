export default {
  methods: {
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
    }
  }
}