<template>
  <div class="actionStrip">
    <toggle-button v-model="editing" @click="editBtnClick">Edit</toggle-button>
    <toggle-button v-model="selecting">Select</toggle-button>
    <styled-button @click="insertOrFocusItem(items.length)">Add Item</styled-button>
  </div>
  <div class="actionStrip invert" v-show="selecting">
    <span class="selected-count">{{ selectedCount }} Items Selected</span>
    <styled-button @click="selectAll">Select All</styled-button>
    <styled-button @click="removeSelected">Remove</styled-button>
    <slot></slot>
  </div>
  <ol class="list">
    <list-item
      v-for="(item, index) in items"
      v-model:label="item.label"
      v-bind:key="item.id"
      v-bind:item-id="item.id"
      v-bind:last="index == items.length - 1"
      v-bind:editing="editing"
      :class="{completed: item.completed, selected: item.selected}"
      :ref="setItemRef"
      @click="itemAction(index)"
      @remove="removeItem(index)"
      @focus-next="insertOrFocusItem(index + 1)"
      @insert-after="insertAndFocusItem(index + 1)"
    ></list-item>
  </ol>
</template>

<script>
import ListItem from './ListItem.vue';
import StyledButton from './StyledButton.vue';
import ToggleButton from './ToggleButton.vue';

export default {
  name: 'List',
  components: {ListItem, StyledButton, ToggleButton},
  props: ['items', 'nextId'],
  emits: ['update:items', 'itemAction', 'useId'],
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
    }
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
    insertItem (index, label) {
      if (!label) label = '';
      const item = {id: this.nextId, label: label};
      this.items.splice(index, 0, item);
      this.$emit('useId');
      return item;
    },
    insertAndFocusItem (index, label) {
      const item = this.insertItem(index, label);
      this.focusItem(item.id);
    },
    insertOrFocusItem (index) {
      if (this.items[index] === undefined) {
        this.insertAndFocusItem(index)
      } else {
        this.focusItem(this.items[index].id);
      }
    },
    selectAll() {
      for (const item of this.items) {
        item.selected = true;
      }
    },
    removeSelected() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.selected) {
          this.removeItem(i);
          i--;
        }
      }
    },
    toggleSelectItem (index) {
      const item = this.items[index];
      item.selected = !item.selected;
    },
    itemAction (index) {
      if (this.editing) return;
      else if (this.selecting) this.toggleSelectItem(index);
      else this.$emit('itemAction', index);
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

/* ACTION STRIP */
.actionStrip {
  display: flex;
  flex-flow: row wrap;
  margin: 1em 0;
  gap: 0.5em;
}

.actionStrip.invert {
  padding: 1em;
  border-radius: 1em;
  background-color: var(--accent-color);
}

.actionStrip .selected-count {
  color: var(--space-color);
  padding: 0.5em 0;
}
</style>
