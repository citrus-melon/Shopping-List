<template>
  <action-strip :inverted="inverted">
    <toggle-button v-model="editing" @click="editBtnClick" :variant="buttonVariant">Edit</toggle-button>
    <toggle-button v-model="selecting" :variant="buttonVariant">Select</toggle-button>
    <styled-button @click="insertOrFocusItem(items.length)" :variant="buttonVariant">Add Item</styled-button>
  </action-strip>
  <action-strip :inverted="inverted" :secondary="true" v-show="selecting">
    <span class="selected-count">{{ selectedCount }} Items Selected</span>
    <styled-button @click="selectAll" :variant="buttonVariant">Select All</styled-button>
    <styled-button @click="forSelection(removeItem)" :variant="buttonVariant">Remove</styled-button>
    <styled-button v-for="action in selectionActions" @click="emitAction(action)" :key="action" :variant="buttonVariant">
      {{ action }}
    </styled-button>
  </action-strip>
  <ol class="list">
    <list-item
      v-for="(item, index) in items"
      v-model:label="item.label"
      v-bind:key="item.id"
      v-bind:item-id="item.id"
      v-bind:last="index == items.length - 1"
      v-bind:editing="editing"
      v-bind:inverted="inverted"
      :class="{completed: item.completed, selected: item.selected}"
      :ref="setItemRef"
      @click="itemClick(index)"
      @remove="removeItem(index)"
      @focus-next="insertOrFocusItem(index + 1)"
      @insert-items="insertAndFocusItem(index + 1, $event)"
    ></list-item>
  </ol>
</template>

<script>
import ActionStrip from './ActionStrip.vue';
import ListItem from './ListItem.vue';
import StyledButton from './StyledButton.vue';
import ToggleButton from './ToggleButton.vue';

export default {
  name: 'List',
  components: {ListItem, StyledButton, ToggleButton, ActionStrip},
  props: ['items', 'nextId', 'selectionActions', 'inverted'],
  emits: ['update:items', 'itemAction', 'useIds'],
  data() {
    return {
      editing:false,
      selecting: false,
      itemRefs: {}
    }
  },
  computed: {
    selectedCount() {
      let count = 0;
      for (const item of this.items) {
        if (item.selected) count++;
      }
      return count;
    },
    buttonVariant() { return this.inverted ? 'colored-light' : 'uncolored' }
  },
  methods: {
    removeItem (index) {
      this.items.splice(index, 1);
    },
    focusItem (id) {
      this.editing = true;
      this.$nextTick(() => {
        this.itemRefs[id].focus();
      });
    },
    insertItems (index, labels) {
      if (!labels) labels = [''];
      if (!Array.isArray(labels)) labels = [ labels ];
      let nextId = this.nextId;
      const items = [];
      for (const label of labels) {
        items.push({id: nextId++, label: label});
      }
      this.items.splice(index, 0, ...items);
      this.$emit("useIds", items.length);
      return items;
    },
    insertAndFocusItem (index, labels) {
      const items = this.insertItems(index, labels);
      this.focusItem(items[items.length-1].id);
    },
    insertOrFocusItem (index) {
      if (this.items[index] === undefined) {
        this.insertAndFocusItem(index)
      } else {
        this.focusItem(this.items[index].id);
      }
    },
    forSelection(action) {
      for (let i = this.items.length -1; i >= 0; i--) {
        const item = this.items[i];
        if (item.selected) {
          item.selected = false;
          action(i, item);
        }
      }
    },
    emitAction(action) {
      this.forSelection((index, item) => {
        this.$emit('itemAction', action, item, index);
      })
    },
    selectAll() {
      for (const item of this.items) {
        item.selected = true;
      }
    },
    toggleSelectItem (index) {
      const item = this.items[index];
      item.selected = !item.selected;
    },
    itemClick (index) {
      if (this.editing) return;
      else if (this.selecting) this.toggleSelectItem(index);
      else this.$emit('itemAction', 'default', this.items[index], index);
    },
    editBtnClick () {
      if(!this.editing) this.insertOrFocusItem(0);
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs[el.itemId] = el;
      }
    },
  },
  beforeUpdate () {
    this.itemRefs = {}
  },
  watch: {
    items: {
      handler(newValue) {
        this.$emit("update:items", newValue);
      },
      deep: true
    },
    editing(value) { if (value) this.selecting = false },
    selecting(value) {
       if (value) this.editing = false;
       for (const item of this.items) {
         item.selected = false;
       }
    }
  }
};
</script>

<style>
.list {
  display: block;
  list-style: none;
  
  font-size: 2em;
}

.list:empty::after {
  content: 'Press edit to add an item!';
  opacity: 50%;
}
</style>
